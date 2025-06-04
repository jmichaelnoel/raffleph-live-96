
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Calendar, DollarSign, MapPin, Building2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import Layout from '@/components/Layout';

const SubmitRafflePage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    prize: '',
    bettingCost: '',
    drawDate: '',
    organization: '',
    location: '',
    organizerFacebookUrl: '',
    raffleDetailsUrl: '',
    slotInquiryUrl: '',
    entriesLeft: '',
    convertibleToCash: false,
    imageUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'category', 'prize', 'organization', 'organizerFacebookUrl'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    const prizeValue = parseFloat(formData.prize);
    if (isNaN(prizeValue) || prizeValue <= 0) {
      toast({
        title: "Validation Error",
        description: "Prize value must be a valid positive number",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        prize: parseFloat(formData.prize),
        betting_cost: formData.bettingCost ? parseFloat(formData.bettingCost) : null,
        draw_date: formData.drawDate || null,
        organization: formData.organization,
        location: formData.location || null,
        organizer_facebook_url: formData.organizerFacebookUrl,
        raffle_details_url: formData.raffleDetailsUrl || null,
        slot_inquiry_url: formData.slotInquiryUrl || null,
        entries_left: formData.entriesLeft ? parseInt(formData.entriesLeft) : null,
        convertible_to_cash: formData.convertibleToCash,
        image_url: formData.imageUrl || null,
        status: 'pending' as const
      };

      const { data, error } = await supabase
        .from('raffle_submissions')
        .insert([submissionData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: "Submission Successful",
          description: "Your raffle has been submitted for review. You'll hear back from us soon!",
        });

        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          prize: '',
          bettingCost: '',
          drawDate: '',
          organization: '',
          location: '',
          organizerFacebookUrl: '',
          raffleDetailsUrl: '',
          slotInquiryUrl: '',
          entriesLeft: '',
          convertibleToCash: false,
          imageUrl: ''
        });
      }
    } catch (error: any) {
      console.error('Error submitting raffle:', error);
      toast({
        title: "Submission Error",
        description: error.message || "There was an error submitting your raffle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Submit Your Raffle</CardTitle>
              <CardDescription className="text-center">
                Fill out the form below to submit your raffle for review and approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Raffle Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter raffle title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your raffle in detail"
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Cars">Cars</SelectItem>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                        <SelectItem value="Gadgets">Gadgets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Prize and Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Prize and Pricing
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prize">Prize Value (PHP) *</Label>
                      <Input
                        id="prize"
                        type="number"
                        value={formData.prize}
                        onChange={(e) => handleInputChange('prize', e.target.value)}
                        placeholder="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bettingCost">Ticket Price (PHP)</Label>
                      <Input
                        id="bettingCost"
                        type="number"
                        value={formData.bettingCost}
                        onChange={(e) => handleInputChange('bettingCost', e.target.value)}
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="drawDate">Draw Date</Label>
                      <Input
                        id="drawDate"
                        type="date"
                        value={formData.drawDate}
                        onChange={(e) => handleInputChange('drawDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="entriesLeft">Entries Left</Label>
                      <Input
                        id="entriesLeft"
                        type="number"
                        value={formData.entriesLeft}
                        onChange={(e) => handleInputChange('entriesLeft', e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Organization Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization Name *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      placeholder="Organization or individual name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Philippines"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizerFacebookUrl">Organizer Facebook URL *</Label>
                    <Input
                      id="organizerFacebookUrl"
                      value={formData.organizerFacebookUrl}
                      onChange={(e) => handleInputChange('organizerFacebookUrl', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                      required
                    />
                  </div>
                </div>

                {/* Additional Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="raffleDetailsUrl">Raffle Details URL</Label>
                    <Input
                      id="raffleDetailsUrl"
                      value={formData.raffleDetailsUrl}
                      onChange={(e) => handleInputChange('raffleDetailsUrl', e.target.value)}
                      placeholder="Link to more details about the raffle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slotInquiryUrl">Slot Inquiry URL</Label>
                    <Input
                      id="slotInquiryUrl"
                      value={formData.slotInquiryUrl}
                      onChange={(e) => handleInputChange('slotInquiryUrl', e.target.value)}
                      placeholder="Link for slot inquiries"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Raffle Image
                  </h3>
                  <ImageUpload onImageUpload={handleImageUpload} />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Raffle for Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitRafflePage;
