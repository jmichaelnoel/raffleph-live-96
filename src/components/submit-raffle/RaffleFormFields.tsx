
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RaffleFormData } from './RaffleFormHandler';
import EnhancedFileUpload from '@/components/EnhancedFileUpload';
import DrawDateField from './DrawDateField';

interface RaffleFormFieldsProps {
  form: UseFormReturn<RaffleFormData>;
}

const RaffleFormFields: React.FC<RaffleFormFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raffle Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., iPhone 15 Pro Max Raffle" {...field} />
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
                <FormLabel>Batch Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Batch 1, Series A" {...field} />
                </FormControl>
                <FormDescription>
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
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your raffle in detail. Include any terms, conditions, and what makes it special..."
                  className="min-h-[100px]"
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
              <FormLabel>Organization Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your business or organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Prize Information Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🏆 Prize Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="grandPrize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grand Prize *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., iPhone 15 Pro Max 256GB" {...field} />
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
                <FormLabel>Prize Value (PHP) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="75000" 
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
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
          name="convertibleToCash"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  💰 Convertible to Cash
                </FormLabel>
                <FormDescription>
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
              <FormLabel>Prize Images</FormLabel>
              <FormControl>
                <EnhancedFileUpload
                  onFilesChange={field.onChange}
                  maxFiles={5}
                  accept="image/*"
                  title="Upload Prize Images"
                  description="Upload up to 5 high-quality images of your prize"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Raffle Details Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Raffle Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="costPerSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost per Slot (PHP) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="100" 
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
                <FormLabel>Total Slots *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1000" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DrawDateField />
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📞 Contact Information</h2>
        
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="facebookPageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Page URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/yourpage" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormLabel>Raffle Information Link *</FormLabel>
                <FormControl>
                  <Input placeholder="https://your-raffle-info-page.com" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormLabel>Slot Purchase/Contact URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://m.me/yourpage or your contact method" {...field} />
                </FormControl>
                <FormDescription>
                  Where participants can purchase slots (Messenger, WhatsApp, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default RaffleFormFields;
