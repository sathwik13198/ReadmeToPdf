
export type TabType = 'markdown' | 'css' | 'js' | 'settings';

export interface ExportSettings {
  pageSize: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
  margin: number;
  theme: string;
  enableJS: boolean;
  previewMode: 'responsive' | 'page';
}

export interface PresetTheme {
  id: string;
  name: string;
  css: string;
}
