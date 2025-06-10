
import { supabase } from '@/integrations/supabase/client';

export const insertSampleRaffles = async () => {
  try {
    console.log('Inserting sample raffles...');
    
    const sampleRaffles = [
      {
        title: 'iPhone 16 Pro Max Giveaway',
        description: 'Win the latest iPhone 16 Pro Max with 1TB storage. Brand new, sealed, and unlocked for all networks in the Philippines. Drawing will be done via Facebook Live.',
        slug: 'iphone-16-pro-max-giveaway-' + Date.now(),
        grand_prize: 'iPhone 16 Pro Max 1TB',
        grand_prize_value: 89000,
        grand_prize_images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'],
        convertible_to_cash: false,
        category: 'Gadgets' as const,
        cost_per_slot: 50,
        total_slots: 1500,
        draw_date: '2025-06-15T23:59:59+00:00',
        organization_name: 'TechPH Raffles',
        facebook_page_url: 'https://facebook.com/techphraffles',
        raffle_link: 'https://facebook.com/techphraffles/posts/123456',
        buying_slots_url: 'https://m.me/techphraffles',
        approved: true
      },
      {
        title: 'Brand New Toyota Vios 2025',
        description: 'Drive home a brand new Toyota Vios 2025 model. Complete with 3-year warranty and full insurance coverage. Perfect for your family needs!',
        slug: 'toyota-vios-2025-' + Date.now(),
        grand_prize: 'Toyota Vios 2025',
        grand_prize_value: 850000,
        grand_prize_images: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'],
        convertible_to_cash: true,
        category: 'Cars' as const,
        cost_per_slot: 200,
        total_slots: 2000,
        draw_date: '2025-09-30T23:59:59+00:00',
        organization_name: 'AutoDream PH',
        facebook_page_url: 'https://facebook.com/autodreamph',
        raffle_link: 'https://facebook.com/autodreamph/posts/789012',
        buying_slots_url: 'https://m.me/autodreamph',
        approved: true
      },
      {
        title: 'Cash Prize ₱100,000',
        description: 'Win ₱100,000 cash directly deposited to your bank account. No questions asked, pure cash prize. Drawing every Sunday via Facebook Live.',
        slug: 'cash-prize-100k-' + Date.now(),
        grand_prize: '₱100,000 Cash',
        grand_prize_value: 100000,
        grand_prize_images: ['https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'],
        convertible_to_cash: true,
        category: 'Cash' as const,
        cost_per_slot: 25,
        total_slots: 5000,
        draw_date: '2025-06-20T23:59:59+00:00',
        organization_name: 'CashWin Philippines',
        facebook_page_url: 'https://facebook.com/cashwinph',
        raffle_link: 'https://facebook.com/cashwinph/posts/345678',
        buying_slots_url: 'https://m.me/cashwinph',
        approved: true
      }
    ];

    const { data: insertedRaffles, error } = await supabase
      .from('raffles')
      .insert(sampleRaffles)
      .select();

    if (error) {
      console.error('Error inserting sample raffles:', error);
      return;
    }

    console.log('Sample raffles inserted successfully:', insertedRaffles);

    // Add some consolation prizes for the first raffle
    if (insertedRaffles && insertedRaffles.length > 0) {
      const consolationPrizes = [
        {
          raffle_id: insertedRaffles[0].id,
          title: '₱5,000 Cash',
          value: 5000,
          is_cash: true,
          images: []
        },
        {
          raffle_id: insertedRaffles[0].id,
          title: 'AirPods Pro',
          value: 15000,
          is_cash: false,
          images: ['https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400']
        }
      ];

      const { error: consolationError } = await supabase
        .from('consolation_prizes')
        .insert(consolationPrizes);

      if (consolationError) {
        console.error('Error inserting consolation prizes:', consolationError);
      } else {
        console.log('Consolation prizes inserted successfully');
      }

      // Add bundle pricing for the first raffle
      const bundlePricing = [
        {
          raffle_id: insertedRaffles[0].id,
          slots: 5,
          price: 200
        },
        {
          raffle_id: insertedRaffles[0].id,
          slots: 10,
          price: 350
        }
      ];

      const { error: bundleError } = await supabase
        .from('bundle_pricing')
        .insert(bundlePricing);

      if (bundleError) {
        console.error('Error inserting bundle pricing:', bundleError);
      } else {
        console.log('Bundle pricing inserted successfully');
      }
    }

  } catch (error) {
    console.error('Unexpected error inserting sample data:', error);
  }
};
