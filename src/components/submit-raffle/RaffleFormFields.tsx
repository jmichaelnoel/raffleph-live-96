
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { RaffleFormData } from './RaffleFormHandler';
import EnhancedFileUpload from '@/components/EnhancedFileUpload';

interface RaffleFormFieldsProps {
  form: UseFormReturn<RaffleFormData>;
}

const RaffleFormFields: React.FC<RaffleFormFieldsProps> = ({ form }) => {
  const { watch, setValue } = form;
  const consolationPrizes = watch('consolationPrizes') || [];
  const bundlePricing = watch('bundlePricing') || [];

  const addConsolationPrize = () => {
    setValue('consolationPrizes', [
      ...consolationPrizes,
      { title: '', value: 0, isCash: false }
    ]);
  };

  const removeConsolationPrize = (index: number) => {
    setValue('consolationPrizes', consolationPrizes.filter((_, i) => i !== index));
  };

  const addBundlePricing = () => {
    setValue('bundlePricing', [
      ...bundlePricing,
      { slots: 1, price: 0 }
    ]);
  };

  const removeBundlePricing = (index: number) => {
    setValue('bundlePricing', bundlePricing.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raffle Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., iPhone 16 Pro Max Giveaway" {...field} />
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
                <FormLabel>Batch Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Batch 140" {...field} />
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
            <FormItem className="mt-4">
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detailed description of your raffle..."
                  rows={4}
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
            <FormItem className="mt-4">
              <FormLabel>Organization Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your organization or business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Prize Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Prize Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="grandPrize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grand Prize *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., iPhone 16 Pro Max 1TB" {...field} />
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
                <FormLabel>Prize Value (₱) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="89000"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
            <FormItem className="mt-4">
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cars">Cars</SelectItem>
                  <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="Gadgets">Gadgets</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Convertible to Cash</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Winner can choose cash equivalent instead of the prize
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grandPrizeImages"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Grand Prize Images</FormLabel>
              <FormControl>
                <EnhancedFileUpload
                  onFilesChange={field.onChange}
                  maxFiles={5}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Raffle Details */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Raffle Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="costPerSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost per Slot (₱) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="50"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                    placeholder="1500"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="drawDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Draw Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Links */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Links & Contact</h3>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="facebookPageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Page URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/yourpage" {...field} />
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
                <FormLabel>Raffle Post/Link *</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/yourpage/posts/123456" {...field} />
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
                <FormLabel>Buying Slots URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://m.me/yourpage or buying instructions link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Consolation Prizes */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Consolation Prizes</h3>
          <Button type="button" onClick={addConsolationPrize} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Prize
          </Button>
        </div>
        
        {consolationPrizes.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 last:mb-0">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium">Prize {index + 1}</h4>
              <Button 
                type="button" 
                onClick={() => removeConsolationPrize(index)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`consolationPrizes.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AirPods Pro or ₱5,000 Cash" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`consolationPrizes.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value (₱)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`consolationPrizes.${index}.isCash`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Cash Prize</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Check if this is a cash prize
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      {/* Bundle Pricing */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Bundle Pricing</h3>
          <Button type="button" onClick={addBundlePricing} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Bundle
          </Button>
        </div>
        
        {bundlePricing.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 last:mb-0">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium">Bundle {index + 1}</h4>
              <Button 
                type="button" 
                onClick={() => removeBundlePricing(index)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`bundlePricing.${index}.slots`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Slots</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`bundlePricing.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bundle Price (₱)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="200"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaffleFormFields;
