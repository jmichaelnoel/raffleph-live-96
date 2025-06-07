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
import ImagePreviewUpload from '@/components/ImagePreviewUpload';

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
    <div className="space-y-8">
      {/* Floating animations */}
      <div className="absolute top-10 left-10 text-2xl animate-bounce delay-100 opacity-20">✨</div>
      <div className="absolute top-20 right-20 text-xl animate-float-gently delay-300 opacity-20">🎁</div>
      <div className="absolute bottom-20 left-20 text-xl animate-pulse delay-500 opacity-20">🚀</div>

      {/* Basic Information */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 rounded-2xl border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-pink-100/20 to-blue-100/20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl animate-bounce">📝</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Basic Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Raffle Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., iPhone 16 Pro Max Giveaway" 
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl transition-all duration-300"
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
                  <FormLabel className="text-gray-700 font-semibold">Batch Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Batch 140" 
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl transition-all duration-300"
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
              <FormItem className="mt-6">
                <FormLabel className="text-gray-700 font-semibold">Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell everyone about your amazing raffle! What makes it special? 🌟"
                    rows={4}
                    className="border-2 border-purple-200 focus:border-purple-400 rounded-xl transition-all duration-300"
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
              <FormItem className="mt-6">
                <FormLabel className="text-gray-700 font-semibold">Organization Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your organization or business name" 
                    className="border-2 border-purple-200 focus:border-purple-400 rounded-xl transition-all duration-300"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Prize Information */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 via-emerald-100/20 to-teal-100/20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl animate-pulse">🏆</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Prize Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="grandPrize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Grand Prize *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., iPhone 16 Pro Max 1TB" 
                      className="border-2 border-green-200 focus:border-green-400 rounded-xl transition-all duration-300"
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
                  <FormLabel className="text-gray-700 font-semibold">Prize Value (₱) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="89000"
                      className="border-2 border-green-200 focus:border-green-400 rounded-xl transition-all duration-300"
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
              <FormItem className="mt-6">
                <FormLabel className="text-gray-700 font-semibold">Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-green-200 focus:border-green-400 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Select category" />
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
              <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-green-200 p-6 mt-6 bg-white/50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-semibold text-gray-700">💰 Convertible to Cash</FormLabel>
                  <div className="text-sm text-gray-600">
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
              <FormItem className="mt-6">
                <FormLabel className="text-gray-700 font-semibold">📸 Grand Prize Images</FormLabel>
                <FormControl>
                  <ImagePreviewUpload
                    onFileUpload={field.onChange}
                    maxFiles={5}
                    acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Raffle Details */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-amber-100/20 to-yellow-100/20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl animate-spin-slow">🎯</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Raffle Details
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="costPerSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Cost per Slot (₱) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="50"
                      className="border-2 border-orange-200 focus:border-orange-400 rounded-xl transition-all duration-300"
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
                  <FormLabel className="text-gray-700 font-semibold">Total Slots *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1500"
                      className="border-2 border-orange-200 focus:border-orange-400 rounded-xl transition-all duration-300"
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
                  <FormLabel className="text-gray-700 font-semibold">Draw Date *</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="border-2 border-orange-200 focus:border-orange-400 rounded-xl transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl animate-bounce delay-200">🔗</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Links & Contact
            </h3>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="facebookPageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Facebook Page URL *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://facebook.com/yourpage" 
                      className="border-2 border-blue-200 focus:border-blue-400 rounded-xl transition-all duration-300"
                      {...field} 
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
                  <FormLabel className="text-gray-700 font-semibold">Raffle Post/Link *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://facebook.com/yourpage/posts/123456" 
                      className="border-2 border-blue-200 focus:border-blue-400 rounded-xl transition-all duration-300"
                      {...field} 
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
                  <FormLabel className="text-gray-700 font-semibold">Buying Slots URL *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://m.me/yourpage or buying instructions link" 
                      className="border-2 border-blue-200 focus:border-blue-400 rounded-xl transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Consolation Prizes */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-8 rounded-2xl border-2 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-rose-100/20 to-red-100/20"></div>
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce delay-400">🎁</span>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Consolation Prizes
              </h3>
            </div>
            <Button 
              type="button" 
              onClick={addConsolationPrize} 
              variant="outline" 
              size="sm"
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Prize
            </Button>
          </div>
          
          {consolationPrizes.map((prize, index) => (
            <div key={index} className="border-2 border-pink-200 rounded-xl p-6 mb-6 last:mb-0 bg-white/50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-gray-700">🏅 Prize {index + 1}</h4>
                <Button 
                  type="button" 
                  onClick={() => removeConsolationPrize(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 rounded-lg"
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
                      <FormLabel className="text-gray-700 font-semibold">Prize Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., AirPods Pro or ₱5,000 Cash" 
                          className="border-2 border-pink-200 focus:border-pink-400 rounded-xl transition-all duration-300"
                          {...field} 
                        />
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
                      <FormLabel className="text-gray-700 font-semibold">Value (₱)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5000"
                          className="border-2 border-pink-200 focus:border-pink-400 rounded-xl transition-all duration-300"
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
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-pink-200 p-4 mt-4 bg-white/50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-semibold text-gray-700">💰 Cash Prize</FormLabel>
                      <div className="text-sm text-gray-600">
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

              {/* Show image upload only if it's not a cash prize */}
              {!prize.isCash && (
                <FormField
                  control={form.control}
                  name={`consolationPrizes.${index}.images`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-gray-700 font-semibold">📸 Prize Images</FormLabel>
                      <FormControl>
                        <ImagePreviewUpload
                          onFileUpload={field.onChange}
                          maxFiles={3}
                          acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bundle Pricing */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 p-8 rounded-2xl border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 via-teal-100/20 to-emerald-100/20"></div>
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-pulse delay-600">💎</span>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Bundle Pricing
              </h3>
            </div>
            <Button 
              type="button" 
              onClick={addBundlePricing} 
              variant="outline" 
              size="sm"
              className="border-2 border-cyan-300 text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Bundle
            </Button>
          </div>
          
          {bundlePricing.map((_, index) => (
            <div key={index} className="border-2 border-cyan-200 rounded-xl p-6 mb-6 last:mb-0 bg-white/50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-gray-700">📦 Bundle {index + 1}</h4>
                <Button 
                  type="button" 
                  onClick={() => removeBundlePricing(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 rounded-lg"
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
                      <FormLabel className="text-gray-700 font-semibold">Number of Slots</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5"
                          className="border-2 border-cyan-200 focus:border-cyan-400 rounded-xl transition-all duration-300"
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
                      <FormLabel className="text-gray-700 font-semibold">Bundle Price (₱)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="200"
                          className="border-2 border-cyan-200 focus:border-cyan-400 rounded-xl transition-all duration-300"
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
    </div>
  );
};

export default RaffleFormFields;
