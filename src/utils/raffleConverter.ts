
import { SupabaseRaffle } from '@/hooks/useSupabaseRaffles';
import { Raffle } from '@/data/raffles';

export const convertSupabaseRaffleToRaffle = (supabaseRaffle: SupabaseRaffle): Raffle => {
  const daysUntilDraw = Math.max(0, Math.ceil(
    (new Date(supabaseRaffle.draw_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ));

  // Calculate winning percentage (simplified calculation)
  const winningPercentage = 1 / supabaseRaffle.total_slots;

  return {
    id: supabaseRaffle.id,
    title: supabaseRaffle.title,
    description: supabaseRaffle.description,
    imageUrl: supabaseRaffle.grand_prize_images[0] || 'https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    grandPrizeImages: supabaseRaffle.grand_prize_images,
    category: supabaseRaffle.category,
    prize: supabaseRaffle.grand_prize_value,
    bettingCost: supabaseRaffle.cost_per_slot,
    winningPercentage,
    endDate: supabaseRaffle.draw_date + 'T23:59:59',
    organization: supabaseRaffle.organization_name,
    featured: false, // We can add logic for this later
    entriesLeft: supabaseRaffle.total_slots,
    totalSlots: supabaseRaffle.total_slots,
    externalJoinUrl: supabaseRaffle.raffle_link,
    messengerLink: supabaseRaffle.buying_slots_url,
    organizerFacebookUrl: supabaseRaffle.facebook_page_url,
    convertibleToCash: supabaseRaffle.convertible_to_cash,
    batchNumber: supabaseRaffle.batch_number || undefined,
    mechanics: `Contact us via our Facebook page or messenger to reserve your slots. Draw will be conducted live on Facebook.`,
    consolationPrizes: supabaseRaffle.consolation_prizes?.map(prize => ({
      name: prize.is_cash ? `₱${prize.value.toLocaleString()} Cash` : prize.title,
      isCash: prize.is_cash,
      image: prize.images[0]
    })),
    bundlePricing: supabaseRaffle.bundle_pricing?.map(bundle => ({
      slots: bundle.slots,
      price: bundle.price,
      savings: (bundle.slots * supabaseRaffle.cost_per_slot) - bundle.price
    }))
  };
};
