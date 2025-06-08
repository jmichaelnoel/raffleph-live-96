
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RaffleDrawDateEditorProps {
  raffleId: string;
  currentDate: string | null;
  title: string;
  onUpdate: () => void;
}

const RaffleDrawDateEditor = ({ raffleId, currentDate, title, onUpdate }: RaffleDrawDateEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(currentDate || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('raffles')
        .update({ draw_date: newDate || null })
        .eq('id', raffleId);

      if (error) throw error;

      toast({
        title: "✅ Success",
        description: "Draw date updated successfully",
      });

      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating draw date:', error);
      toast({
        title: "❌ Error",
        description: "Failed to update draw date",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNewDate(currentDate || '');
    setIsEditing(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'TBD';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-40"
                min={new Date().toISOString().split('T')[0]}
              />
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{formatDate(currentDate)}</span>
              {!currentDate && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  TBD
                </Badge>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="ml-2"
              >
                Edit Date
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaffleDrawDateEditor;
