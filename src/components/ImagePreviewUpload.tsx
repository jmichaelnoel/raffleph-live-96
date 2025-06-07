
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X, Upload, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePreviewUploadProps {
  onFileUpload: (files: FileList) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

interface PreviewFile extends File {
  preview: string;
}

const ImagePreviewUpload: React.FC<ImagePreviewUploadProps> = ({
  onFileUpload,
  maxFiles = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className
}) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [previewModal, setPreviewModal] = useState<string | null>(null);

  const createFileList = useCallback((filesArray: PreviewFile[]): FileList => {
    const fileList = {
      length: filesArray.length,
      item: (index: number) => filesArray[index] || null,
      [Symbol.iterator]: function* () {
        for (let i = 0; i < this.length; i++) {
          yield this.item(i);
        }
      }
    } as FileList;
    return fileList;
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles).map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    
    setFiles(prev => {
      const combined = [...prev, ...newFiles].slice(0, maxFiles);
      return combined;
    });
  }, [maxFiles]);

  // Separate useEffect to handle onFileUpload callback
  useEffect(() => {
    const fileList = createFileList(files);
    onFileUpload(fileList);
  }, [files, onFileUpload, createFileList]);

  const removeFile = useCallback((indexToRemove: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      // Revoke the object URL to free memory
      if (prev[indexToRemove]) {
        URL.revokeObjectURL(prev[indexToRemove].preview);
      }
      return newFiles;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    multiple: maxFiles > 1
  });

  // Clean up previews on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragActive 
            ? "border-purple-400 bg-purple-50" 
            : "border-gray-300 hover:border-purple-300 hover:bg-purple-50/50",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} disabled={files.length >= maxFiles} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? "Drop images here..." : "Click or drag images to upload"}
        </div>
        <div className="text-sm text-gray-500">
          {acceptedTypes.join(', ')} • Max {maxFiles} files • Up to 5MB each
        </div>
        {files.length > 0 && (
          <div className="text-sm text-purple-600 mt-2">
            {files.length} of {maxFiles} files selected
          </div>
        )}
      </div>

      {/* Image Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewModal(file.preview)}
                  className="bg-white/90 hover:bg-white text-gray-800"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFile(index)}
                  className="bg-red-500/90 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* File info */}
              <div className="mt-1 text-xs text-gray-600 truncate">
                {file.name}
              </div>
              <div className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewModal(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewModal}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setPreviewModal(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreviewUpload;
