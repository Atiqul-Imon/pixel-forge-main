'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  value = [],
  onChange,
  label,
  error,
  required = false,
  className,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`;
    }
    if (accept && !accept.split(',').some(type => {
      const pattern = type.trim().replace('*', '.*');
      return new RegExp(pattern).test(file.type) || file.name.endsWith(type.trim());
    })) {
      return `File "${file.name}" is not an accepted file type`;
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }

    const newFiles = multiple
      ? [...value, ...validFiles].slice(0, maxFiles)
      : validFiles.slice(0, 1);

    onChange?.(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange?.(newFiles);
    setErrors([]);
  };

  const isImage = (file: File) => file.type.startsWith('image/');

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400',
          error && 'border-error-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop files here, or{' '}
          <button
            type="button"
            onClick={() => !disabled && fileInputRef.current?.click()}
            className="text-primary-600 hover:text-primary-700 font-medium"
            disabled={disabled}
          >
            browse
          </button>
        </p>
        <p className="text-xs text-gray-500">
          Max {formatFileSize(maxSize)} per file
          {multiple && ` • Up to ${maxFiles} files`}
        </p>
      </div>

      {/* File List */}
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-shrink-0">
                {isImage(file) ? (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <File className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-error-600 transition-colors"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Errors */}
      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
      {errors.length > 0 && (
        <div className="mt-1.5 space-y-1">
          {errors.map((err, index) => (
            <p key={index} className="text-sm text-error-600">{err}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

