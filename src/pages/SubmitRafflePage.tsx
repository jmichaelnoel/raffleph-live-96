import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, Trophy, DollarSign, Clock, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import ImageUpload from '@/components/ImageUpload';
import { validateImageUrl, validateExternalUrl, validateFacebookUrl, validateRaffleForm } from '@/utils/inputValidation';

interface RaffleSubmission {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  prize: number;
  bettingCost: number;
  winningPercentage: number;
  drawDate: string;
  organization: string;
  location: string;
  featured: boolean;
  entriesLeft: number;
  externalJoinUrl: string;
  organizerFacebookUrl: string;
  convertibleToCash: boolean;
}

const SubmitRafflePage: React.FC = () => {
  const [formData, setFormData] = useState<RaffleSubmission>({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    prize: 0,
    bettingCost: 0,
    winningPercentage: 0,
    drawDate: '',
    organization: '',
    location: '',
    featured: false,
    entriesLeft: 0,
    externalJoinUrl: '',
    organizerFacebookUrl: '',
    convertibleToCash: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof RaffleSubmission, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData(prev => ({
        ...prev,
        imageUrl: urls[0] || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateRaffleForm(formData);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('raffle_submissions')
        .insert([{
          title: formData.title,
          description: formData.description,
          image_url: formData.imageUrl,
          category: formData.category,
          prize: formData.prize,
          betting_cost: formData.bettingCost,
          winning_percentage: formData.winningPercentage,
          draw_date: formData.drawDate,
          organization: formData.organization,
          location: formData.location,
          featured: formData.featured,
          entries_left: formData.entriesLeft,
          external_join_url: formData.externalJoinUrl,
          organizer_facebook_url: formData.organizerFacebookUrl,
          convertible_to_cash: formData.convertibleToCash,
          status: 'pending'
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Raffle Submitted",
        description: "Your raffle has been submitted for review. You'll be notified once it's approved.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        prize: 0,
        bettingCost: 0,
        winningPercentage: 0,
        drawDate: '',
        organization: '',
        location: '',
        featured: false,
        entriesLeft: 0,
        externalJoinUrl: '',
        organizerFacebookUrl: '',
        convertibleToCash: false,
      });

    } catch (error) {
      console.error('Error submitting raffle:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your raffle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Submit Your Raffle
            </h1>
            <p className="text-gray-600 text-lg">
              Share your raffle with our community and reach more participants
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Raffle Details</CardTitle>
              <CardDescription className="text-gray-600">
                Fill in all the details about your raffle. All submissions are reviewed before going live.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Raffle Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., iPhone 15 Pro Max Raffle"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="border-purple-200 focus:border-purple-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gadgets">📱 Gadgets</SelectItem>
                          <SelectItem value="Cars">🚗 Cars</SelectItem>
                          <SelectItem value="Cash">💰 Cash</SelectItem>
                          <SelectItem value="Motorcycle">🏍️ Motorcycle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your raffle in detail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="border-purple-200 focus:border-purple-400 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Raffle Image *</Label>
                    <ImageUpload 
                      onImageUpload={(urls) => setFormData(prev => ({
                        ...prev,
                        imageUrl: urls[0] || ''
                      }))}
                      currentImageUrls={formData.imageUrl ? [formData.imageUrl] : []}
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={formData.imageUrl}
                          alt="Raffle preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Financial Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Financial Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prize">Prize Value (PHP) *</Label>
                      <Input
                        id="prize"
                        type="number"
                        placeholder="50000"
                        value={formData.prize || ''}
                        onChange={(e) => handleInputChange('prize', parseInt(e.target.value) || 0)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bettingCost">Ticket Price (PHP) *</Label>
                      <Input
                        id="bettingCost"
                        type="number"
                        placeholder="100"
                        value={formData.bettingCost || ''}
                        onChange={(e) => handleInputChange('bettingCost', parseInt(e.target.value) || 0)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="winningPercentage">Winning Percentage *</Label>
                      <Input
                        id="winningPercentage"
                        type="number"
                        step="0.0001"
                        placeholder="0.01"
                        value={formData.winningPercentage || ''}
                        onChange={(e) => handleInputChange('winningPercentage', parseFloat(e.target.value) || 0)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                        min="0"
                        max="1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="convertibleToCash"
                      checked={formData.convertibleToCash}
                      onCheckedChange={(checked) => handleInputChange('convertibleToCash', checked)}
                    />
                    <Label htmlFor="convertibleToCash">Prize can be converted to cash</Label>
                  </div>
                </div>

                <Separator />

                {/* Event Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Event Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="drawDate">Draw Date *</Label>
                      <Input
                        id="drawDate"
                        type="datetime-local"
                        value={formData.drawDate}
                        onChange={(e) => handleInputChange('drawDate', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="entriesLeft">Total Entries Available *</Label>
                      <Input
                        id="entriesLeft"
                        type="number"
                        placeholder="1000"
                        value={formData.entriesLeft || ''}
                        onChange={(e) => handleInputChange('entriesLeft', parseInt(e.target.value) || 0)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Host *</Label>
                      <Input
                        id="organization"
                        placeholder="Your organization name"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="City, Province"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Links */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Contact & Registration</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="externalJoinUrl">Registration/Join URL *</Label>
                      <Input
                        id="externalJoinUrl"
                        type="url"
                        placeholder="https://your-registration-link.com"
                        value={formData.externalJoinUrl}
                        onChange={(e) => handleInputChange('externalJoinUrl', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizerFacebookUrl">Facebook Page URL *</Label>
                      <Input
                        id="organizerFacebookUrl"
                        type="url"
                        placeholder="https://facebook.com/yourpage"
                        value={formData.organizerFacebookUrl}
                        onChange={(e) => handleInputChange('organizerFacebookUrl', e.target.value)}
                        className="border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Raffle for Review'}
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Your raffle will be reviewed by our team before going live
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitRafflePage;
