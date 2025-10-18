import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  files: number;
  lastModified: string;
  status: 'active' | 'archived';
}

export default function ProjectsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'web-scraper',
      description: 'Автоматический сбор данных с веб-сайтов',
      language: 'Python',
      files: 8,
      lastModified: '2 минуты назад',
      status: 'active',
    },
    {
      id: '2',
      name: 'api-client',
      description: 'REST API клиент с аутентификацией',
      language: 'JavaScript',
      files: 12,
      lastModified: '1 час назад',
      status: 'active',
    },
    {
      id: '3',
      name: 'data-processor',
      description: 'Обработка и анализ больших данных',
      language: 'Python',
      files: 15,
      lastModified: 'Вчера',
      status: 'active',
    },
    {
      id: '4',
      name: 'chat-bot',
      description: 'Telegram бот с AI интеграцией',
      language: 'TypeScript',
      files: 6,
      lastModified: '3 дня назад',
      status: 'archived',
    },
    {
      id: '5',
      name: 'image-optimizer',
      description: 'Пакетная обработка изображений',
      language: 'Python',
      files: 5,
      lastModified: 'Неделю назад',
      status: 'active',
    },
  ]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      Python: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      JavaScript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      TypeScript: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colors[language] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="border-b border-border px-6 py-4 bg-card/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-foreground">Проекты</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Управление всеми проектами в одном месте
            </p>
          </div>
          <Button className="gap-2">
            <Icon name="Plus" size={16} />
            Новый проект
          </Button>
        </div>

        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск проектов..."
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="p-5 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="FolderGit2" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>
                {project.status === 'archived' && (
                  <Badge variant="outline" className="text-xs">
                    Архив
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getLanguageColor(project.language)}>
                    {project.language}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="FileCode" size={12} />
                    <span>{project.files} файлов</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {project.lastModified}
                </span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Icon name="Play" size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Icon name="MoreVertical" size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Проекты не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
