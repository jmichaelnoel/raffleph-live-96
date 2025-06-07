
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get current date
    const today = new Date().toISOString().split('T')[0]
    
    console.log(`Checking for expired raffles before ${today}`)

    // Find raffles that have expired (draw_date is in the past)
    const { data: expiredRaffles, error: fetchError } = await supabaseClient
      .from('raffles')
      .select('id, title, draw_date')
      .eq('approved', true)
      .lt('draw_date', today)

    if (fetchError) {
      throw fetchError
    }

    console.log(`Found ${expiredRaffles?.length || 0} expired raffles`)

    if (expiredRaffles && expiredRaffles.length > 0) {
      // Update expired raffles to be unapproved (hide them from public view)
      const { error: updateError } = await supabaseClient
        .from('raffles')
        .update({ approved: false, raffle_status: 'expired' })
        .in('id', expiredRaffles.map(r => r.id))

      if (updateError) {
        throw updateError
      }

      console.log(`Successfully marked ${expiredRaffles.length} raffles as expired`)
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Processed ${expiredRaffles.length} expired raffles`,
          expiredRaffles: expiredRaffles.map(r => ({
            id: r.id,
            title: r.title,
            drawDate: r.draw_date
          }))
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No expired raffles found',
          expiredRaffles: []
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error in cleanup function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
