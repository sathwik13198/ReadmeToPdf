
import React, { useMemo } from 'react';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

interface PreviewProps {
  markdown: string;
  css: string;
  js: string;
  enableJS: boolean;
  mode?: 'responsive' | 'page';
  pageSize?: 'A4' | 'Letter';
}

const Preview: React.FC<PreviewProps> = ({ markdown, css, js, enableJS, mode = 'responsive', pageSize = 'A4' }) => {
  const srcDoc = useMemo(() => {
    try {
      const htmlBody = marked.parse(markdown);
      
      const pageStyles = mode === 'page' ? `
        body {
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          padding: 40px 0;
          margin: 0;
        }
        #preview-root {
          background-color: white;
          width: ${pageSize === 'A4' ? '210mm' : '8.5in'};
          min-height: ${pageSize === 'A4' ? '297mm' : '11in'};
          padding: 20mm;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          box-sizing: border-box;
          margin: 0 auto;
        }
        @media print {
          body { background: none; padding: 0; }
          #preview-root { box-shadow: none; padding: 0; width: 100%; min-height: auto; }
        }
      ` : 'body { margin: 0; padding: 0; background: white; } #preview-root { padding: 40px; }';

      return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <style>
              ${pageStyles}
              ${css}
            </style>
          </head>
          <body>
            <div id="preview-root">
              ${htmlBody}
            </div>
            ${enableJS && js ? `<script>${js}</script>` : ''}
          </body>
        </html>
      `;
    } catch (err) {
      console.error('Markdown parsing error:', err);
      return `<html><body style="color:red">Error rendering preview</body></html>`;
    }
  }, [markdown, css, js, enableJS, mode, pageSize]);

  return (
    <div className={`w-full h-full rounded-lg overflow-hidden shadow-2xl border border-slate-700 relative ${mode === 'page' ? 'bg-slate-800' : 'bg-white'}`}>
      <iframe
        title="README Pro Live Preview"
        srcDoc={srcDoc}
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-modals allow-popups"
      />
    </div>
  );
};

export default Preview;
