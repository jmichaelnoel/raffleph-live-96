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
import { GradientText } from '@/components/ui/gradient-text';
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

    // Enhanced success message with celebration
    toast({
      title: "🎉 AMAZING! Your Raffle is Submitted! 🎉",
      description: "Your raffle has been submitted for review! Get ready to reach thousands of excited participants. We'll contact you within 24 hours! 🚀✨",
      duration: 8000
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onSearchChange={() => {}} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
        
        {/* Floating animations */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">✨</div>
        <div className="absolute top-20 right-20 text-3xl animate-float-gently delay-300">🎁</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-pulse delay-500">🚀</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-spin-slow">⭐</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700">💎</div>
        <div className="absolute top-1/3 right-1/3 text-2xl animate-float-gently delay-900">🎊</div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          {/* FREE Promotion Banner */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 text-lg font-bold rounded-full animate-pulse shadow-2xl border-4 border-yellow-300">
                🔥 FREE SUBMISSIONS - BETA PERIOD! 🔥
              </Badge>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                LIMITED TIME!
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Submit Your <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent font-extrabold">Epic Raffle</span> 
            <span className="inline-block ml-3 animate-bounce delay-300">🎯</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in delay-1 opacity-90">
            Ready to reach <span className="font-bold text-yellow-300">thousands of excited participants</span>? 
            Submit your raffle today and watch the magic happen! 
            <span className="inline-block ml-2 animate-pulse delay-500">✨</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-lg animate-fade-in delay-2">
            <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="mr-2">🚀</span>
              <span>Instant Exposure</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="mr-2">💰</span>
              <span>Zero Fees</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="mr-2">⚡</span>
              <span>24hr Review</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Enhanced Form Card */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl flex items-center">
              <span className="mr-3 text-4xl animate-bounce">🎁</span>
              Raffle Submission Form
              <span className="ml-3 text-4xl animate-pulse">✨</span>
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg">
              Fill in your raffle details below. Fields marked with * are required to get started!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Encouraging Message */}
            <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-green-200">
              <div className="flex items-center text-lg font-semibold text-green-800">
                <span className="mr-3 text-2xl animate-bounce">🌟</span>
                You're about to create something amazing!
                <span className="ml-3 text-2xl animate-pulse">🎊</span>
              </div>
              <p className="text-green-700 mt-2">Every successful raffle starts with a great submission. Let's make yours unforgettable!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🏆</span>
                    Raffle Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., iPhone 15 Pro Max Giveaway"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📝</span>
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your raffle, what participants can win, and any special details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-2 min-h-[120px] text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Prize Value */}
                <div>
                  <Label htmlFor="prize" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">💰</span>
                    Prize Value (₱) *
                  </Label>
                  <Input
                    id="prize"
                    type="number"
                    placeholder="50000"
                    value={formData.prize}
                    onChange={(e) => handleInputChange('prize', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🎯</span>
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl">
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
                  <Label htmlFor="bettingCost" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🎫</span>
                    Entry Cost (₱)
                  </Label>
                  <Input
                    id="bettingCost"
                    type="number"
                    placeholder="20"
                    value={formData.bettingCost}
                    onChange={(e) => handleInputChange('bettingCost', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* End Date */}
                <div>
                  <Label htmlFor="endDate" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📅</span>
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📍</span>
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Metro Manila"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Organization */}
                <div>
                  <Label htmlFor="organization" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🏢</span>
                    Organization/Host
                  </Label>
                  <Input
                    id="organization"
                    placeholder="Your organization name"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Facebook URL */}
                <div>
                  <Label htmlFor="organizerFacebookUrl" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📘</span>
                    Facebook Page URL
                  </Label>
                  <Input
                    id="organizerFacebookUrl"
                    placeholder="https://facebook.com/yourpage"
                    value={formData.organizerFacebookUrl}
                    onChange={(e) => handleInputChange('organizerFacebookUrl', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Join URL */}
                <div>
                  <Label htmlFor="externalJoinUrl" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🔗</span>
                    How to Join URL
                  </Label>
                  <Input
                    id="externalJoinUrl"
                    placeholder="https://yourwebsite.com/join"
                    value={formData.externalJoinUrl}
                    onChange={(e) => handleInputChange('externalJoinUrl', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="imageUrl" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🖼️</span>
                    Prize Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Entries Left */}
                <div>
                  <Label htmlFor="entriesLeft" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🎟️</span>
                    Available Entries
                  </Label>
                  <Input
                    id="entriesLeft"
                    type="number"
                    placeholder="1000 (leave empty for unlimited)"
                    value={formData.entriesLeft}
                    onChange={(e) => handleInputChange('entriesLeft', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                {/* Cash Convertible */}
                <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                  <input
                    type="checkbox"
                    id="convertibleToCash"
                    checked={formData.convertibleToCash}
                    onChange={(e) => handleInputChange('convertibleToCash', e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <Label htmlFor="convertibleToCash" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">💵</span>
                    Prize can be converted to cash
                  </Label>
                </div>
              </div>

              {/* Important Notes Section */}
              <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                  <span className="mr-2 text-2xl animate-pulse">ℹ️</span>
                  Important Notes
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-lg">✅</span>
                    All submissions are reviewed within 24 hours for quality and legitimacy
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-lg">✅</span>
                    FREE during our beta period - normally ₱200 submission fee
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-lg">✅</span>
                    We'll help optimize your raffle for maximum participation
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t-2 border-purple-200">
                <Button 
                  type="submit" 
                  className="w-full text-xl py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold rounded-2xl border-0"
                >
                  <span className="mr-3 text-2xl animate-bounce">🚀</span>
                  SUBMIT MY EPIC RAFFLE
                  <span className="ml-3 text-2xl animate-pulse">⚡</span>
                </Button>
                <p className="text-center mt-4 text-lg text-gray-600">
                  <span className="animate-pulse">🎯</span>
                  Ready to reach thousands of excited participants? 
                  <span className="animate-pulse">✨</span>
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
