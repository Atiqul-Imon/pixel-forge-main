'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Strikethrough,
  Minus,
  Table
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

interface ToolbarButton {
  icon: any;
  command?: string;
  value?: string;
  onClick?: () => void;
  title: string;
  shortcut?: string;
  group?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = "Start writing...", className = "" }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
      addToHistory(content);
    }
  }, [content]);

  // Add to history for undo/redo
  const addToHistory = useCallback((newContent: string) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Clean and sanitize content
  const cleanContent = useCallback((html: string) => {
    // Remove problematic styles that cause wrapping issues, but preserve heading styles
    let cleaned = html
      .replace(/class="[^"]*"/g, '') // Remove classes
      .replace(/<br\s*\/?>/gi, '\n') // Convert br tags to newlines
      .replace(/<div[^>]*>/gi, '<p>') // Convert divs to paragraphs
      .replace(/<\/div>/gi, '</p>')
      .replace(/<p><\/p>/gi, '') // Remove empty paragraphs
      .replace(/<p>\s*<\/p>/gi, '') // Remove whitespace-only paragraphs
      .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
      .trim();

    // Preserve heading styles but clean other problematic styles
    cleaned = cleaned.replace(/style="([^"]*)"/g, (match, styles) => {
      // Keep heading-related styles
      if (styles.includes('font-size') || styles.includes('font-weight') || styles.includes('margin') || styles.includes('line-height')) {
        return match; // Keep the style
      }
      // Remove other styles that might cause issues
      return '';
    });

    // Ensure proper paragraph structure
    if (cleaned && !cleaned.startsWith('<')) {
      cleaned = `<p>${cleaned}</p>`;
    }

    return cleaned;
  }, []);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = cleanContent(editorRef.current.innerHTML);
      onChange(newContent);
      addToHistory(newContent);
      updateActiveFormats();
    }
  }, [onChange, addToHistory, cleanContent]);

  // Handle paste events
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData('text/plain');
    
    if (pastedText) {
      // Clean the pasted text and insert as plain text
      const cleanText = pastedText
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      
      // Insert the clean text
      document.execCommand('insertText', false, cleanText);
      handleContentChange();
    }
  }, [handleContentChange]);

  // Update active formats based on current selection
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const formats = new Set<string>();
    
    // Check for bold, italic, underline
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
    
    // Check for heading formats
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    
    while (element && element !== editorRef.current) {
      const tagName = element.tagName?.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
        formats.add(tagName);
        break;
      }
      element = element.parentElement;
    }
    
    setActiveFormats(formats);
  }, []);

  // Modern command execution
  const execCommand = useCallback((command: string, value?: string) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    // Handle commands using modern approach
    switch (command) {
      case 'bold':
        document.execCommand('bold', false);
        break;
      case 'italic':
        document.execCommand('italic', false);
        break;
      case 'underline':
        document.execCommand('underline', false);
        break;
      case 'strikeThrough':
        document.execCommand('strikeThrough', false);
        break;
      case 'formatBlock':
        if (value) {
          document.execCommand('formatBlock', false, value);
        }
        break;
      case 'insertUnorderedList':
        document.execCommand('insertUnorderedList', false);
        break;
      case 'insertOrderedList':
        document.execCommand('insertOrderedList', false);
        break;
      case 'justifyLeft':
        document.execCommand('justifyLeft', false);
        break;
      case 'justifyCenter':
        document.execCommand('justifyCenter', false);
        break;
      case 'justifyRight':
        document.execCommand('justifyRight', false);
        break;
      case 'createLink':
        if (value) {
          document.execCommand('createLink', false, value);
        }
        break;
      case 'insertImage':
        if (value) {
          document.execCommand('insertImage', false, value);
        }
        break;
      case 'insertTable':
        insertTable();
        break;
      default:
        document.execCommand(command, false, value);
    }
    
    handleContentChange();
  }, [handleContentChange]);

  // Insert table
  const insertTable = () => {
    const table = `
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Header 1</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Header 2</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 4</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 5</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `;
    
    document.execCommand('insertHTML', false, table);
    handleContentChange();
  };

  // Robust heading handler with proper style preservation
  const insertHeading = (level: 'h1' | 'h2' | 'h3') => {
    if (!editorRef.current) return;
    
    // Focus the editor
    editorRef.current.focus();
    
    // Get current selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      // No selection, create heading at end of content
      const headingHTML = `<${level} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : '1.25rem'};">Heading</${level}>`;
      document.execCommand('insertHTML', false, headingHTML);
      handleContentChange();
      return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    
    if (selectedText) {
      // Replace selected text with heading
      const headingHTML = `<${level} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : '1.25rem'};">${selectedText}</${level}>`;
      range.deleteContents();
      document.execCommand('insertHTML', false, headingHTML);
    } else {
      // No text selected, create empty heading
      const headingHTML = `<${level} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : '1.25rem'};">&nbsp;</${level}>`;
      document.execCommand('insertHTML', false, headingHTML);
    }
    
    handleContentChange();
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const img = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; margin: 16px 0;" />`;
      document.execCommand('insertHTML', false, img);
      handleContentChange();
    }
  };

  // Insert horizontal rule
  const insertHorizontalRule = () => {
    document.execCommand('insertHorizontalRule', false);
    handleContentChange();
  };

  // Undo/Redo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
        onChange(history[newIndex]);
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
        onChange(history[newIndex]);
      }
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case 'y':
          e.preventDefault();
          redo();
          break;
        case 'k':
          e.preventDefault();
          insertLink();
          break;
      }
    }
  };

  // Toolbar buttons configuration
  const toolbarButtons: ToolbarButton[] = [
    // Text formatting
    { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)', shortcut: 'Ctrl+B', group: 'format' },
    { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)', shortcut: 'Ctrl+I', group: 'format' },
    { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)', shortcut: 'Ctrl+U', group: 'format' },
    { icon: Strikethrough, command: 'strikeThrough', title: 'Strikethrough', group: 'format' },
    
    // Headings - using dedicated handlers
    { icon: Heading1, onClick: () => insertHeading('h1'), title: 'Heading 1', group: 'heading' },
    { icon: Heading2, onClick: () => insertHeading('h2'), title: 'Heading 2', group: 'heading' },
    { icon: Heading3, onClick: () => insertHeading('h3'), title: 'Heading 3', group: 'heading' },
    { icon: Type, command: 'formatBlock', value: 'p', title: 'Paragraph', group: 'heading' },
    
    // Lists
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List', group: 'list' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List', group: 'list' },
    
    // Alignment
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left', group: 'align' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center', group: 'align' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right', group: 'align' },
    
    // Special elements
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote', group: 'special' },
    { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block', group: 'special' },
    { icon: Minus, onClick: insertHorizontalRule, title: 'Horizontal Rule', group: 'special' },
    { icon: Table, onClick: insertTable, title: 'Insert Table', group: 'special' },
    
    // Media
    { icon: Link, onClick: insertLink, title: 'Insert Link (Ctrl+K)', shortcut: 'Ctrl+K', group: 'media' },
    { icon: ImageIcon, onClick: insertImage, title: 'Insert Image', group: 'media' },
    
    // History
    { icon: Undo, onClick: undo, title: 'Undo (Ctrl+Z)', shortcut: 'Ctrl+Z', group: 'history' },
    { icon: Redo, onClick: redo, title: 'Redo (Ctrl+Y)', shortcut: 'Ctrl+Y', group: 'history' },
  ];

  // Group buttons by category
  const groupedButtons = toolbarButtons.reduce((groups, button) => {
    const group = button.group || 'other';
    if (!groups[group]) groups[group] = [];
    groups[group].push(button);
    return groups;
  }, {} as Record<string, ToolbarButton[]>);

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
        {Object.entries(groupedButtons).map(([groupName, buttons]) => (
          <div key={groupName} className="flex items-center gap-1">
            {buttons.map((button, index) => (
              <button
                key={`${groupName}-${index}`}
                onClick={() => button.onClick ? button.onClick() : execCommand(button.command!, button.value)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors duration-200 ${
                  activeFormats.has(button.command || '') || 
                  activeFormats.has(button.value || '') ||
                  (button.command === 'formatBlock' && button.value && activeFormats.has(button.value))
                    ? 'bg-blue-100 text-blue-600' 
                    : ''
                }`}
                title={button.title}
                type="button"
              >
                <button.icon className="w-4 h-4" />
              </button>
            ))}
            {groupName !== 'history' && <div className="w-px h-6 bg-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        className={`min-h-[400px] p-4 focus:outline-none ${
          isFocused ? 'ring-2 ring-blue-500' : ''
        }`}
        style={{ 
          minHeight: '400px',
          lineHeight: '1.6',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Placeholder */}
      {!content && (
        <div className="absolute top-16 left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          margin: 1.5rem 0 1rem 0 !important;
          line-height: 1.2 !important;
          display: block !important;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
          line-height: 1.3 !important;
          display: block !important;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          margin: 1rem 0 0.5rem 0 !important;
          line-height: 1.4 !important;
          display: block !important;
        }
        
        [contenteditable] p {
          margin: 0.75rem 0 !important;
          display: block !important;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.75rem 0 !important;
          padding-left: 1.5rem !important;
          display: block !important;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0 !important;
          display: list-item !important;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb !important;
          padding-left: 1rem !important;
          margin: 1rem 0 !important;
          font-style: italic !important;
          color: #6b7280 !important;
          display: block !important;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6 !important;
          padding: 1rem !important;
          border-radius: 0.375rem !important;
          overflow-x: auto !important;
          margin: 1rem 0 !important;
          display: block !important;
        }
        
        [contenteditable] code {
          background-color: #f3f4f6 !important;
          padding: 0.125rem 0.25rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875rem !important;
        }
        
        [contenteditable] table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1rem 0 !important;
          display: table !important;
        }
        
        [contenteditable] th, [contenteditable] td {
          border: 1px solid #d1d5db !important;
          padding: 0.5rem !important;
          text-align: left !important;
        }
        
        [contenteditable] th {
          background-color: #f9fafb !important;
          font-weight: 600 !important;
        }
        
        [contenteditable] img {
          max-width: 100% !important;
          height: auto !important;
          margin: 1rem 0 !important;
          border-radius: 0.375rem !important;
          display: block !important;
        }
        
        [contenteditable] a {
          color: #2563eb !important;
          text-decoration: underline !important;
        }
        
        [contenteditable] a:hover {
          color: #1d4ed8 !important;
        }
        
        [contenteditable] strong, [contenteditable] b {
          font-weight: 700 !important;
        }
        
        [contenteditable] em, [contenteditable] i {
          font-style: italic !important;
        }
        
        [contenteditable] u {
          text-decoration: underline !important;
        }
        
        [contenteditable] s, [contenteditable] strike {
          text-decoration: line-through !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
