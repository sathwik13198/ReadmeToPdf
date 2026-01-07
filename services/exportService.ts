
/**
 * README Pro - High-Fidelity Export Engine
 * Refined to prevent "Blank PDF" errors by using industry-standard workarounds.
 */

declare const html2pdf: any;

/**
 * Ensures all assets are loaded, fonts are ready, and layout has settled.
 */
const waitForRenderReady = async (container: HTMLElement) => {
  // 1. Wait for all images to load and decode
  const images = Array.from(container.querySelectorAll('img'));
  const imagePromises = images.map(async (img) => {
    try {
      if (img.complete) {
        if (img.decode) await img.decode().catch(() => {});
        return;
      }
      return new Promise((resolve) => {
        img.onload = () => {
          if (img.decode) img.decode().then(resolve).catch(resolve);
          else resolve(null);
        };
        img.onerror = resolve;
      });
    } catch (e) {
      console.warn("PDF Engine: Image skip", img.src);
    }
  });

  // 2. Wait for Web Fonts to be fully active
  const fontPromise = (document as any).fonts ? (document as any).fonts.ready : Promise.resolve();
  
  // 3. Delay to allow layout engine to settle
  const layoutPromise = new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 1000)));

  await Promise.all([...imagePromises, fontPromise, layoutPromise]);
};

/**
 * Downloads a high-quality PDF.
 * Implements the "Safe-Render" strategy: On-screen but hidden from user, using positive z-index.
 */
export const downloadPDF = async (htmlContent: string, filename: string, options: { format: string, orientation: string }) => {
  const sandbox = document.createElement('div');
  const targetWidth = options.format === 'A4' ? '210mm' : '8.5in';
  
  // THE CRITICAL FIX:
  // html2canvas fails if the element is off-screen (left: -9999px) or has negative z-index.
  // We use fixed/top:0/left:0 with visibility:hidden and z-index:1 to keep it "renderable" but unseen.
  Object.assign(sandbox.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: targetWidth,
    backgroundColor: 'white',
    color: 'black',
    zIndex: '1',                 // Must be >= 0
    visibility: 'hidden',        // Element is still rendered in layout
    pointerEvents: 'none',       // User won’t notice
    display: 'block',
    opacity: '1',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
    boxSizing: 'border-box'
  });

  sandbox.innerHTML = htmlContent;
  document.body.appendChild(sandbox);

  try {
    // Phase 1: Pre-flight - Ensure DOM is painted
    await waitForRenderReady(sandbox);

    // Phase 2: Dimension Precision
    const rect = sandbox.getBoundingClientRect();
    const widthPx = rect.width;
    const pdfFormat = options.format.toLowerCase() === 'a4' ? 'a4' : 'letter';

    if (!sandbox.innerText.trim() && !sandbox.querySelector('img')) {
      throw new Error("Content appears empty. Export cancelled.");
    }

    // Phase 3: Configuration
    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false,
        width: widthPx,
        windowWidth: widthPx,
        foreignObjectRendering: false, // Standard capture is more reliable for custom styles
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: pdfFormat, 
        orientation: options.orientation,
        compress: true,
        precision: 16
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        avoid: ['pre', 'table', 'blockquote', 'img', 'h1', 'h2', 'h3'] 
      }
    };

    // Phase 4: Execute Capture
    await html2pdf().set(opt).from(sandbox).save();
    
    return true;
  } catch (error: any) {
    console.error('PDF Engine Error:', error);
    throw new Error(error.message || 'PDF render failed.');
  } finally {
    // Cleanup
    if (document.body.contains(sandbox)) {
      document.body.removeChild(sandbox);
    }
  }
};

export const downloadHTML = (content: string, filename: string) => {
  try {
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    return true;
  } catch (error) {
    throw new Error('Could not generate HTML file.');
  }
};

export const downloadDOCX = (htmlContent: string, css: string, filename: string) => {
  try {
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <style>
          @page { margin: 1in; }
          body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; padding: 20px; }
          ${css}
        </style>
      </head>
      <body>`;
    const footer = "</body></html>";
    const sourceHTML = header + htmlContent + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    return true;
  } catch (error) {
    throw new Error('Failed to generate Word document.');
  }
};
