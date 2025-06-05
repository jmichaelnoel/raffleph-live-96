
import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Image, AlertCircle, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EnhancedFileUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
}

const EnhancedFileUpload: React.FC<EnhancedFileUploadProps> = ({
  onFileUpload,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/*'],
  className = ""
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const errors: string[] = [];
    
    // Check file size
    if (file.size > maxSize) {
      errors.push(`${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`);
    }
    
    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type === 'image/*') {
        return file.type.startsWith('image/');
      }
      return file.type === type;
    });
    
    if (!isValidType) {
      errors.push(`${file.name} is not a supported file type.`);
    }
    
    return errors;
  };

  const processFiles = (fileList: FileList) => {
    setErrors([]);
    const files = Array.from(fileList);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    files.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      } else {
        validFiles.push(file);
      }
    });

    // Check total file count
    const totalFiles = uploadedFiles.length + validFiles.length;
    if (totalFiles > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed. Please remove some files first.`);
      return;
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    // Simulate upload progress for valid files
    validFiles.forEach(file => {
      const fileName = file.name;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        
        setUploadProgress(prev => ({
          ...prev,
          [fileName]: progress
        }));
      }, 100);
    });

    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  }, [uploadedFiles, maxFiles, maxSize]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileName: string) => {
    const newFiles = uploadedFiles.filter(file => file.name !== fileName);
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
    
    setUploadProgress(prev => {
      const { [fileName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragOver 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
          }
        `}
      >
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
            isDragOver ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <Upload className={`h-8 w-8 ${
              isDragOver ? 'text-purple-600' : 'text-gray-600'
            }`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-800">
              {isDragOver 
                ? 'Drop your images here'
                : 'Drag & drop your images here'
              }
            </p>
            <p className="text-sm text-gray-600 mt-1">
              or click to select files (max {maxFiles} files, {formatFileSize(maxSize)} each)
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {acceptedTypes.map(type => (
              <span key={type} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-medium text-gray-800">Uploaded Files ({uploadedFiles.length}/{maxFiles})</h3>
          
          {uploadedFiles.map((file) => {
            const progress = uploadProgress[file.name] || 0;
            const isComplete = progress >= 100;
            
            return (
              <div key={file.name} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {file.type.startsWith('image/') ? (
                    <Image className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      {isComplete && <Check className="h-4 w-4 text-green-600" />}
                      <button
                        onClick={() => removeFile(file.name)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">{formatFileSize(file.size)}</p>
                  
                  {!isComplete && (
                    <Progress value={progress} className="h-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnhancedFileUpload;
