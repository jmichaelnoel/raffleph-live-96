
-- Create enum types
CREATE TYPE public.raffle_category AS ENUM ('Cars', 'Motorcycle', 'Gadgets', 'Cash');

-- Create raffles table
CREATE TABLE public.raffles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  batch_number TEXT,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  grand_prize TEXT NOT NULL,
  grand_prize_value NUMERIC NOT NULL CHECK (grand_prize_value > 0),
  grand_prize_images TEXT[] DEFAULT '{}',
  convertible_to_cash BOOLEAN DEFAULT FALSE,
  category raffle_category NOT NULL,
  cost_per_slot NUMERIC NOT NULL CHECK (cost_per_slot > 0),
  total_slots INTEGER NOT NULL CHECK (total_slots > 0),
  draw_date TIMESTAMPTZ,
  organization_name TEXT NOT NULL,
  facebook_page_url TEXT NOT NULL,
  raffle_link TEXT NOT NULL,
  buying_slots_url TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create consolation prizes table
CREATE TABLE public.consolation_prizes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  raffle_id UUID NOT NULL REFERENCES public.raffles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value NUMERIC NOT NULL CHECK (value >= 0),
  is_cash BOOLEAN DEFAULT FALSE,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bundle pricing table
CREATE TABLE public.bundle_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  raffle_id UUID NOT NULL REFERENCES public.raffles(id) ON DELETE CASCADE,
  slots INTEGER NOT NULL CHECK (slots > 0),
  price NUMERIC NOT NULL CHECK (price > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(raffle_id, slots)
);

-- Create SEO settings table
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT,
  site_description TEXT,
  default_social_image TEXT,
  favicon_url TEXT,
  og_site_name TEXT,
  twitter_handle TEXT,
  theme_color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolation_prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for raffles (public read, admin write)
CREATE POLICY "Anyone can view approved raffles" ON public.raffles
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can submit raffles" ON public.raffles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update raffles" ON public.raffles
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete raffles" ON public.raffles
  FOR DELETE USING (true);

-- Create RLS policies for consolation prizes
CREATE POLICY "Anyone can view consolation prizes" ON public.consolation_prizes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.raffles 
      WHERE raffles.id = consolation_prizes.raffle_id 
      AND raffles.approved = true
    )
  );

CREATE POLICY "Anyone can insert consolation prizes" ON public.consolation_prizes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update consolation prizes" ON public.consolation_prizes
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete consolation prizes" ON public.consolation_prizes
  FOR DELETE USING (true);

-- Create RLS policies for bundle pricing
CREATE POLICY "Anyone can view bundle pricing" ON public.bundle_pricing
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.raffles 
      WHERE raffles.id = bundle_pricing.raffle_id 
      AND raffles.approved = true
    )
  );

CREATE POLICY "Anyone can insert bundle pricing" ON public.bundle_pricing
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update bundle pricing" ON public.bundle_pricing
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete bundle pricing" ON public.bundle_pricing
  FOR DELETE USING (true);

-- Create RLS policies for SEO settings (public read, admin write)
CREATE POLICY "Anyone can view SEO settings" ON public.seo_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage SEO settings" ON public.seo_settings
  FOR ALL USING (true);

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug = '' OR NEW.slug IS NULL THEN
    NEW.slug := lower(regexp_replace(
      regexp_replace(NEW.title, '[^a-zA-Z0-9\s]', '', 'g'),
      '\s+', '-', 'g'
    )) || '-' || extract(epoch from now())::text;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-generating slugs
CREATE TRIGGER trigger_generate_slug
  BEFORE INSERT ON public.raffles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_slug_from_title();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER trigger_raffles_updated_at
  BEFORE UPDATE ON public.raffles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_seo_settings_updated_at
  BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('raffle-images', 'raffle-images', true),
  ('prize-images', 'prize-images', true),
  ('seo-images', 'seo-images', true);

-- Create storage policies (public access for all buckets)
CREATE POLICY "Anyone can view raffle images" ON storage.objects
  FOR SELECT USING (bucket_id = 'raffle-images');

CREATE POLICY "Anyone can upload raffle images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'raffle-images');

CREATE POLICY "Anyone can update raffle images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'raffle-images');

CREATE POLICY "Anyone can delete raffle images" ON storage.objects
  FOR DELETE USING (bucket_id = 'raffle-images');

CREATE POLICY "Anyone can view prize images" ON storage.objects
  FOR SELECT USING (bucket_id = 'prize-images');

CREATE POLICY "Anyone can upload prize images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'prize-images');

CREATE POLICY "Anyone can update prize images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'prize-images');

CREATE POLICY "Anyone can delete prize images" ON storage.objects
  FOR DELETE USING (bucket_id = 'prize-images');

CREATE POLICY "Anyone can view SEO images" ON storage.objects
  FOR SELECT USING (bucket_id = 'seo-images');

CREATE POLICY "Anyone can upload SEO images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'seo-images');

CREATE POLICY "Anyone can update SEO images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'seo-images');

CREATE POLICY "Anyone can delete SEO images" ON storage.objects
  FOR DELETE USING (bucket_id = 'seo-images');

-- Insert default SEO settings
INSERT INTO public.seo_settings (
  site_title,
  site_description,
  default_social_image,
  favicon_url,
  og_site_name,
  twitter_handle,
  theme_color
) VALUES (
  'RafflePH - Win Cars, Millions in Cash, and More | No Sign-up Required',
  'Win cars, millions in cash, and more — no sign-up required. Para sa pamilya, para sa pangarap — ito na ''yon! Join exciting online raffles in the Philippines with entry fees starting at ₱20.',
  '/lovable-uploads/adc5bb76-0107-4448-9683-195bd554314c.png',
  '/favicon.ico',
  'RafflePH',
  '@PhilippineRaffles',
  '#6366f1'
);
