import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RaffleFormData } from './RaffleFormHandler';
import EnhancedFileUpload from '@/components/EnhancedFileUpload';
import DrawDateField from './DrawDateField';
import ConsolationPrizesSection from './ConsolationPrizesSection';
import SlotBundlesSection from './SlotBundlesSection';

interface RaffleFormFieldsProps {
  form: UseFormReturn<RaffleFormData>;
}

const RaffleFormFields: React.FC<RaffleFormFieldsProps> = ({ form }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { 
      id: 'basic', 
      title: 'Basic Information', 
      emoji: '📝',
      description: 'Tell us about your amazing raffle!'
    },
    { 
      id: 'prize', 
      title: 'Prize Information', 
      emoji: '🏆',
      description: 'Show off that incredible prize!'
    },
    { 
      id: 'details', 
      title: 'Raffle Details', 
      emoji: '🎯',
      description: 'Set up the mechanics'
    },
    { 
      id: 'extras', 
      title: 'Extra Features', 
      emoji: '✨',
      description: 'Add consolation prizes & bundles!'
    },
    { 
      id: 'contact', 
      title: 'Contact Information', 
      emoji: '📞',
      description: 'How can participants reach you?'
    }
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                index <= currentSection ? 'text-purple-600' : 'text-gray-400'
              }`}
              onClick={() => setCurrentSection(index)}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-all duration-300 transform hover:scale-110 ${
                  index <= currentSection
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-pulse'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {section.emoji}
              </div>
              <span className="text-sm font-medium hidden md:block">{section.title}</span>
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          <span className="text-4xl mr-3 animate-bounce inline-block">
            {sections[currentSection].emoji}
          </span>
          {sections[currentSection].title}
        </h2>
        <p className="text-lg text-gray-600 animate-fade-in delay-150">
          {sections[currentSection].description}
        </p>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Basic Information Section */}
        {currentSection === 0 && (
          <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl p-8 shadow-lg border border-purple-100 animate-slide-up">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">🎲</span>
                        Raffle Title *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., iPhone 15 Pro Max Raffle" 
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
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">🏷️</span>
                        Batch Number (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Batch 1, Series A" 
                          className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-600">
                        If this is part of a series or batch of raffles
                      </FormDescription>
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
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">📄</span>
                      Description *
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your raffle in detail. Include any terms, conditions, and what makes it special..."
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
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">🏢</span>
                      Organization Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your business or organization name" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Prize Information Section */}
        {currentSection === 1 && (
          <div className="bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 rounded-2xl p-8 shadow-lg border border-yellow-100 animate-slide-up">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="grandPrize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">🎁</span>
                        Grand Prize *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., iPhone 15 Pro Max 256GB" 
                          className="h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300 rounded-xl"
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
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">💰</span>
                        Prize Value (PHP) *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="75000" 
                          className="h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300 rounded-xl"
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
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">🏷️</span>
                      Category *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300 rounded-xl">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Cars" className="text-lg py-3 hover:bg-purple-50">🚗 Cars</SelectItem>
                        <SelectItem value="Motorcycle" className="text-lg py-3 hover:bg-purple-50">🏍️ Motorcycle</SelectItem>
                        <SelectItem value="Gadgets" className="text-lg py-3 hover:bg-purple-50">📱 Gadgets</SelectItem>
                        <SelectItem value="Cash" className="text-lg py-3 hover:bg-purple-50">💰 Cash</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="convertibleToCash"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-yellow-400 transition-all duration-300 bg-gradient-to-r from-yellow-50/50 to-orange-50/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center cursor-pointer">
                        <span className="mr-2">💰</span>
                        Convertible to Cash
                      </FormLabel>
                      <FormDescription className="text-gray-600">
                        Check this if the winner can choose to receive cash instead of the physical prize
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grandPrizeImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">📸</span>
                      Prize Images
                    </FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300">
                        <EnhancedFileUpload
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
          </div>
        )}

        {/* Raffle Details Section */}
        {currentSection === 2 && (
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-2xl p-8 shadow-lg border border-blue-100 animate-slide-up">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="costPerSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">🎫</span>
                        Cost per Slot (PHP) *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="100" 
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 rounded-xl"
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
                  name="totalSlots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">🎯</span>
                        Total Slots *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1000" 
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 rounded-xl"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📅</span>
                  Draw Date
                </h3>
                <DrawDateField />
              </div>
            </div>
          </div>
        )}

        {/* Extra Features Section */}
        {currentSection === 3 && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-gradient-to-br from-white via-yellow-50/20 to-orange-50/20 rounded-2xl p-8 shadow-lg border border-yellow-100">
              <ConsolationPrizesSection />
            </div>
            
            <div className="bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 rounded-2xl p-8 shadow-lg border border-purple-100">
              <SlotBundlesSection />
            </div>
          </div>
        )}

        {/* Contact Information Section */}
        {currentSection === 4 && (
          <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl p-8 shadow-lg border border-green-100 animate-slide-up">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="facebookPageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">📘</span>
                      Facebook Page URL *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://facebook.com/yourpage" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-green-400 transition-all duration-300 hover:border-green-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Your official Facebook page where participants can verify your legitimacy
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="raffleLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">🔗</span>
                      Raffle Information Link *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://your-raffle-info-page.com" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-green-400 transition-all duration-300 hover:border-green-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Link to your raffle mechanics, terms, and detailed information
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buyingSlotsUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">💬</span>
                      Slot Purchase/Contact URL *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://m.me/yourpage or your contact method" 
                        className="h-12 text-lg border-2 border-gray-200 focus:border-green-400 transition-all duration-300 hover:border-green-300 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Where participants can purchase slots (Messenger, WhatsApp, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-12">
        <button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
            currentSection === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl'
          }`}
        >
          ← Previous
        </button>

        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentSection
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSection}
          disabled={currentSection === sections.length - 1}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
            currentSection === sections.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default RaffleFormFields;
