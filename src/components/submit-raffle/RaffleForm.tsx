
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Minus, ChevronDown, Upload } from 'lucide-react';

interface BundlePricing {
  slots: string;
  price: string;
}

interface ConsolationPrize {
  title: string;
  value: string;
  isCash: boolean;
  images: string[];
}

const RaffleForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    batchNumber: '',
    description: '',
    grandPrize: '',
    grandPrizeImages: [] as string[],
    grandPrizeValue: '',
    convertibleToCash: false,
    category: '',
    costPerSlot: '',
    drawDate: '',
    organizationName: '',
    facebookPageUrl: '',
    raffleLink: '',
    buyingSlotsUrl: '',
    totalSlots: ''
  });

  const [bundlePricing, setBundlePricing] = useState<BundlePricing[]>([
    { slots: '', price: '' }
  ]);

  const [consolationPrizes, setConsolationPrizes] = useState<ConsolationPrize[]>([
    { title: '', value: '', isCash: false, images: [] }
  ]);

  const [isBundlePricingOpen, setIsBundlePricingOpen] = useState(false);
  const [isConsolationPrizesOpen, setIsConsolationPrizesOpen] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGrandPrizeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // This will work when Supabase is integrated
      toast({
        title: "Image Upload",
        description: "Image upload will be fully functional once you integrate with Supabase. For now, this is a placeholder.",
        duration: 5000
      });
      
      // Placeholder logic - will be replaced with actual Supabase file upload
      const fileNames = Array.from(files).map(file => file.name);
      setFormData(prev => ({
        ...prev,
        grandPrizeImages: [...prev.grandPrizeImages, ...fileNames]
      }));
    }
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const addBundlePricing = () => {
    setBundlePricing([...bundlePricing, { slots: '', price: '' }]);
  };

  const removeBundlePricing = (index: number) => {
    if (bundlePricing.length > 1) {
      setBundlePricing(bundlePricing.filter((_, i) => i !== index));
    }
  };

  const updateBundlePricing = (index: number, field: 'slots' | 'price', value: string) => {
    const updated = bundlePricing.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setBundlePricing(updated);
  };

  const addConsolationPrize = () => {
    setConsolationPrizes([...consolationPrizes, { title: '', value: '', isCash: false, images: [] }]);
  };

  const removeConsolationPrize = (index: number) => {
    if (consolationPrizes.length > 1) {
      setConsolationPrizes(consolationPrizes.filter((_, i) => i !== index));
    }
  };

  const updateConsolationPrize = (index: number, field: 'title' | 'value' | 'isCash', value: string | boolean) => {
    const updated = consolationPrizes.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setConsolationPrizes(updated);
  };

  const handleConsolationPrizeImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      toast({
        title: "Image Upload",
        description: "Image upload will be fully functional once you integrate with Supabase.",
        duration: 5000
      });
      
      // Placeholder logic
      const fileNames = Array.from(files).map(file => file.name);
      const updated = consolationPrizes.map((item, i) => 
        i === index ? { ...item, images: [...item.images, ...fileNames] } : item
      );
      setConsolationPrizes(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.grandPrize || !formData.category) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 AMAZING! Your Raffle is Submitted! 🎉",
      description: "Your raffle has been submitted for review! Get ready to reach thousands of excited participants. We'll contact you within 24 hours! 🚀✨",
      duration: 8000
    });

    // Reset form
    setFormData({
      title: '',
      batchNumber: '',
      description: '',
      grandPrize: '',
      grandPrizeImages: [],
      grandPrizeValue: '',
      convertibleToCash: false,
      category: '',
      costPerSlot: '',
      drawDate: '',
      organizationName: '',
      facebookPageUrl: '',
      raffleLink: '',
      buyingSlotsUrl: '',
      totalSlots: ''
    });

    setBundlePricing([{ slots: '', price: '' }]);
    setConsolationPrizes([{ title: '', value: '', isCash: false, images: [] }]);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
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
        
        <CardContent className="p-10">
          <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-green-200">
            <div className="flex items-center text-lg font-semibold text-green-800">
              <span className="mr-3 text-2xl animate-bounce">🌟</span>
              You're about to create something amazing!
              <span className="ml-3 text-2xl animate-pulse">🎊</span>
            </div>
            <p className="text-green-700 mt-2">Every successful raffle starts with a great submission. Let's make yours unforgettable!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2 text-2xl">📋</span>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🏆</span>
                    Raffle Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., iPhone 15 Pro Max Mega Raffle"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="batchNumber" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">#️⃣</span>
                    Raffle Batch Number
                  </Label>
                  <Input
                    id="batchNumber"
                    placeholder="e.g., BATCH-2025-001"
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-lg font-semibold flex items-center">
                  <span className="mr-2 text-xl">📝</span>
                  Description/Mechanics *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your raffle mechanics, rules, how to join, draw process, and any special details participants should know..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2 min-h-[120px] text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
              </div>
            </div>

            {/* Prize Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2 text-2xl">🎁</span>
                Prize Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="grandPrize" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">👑</span>
                    Grand Prize *
                  </Label>
                  <Input
                    id="grandPrize"
                    placeholder="e.g., Brand New iPhone 15 Pro Max 256GB"
                    value={formData.grandPrize}
                    onChange={(e) => handleInputChange('grandPrize', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="grandPrizeValue" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">💰</span>
                    Grand Prize Value (₱) *
                  </Label>
                  <Input
                    id="grandPrizeValue"
                    type="number"
                    placeholder="85000"
                    value={formData.grandPrizeValue}
                    onChange={(e) => handleInputChange('grandPrizeValue', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold flex items-center">
                  <span className="mr-2 text-xl">📸</span>
                  Grand Prize Images
                </Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGrandPrizeImageUpload}
                    className="hidden"
                    id="grandPrizeImages"
                  />
                  <label
                    htmlFor="grandPrizeImages"
                    className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer block"
                  >
                    <Upload className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                    <p className="text-gray-600">Click to upload multiple images of your grand prize</p>
                    <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG files</p>
                  </label>
                </div>
                {formData.grandPrizeImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Selected images:</p>
                    <ul className="text-sm text-gray-500">
                      {formData.grandPrizeImages.map((image, index) => (
                        <li key={index}>• {image}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Consolation Prizes Section */}
              <Collapsible open={isConsolationPrizesOpen} onOpenChange={setIsConsolationPrizesOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-between text-lg font-semibold border-2 border-orange-200 hover:border-orange-400 rounded-xl p-4 h-auto"
                  >
                    <span className="flex items-center">
                      <span className="mr-2 text-xl">🥈</span>
                      Consolation Prizes (Optional)
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isConsolationPrizesOpen ? 'transform rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  {consolationPrizes.map((prize, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium">Prize Title</Label>
                          <Input
                            placeholder="e.g., 2nd Prize - Samsung Galaxy Watch"
                            value={prize.title}
                            onChange={(e) => updateConsolationPrize(index, 'title', e.target.value)}
                            className="mt-1 h-10 border-orange-200 focus:border-orange-400"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Prize Value (₱)</Label>
                          <Input
                            type="number"
                            placeholder="15000"
                            value={prize.value}
                            onChange={(e) => updateConsolationPrize(index, 'value', e.target.value)}
                            className="mt-1 h-10 border-orange-200 focus:border-orange-400"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <input
                            type="checkbox"
                            id={`cash-${index}`}
                            checked={prize.isCash}
                            onChange={(e) => updateConsolationPrize(index, 'isCash', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <Label htmlFor={`cash-${index}`} className="text-sm font-medium">
                            💵 This prize is CASH
                          </Label>
                        </div>
                        
                        {!prize.isCash && (
                          <div>
                            <Label className="text-sm font-medium">Prize Images</Label>
                            <div className="mt-1">
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleConsolationPrizeImageUpload(index, e)}
                                className="hidden"
                                id={`consolationImages-${index}`}
                              />
                              <label
                                htmlFor={`consolationImages-${index}`}
                                className="border border-dashed border-orange-200 rounded-lg p-3 text-center text-sm cursor-pointer block hover:border-orange-400 transition-colors"
                              >
                                <Upload className="mx-auto h-8 w-8 text-orange-400 mb-2" />
                                <p className="text-gray-600">Upload images for this prize</p>
                              </label>
                            </div>
                            {prize.images.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-600">Selected images:</p>
                                <ul className="text-xs text-gray-500">
                                  {prize.images.map((image, imgIndex) => (
                                    <li key={imgIndex}>• {image}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 justify-end">
                        {index === consolationPrizes.length - 1 && (
                          <Button
                            type="button"
                            onClick={addConsolationPrize}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                        {consolationPrizes.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeConsolationPrize(index)}
                            size="sm"
                            variant="destructive"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
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

            {/* Raffle Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2 text-2xl">⚙️</span>
                Raffle Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <SelectItem value="Cars">🚗 Cars</SelectItem>
                      <SelectItem value="Motorcycle">🏍️ Motorcycle</SelectItem>
                      <SelectItem value="Gadgets">📱 Gadgets</SelectItem>
                      <SelectItem value="Cash">💰 Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="costPerSlot" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🎫</span>
                    Cost per Slot/Entry (₱) *
                  </Label>
                  <Input
                    id="costPerSlot"
                    type="number"
                    placeholder="100"
                    value={formData.costPerSlot}
                    onChange={(e) => handleInputChange('costPerSlot', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="totalSlots" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🎟️</span>
                    Total Raffle Slots *
                  </Label>
                  <Input
                    id="totalSlots"
                    type="number"
                    placeholder="1000"
                    value={formData.totalSlots}
                    onChange={(e) => handleInputChange('totalSlots', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
              </div>

              {/* Bundle Pricing Section */}
              <Collapsible open={isBundlePricingOpen} onOpenChange={setIsBundlePricingOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-between text-lg font-semibold border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 h-auto"
                  >
                    <span className="flex items-center">
                      <span className="mr-2 text-xl">💎</span>
                      Bundle Pricing (Optional)
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isBundlePricingOpen ? 'transform rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-700 mb-4">
                      <span className="font-semibold">💡 Tip:</span> Offer discounts for bulk purchases! Example: 1 slot = ₱100, 3 slots = ₱280, 10 slots = ₱900
                    </p>
                    {bundlePricing.map((bundle, index) => (
                      <div key={index} className="flex gap-4 items-end mb-4">
                        <div className="flex-1">
                          <Label className="text-sm font-medium">Number of Slots</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 3"
                            value={bundle.slots}
                            onChange={(e) => updateBundlePricing(index, 'slots', e.target.value)}
                            className="mt-1 h-10 border-blue-200 focus:border-blue-400"
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-medium">Bundle Price (₱)</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 280"
                            value={bundle.price}
                            onChange={(e) => updateBundlePricing(index, 'price', e.target.value)}
                            className="mt-1 h-10 border-blue-200 focus:border-blue-400"
                          />
                        </div>
                        <div className="flex gap-2">
                          {index === bundlePricing.length - 1 && (
                            <Button
                              type="button"
                              onClick={addBundlePricing}
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white h-10"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                          {bundlePricing.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeBundlePricing(index)}
                              size="sm"
                              variant="destructive"
                              className="h-10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div>
                <Label htmlFor="drawDate" className="text-lg font-semibold flex items-center">
                  <span className="mr-2 text-xl">📅</span>
                  Draw Date *
                </Label>
                <Input
                  id="drawDate"
                  type="date"
                  value={formData.drawDate}
                  onChange={(e) => handleInputChange('drawDate', e.target.value)}
                  className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
                {formData.drawDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Formatted as: {formatDateDisplay(formData.drawDate)}
                  </p>
                )}
              </div>
            </div>

            {/* Organization & Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2 text-2xl">🔗</span>
                Organization & Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizationName" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">🏢</span>
                    Organization/Facebook Page Name *
                  </Label>
                  <Input
                    id="organizationName"
                    placeholder="e.g., Lucky Raffle PH Official"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="facebookPageUrl" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📘</span>
                    Facebook Page URL *
                  </Label>
                  <Input
                    id="facebookPageUrl"
                    placeholder="https://facebook.com/luckyraffleofficial"
                    value={formData.facebookPageUrl}
                    onChange={(e) => handleInputChange('facebookPageUrl', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="raffleLink" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">📋</span>
                    Raffle Link (Facebook Post Link) *
                  </Label>
                  <Input
                    id="raffleLink"
                    placeholder="https://facebook.com/post/raffledetails123"
                    value={formData.raffleLink}
                    onChange={(e) => handleInputChange('raffleLink', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="buyingSlotsUrl" className="text-lg font-semibold flex items-center">
                    <span className="mr-2 text-xl">💬</span>
                    Where to Buy Slots (Messenger Link) *
                  </Label>
                  <Input
                    id="buyingSlotsUrl"
                    placeholder="https://m.me/luckyraffleofficial"
                    value={formData.buyingSlotsUrl}
                    onChange={(e) => handleInputChange('buyingSlotsUrl', e.target.value)}
                    className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
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
                  Submission is free for a limited time only.
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
  );
};

export default RaffleForm;
