
import { PresetTheme } from './types';

export const INITIAL_MARKDOWN = `# 🚀 Project Awesome

Welcome to your new professional documentation. This README was built using **README Pro Converter**.

## ✨ Features
- **Real-time Preview**: See changes as you type.
- **AI Refiner**: Let Gemini improve your structure and style.
- **Custom CSS/JS**: Full control over the final output.
- **Multi-format Export**: PDF, Word, and HTML.

## 🛠 Installation
\`\`\`bash
npm install awesome-project
\`\`\`

> "Documentation is a love letter that you write to your future self." — *Damian Conway*

| Feature | Support |
| :--- | :--- |
| PDF | ✅ |
| DOCX | ✅ |
| HTML | ✅ |
| AI | ✅ |

![Placeholder](https://picsum.photos/seed/doc/800/400)
`;

export const INITIAL_CSS = `/* README Pro Default Styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #24292e;
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

h1 { border-bottom: 2px solid #eaecef; padding-bottom: 0.3em; color: #0366d6; }
h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; }
code { background-color: rgba(27,31,35,0.05); border-radius: 3px; padding: 0.2em 0.4em; font-family: "Fira Code", monospace; }
pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
blockquote { border-left: 4px solid #dfe2e5; color: #6a737d; padding-left: 16px; margin: 0; }
table { width: 100%; border-collapse: collapse; margin: 16px 0; }
th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
tr:nth-child(even) { background-color: #f6f8fa; }
img { max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
`;

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: 'github-light',
    name: 'GitHub Light',
    css: INITIAL_CSS
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    css: `body { background-color: #0d1117; color: #c9d1d9; font-family: sans-serif; padding: 40px; }
h1, h2 { border-bottom: 1px solid #30363d; color: #58a6ff; }
pre { background-color: #161b22; border: 1px solid #30363d; padding: 16px; border-radius: 6px; }
code { background-color: #30363d; padding: 2px 4px; border-radius: 3px; }
blockquote { border-left: 4px solid #30363d; color: #8b949e; padding-left: 16px; }
table, th, td { border: 1px solid #30363d; }
th { background-color: #161b22; }
`
  },
  {
    id: 'terminal',
    name: 'Cyber Terminal',
    css: `body { background-color: #000; color: #0f0; font-family: "Fira Code", monospace; padding: 40px; }
h1, h2, h3 { color: #0f0; text-transform: uppercase; border-bottom: 1px dashed #0f0; }
pre { border: 1px solid #0f0; padding: 10px; background: #111; }
a { color: #fff; text-decoration: underline; }
`
  }
];
