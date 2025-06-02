import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { raffleCategories } from '@/data/raffles';
const submitRaffleSchema = z.object({
  organizerName: z.string().min(2, 'Organizer name must be at least 2 characters'),
  facebookPageUrl: z.string().url('Please enter a valid Facebook page URL'),
  raffleTitle: z.string().min(5, 'Raffle title must be at least 5 characters'),
  category: z.enum(['Electronics', 'Cars', 'Cash Prizes', 'Property', 'Travel', 'Gadgets', 'Motorcycles'] as const),
  prize: z.string().min(1, 'Prize description is required'),
  prizeValue: z.number().min(1, 'Prize value must be greater than 0'),
  convertibleToCash: z.boolean(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Please enter a valid image URL'),
  entryPrice: z.number().min(1, 'Entry price must be greater than 0'),
  externalJoinUrl: z.string().url('Please enter a valid join URL (Messenger, Telegram, etc.)'),
  drawDate: z.string().min(1, 'Draw date is required'),
  location: z.string().min(2, 'Location is required')
});
type SubmitRaffleForm = z.infer<typeof submitRaffleSchema>;
const SubmitRafflePage = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const form = useForm<SubmitRaffleForm>({
    resolver: zodResolver(submitRaffleSchema),
    defaultValues: {
      convertibleToCash: false
    }
  });
  const onSubmit = async (data: SubmitRaffleForm) => {
    try {
      // In a real app, this would submit to Supabase
      console.log('Raffle submission:', data);
      toast({
        title: "Raffle Submitted Successfully!",
        description: "Your raffle has been submitted for review. We'll contact you within 24 hours.",
        duration: 5000
      });

      // Reset form
      form.reset();

      // Navigate back to home after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Submit Your Raffle
            </CardTitle>
            <p className="text-gray-600">
              List your raffle on RafflePH and reach thousands of potential participants
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="organizerName" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Organizer Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name or business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="facebookPageUrl" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Facebook Page URL *</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/yourpage" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <FormField control={form.control} name="raffleTitle" render={({
                field
              }) => <FormItem>
                      <FormLabel>Raffle Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., iPhone 15 Pro Max Giveaway" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="category" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {raffleCategories.map(category => <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="location" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Manila, Nationwide" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <FormField control={form.control} name="prize" render={({
                field
              }) => <FormItem>
                      <FormLabel>Prize Description *</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe the prize in detail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="prizeValue" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Prize Value (₱) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="entryPrice" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Entry Price (₱) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <FormField control={form.control} name="convertibleToCash" render={({
                field
              }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Prize can be converted to cash equivalent
                        </FormLabel>
                      </div>
                    </FormItem>} />

                <FormField control={form.control} name="description" render={({
                field
              }) => <FormItem>
                      <FormLabel>Description & Mechanics *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the raffle mechanics, how to join, when the draw will happen, etc." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="imageUrl" render={({
                field
              }) => <FormItem>
                      <FormLabel>Raffle Info Link *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/prize-image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="externalJoinUrl" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Join Link *</FormLabel>
                        <FormControl>
                          <Input placeholder="https://m.me/yourpage or Telegram link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="drawDate" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Draw Date *</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• All submissions are reviewed manually before going live</li>
                    <li>• Currently free to list your raffle during our beta period</li>
                    <li>• You'll be contacted within 24 hours for verification</li>
                    <li>• Make sure your Facebook page is active and responds to messages</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold" disabled={form.formState.isSubmitting}>
                  <Send className="mr-2 h-5 w-5" />
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit Raffle for Review'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default SubmitRafflePage;