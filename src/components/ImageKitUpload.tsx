'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageKitUploadProps {
  onUpload: (url: string) => void;
  onRemove?: () => void;
  currentImage?: string;
  className?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  disabled?: boolean;
}

interface UploadError {
  message: string;
  code?: string;
  details?: any;
}

const ImageKitUpload = ({ 
  onUpload, 
  onRemove, 
  currentImage, 
  className = "",
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  disabled = false
}: ImageKitUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<UploadError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed types: ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}` 
      };
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return { 
        valid: false, 
        error: `File size must be less than ${maxSizeMB}MB` 
      };
    }

    // Check minimum file size (1KB)
    if (file.size < 1024) {
      return { 
        valid: false, 
        error: 'File size must be at least 1KB' 
      };
    }

    return { valid: true };
  }, [allowedTypes, maxSize]);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous errors
    setError(null);

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setError({ message: validation.error! });
      return;
    }

    // Cancel any ongoing upload
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setIsUploading(true);
    setUploadProgress(0);
    setRetryCount(0);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to our public API endpoint with timeout
      const uploadResponse = await fetch('/api/upload/imagekit', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        
        // Handle specific error codes
        if (uploadResponse.status === 429) {
          setError({ 
            message: 'Too many uploads. Please wait a moment and try again.',
            code: 'RATE_LIMITED'
          });
          return;
        }

        if (uploadResponse.status === 408) {
          setError({ 
            message: 'Upload timeout. Please try again.',
            code: 'TIMEOUT'
          });
          return;
        }

        throw new Error(errorData.error || `Upload failed with status ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();

      // Validate response
      if (!uploadData.url) {
        throw new Error('Invalid response from server');
      }

      // Simulate realistic progress
      const progressSteps = [10, 25, 50, 75, 90, 100];
      for (let i = 0; i < progressSteps.length; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Upload cancelled');
        }
        
        setUploadProgress(progressSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      }

      // Success
      onUpload(uploadData.url);
      setError(null);
      setRetryCount(0);

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setError({ message: 'Upload cancelled', code: 'CANCELLED' });
      } else {
        console.error('Upload error:', error);
        setError({ 
          message: error instanceof Error ? error.message : 'Upload failed. Please try again.',
          code: 'UPLOAD_FAILED'
        });
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      abortControllerRef.current = null;
    }
  }, [validateFile, onUpload]);

  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setError(null);
      fileInputRef.current?.click();
    }
  }, [retryCount]);

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove();
    }
    setError(null);
  }, [onRemove]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Display */}
      {currentImage && (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Current image"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            type="button"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-800 font-medium">{error.message}</p>
              {error.code && (
                <p className="text-xs text-red-600 mt-1">Error code: {error.code}</p>
              )}
              {retryCount < 3 && error.code !== 'CANCELLED' && (
                <button
                  onClick={handleRetry}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  type="button"
                >
                  Try again ({3 - retryCount} attempts left)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
        error 
          ? 'border-red-300 bg-red-50' 
          : isUploading 
            ? 'border-blue-300 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading || disabled}
        />

        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Uploading image...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{uploadProgress}%</span>
                <button
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-800 underline"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                {currentImage ? 'Replace Image' : 'Upload Image'}
              </p>
              <p className="text-sm text-gray-500">
                Click to select an image or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={disabled}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </button>
          </div>
        )}
      </div>

      {/* ImageKit Info */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center mb-1">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
          <p className="font-medium">Powered by ImageKit</p>
        </div>
        <p>Images are automatically optimized and delivered via global CDN</p>
        <p className="mt-1">Features: Auto-format, compression, responsive delivery</p>
      </div>
    </div>
  );
};

export default ImageKitUpload;
