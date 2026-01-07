
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  language: 'markdown' | 'css' | 'javascript';
  label: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, language, label }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-none rounded-lg overflow-hidden transition-colors">
      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 transition-colors">{language}</span>
      </div>
      <textarea
        className="flex-1 w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/30 dark:focus:ring-blue-500/50 custom-scrollbar transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
