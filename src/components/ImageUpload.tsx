
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImageUrl?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImageUrl, disabled = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('raffle-images')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('raffle-images')
        .getPublicUrl(data.path);

      const imageUrl = publicUrlData.publicUrl;
      setPreviewUrl(imageUrl);
      onImageUpload(imageUrl);

      toast({
        title: "Image uploaded successfully!",
        description: "Your raffle image has been uploaded.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlInput = (url: string) => {
    setPreviewUrl(url);
    onImageUpload(url);
  };

  const clearImage = () => {
    setPreviewUrl('');
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold flex items-center">
        <span className="mr-2 text-xl">📸</span>
        Raffle Image
      </Label>
      
      {/* Image Preview */}
      {previewUrl && (
        <div className="relative inline-block">
          <img 
            src={previewUrl} 
            alt="Raffle preview" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-purple-200"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={clearImage}
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File Upload */}
        <div>
          <Label className="text-sm font-medium text-gray-600 mb-2 block">Upload Image</Label>
          <div className="relative">
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              disabled={disabled || isUploading}
              className="hidden"
              id="image-upload"
            />
            <Label
              htmlFor="image-upload"
              className={`
                flex items-center justify-center gap-2 h-12 px-4 border-2 border-dashed border-purple-300 
                rounded-lg cursor-pointer hover:border-purple-500 transition-colors
                ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </>
              )}
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP, GIF (max 5MB)</p>
        </div>

        {/* URL Input */}
        <div>
          <Label className="text-sm font-medium text-gray-600 mb-2 block">Or Enter Image URL</Label>
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={previewUrl}
            onChange={(e) => handleUrlInput(e.target.value)}
            disabled={disabled}
            className="h-12 border-2 border-purple-200 focus:border-purple-500 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
