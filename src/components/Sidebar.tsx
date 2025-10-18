import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  lastModified: string;
}

interface SidebarProps {
  activeSection: 'chat' | 'editor' | 'projects';
  onSectionChange: (section: 'chat' | 'editor' | 'projects') => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [projects] = useState<Project[]>([
    { id: '1', name: 'web-scraper', lastModified: '2 мин назад' },
    { id: '2', name: 'api-client', lastModified: '1 час назад' },
    { id: '3', name: 'data-processor', lastModified: 'Вчера' },
  ]);

  const sections = [
    { id: 'chat' as const, icon: 'MessageSquare', label: 'Чат' },
    { id: 'editor' as const, icon: 'Code2', label: 'Редактор' },
    { id: 'projects' as const, icon: 'FolderGit2', label: 'Проекты' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={18} className="text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-lg text-sidebar-foreground">AI Coder</h1>
        </div>
      </div>

      <nav className="p-3 border-b border-sidebar-border">
        <div className="space-y-1">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start gap-3 h-10",
                activeSection === section.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon name={section.icon} size={18} />
              <span>{section.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
            Недавние проекты
          </div>
          {projects.map((project) => (
            <button
              key={project.id}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Icon name="Folder" size={16} className="text-muted-foreground" />
                <span className="flex-1 truncate">{project.name}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 ml-6">
                {project.lastModified}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent">
          <Icon name="Settings" size={18} />
          <span>Настройки</span>
        </Button>
      </div>
    </div>
  );
}
