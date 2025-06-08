
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RaffleFormData } from './RaffleFormHandler';

const DrawDateField = () => {
  const form = useFormContext<RaffleFormData>();
  const isDateTBD = form.watch('isDrawDateTBD');

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="isDrawDateTBD"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-dashed border-blue-300 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:border-blue-400 transition-all duration-300">
            <div className="space-y-2 flex-1">
              <FormLabel className="text-lg font-semibold text-gray-800 flex items-center cursor-pointer">
                <span className="text-2xl mr-3 animate-bounce">🤔</span>
                Draw date not finalized yet
              </FormLabel>
              <div className="text-sm text-gray-600">
                Toggle this if you haven't decided on a specific draw date yet
              </div>
            </div>
            <FormControl>
              <div className="relative">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 scale-125"
                />
                {field.value && (
                  <div className="absolute -top-1 -right-1 text-xs animate-pulse">
                    ✨
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      {!isDateTBD && (
        <div className="animate-slide-up">
          <FormField
            control={form.control}
            name="drawDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="mr-2 text-2xl animate-pulse">📅</span>
                  Draw Date
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="date"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 rounded-xl pl-12"
                      {...field}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none">
                      📅
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {isDateTBD && (
        <div className="text-center py-6 animate-fade-in">
          <div className="text-6xl animate-bounce mb-3">🎲</div>
          <p className="text-lg font-semibold text-gray-700 mb-2">Date is TBD!</p>
          <p className="text-gray-600">We'll announce the draw date later</p>
        </div>
      )}
    </div>
  );
};

export default DrawDateField;
