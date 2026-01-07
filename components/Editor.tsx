
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  language: 'markdown' | 'css' | 'javascript';
  label: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, language, label }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">{language}</span>
      </div>
      <textarea
        className="flex-1 w-full bg-slate-900 text-slate-200 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 custom-scrollbar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
