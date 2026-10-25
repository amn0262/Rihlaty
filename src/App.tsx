import React, { useState, useEffect } from 'react';
import {
  AppScreen,
  ChildProfile,
  MemorizationLog,
  BadgeItem,
  CertificateItem,
  Ayah,
  Surah
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

  // Child Profile state (seeded with Omar matching the design storyboard)
  const [profile, setProfile] = useState<ChildProfile>({
    name: 'عمر',
    age: 7,
    avatarId: 'boy-omar',
    dailyGoal: 5,
    todayCompletedAyahs: 3,
    reviewSurahsCount: 3,
  });

  // Memorization logs seeded to match the storyboard:
  // 136 of 564 ayahs = 24%, 9 of 37 surahs completed
  const [logs, setLogs] = useState<MemorizationLog[]>([
    // Surah 78 (An-Naba): 32 ayahs (current progress)
    { id: 'log-1', surahId: 78, fromAyah: 1, toAyah: 32, date: '2024/10/15', durationMinutes: 20 },
    // 9 completed short surahs (40 ayahs total):
    { id: 'log-2', surahId: 108, fromAyah: 1, toAyah: 3, date: '2024/10/01', durationMinutes: 10 },
    { id: 'log-3', surahId: 110, fromAyah: 1, toAyah: 3, date: '2024/10/02', durationMinutes: 10 },
    { id: 'log-4', surahId: 103, fromAyah: 1, toAyah: 3, date: '2024/10/03', durationMinutes: 10 },
    { id: 'log-5', surahId: 106, fromAyah: 1, toAyah: 4, date: '2024/10/04', durationMinutes: 15 },
    { id: 'log-6', surahId: 112, fromAyah: 1, toAyah: 4, date: '2024/10/05', durationMinutes: 15 },
    { id: 'log-7', surahId: 105, fromAyah: 1, toAyah: 5, date: '2024/10/06', durationMinutes: 15 },
    { id: 'log-8', surahId: 113, fromAyah: 1, toAyah: 5, date: '2024/10/07', durationMinutes: 15 },
    { id: 'log-9', surahId: 114, fromAyah: 1, toAyah: 6, date: '2024/10/08', durationMinutes: 15 },
    { id: 'log-10', surahId: 107, fromAyah: 1, toAyah: 7, date: '2024/10/09', durationMinutes: 15 },
    // Partially memorized surahs (64 ayahs total, so total = 32 + 40 + 64 = 136 ayahs):
    { id: 'log-11', surahId: 79, fromAyah: 1, toAyah: 20, date: '2024/10/10' },
    { id: 'log-12', surahId: 80, fromAyah: 1, toAyah: 20, date: '2024/10/11' },
    { id: 'log-13', surahId: 81, fromAyah: 1, toAyah: 14, date: '2024/10/12' },
    { id: 'log-14', surahId: 82, fromAyah: 1, toAyah: 10, date: '2024/10/13' },
  ]);

  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem>(INITIAL_CERTIFICATES[0]);

  // Current active surah being read / memorized
  const [currentSurahId, setCurrentSurahId] = useState<number>(78);
  const currentSurah = getSurahWithAyahs(currentSurahId);

  // Active Ayah for Tafseer modal
  const [selectedAyah, setSelectedAyah] = useState<Ayah>(currentSurah.ayahs[0]);

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

  const handleSelectSurah = (surahId: number) => {
    setCurrentSurahId(surahId);
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
              onStart={() => setCurrentScreen('profile-setup')}
              onLoginExisting={() => setCurrentScreen('home')}
              onOpenStoryboard={() => setShowStoryboardModal(true)}
              onOpenDeveloper={() => setCurrentScreen('developer')}
            />
          )}

          {currentScreen === 'profile-setup' && (
            <ProfileSetupView
              initialProfile={profile}
              onSave={(updated) => {
                setProfile(updated);
                setCurrentScreen('tour');
              }}
              onBack={() => setCurrentScreen('splash')}
            />
          )}

          {currentScreen === 'tour' && (
            <TourView
              onComplete={() => setCurrentScreen('home')}
              onBack={() => setCurrentScreen('profile-setup')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeDashboardView
              profile={profile}
              logs={logs}
              currentSurahId={currentSurahId}
              onContinueMemorization={handleSelectSurah}
              onNavigateTab={(tab) => {
                if (tab === 'surahs') setCurrentScreen('surahs-list');
                else if (tab === 'achievements') setCurrentScreen('achievements');
                else if (tab === 'profile') setCurrentScreen('developer');
                else if (tab === 'review') setCurrentScreen('surah-reader');
              }}
              onOpenDeveloper={() => setCurrentScreen('developer')}
            />
          )}

          {currentScreen === 'surahs-list' && (
            <SurahsListView
              logs={logs}
              onSelectSurah={handleSelectSurah}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'surah-reader' && (
            <SurahReaderView
              surah={currentSurah}
              logs={logs}
              onOpenAyahTafseer={handleOpenAyahTafseer}
              onOpenLogMemorization={() => setCurrentScreen('log-memorization')}
              onBack={() => setCurrentScreen('surahs-list')}
            />
          )}

          {currentScreen === 'tafseer-detail' && (
            <TafseerDetailModal
              ayah={selectedAyah}
              surah={currentSurah}
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

          {currentScreen === 'certificate' && (
            <CertificateModal
              certificate={selectedCertificate}
              onClose={() => setCurrentScreen('achievements')}
            />
          )}

          {currentScreen === 'developer' && (
            <DeveloperSection
              onBack={() => setCurrentScreen('home')}
              onOpenStoryboard={() => setShowStoryboardModal(true)}
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
