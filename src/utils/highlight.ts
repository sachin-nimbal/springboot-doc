import { themes } from 'prism-react-renderer';

export const lightTheme = themes.github;
export const darkTheme = themes.vsDark;

export const languageMap: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  jsx: 'javascript',
  tsx: 'typescript',
  py: 'python',
  rb: 'ruby',
  sh: 'bash',
  yml: 'yaml',
  json: 'json',
  xml: 'xml',
  html: 'markup',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  java: 'java',
  kt: 'kotlin',
  swift: 'swift',
  go: 'go',
  rs: 'rust',
  php: 'php',
  sql: 'sql',
  md: 'markdown',
  mdx: 'markdown',
};

export function getLanguage(lang: string): string {
  return languageMap[lang.toLowerCase()] || lang;
}

export function formatLanguageLabel(lang: string): string {
  const formatted = getLanguage(lang);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}