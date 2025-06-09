
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRecommendedSize = () => {
    return type === 'favicon' ? '32x32 or 16x16' : '1200x630';
  };

  const validateFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file (PNG, JPG, WEBP, ICO)';
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
    setSuccess(false);
    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      console.log(`Uploading SEO image to bucket: seo-images, path: ${fileName}`);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('seo-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('SEO image upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('seo-images')
        .getPublicUrl(fileName);

      console.log(`SEO image uploaded successfully: ${publicUrl}`);
      onChange(publicUrl);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('SEO image upload failed:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    onChange('');
    setError(null);
    setSuccess(false);
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
        Recommended size: {getRecommendedSize()}px • PNG, JPG, WEBP, or ICO • Max 5MB
      </p>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">Image uploaded successfully!</span>
        </div>
      )}

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
