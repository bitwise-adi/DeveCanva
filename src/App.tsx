import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProjectsBento } from './components/ProjectsBento';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectsArchive } from './components/ProjectsArchive';
import { ProjectCaseStudy } from './components/ProjectCaseStudy';
import { ResumeModal } from './components/ResumeModal';
import { ParticleCanvas } from './components/ParticleCanvas';
import { LightboxModal } from './components/LightboxModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CommandPalette } from './components/CommandPalette';

export const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // In-App View Routing State
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'case-study'>('home');
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>('locome');

  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Enforce dark theme permanently
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, []);

  // Parse location hash for in-app page routing (/projects, /projects/[id])
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/projects/')) {
        const id = hash.replace('#/projects/', '');
        setActiveCaseStudyId(id);
        setCurrentView('case-study');
      } else if (hash === '#/projects' || hash === '#projects-archive') {
        setCurrentView('projects');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global ⌘K / Ctrl+K & / keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput && !isCommandPaletteOpen && !isResumeOpen && !isLightboxOpen) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, isResumeOpen, isLightboxOpen]);

  const handleOpenLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProjectsArchive = () => {
    window.location.hash = '/projects';
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCaseStudy = (id: string) => {
    window.location.hash = `/projects/${id}`;
    setActiveCaseStudyId(id);
    setCurrentView('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Background Canvas */}
      <ParticleCanvas />

      {/* Header Navigation */}
      <Navbar
        currentView={currentView}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateHome={navigateToHome}
        onNavigateProjects={navigateToProjectsArchive}
      />

      {/* Main View Router */}
      <main>
        {currentView === 'home' && (
          <>
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <About onOpenLightbox={handleOpenLightbox} />
            <Timeline />
            <SkillsMatrix />
            <ProjectsBento
              onNavigateToProjectsArchive={navigateToProjectsArchive}
              onSelectCaseStudy={navigateToCaseStudy}
              onOpenLightbox={handleOpenLightbox}
            />
            <Terminal onOpenResume={() => setIsResumeOpen(true)} />
            <Contact onOpenResume={() => setIsResumeOpen(true)} />
          </>
        )}

        {currentView === 'projects' && (
          <ProjectsArchive onSelectCaseStudy={navigateToCaseStudy} />
        )}

        {currentView === 'case-study' && (
          <ProjectCaseStudy
            projectId={activeCaseStudyId}
            onNavigateToProjects={navigateToProjectsArchive}
            onNavigateToCaseStudy={navigateToCaseStudy}
            onOpenLightbox={handleOpenLightbox}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Developer Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectCaseStudy={navigateToCaseStudy}
        onNavigateHome={navigateToHome}
      />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

export default App;
