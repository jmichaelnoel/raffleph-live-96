
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SEOImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'favicon' | 'social';
  description: string;
}

const SEOImageUpload: React.FC<SEOImageUploadProps> = ({
  label,
  value,
  onChange,
  type,
  description
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRecommendedSize = () => {
    return type === 'favicon' ? '32x32 or 16x16' : '1200x630';
  };

  const validateFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file (PNG, JPG, WEBP)';
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to Lovable's file system
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const uploadedUrl = `/lovable-uploads/${result.filename}`;
        onChange(uploadedUrl);
      } else {
        // Fallback: create a local URL for preview (development mode)
        const localUrl = URL.createObjectURL(file);
        onChange(localUrl);
        console.log('Using local URL for development:', localUrl);
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback: create a local URL for preview
      const localUrl = URL.createObjectURL(file);
      onChange(localUrl);
      setError('Upload failed, using local preview');
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div>
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()} URL or upload below`}
          className="border-2 border-purple-200 focus:border-purple-400 rounded-xl"
        />
      </div>

      {/* Upload Section */}
      <div className="flex gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={clearImage}
            className="border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        Recommended size: {getRecommendedSize()}px • PNG, JPG, or WEBP • Max 5MB
      </p>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Image Preview */}
      {value && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Preview:</p>
          <div className={cn(
            "border border-gray-200 rounded-lg overflow-hidden bg-gray-50",
            type === 'favicon' ? "w-16 h-16" : "w-32 h-16"
          )}>
            <img
              src={value}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
                setError('Failed to load image');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOImageUpload;
