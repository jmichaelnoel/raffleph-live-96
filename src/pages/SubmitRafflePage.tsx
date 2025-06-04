import React from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useAuditLog } from '@/hooks/useAuditLog';

const formSchema = z.object({
  raffleName: z.string().min(2, {
    message: "Raffle name must be at least 2 characters.",
  }),
  raffleDescription: z.string().min(10, {
    message: "Raffle description must be at least 10 characters.",
  }),
  prizeValue: z.coerce.number().min(1, {
    message: "Prize value must be at least 1.",
  }),
  ticketPrice: z.coerce.number().min(1, {
    message: "Ticket price must be at least 1.",
  }),
  endDate: z.date({
    required_error: "Please select an end date.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

const SubmitRafflePage: React.FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logAction } = useAuditLog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raffleName: "",
      raffleDescription: "",
      prizeValue: 1000,
      ticketPrice: 100,
      endDate: new Date(),
      category: "",
      imageUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "You must be signed in to submit a raffle.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('raffles')
        .insert([
          {
            ...values,
            userId: user.id,
            createdAt: new Date(),
          },
        ]);

      if (error) {
        console.error('Error submitting raffle:', error);
        toast({
          title: "Error submitting raffle.",
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Raffle submitted successfully!",
        description: "Your raffle is now awaiting approval.",
      });

      await logAction('create', 'raffles', data?.[0]?.id, null, values);

      navigate('/');
    } catch (error) {
      console.error('Unexpected error submitting raffle:', error);
      toast({
        title: "Unexpected error.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="container py-24">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Submit a Raffle</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="raffleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raffle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Raffle Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your raffle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="raffleDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raffle Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Raffle Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what the raffle is for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prizeValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Value</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Prize Value" {...field} />
                    </FormControl>
                    <FormDescription>
                      The value of the prize in Philippine Peso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticketPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ticket Price" {...field} />
                    </FormControl>
                    <FormDescription>
                      The price of each ticket in Philippine Peso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Raffle End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date the raffle will end.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Gadgets">Gadgets</SelectItem>
                        <SelectItem value="Cars">Cars</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The category of the raffle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL of the image for the raffle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitRafflePage;
