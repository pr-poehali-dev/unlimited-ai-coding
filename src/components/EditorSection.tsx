import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

export default function EditorSection() {
  const [activeFile, setActiveFile] = useState('1');
  const [files, setFiles] = useState<FileTab[]>([
    {
      id: '1',
      name: 'app.py',
      language: 'python',
      content: `def hello_world():
    """
    Простая функция приветствия
    """
    message = "Hello, AI World!"
    print(message)
    return message

if __name__ == "__main__":
    hello_world()`,
    },
    {
      id: '2',
      name: 'main.js',
      language: 'javascript',
      content: `const greet = (name) => {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
};

greet("Developer");`,
    },
  ]);

  const currentFile = files.find((f) => f.id === activeFile);

  const handleContentChange = (newContent: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === activeFile ? { ...file, content: newContent } : file
      )
    );
  };

  const highlightSyntax = (code: string, language: string) => {
    const keywords: Record<string, string[]> = {
      python: ['def', 'if', 'else', 'elif', 'return', 'import', 'from', 'class', 'for', 'while', 'in', 'print'],
      javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'console'],
    };

    const langKeywords = keywords[language] || [];
    const lines = code.split('\n');

    return lines.map((line, i) => {
      let highlightedLine = line;
      
      langKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlightedLine = highlightedLine.replace(
          regex,
          `<span class="text-purple-400 font-medium">$1</span>`
        );
      });

      highlightedLine = highlightedLine.replace(
        /(["'`])(.*?)\1/g,
        '<span class="text-green-400">$1$2$1</span>'
      );

      highlightedLine = highlightedLine.replace(
        /#.*/g,
        '<span class="text-gray-500 italic">$&</span>'
      );

      highlightedLine = highlightedLine.replace(
        /\/\/.*/g,
        '<span class="text-gray-500 italic">$&</span>'
      );

      return (
        <div key={i} className="flex gap-4">
          <span className="text-muted-foreground text-right w-8 select-none flex-shrink-0">
            {i + 1}
          </span>
          <span
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="border-b border-border px-6 py-3 bg-card/50 flex items-center justify-between">
        <Tabs value={activeFile} onValueChange={setActiveFile} className="flex-1">
          <TabsList className="bg-secondary/50 h-9">
            {files.map((file) => (
              <TabsTrigger
                key={file.id}
                value={file.id}
                className={cn(
                  "gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                )}
              >
                <Icon name="FileCode" size={14} />
                {file.name}
              </TabsTrigger>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 ml-2"
              title="Новый файл"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icon name="Play" size={14} />
            Запустить
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Icon name="Download" size={14} />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <div className="absolute inset-0 overflow-auto bg-card">
            <div className="p-6">
              <pre className="font-mono text-sm leading-relaxed">
                {currentFile && highlightSyntax(currentFile.content, currentFile.language)}
              </pre>
            </div>
          </div>

          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
            <Textarea
              value={currentFile?.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-full font-mono text-sm bg-card/95 border-none resize-none p-6 leading-relaxed focus:opacity-100"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="w-80 border-l border-border bg-card/30 p-4">
          <h3 className="font-medium text-sm mb-3 text-foreground">AI Помощник</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-start gap-2">
                <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">Объяснить код</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Получить детальное объяснение
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-start gap-2">
                <Icon name="Wand2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">Оптимизировать</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Улучшить производительность
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-start gap-2">
                <Icon name="Bug" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">Найти баги</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Проверить на ошибки
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-start gap-2">
                <Icon name="FileText" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">Документация</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Добавить комментарии
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
