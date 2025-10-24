/**
 * Language detection and syntax highlighting utilities
 */

export interface HighlightOptions {
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

/**
 * Detect programming language from code content
 */
export function detectLanguage(code: string): string {
  // Java/Spring Boot detection
  if (
    code.includes('@RestController') ||
    code.includes('@Service') ||
    code.includes('@Entity') ||
    code.includes('public class') ||
    code.includes('import org.springframework')
  ) {
    return 'java';
  }

  // JavaScript/TypeScript detection
  if (
    code.includes('function') ||
    code.includes('=>') ||
    code.includes('const ') ||
    code.includes('let ') ||
    code.includes('import ')
  ) {
    if (code.includes(': string') || code.includes(': number') || code.includes('interface ')) {
      return 'typescript';
    }
    return 'javascript';
  }

  // JSON detection
  if (code.trim().startsWith('{') || code.trim().startsWith('[')) {
    try {
      JSON.parse(code);
      return 'json';
    } catch {
      // Not valid JSON
    }
  }

  // Shell/Bash detection
  if (
    code.includes('#!/bin/bash') ||
    code.includes('npm ') ||
    code.includes('yarn ') ||
    code.includes('curl ') ||
    code.startsWith('$ ')
  ) {
    return 'bash';
  }

  // XML detection
  if (code.trim().startsWith('<') && code.includes('</')) {
    return 'xml';
  }

  // SQL detection
  if (
    code.toUpperCase().includes('SELECT ') ||
    code.toUpperCase().includes('INSERT ') ||
    code.toUpperCase().includes('UPDATE ') ||
    code.toUpperCase().includes('DELETE ')
  ) {
    return 'sql';
  }

  return 'text';
}

/**
 * Get language display name
 */
export function getLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    python: 'Python',
    bash: 'Shell',
    json: 'JSON',
    xml: 'XML',
    sql: 'SQL',
    html: 'HTML',
    css: 'CSS',
    yaml: 'YAML',
    markdown: 'Markdown',
    text: 'Text',
  };

  return labels[language.toLowerCase()] || language.toUpperCase();
}

/**
 * Format code with proper indentation
 */
export function formatCode(code: string): string {
  return code.trim();
}
