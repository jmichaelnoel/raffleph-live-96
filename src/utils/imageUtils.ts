
import { supabase } from '@/integrations/supabase/client';

export interface ImageUploadResult {
  url: string;
  path: string;
}

export const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          resolve(file);
        }
      }, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const uploadImage = async (
  file: File, 
  bucket: 'raffle-images' | 'prize-images',
  folder?: string
): Promise<ImageUploadResult> => {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('File size must be less than 5MB');
    }

    // Compress image if it's too large
    const compressedFile = file.size > 1024 * 1024 ? await compressImage(file) : file;

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    console.log(`Uploading image to bucket: ${bucket}, path: ${filePath}`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, compressedFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Image upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log(`Image uploaded successfully: ${publicUrl}`);

    return {
      url: publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};

export const uploadMultipleImages = async (
  files: FileList,
  bucket: 'raffle-images' | 'prize-images',
  folder?: string
): Promise<ImageUploadResult[]> => {
  if (!files || files.length === 0) {
    return [];
  }

  console.log(`Uploading ${files.length} images to ${bucket}`);

  const uploads = Array.from(files).map(async (file, index) => {
    try {
      const result = await uploadImage(file, bucket, folder);
      console.log(`Image ${index + 1} uploaded successfully`);
      return result;
    } catch (error) {
      console.error(`Image ${index + 1} upload failed:`, error);
      // Don't throw, just return null so other images can still upload
      return null;
    }
  });

  const results = await Promise.allSettled(uploads);
  const successfulUploads = results
    .filter((result): result is PromiseFulfilledResult<ImageUploadResult> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value);

  console.log(`Successfully uploaded ${successfulUploads.length} out of ${files.length} images`);
  
  return successfulUploads;
};
