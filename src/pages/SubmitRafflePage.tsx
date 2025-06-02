
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SubmitRafflePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    category: '',
    bettingCost: '',
    endDate: '',
    location: '',
    organization: '',
    organizerFacebookUrl: '',
    externalJoinUrl: '',
    imageUrl: '',
    entriesLeft: '',
    convertibleToCash: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.prize || !formData.category) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Raffle Submitted Successfully! 🎉",
      description: "Your raffle has been submitted for review. We'll get back to you within 24 hours.",
      duration: 5000
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      prize: '',
      category: '',
      bettingCost: '',
      endDate: '',
      location: '',
      organization: '',
      organizerFacebookUrl: '',
      externalJoinUrl: '',
      imageUrl: '',
      entriesLeft: '',
      convertibleToCash: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Submit Your Raffle 🎁
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got an exciting raffle to share? Submit it here and let thousands discover your amazing prizes!
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Raffle Details</CardTitle>
            <CardDescription>
              Fill in the information about your raffle. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <Label htmlFor="title">Raffle Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., iPhone 15 Pro Max Giveaway"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your raffle, what participants can win, and any special details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                {/* Prize Value */}
                <div>
                  <Label htmlFor="prize">Prize Value (₱) *</Label>
                  <Input
                    id="prize"
                    type="number"
                    placeholder="50000"
                    value={formData.prize}
                    onChange={(e) => handleInputChange('prize', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gadgets">🎮 Gadgets</SelectItem>
                      <SelectItem value="Cars">🚗 Cars</SelectItem>
                      <SelectItem value="Cash">💰 Cash</SelectItem>
                      <SelectItem value="Motorcycle">🏍️ Motorcycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Betting Cost */}
                <div>
                  <Label htmlFor="bettingCost">Entry Cost (₱)</Label>
                  <Input
                    id="bettingCost"
                    type="number"
                    placeholder="20"
                    value={formData.bettingCost}
                    onChange={(e) => handleInputChange('bettingCost', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* End Date */}
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Metro Manila"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Organization */}
                <div>
                  <Label htmlFor="organization">Organization/Host</Label>
                  <Input
                    id="organization"
                    placeholder="Your organization name"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Facebook URL */}
                <div>
                  <Label htmlFor="organizerFacebookUrl">Facebook Page URL</Label>
                  <Input
                    id="organizerFacebookUrl"
                    placeholder="https://facebook.com/yourpage"
                    value={formData.organizerFacebookUrl}
                    onChange={(e) => handleInputChange('organizerFacebookUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Join URL */}
                <div>
                  <Label htmlFor="externalJoinUrl">How to Join URL</Label>
                  <Input
                    id="externalJoinUrl"
                    placeholder="https://yourwebsite.com/join"
                    value={formData.externalJoinUrl}
                    onChange={(e) => handleInputChange('externalJoinUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="imageUrl">Prize Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Entries Left */}
                <div>
                  <Label htmlFor="entriesLeft">Available Entries</Label>
                  <Input
                    id="entriesLeft"
                    type="number"
                    placeholder="1000 (leave empty for unlimited)"
                    value={formData.entriesLeft}
                    onChange={(e) => handleInputChange('entriesLeft', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Cash Convertible */}
                <div className="md:col-span-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="convertibleToCash"
                    checked={formData.convertibleToCash}
                    onChange={(e) => handleInputChange('convertibleToCash', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="convertibleToCash">Prize can be converted to cash</Label>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button 
                  type="submit" 
                  className="w-full text-lg py-3 bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
                >
                  🎊 Submit Raffle for Review
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  We'll review your submission and get back to you within 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitRafflePage;
