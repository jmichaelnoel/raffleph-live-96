
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RaffleFormData } from './RaffleFormHandler';
import { Plus, Trash2, Gift, DollarSign } from 'lucide-react';
import ImagePreviewUpload from '@/components/ImagePreviewUpload';

const ConsolationPrizesSection = () => {
  const form = useFormContext<RaffleFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'consolationPrizes'
  });

  const addPrize = () => {
    append({
      title: '',
      value: 0,
      isCash: false,
      images: undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span className="text-3xl mr-3 animate-bounce">🏆</span>
          Consolation Prizes
          <span className="text-lg ml-2 text-gray-500">(Optional)</span>
        </h3>
        <p className="text-gray-600">Add extra prizes to make your raffle even more exciting!</p>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 rounded-xl border-2 border-dashed border-yellow-300">
          <div className="text-6xl animate-bounce mb-4">🎁</div>
          <p className="text-lg text-gray-600 mb-4">No consolation prizes yet</p>
          <p className="text-sm text-gray-500">Click the button below to add your first prize!</p>
        </div>
      )}

      {fields.map((field, index) => {
        const isCash = form.watch(`consolationPrizes.${index}.isCash`);
        
        return (
          <div key={field.id} className="bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 rounded-2xl p-6 shadow-lg border border-yellow-200 animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="mr-2">{isCash ? '💰' : '🎁'}</span>
                Prize #{index + 1}
              </h4>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="hover:scale-110 transition-transform duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`consolationPrizes.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center">
                        <Gift className="h-4 w-4 mr-2" />
                        Prize Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., AirPods Pro" 
                          className="h-11 border-2 border-gray-200 focus:border-yellow-400 transition-all duration-300 rounded-xl"
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
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Value (PHP)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="15000" 
                          className="h-11 border-2 border-gray-200 focus:border-yellow-400 transition-all duration-300 rounded-xl"
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
                name={`consolationPrizes.${index}.isCash`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-xl border-2 border-dashed border-gray-300 p-4 hover:border-yellow-400 transition-all duration-300 bg-gradient-to-r from-yellow-50/50 to-orange-50/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center cursor-pointer">
                        <span className="mr-2">💰</span>
                        This is a cash prize
                      </FormLabel>
                      <p className="text-sm text-gray-600">
                        Check this if the prize is cash instead of a physical item
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {!isCash && (
                <div className="animate-slide-up">
                  <FormField
                    control={form.control}
                    name={`consolationPrizes.${index}.images`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-700 flex items-center">
                          <span className="mr-2">📸</span>
                          Prize Images
                        </FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-400 transition-all duration-300">
                            <ImagePreviewUpload
                              onFileUpload={field.onChange}
                              maxFiles={3}
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

              {isCash && (
                <div className="text-center py-4 animate-fade-in">
                  <div className="text-4xl animate-bounce mb-2">💵</div>
                  <p className="text-gray-600">Cash prize - no image needed!</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="text-center">
        <Button
          type="button"
          onClick={addPrize}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Consolation Prize
        </Button>
      </div>
    </div>
  );
};

export default ConsolationPrizesSection;
