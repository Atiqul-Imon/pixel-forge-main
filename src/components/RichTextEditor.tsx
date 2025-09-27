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

  // Smart formatting for plain text to detect headings, lists, etc.
  const smartFormatPlainText = useCallback((text: string) => {
    const lines = text.split('\n');
    const formattedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        formattedLines.push('<br>');
        continue;
      }
      
      // Detect headings based on patterns
      if (line.match(/^#{1,6}\s+/)) {
        // Markdown-style headings: # ## ###
        const level = line.match(/^#+/)?.[0].length || 1;
        const headingText = line.replace(/^#+\s+/, '');
        const headingLevel = Math.min(level, 6);
        formattedLines.push(`<h${headingLevel} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${headingLevel === 1 ? '2rem' : headingLevel === 2 ? '1.5rem' : headingLevel === 3 ? '1.25rem' : '1.1rem'};">${headingText}</h${headingLevel}>`);
      } else if (line.match(/^[A-Z][A-Z\s]{10,}$/)) {
        // ALL CAPS lines (likely headings)
        formattedLines.push(`<h2 style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: 1.5rem;">${line}</h2>`);
      } else if (line.match(/^[A-Z][a-z\s]{5,}[A-Z]/)) {
        // Title Case lines (likely headings)
        formattedLines.push(`<h3 style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: 1.25rem;">${line}</h3>`);
      } else if (line.match(/^[-*•]\s+/)) {
        // Bullet points: - * •
        const bulletText = line.replace(/^[-*•]\s+/, '');
        formattedLines.push(`<ul style="margin: 0.5rem 0; padding-left: 1.5rem;"><li style="margin: 0.25rem 0;">${bulletText}</li></ul>`);
      } else if (line.match(/^\d+\.\s+/)) {
        // Numbered lists: 1. 2. 3.
        const listText = line.replace(/^\d+\.\s+/, '');
        formattedLines.push(`<ol style="margin: 0.5rem 0; padding-left: 1.5rem;"><li style="margin: 0.25rem 0;">${listText}</li></ol>`);
      } else if (line.match(/^>\s+/)) {
        // Blockquotes: > text
        const quoteText = line.replace(/^>\s+/, '');
        formattedLines.push(`<blockquote style="border-left: 4px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;">${quoteText}</blockquote>`);
      } else {
        // Regular paragraph
        formattedLines.push(`<p style="margin: 0.75rem 0;">${line}</p>`);
      }
    }
    
    return formattedLines.join('');
  }, []);

  // Clean and sanitize pasted HTML while preserving all formatting
  const cleanPastedHTML = useCallback((html: string) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove unwanted elements but preserve formatting
    const unwantedElements = tempDiv.querySelectorAll('script, style, meta, link, title');
    unwantedElements.forEach(el => el.remove());
    
    // Clean up the HTML while preserving formatting
    let cleaned = tempDiv.innerHTML
      .replace(/class="[^"]*"/g, '') // Remove classes
      .replace(/<br\s*\/?>/gi, '<br>') // Normalize br tags
      .replace(/<div[^>]*>/gi, '<div>') // Remove div attributes but keep divs
      .replace(/<p><\/p>/gi, '') // Remove empty paragraphs
      .replace(/<p>\s*<\/p>/gi, '') // Remove whitespace-only paragraphs
      .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
      .trim();

    // Preserve all styles for headings and formatting
    cleaned = cleaned.replace(/style="([^"]*)"/g, (match, styles) => {
      // Keep all styles that are useful for formatting
      const usefulStyles = [
        'font-size', 'font-weight', 'font-style', 'font-family',
        'color', 'background-color', 'text-align', 'text-decoration',
        'margin', 'padding', 'line-height', 'letter-spacing',
        'border', 'border-radius', 'display', 'position'
      ];
      
      // Check if any useful styles are present
      const hasUsefulStyles = usefulStyles.some(style => styles.includes(style));
      
      if (hasUsefulStyles) {
        return match; // Keep the style
      }
      return ''; // Remove other styles
    });

    return cleaned;
  }, []);

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

  // Handle paste events with full HTML preservation and smart formatting
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const clipboardData = e.clipboardData;
    
    // Try to get HTML content first (preserves formatting)
    let pastedContent = clipboardData.getData('text/html');
    
    // Debug: Log what we're getting from clipboard
    console.log('HTML content:', pastedContent);
    console.log('Plain text:', clipboardData.getData('text/plain'));
    
    if (pastedContent && pastedContent.trim() && pastedContent !== clipboardData.getData('text/plain')) {
      // Clean and preserve the HTML content
      const cleanHTML = cleanPastedHTML(pastedContent);
      console.log('Cleaned HTML:', cleanHTML);
      document.execCommand('insertHTML', false, cleanHTML);
    } else {
      // Fallback to plain text with smart formatting
      const pastedText = clipboardData.getData('text/plain');
      if (pastedText) {
        const formattedText = smartFormatPlainText(pastedText);
        console.log('Formatted text:', formattedText);
        document.execCommand('insertHTML', false, formattedText);
      }
    }
    
    handleContentChange();
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
    
    // Check for heading formats - improved detection
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    
    // First, check if we're directly in a heading
    if (element && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element.tagName?.toLowerCase())) {
      formats.add(element.tagName.toLowerCase());
    } else {
      // Walk up the DOM tree to find heading
      while (element && element !== editorRef.current) {
        const tagName = element.tagName?.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
          formats.add(tagName);
          break;
        }
        element = element.parentElement;
      }
    }
    
    // Check for other block formats
    if (document.queryCommandState('formatBlock')) {
      const currentBlock = document.queryCommandValue('formatBlock');
      if (currentBlock && currentBlock !== 'div') {
        formats.add(currentBlock.toLowerCase());
      }
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

  // Robust heading handler with toggle functionality
  const toggleHeading = (level: 'h1' | 'h2' | 'h3') => {
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
    const container = range.commonAncestorContainer;
    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    
    // Find the current heading element
    let currentHeading: Element | null = null;
    while (element && element !== editorRef.current) {
      const tagName = element.tagName?.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
        currentHeading = element;
        break;
      }
      element = element.parentElement;
    }
    
    // If we're in a heading, check if it's the same level
    if (currentHeading) {
      const currentLevel = currentHeading.tagName.toLowerCase();
      
      // If it's the same level, convert to paragraph
      if (currentLevel === level) {
        const text = currentHeading.textContent || '';
        const paragraphHTML = `<p style="margin: 0.75rem 0;">${text}</p>`;
        
        // Replace the heading with a paragraph
        const newElement = document.createElement('div');
        newElement.innerHTML = paragraphHTML;
        const paragraph = newElement.firstElementChild;
        
        if (paragraph && currentHeading.parentNode) {
          currentHeading.parentNode.replaceChild(paragraph, currentHeading);
          
          // Set cursor position in the new paragraph
          const newRange = document.createRange();
          newRange.setStart(paragraph, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
        
        handleContentChange();
        return;
      }
    }
    
    // If we're not in a heading or it's a different level, create/change to the specified heading
    const selectedText = range.toString().trim();
    
    if (selectedText) {
      // Replace selected text with heading
      const headingHTML = `<${level} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : '1.25rem'};">${selectedText}</${level}>`;
      range.deleteContents();
      document.execCommand('insertHTML', false, headingHTML);
    } else if (currentHeading) {
      // We're in a different heading, change it to the new level
      const text = currentHeading.textContent || '';
      const newHeadingHTML = `<${level} style="font-weight: bold; margin: 1rem 0 0.5rem 0; line-height: 1.2; display: block; font-size: ${level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : '1.25rem'};">${text}</${level}>`;
      
      const newElement = document.createElement('div');
      newElement.innerHTML = newHeadingHTML;
      const newHeading = newElement.firstElementChild;
      
      if (newHeading && currentHeading.parentNode) {
        currentHeading.parentNode.replaceChild(newHeading, currentHeading);
        
        // Set cursor position in the new heading
        const newRange = document.createRange();
        newRange.setStart(newHeading, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      // No text selected and not in a heading, create empty heading
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

  // Keyboard shortcuts and Enter key handling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key for proper paragraph creation
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
        
        // Check if we're in a heading, list item, or blockquote
        while (element && element !== editorRef.current) {
          const tagName = element.tagName?.toLowerCase();
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(tagName)) {
            // Insert a new paragraph after the current element
            const newParagraph = document.createElement('p');
            newParagraph.innerHTML = '<br>';
            newParagraph.style.margin = '0.75rem 0';
            
            if (element.nextSibling) {
              element.parentNode?.insertBefore(newParagraph, element.nextSibling);
            } else {
              element.parentNode?.appendChild(newParagraph);
            }
            
            // Move cursor to the new paragraph
            const newRange = document.createRange();
            newRange.setStart(newParagraph, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            handleContentChange();
            return;
          }
          element = element.parentElement;
        }
        
        // Default behavior: insert paragraph break
        document.execCommand('insertHTML', false, '<p><br></p>');
        handleContentChange();
        return;
      }
    }
    
    // Handle other keyboard shortcuts
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
    
    // Headings - using dedicated handlers with toggle functionality
    { icon: Heading1, onClick: () => toggleHeading('h1'), title: 'Heading 1 (Toggle)', group: 'heading' },
    { icon: Heading2, onClick: () => toggleHeading('h2'), title: 'Heading 2 (Toggle)', group: 'heading' },
    { icon: Heading3, onClick: () => toggleHeading('h3'), title: 'Heading 3 (Toggle)', group: 'heading' },
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
                  (button.command === 'formatBlock' && button.value && activeFormats.has(button.value)) ||
                  // Check for heading buttons
                  (button.onClick && button.title.includes('Heading 1') && activeFormats.has('h1')) ||
                  (button.onClick && button.title.includes('Heading 2') && activeFormats.has('h2')) ||
                  (button.onClick && button.title.includes('Heading 3') && activeFormats.has('h3'))
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
