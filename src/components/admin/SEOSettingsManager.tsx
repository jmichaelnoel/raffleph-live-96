import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSEOSettings } from '@/hooks/useSEOSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Settings, Globe, Share2, Palette, Eye, RefreshCw, TestTube } from 'lucide-react';
import SEOImageUpload from './SEOImageUpload';

interface SEOSettingField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'url';
  description: string;
  category: 'basic' | 'social' | 'appearance';
}

const seoFields: SEOSettingField[] = [
  {
    key: 'site_title',
    label: 'Site Title',
    type: 'text',
    description: 'Main title for your website (max 60 characters)',
    category: 'basic'
  },
  {
    key: 'site_description',
    label: 'Site Description',
    type: 'textarea',
    description: 'Meta description for your website (max 160 characters)',
    category: 'basic'
  },
  {
    key: 'og_site_name',
    label: 'Site Name (Open Graph)',
    type: 'text',
    description: 'Site name for social media sharing',
    category: 'social'
  },
  {
    key: 'twitter_handle',
    label: 'Twitter Handle',
    type: 'text',
    description: 'Your Twitter username (e.g., @YourHandle)',
    category: 'social'
  },
  {
    key: 'default_social_image',
    label: 'Default Social Image',
    type: 'url',
    description: 'Default image for social media sharing (1200x630px recommended)',
    category: 'social'
  },
  {
    key: 'favicon_url',
    label: 'Favicon URL',
    type: 'url',
    description: 'URL to your website favicon',
    category: 'appearance'
  },
  {
    key: 'theme_color',
    label: 'Theme Color',
    type: 'color',
    description: 'Primary theme color for your website',
    category: 'appearance'
  }
];

const SEOSettingsManager = () => {
  const { settings, loading, updateSettings, refetch } = useSEOSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    setLocalSettings(settings);
    setHasChanges(false);
    setValidationErrors({});
    setLastError(null);
  }, [settings]);

  const validateField = (key: string, value: string) => {
    const field = seoFields.find(f => f.key === key);
    if (!field) return '';

    if (field.type === 'text' && key === 'site_title' && value.length > 60) {
      return 'Title should be under 60 characters for better SEO';
    }
    if (field.type === 'textarea' && key === 'site_description' && value.length > 160) {
      return 'Description should be under 160 characters for better SEO';
    }
    if (field.type === 'url' && value && !value.match(/^https?:\/\/.+/)) {
      return 'Please enter a valid URL starting with http:// or https://';
    }
    if (field.type === 'color' && value && !value.match(/^#[0-9a-fA-F]{6}$/)) {
      return 'Please enter a valid hex color (e.g., #6366f1)';
    }
    return '';
  };

  const handleInputChange = (key: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
    setLastError(null);

    // Validate field
    const error = validateField(key, value);
    setValidationErrors(prev => ({
      ...prev,
      [key]: error
    }));
  };

  const hasValidationErrors = () => {
    return Object.values(validationErrors).some(error => error !== '');
  };

  const handleSave = async () => {
    if (hasValidationErrors()) {
      toast({
        title: "Validation Error",
        description: "Please fix the validation errors before saving.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    setLastError(null);
    
    try {
      console.log('Attempting to save SEO settings:', localSettings);
      await updateSettings(localSettings);
      setHasChanges(false);
      toast({
        title: "Settings Saved ✅",
        description: "SEO settings have been successfully updated. Changes are now live!"
      });
    } catch (error) {
      console.error('Save operation failed:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred while saving settings';
      
      setLastError(errorMessage);
      toast({
        title: "Save Failed",
        description: `Failed to save SEO settings: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTestChanges = () => {
    window.open('/', '_blank');
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Settings Refreshed",
        description: "SEO settings have been refreshed from the database."
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTestSEO = () => {
    const testUrl = `https://www.opengraph.xyz/url/${encodeURIComponent(window.location.origin)}`;
    window.open(testUrl, '_blank');
  };

  const getInputComponent = (field: SEOSettingField) => {
    const value = localSettings[field.key as keyof typeof localSettings] || '';
    const originalValue = settings[field.key as keyof typeof settings] || '';
    const isChanged = value !== originalValue;
    const hasError = validationErrors[field.key];

    // Special handling for image fields
    if (field.key === 'default_social_image') {
      return (
        <div className={isChanged ? 'ring-2 ring-blue-300 rounded-xl' : ''}>
          <SEOImageUpload
            label="Default Social Image"
            value={value}
            onChange={(newValue) => handleInputChange(field.key, newValue)}
            type="social"
            description={field.description}
          />
        </div>
      );
    }

    if (field.key === 'favicon_url') {
      return (
        <div className={isChanged ? 'ring-2 ring-blue-300 rounded-xl' : ''}>
          <SEOImageUpload
            label="Favicon"
            value={value}
            onChange={(newValue) => handleInputChange(field.key, newValue)}
            type="favicon"
            description={field.description}
          />
        </div>
      );
    }

    // Regular input handling for non-image fields
    const commonProps = {
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(field.key, e.target.value),
      className: `border-2 border-purple-200 focus:border-purple-400 rounded-xl ${
        isChanged ? 'ring-2 ring-blue-300' : ''
      } ${hasError ? 'border-red-300 focus:border-red-400' : ''}`
    };

    switch (field.type) {
      case 'textarea':
        return (
          <div>
            <Textarea 
              {...commonProps}
              rows={3}
              placeholder={field.description}
            />
            {field.key === 'site_description' && (
              <div className="text-xs text-gray-500 mt-1">
                {value.length}/160 characters
              </div>
            )}
          </div>
        );
      case 'color':
        return (
          <div className="flex gap-2">
            <Input 
              {...commonProps}
              type="color"
              className={`w-20 h-12 p-1 ${isChanged ? 'ring-2 ring-blue-300' : ''} ${hasError ? 'border-red-300' : ''}`}
            />
            <Input 
              {...commonProps}
              type="text"
              placeholder="#6366f1"
              className="flex-1"
            />
          </div>
        );
      default:
        return (
          <div>
            <Input 
              {...commonProps}
              type="text"
              placeholder={field.description}
            />
            {field.key === 'site_title' && (
              <div className="text-xs text-gray-500 mt-1">
                {value.length}/60 characters
              </div>
            )}
          </div>
        );
    }
  };

  const getSettingIcon = (category: string) => {
    switch (category) {
      case 'basic': return <Globe className="h-4 w-4" />;
      case 'social': return <Share2 className="h-4 w-4" />;
      case 'appearance': return <Palette className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      basic: { name: 'Basic SEO', color: 'bg-blue-100 text-blue-700' },
      social: { name: 'Social Media', color: 'bg-green-100 text-green-700' },
      appearance: { name: 'Appearance', color: 'bg-purple-100 text-purple-700' }
    };
    return badges[category as keyof typeof badges] || { name: 'General', color: 'bg-gray-100 text-gray-700' };
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-2xl mb-2">⏳</div>
        <div className="text-gray-600">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
        <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          🔧 SEO Settings Manager (Live System)
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Manage your site's SEO properties, meta tags, and social sharing settings. Changes are applied immediately.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleTestChanges}
              variant="outline"
              className="border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              Test Site
            </Button>
            <Button
              onClick={handleTestSEO}
              variant="outline"
              className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg"
            >
              <TestTube className="h-4 w-4 mr-2" />
              Test SEO
            </Button>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges || hasValidationErrors()}
            className={`rounded-lg ${
              hasChanges && !hasValidationErrors()
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                : 'bg-gray-400'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
          </Button>
        </div>

        {hasChanges && (
          <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">
              💡 You have unsaved changes. Click "Save Changes" to apply them to your site.
            </p>
          </div>
        )}

        {hasValidationErrors() && (
          <div className="mb-6 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-700 font-medium">
              ⚠️ Please fix the validation errors before saving.
            </p>
          </div>
        )}

        {lastError && (
          <div className="mb-6 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-700 font-medium">
              ❌ Save Error: {lastError}
            </p>
            <p className="text-xs text-red-600 mt-1">
              Check the browser console for more details.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {seoFields.map((field) => {
            const category = getCategoryBadge(field.category);
            const value = localSettings[field.key as keyof typeof localSettings] || '';
            const originalValue = settings[field.key as keyof typeof settings] || '';
            const isChanged = value !== originalValue;
            const hasError = validationErrors[field.key];
            
            return (
              <div key={field.key} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSettingIcon(field.category)}
                    <h3 className="font-semibold text-gray-800">{field.label}</h3>
                    <Badge className={category.color}>
                      {category.name}
                    </Badge>
                    {isChanged && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Modified
                      </Badge>
                    )}
                    {hasError && (
                      <Badge variant="destructive" className="bg-red-100 text-red-700">
                        Error
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{field.description}</p>
                
                {getInputComponent(field)}
                
                {hasError && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
                    <span className="text-red-700">{hasError}</span>
                  </div>
                )}
                
                {isChanged && originalValue && !hasError && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <span className="text-yellow-700">Original: </span>
                    <span className="text-gray-600">{originalValue}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Live SEO System Notes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Settings are stored permanently in the Supabase database</li>
            <li>• Images are uploaded to secure Supabase storage buckets</li>
            <li>• Changes are applied immediately to all pages</li>
            <li>• Favicon updates include cache-busting for instant browser refresh</li>
            <li>• Use "Test SEO" to validate your meta tags with external tools</li>
            <li>• All pages now use dynamic SEO instead of static HTML tags</li>
            <li>• Database policies have been updated to allow proper access</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSettingsManager;
