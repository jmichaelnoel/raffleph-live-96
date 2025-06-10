
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { insertSampleRaffles } from '@/utils/sampleData';

const DatabaseTest = () => {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [seoSettings, setSeoSettings] = useState<any>(null);

  const fetchRaffles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('raffles')
        .select(`
          *,
          consolation_prizes(*),
          bundle_pricing(*)
        `)
        .eq('approved', true)
        .limit(5);

      if (error) {
        console.error('Error fetching raffles:', error);
      } else {
        setRaffles(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching SEO settings:', error);
      } else {
        setSeoSettings(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleInsertSampleData = async () => {
    await insertSampleRaffles();
    await fetchRaffles();
  };

  useEffect(() => {
    fetchRaffles();
    fetchSEOSettings();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={fetchRaffles} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Raffles'}
            </Button>
            <Button onClick={handleInsertSampleData} variant="outline">
              Insert Sample Data
            </Button>
          </div>
          
          {seoSettings && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ SEO Settings Found</h3>
              <p className="text-green-700">Site Title: {seoSettings.site_title}</p>
            </div>
          )}

          {raffles.length > 0 ? (
            <div className="space-y-2">
              <h3 className="font-semibold text-green-800">✅ Found {raffles.length} Raffles:</h3>
              {raffles.map((raffle) => (
                <div key={raffle.id} className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">{raffle.title}</h4>
                  <p className="text-sm text-gray-600">Prize: ₱{raffle.grand_prize_value.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Category: {raffle.category}</p>
                  {raffle.consolation_prizes?.length > 0 && (
                    <p className="text-sm text-blue-600">
                      {raffle.consolation_prizes.length} consolation prizes
                    </p>
                  )}
                  {raffle.bundle_pricing?.length > 0 && (
                    <p className="text-sm text-purple-600">
                      {raffle.bundle_pricing.length} bundle pricing options
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">📝 No Raffles Found</h3>
              <p className="text-blue-700">Click "Insert Sample Data" to add some test raffles.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseTest;
