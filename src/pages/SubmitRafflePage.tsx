
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
import { Send, Sparkles, Gift, Zap, Trophy, Star, Clock, Crown, Coins, Target } from 'lucide-react';
import { raffleCategories } from '@/data/raffles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  const { toast } = useToast();
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
        title: "🎉 Raffle Submitted Successfully!",
        description: "Your raffle has been submitted for review. We'll contact you within 24 hours with next steps!",
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

  return (
    <div className="min-h-screen">
      <Header onSearchChange={() => {}} />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 animate-float-gentle">
          <Sparkles className="h-6 w-6 text-pink-400 opacity-60" />
        </div>
        <div className="absolute top-20 right-16 animate-bounce-slow delay-500">
          <Gift className="h-8 w-8 text-purple-400 opacity-70" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float-gentle delay-700">
          <Trophy className="h-7 w-7 text-yellow-400 opacity-80" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse delay-300">
          <Star className="h-5 w-5 text-blue-400 opacity-60" />
        </div>
        <div className="absolute bottom-1/3 right-10 animate-float-gentle delay-200">
          <Crown className="h-6 w-6 text-orange-400 opacity-70" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* FREE Limited Time Banner */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold text-lg shadow-2xl animate-pulse border-4 border-white">
              <Clock className="inline mr-2 h-5 w-5" />
              🎊 FREE SUBMISSION - LIMITED TIME ONLY! 🎊
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="inline-block animate-bounce delay-100">🚀</span>
              <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                Launch Your Raffle
              </span>
              <span className="inline-block animate-bounce delay-300">✨</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-purple-100 animate-fade-in delay-1">
              Join thousands of successful raffle organizers on RafflePH! 
              <br />
              <span className="text-yellow-300 font-semibold">Reach millions of participants across the Philippines! 🇵🇭</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in delay-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold text-lg mb-2">Massive Reach</h3>
                <p className="text-purple-100">Get exposure to thousands of eager participants</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-lg mb-2">100% FREE</h3>
                <p className="text-purple-100">No fees during our beta period - save hundreds!</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">Quick Setup</h3>
                <p className="text-purple-100">Live within 24 hours after approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm relative z-10">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                <Gift className="h-8 w-8" />
                Submit Your Amazing Raffle
                <Sparkles className="h-8 w-8 animate-spin-slow" />
              </CardTitle>
              <p className="text-purple-100 text-lg">
                Fill out the form below and join the RafflePH community today! 🎯
              </p>
            </CardHeader>

            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="organizerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            Organizer Name *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name or business name" 
                              {...field} 
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facebookPageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Zap className="h-4 w-4 text-blue-500" />
                            Facebook Page URL *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://facebook.com/yourpage" 
                              {...field}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="raffleTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Raffle Title *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., iPhone 15 Pro Max Giveaway" 
                            {...field}
                            className="border-2 border-purple-200 focus:border-purple-400 rounded-lg text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Target className="h-4 w-4 text-green-500" />
                            Category *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-lg">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {raffleCategories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Trophy className="h-4 w-4 text-purple-500" />
                            Location *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Manila, Nationwide" 
                              {...field}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="prize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Gift className="h-4 w-4 text-red-500" />
                          Prize Description *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Describe the prize in detail" 
                            {...field}
                            className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="prizeValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            Prize Value (₱) *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50000" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="entryPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Coins className="h-4 w-4 text-green-500" />
                            Entry Price (₱) *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="convertibleToCash"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            Prize can be converted to cash equivalent
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Zap className="h-4 w-4 text-blue-500" />
                          Description & Mechanics *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the raffle mechanics, how to join, when the draw will happen, etc." 
                            className="min-h-[100px] border-2 border-purple-200 focus:border-purple-400 rounded-lg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Star className="h-4 w-4 text-pink-500" />
                          Raffle Info Link *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/prize-image.jpg" 
                            {...field}
                            className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="externalJoinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Zap className="h-4 w-4 text-orange-500" />
                            Join Link *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://m.me/yourpage or Telegram link" 
                              {...field}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
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
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Clock className="h-4 w-4 text-red-500" />
                            Draw Date *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="datetime-local" 
                              {...field}
                              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-lg">
                    <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      🎊 Amazing Benefits During Beta Period:
                    </h3>
                    <ul className="text-gray-700 space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-green-700">💰 100% FREE listing (Save ₱500+ per raffle!)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>⚡ Super fast review - live within 24 hours</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>📱 Personal support from our team</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <span>🚀 Featured placement for early adopters</span>
                      </li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                    style={{
                      background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
                    }}
                    disabled={form.formState.isSubmitting}
                  >
                    <Send className="mr-3 h-6 w-6" />
                    {form.formState.isSubmitting ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Your Amazing Raffle...
                      </>
                    ) : (
                      <>
                        🚀 Submit My Raffle for FREE Review! 
                        <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitRafflePage;
