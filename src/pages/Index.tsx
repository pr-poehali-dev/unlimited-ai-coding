import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatSection from '@/components/ChatSection';
import EditorSection from '@/components/EditorSection';
import ProjectsSection from '@/components/ProjectsSection';

export default function Index() {
  const [activeSection, setActiveSection] = useState<'chat' | 'editor' | 'projects'>('chat');

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {activeSection === 'chat' && <ChatSection />}
      {activeSection === 'editor' && <EditorSection />}
      {activeSection === 'projects' && <ProjectsSection />}
    </div>
  );
}