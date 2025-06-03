
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  onImageUpload: (urls: string[]) => void;
  currentImageUrls?: string[];
  disabled?: boolean;
  label?: string;
  allowMultiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImageUrls = [], 
  disabled = false,
  label = "Images",
  allowMultiple = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(currentImageUrls);
  const [newUrlInput, setNewUrlInput] = useState('');
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of Array.from(files)) {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name}: Please upload a JPEG, PNG, WebP, or GIF image.`,
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name}: Please upload an image smaller than 5MB.`,
          variant: "destructive"
        });
        return;
      }
    }

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
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

        return publicUrlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      const newImageUrls = allowMultiple ? [...imageUrls, ...uploadedUrls] : uploadedUrls;
      setImageUrls(newImageUrls);
      onImageUpload(newImageUrls);

      toast({
        title: "Images uploaded successfully!",
        description: `${uploadedUrls.length} image(s) have been uploaded.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image(s). Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlAdd = () => {
    if (!newUrlInput.trim()) return;
    
    const newImageUrls = allowMultiple ? [...imageUrls, newUrlInput.trim()] : [newUrlInput.trim()];
    setImageUrls(newImageUrls);
    onImageUpload(newImageUrls);
    setNewUrlInput('');
  };

  const removeImage = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
    onImageUpload(newImageUrls);
  };

  const clearAllImages = () => {
    setImageUrls([]);
    onImageUpload([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold flex items-center">
          <span className="mr-2 text-xl">📸</span>
          {label}
        </Label>
        {imageUrls.length > 0 && allowMultiple && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAllImages}
            disabled={disabled}
          >
            Clear All
          </Button>
        )}
      </div>
      
      {/* Image Previews */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg border-2 border-purple-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File Upload */}
        <div>
          <Label className="text-sm font-medium text-gray-600 mb-2 block">
            {allowMultiple ? 'Upload Images' : 'Upload Image'}
          </Label>
          <div className="relative">
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              disabled={disabled || isUploading}
              className="hidden"
              id="image-upload"
              multiple={allowMultiple}
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
                  <span>Choose {allowMultiple ? 'Files' : 'File'}</span>
                </>
              )}
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            JPEG, PNG, WebP, GIF (max 5MB each)
            {allowMultiple && ' - Select multiple files at once'}
          </p>
        </div>

        {/* URL Input */}
        <div>
          <Label className="text-sm font-medium text-gray-600 mb-2 block">
            Or Enter Image URL
          </Label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              disabled={disabled}
              className="h-12 border-2 border-purple-200 focus:border-purple-500 rounded-lg"
            />
            <Button
              type="button"
              onClick={handleUrlAdd}
              disabled={disabled || !newUrlInput.trim()}
              className="h-12 px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
