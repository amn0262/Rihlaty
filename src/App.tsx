import React, { useState, useEffect } from 'react';
import {
  AppScreen,
  ChildProfile,
  MemorizationLog,
  BadgeItem,
  CertificateItem,
  Ayah,
  Surah,
  ReciterId,
  BookmarkItem
} from './types';
import {
  SURAHS_LIST_SUMMARY,
  INITIAL_BADGES,
  INITIAL_CERTIFICATES,
  getSurahWithAyahs
} from './data/quranJuzAmma';
import {
  calculateTotalMemorizedAyahs,
  calculateJuzAmmaPercentage,
  calculateCompletedSurahsCount,
  evaluateBadgesStatus
} from './utils/memorization';

import { SplashView } from './components/SplashView';
import { ProfileSetupView } from './components/ProfileSetupView';
import { TourView } from './components/TourView';
import { HomeDashboardView } from './components/HomeDashboardView';
import { SurahsListView } from './components/SurahsListView';
import { SurahReaderView } from './components/SurahReaderView';
import { TafseerDetailModal } from './components/TafseerDetailModal';
import { LogMemorizationModal } from './components/LogMemorizationModal';
import { AchievementsView } from './components/AchievementsView';
import { CertificateModal } from './components/CertificateModal';
import { DeveloperSection } from './components/DeveloperSection';
import { StoryboardOverviewModal } from './components/StoryboardOverviewModal';
import { Layers, User } from 'lucide-react';

export default function App() {
  // Support ?autostart=1 query param to skip straight to home
  const searchParams = new URLSearchParams(window.location.search);
  const autostart = searchParams.get('autostart') === '1';

  const [currentScreen, setCurrentScreen] = useState<AppScreen>(autostart ? 'home' : 'splash');
  const [showStoryboardModal, setShowStoryboardModal] = useState<boolean>(false);

  // Check if personal data is already registered
  const [isRegistered, setIsRegistered] = useState<boolean>(() => {
    try {
      const reg = localStorage.getItem('quran_child_profile_registered');
      if (reg === 'true') return true;
      if (reg === 'false') return false;
      const saved = localStorage.getItem('quran_child_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.name.trim() !== '') {
          return true;
        }
      }
    } catch {}
    return false;
  });

  // Child Profile state (starts clean with 0 memorized ayahs)
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem('quran_child_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'عمر',
      age: 7,
      avatarId: 'boy-omar',
      dailyGoal: 5,
      todayCompletedAyahs: 0,
      reviewSurahsCount: 0,
    };
  });

  // Memorization logs: starts at 0 (empty list) for learning from scratch
  const [logs, setLogs] = useState<MemorizationLog[]>(() => {
    try {
      const saved = localStorage.getItem('quran_memorization_logs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    try {
      const saved = localStorage.getItem('quran_badges');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BADGES;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem('quran_certificates');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CERTIFICATES;
  });

  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Selected reciter: can be 'ghamadi' (سعد الغامدي) or 'alafasy' (مشاري العفاسي)
  const [selectedReciter, setSelectedReciter] = useState<ReciterId>(() => {
    try {
      const savedReciter = localStorage.getItem('quran_selected_reciter') as ReciterId;
      if (savedReciter === 'ghamadi' || savedReciter === 'alafasy') return savedReciter;
      const savedProfile = localStorage.getItem('quran_child_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.selectedReciter) return parsed.selectedReciter;
      }
    } catch {}
    return 'ghamadi'; // Saad Al-Ghamdi
  });

  const handleSelectReciter = (reciter: ReciterId) => {
    setSelectedReciter(reciter);
    setProfile(prev => ({ ...prev, selectedReciter: reciter }));
    try {
      localStorage.setItem('quran_selected_reciter', reciter);
    } catch {}
  };

  // Current active surah being read / memorized
  const [currentSurahId, setCurrentSurahId] = useState<number>(78);
  const [targetAyahNumber, setTargetAyahNumber] = useState<number | undefined>(undefined);
  const currentSurah = getSurahWithAyahs(currentSurahId, selectedReciter);

  // Active Ayah for Tafseer modal
  const [selectedAyah, setSelectedAyah] = useState<Ayah>(currentSurah.ayahs[0]);

  // Persistent Bookmark (Book Mark - مكان الوقوف)
  const [bookmark, setBookmark] = useState<BookmarkItem | null>(() => {
    try {
      const saved = localStorage.getItem('quran_bookmark');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const handleSetBookmark = (newBm: BookmarkItem) => {
    setBookmark(newBm);
    try {
      localStorage.setItem('quran_bookmark', JSON.stringify(newBm));
    } catch {}
  };

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quran_child_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_memorization_logs', JSON.stringify(logs));
    } catch {}
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_certificates', JSON.stringify(certificates));
    } catch {}
  }, [certificates]);

  // Re-evaluate badges whenever logs change
  useEffect(() => {
    const total = calculateTotalMemorizedAyahs(logs);
    const countMap: Record<number, number> = {};
    SURAHS_LIST_SUMMARY.forEach(s => { countMap[s.id] = s.ayahsCount; });
    const completed = calculateCompletedSurahsCount(logs, countMap);
    const { badges: updatedBadges, newlyUnlocked } = evaluateBadgesStatus(badges, total, completed);
    setBadges(updatedBadges);

    // If new badge unlocked, generate certificate
    if (newlyUnlocked.length > 0) {
      const newCerts = newlyUnlocked.map(b => ({
        id: `cert-${Date.now()}-${b.id}`,
        title: `شهادة ${b.title}`,
        childName: profile.name,
        surahName: currentSurah.name,
        ayahsCount: total,
        date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
        badgeTitle: b.title
      }));
      setCertificates(prev => [...newCerts, ...prev]);
    }
  }, [logs, profile.name]);

  // Function to completely reset memorization data back to zero
  const handleResetMemorization = () => {
    setLogs([]);
    setBadges(INITIAL_BADGES);
    setCertificates([]);
    setProfile(prev => ({
      ...prev,
      todayCompletedAyahs: 0,
      reviewSurahsCount: 0,
    }));
    try {
      localStorage.removeItem('quran_memorization_logs');
      localStorage.removeItem('quran_badges');
      localStorage.removeItem('quran_certificates');
    } catch {}
  };

  const handleSaveMemorization = (
    fromAyah: number,
    toAyah: number,
    durationMinutes?: number,
    notes?: string
  ) => {
    const newLog: MemorizationLog = {
      id: `log-${Date.now()}`,
      surahId: currentSurahId,
      fromAyah,
      toAyah,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      durationMinutes,
      notes,
    };
    setLogs(prev => [newLog, ...prev]);
    setProfile(prev => ({
      ...prev,
      todayCompletedAyahs: Math.min(prev.dailyGoal, prev.todayCompletedAyahs + (toAyah - fromAyah + 1))
    }));
    // Return to reader screen
    setCurrentScreen('surah-reader');
  };

  const handleSelectSurah = (surahId: number, startAyah?: number) => {
    setCurrentSurahId(surahId);
    setTargetAyahNumber(startAyah);
    setCurrentScreen('surah-reader');
  };

  const handleOpenAyahTafseer = (ayah: Ayah) => {
    setSelectedAyah(ayah);
    setCurrentScreen('tafseer-detail');
  };

  const handleViewCertificate = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setCurrentScreen('certificate');
  };

  return (
    <div className="min-h-screen bg-[#F0ECE1] text-[#1E293B] flex flex-col font-sans selection:bg-[#105C45] selection:text-white">
      {/* Screen Render Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 md:p-6 w-full">
        <div className="w-full">
          {currentScreen === 'splash' && (
            <SplashView
              isRegistered={isRegistered}
              profileName={profile.name}
              onProceed={() => {
                if (isRegistered) {
                  setCurrentScreen('home');
                } else {
                  setCurrentScreen('profile-setup');
                }
              }}
              onLoginExisting={() => {
                setIsRegistered(true);
                try {
                  localStorage.setItem('quran_child_profile_registered', 'true');
                } catch {}
                setCurrentScreen('home');
              }}
              onOpenStoryboard={() => setShowStoryboardModal(true)}
              onOpenDeveloper={() => setCurrentScreen('developer')}
            />
          )}

          {currentScreen === 'profile-setup' && (
            <ProfileSetupView
              initialProfile={profile}
              onSave={(updated) => {
                setProfile(updated);
                setIsRegistered(true);
                try {
                  localStorage.setItem('quran_child_profile', JSON.stringify(updated));
                  localStorage.setItem('quran_child_profile_registered', 'true');
                } catch {}
                setCurrentScreen('tour');
              }}
              onBack={() => {
                if (isRegistered) {
                  setCurrentScreen('home');
                } else {
                  setCurrentScreen('splash');
                }
              }}
            />
          )}

          {currentScreen === 'tour' && (
            <TourView
              onComplete={() => {
                setIsRegistered(true);
                try {
                  localStorage.setItem('quran_child_profile_registered', 'true');
                } catch {}
                setCurrentScreen('home');
              }}
              onBack={() => setCurrentScreen('profile-setup')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeDashboardView
              profile={profile}
              logs={logs}
              currentSurahId={currentSurahId}
              onContinueMemorization={handleSelectSurah}
              bookmark={bookmark}
              onResumeBookmark={(sId, aNum) => handleSelectSurah(sId, aNum)}
              onNavigateTab={(tab) => {
                if (tab === 'surahs') setCurrentScreen('surahs-list');
                else if (tab === 'achievements') setCurrentScreen('achievements');
                else if (tab === 'profile') setCurrentScreen('profile-setup');
                else if (tab === 'review') setCurrentScreen('surah-reader');
              }}
              onOpenDeveloper={() => setCurrentScreen('developer')}
            />
          )}

          {currentScreen === 'surahs-list' && (
            <SurahsListView
              logs={logs}
              onSelectSurah={handleSelectSurah}
              currentBookmark={bookmark}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'surah-reader' && (
            <SurahReaderView
              surah={currentSurah}
              logs={logs}
              selectedReciter={selectedReciter}
              onChangeReciter={handleSelectReciter}
              onOpenAyahTafseer={handleOpenAyahTafseer}
              onOpenLogMemorization={() => setCurrentScreen('log-memorization')}
              onBack={() => setCurrentScreen('surahs-list')}
              currentBookmark={bookmark}
              onSetBookmark={handleSetBookmark}
              initialAyahNumber={targetAyahNumber}
            />
          )}

          {currentScreen === 'tafseer-detail' && (
            <TafseerDetailModal
              ayah={selectedAyah}
              surah={currentSurah}
              selectedReciter={selectedReciter}
              onChangeReciter={handleSelectReciter}
              onClose={() => setCurrentScreen('surah-reader')}
              onNextAyah={() => {
                const nextNum = selectedAyah.numberInSurah + 1;
                if (nextNum <= currentSurah.ayahs.length) {
                  setSelectedAyah(currentSurah.ayahs[nextNum - 1]);
                }
              }}
              onPrevAyah={() => {
                const prevNum = selectedAyah.numberInSurah - 1;
                if (prevNum >= 1) {
                  setSelectedAyah(currentSurah.ayahs[prevNum - 1]);
                }
              }}
            />
          )}

          {currentScreen === 'log-memorization' && (
            <LogMemorizationModal
              surah={currentSurah}
              onSave={handleSaveMemorization}
              onClose={() => setCurrentScreen('surah-reader')}
            />
          )}

          {currentScreen === 'achievements' && (
            <AchievementsView
              badges={badges}
              certificates={certificates}
              profile={profile}
              onViewCertificate={handleViewCertificate}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'certificate' && selectedCertificate && (
            <CertificateModal
              certificate={selectedCertificate}
              onClose={() => setCurrentScreen('achievements')}
            />
          )}

          {currentScreen === 'developer' && (
            <DeveloperSection
              onBack={() => setCurrentScreen('home')}
              onOpenStoryboard={() => setShowStoryboardModal(true)}
              onResetMemorization={handleResetMemorization}
              onEditProfile={() => setCurrentScreen('profile-setup')}
              onResetProfileSetup={() => {
                setIsRegistered(false);
                setProfile({
                  name: 'عمر',
                  age: 7,
                  avatarId: 'boy-omar',
                  dailyGoal: 5,
                  todayCompletedAyahs: 0,
                  reviewSurahsCount: 0,
                });
                try {
                  localStorage.removeItem('quran_child_profile');
                  localStorage.setItem('quran_child_profile_registered', 'false');
                } catch {}
                setCurrentScreen('splash');
              }}
            />
          )}
        </div>
      </main>

      {/* Storyboard Modal (showing the original 10-screen layout from user attachment) */}
      {showStoryboardModal && (
        <StoryboardOverviewModal
          onClose={() => setShowStoryboardModal(false)}
          onNavigateToScreen={(screen) => setCurrentScreen(screen)}
        />
      )}
    </div>
  );
}
