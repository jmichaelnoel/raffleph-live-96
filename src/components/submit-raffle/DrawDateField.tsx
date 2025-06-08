
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
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="isDrawDateTBD"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Draw date not finalized yet
              </FormLabel>
              <div className="text-sm text-muted-foreground">
                Toggle this if you haven't decided on a specific draw date
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

      {!isDateTBD && (
        <FormField
          control={form.control}
          name="drawDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Draw Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default DrawDateField;
