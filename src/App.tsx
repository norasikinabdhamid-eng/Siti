import AOS from 'aos';
import {useEffect, useState} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {IntegrationSettingsModal} from './components/IntegrationSettingsModal';
import {
  LeadRegistrationSection,
  SubmittedLeadPayload,
} from './components/LeadRegistrationSection';
import {ParentAdvantagesSection} from './components/ParentAdvantagesSection';
import {ProgramsSection} from './components/ProgramsSection';
import {SuccessModal} from './components/SuccessModal';
import {STUDY_PROGRAMS} from './data/gisData';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<string>(STUDY_PROGRAMS[0].title);
  const [submittedLead, setSubmittedLead] = useState<SubmittedLeadPayload | null>(null);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 550,
      easing: 'ease-out-cubic',
      once: true,
      offset: 48,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleSelectCourseAndScroll = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    scrollToSection('daftar');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      <Header onNavigateToForm={() => scrollToSection('daftar')} />

      <main>
        <HeroSection
          onSelectCourseAndScroll={handleSelectCourseAndScroll}
          onScrollToPrograms={() => scrollToSection('program')}
        />

        <ProgramsSection
          selectedCourse={selectedCourse}
          onSelectCourse={handleSelectCourseAndScroll}
        />

        <ParentAdvantagesSection />

        <LeadRegistrationSection
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          onSubmitSuccess={(payload) => setSubmittedLead(payload)}
        />
      </main>

      <Footer onOpenIntegrationModal={() => setIntegrationModalOpen(true)} />

      <SuccessModal lead={submittedLead} onClose={() => setSubmittedLead(null)} />

      <IntegrationSettingsModal
        open={integrationModalOpen}
        onClose={() => setIntegrationModalOpen(false)}
      />
    </div>
  );
}
