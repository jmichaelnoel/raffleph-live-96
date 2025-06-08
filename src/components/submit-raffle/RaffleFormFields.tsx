
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RaffleFormData } from './RaffleFormHandler';
import { DollarSign, Gift, Building, Users, Calendar, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import DrawDateField from './DrawDateField';
import ConsolationPrizesSection from './ConsolationPrizesSection';
import SlotBundlesSection from './SlotBundlesSection';
import ImagePreviewUpload from '@/components/ImagePreviewUpload';
import ConfirmationDialog from './ConfirmationDialog';

interface RaffleFormFieldsProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  submissionStep: string;
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
}

const RaffleFormFields = ({ onSubmit, isSubmitting, submissionStep, showConfirmation, setShowConfirmation }: RaffleFormFieldsProps) => {
  const form = useFormContext<RaffleFormData>();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      icon: <Gift className="h-5 w-5" />,
      description: 'Tell us about your raffle'
    },
    {
      id: 'prize-details',
      title: 'Prize Details',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'What are you raffling?'
    },
    {
      id: 'raffle-setup',
      title: 'Raffle Setup',
      icon: <Users className="h-5 w-5" />,
      description: 'Configure slots and pricing'
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: <Calendar className="h-5 w-5" />,
      description: 'When will the draw happen?'
    },
    {
      id: 'extra-features',
      title: 'Extra Features',
      icon: <Gift className="h-5 w-5" />,
      description: 'Add bundles and consolation prizes'
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      icon: <Building className="h-5 w-5" />,
      description: 'How participants can reach you'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const normalizeUrl = (url: string): string => {
    if (!url) return '';
    const trimmedUrl = url.trim();
    if (!trimmedUrl.match(/^https?:\/\//)) {
      return `https://${trimmedUrl}`;
    }
    return trimmedUrl;
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Step {currentStep + 1} of {steps.length}</h2>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' 
                  : index < currentStep 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-500'
              }`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index === currentStep ? 'bg-white/20' : index < currentStep ? 'bg-green-200' : 'bg-gray-200'
                }`}>
                  {React.cloneElement(step.icon, { 
                    className: `h-4 w-4 ${index === currentStep ? 'text-white' : index < currentStep ? 'text-green-600' : 'text-gray-400'}` 
                  })}
                </div>
                <span className="font-medium text-sm">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-300 mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 min-h-[600px]">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            {React.cloneElement(steps[currentStep].icon, { className: 'h-6 w-6 mr-3 text-purple-600' })}
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Step Content */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Raffle Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Win a Brand New iPhone 15 Pro Max!" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="batchNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Batch Number (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Batch 001, Series A" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your raffle in detail. What makes it special? Include any terms and conditions here..."
                      className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Organization Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., TechCorp Philippines, Manila Startup Hub" 
                      className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="grandPrize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Grand Prize</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., iPhone 15 Pro Max 256GB" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grandPrizeValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Prize Value (PHP)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="75000" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cars">🚗 Cars</SelectItem>
                      <SelectItem value="Motorcycle">🏍️ Motorcycle</SelectItem>
                      <SelectItem value="Gadgets">📱 Gadgets</SelectItem>
                      <SelectItem value="Cash">💰 Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grandPrizeImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Prize Images</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all duration-300">
                      <ImagePreviewUpload
                        onFileUpload={field.onChange}
                        maxFiles={5}
                        acceptedTypes={['image/*']}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="totalSlots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Total Slots</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costPerSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800">Cost per Slot (PHP)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="100" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <DrawDateField />
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <ConsolationPrizesSection />
            <SlotBundlesSection />
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="facebookPageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Facebook Page URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="facebook.com/yourpage or www.facebook.com/yourpage" 
                      className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                      {...field}
                      onChange={e => field.onChange(normalizeUrl(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="raffleLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Raffle Link</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your-raffle-website.com or facebook.com/events/123456" 
                      className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                      {...field}
                      onChange={e => field.onChange(normalizeUrl(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyingSlotsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Buying Slots URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="messenger.com/t/yourpage or gcash.com/payment-link" 
                      className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                      {...field}
                      onChange={e => field.onChange(normalizeUrl(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 rounded-xl disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-xl"
          >
            Next Step
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-xl disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                {submissionStep || 'Submitting...'}
              </div>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Raffle
              </>
            )}
          </Button>
        )}
      </div>

      <ConfirmationDialog 
        open={showConfirmation} 
        onOpenChange={setShowConfirmation}
      />
    </div>
  );
};

export default RaffleFormFields;
