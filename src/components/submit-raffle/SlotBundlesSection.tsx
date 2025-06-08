
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RaffleFormData } from './RaffleFormHandler';
import { Plus, Trash2, Package, DollarSign } from 'lucide-react';

const SlotBundlesSection = () => {
  const form = useFormContext<RaffleFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'bundlePricing'
  });

  const addBundle = () => {
    append({
      slots: 0,
      price: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span className="text-3xl mr-3 animate-bounce">📦</span>
          Slot Bundles
          <span className="text-lg ml-2 text-gray-500">(Optional)</span>
        </h3>
        <p className="text-gray-600">Offer discounted bundles to encourage bulk purchases!</p>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl border-2 border-dashed border-purple-300">
          <div className="text-6xl animate-bounce mb-4">📦</div>
          <p className="text-lg text-gray-600 mb-4">No slot bundles yet</p>
          <p className="text-sm text-gray-500">Create bundles to offer better deals!</p>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl p-6 shadow-lg border border-purple-200 animate-slide-up">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Bundle #{index + 1}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`bundlePricing.${index}.slots`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Number of Slots
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5" 
                      className="h-11 border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 rounded-xl"
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
              name={`bundlePricing.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Bundle Price (PHP)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="450" 
                      className="h-11 border-2 border-gray-200 focus:border-purple-400 transition-all duration-300 rounded-xl"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Price comparison display */}
          {form.watch(`bundlePricing.${index}.slots`) > 0 && form.watch(`bundlePricing.${index}.price`) > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Regular price: ₱{(form.watch(`bundlePricing.${index}.slots`) * form.watch('costPerSlot')).toLocaleString()}
                </span>
                <span className="text-green-600 font-semibold">
                  Bundle saves: ₱{Math.max(0, (form.watch(`bundlePricing.${index}.slots`) * form.watch('costPerSlot')) - form.watch(`bundlePricing.${index}.price`)).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-center">
        <Button
          type="button"
          onClick={addBundle}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Slot Bundle
        </Button>
      </div>
    </div>
  );
};

export default SlotBundlesSection;
