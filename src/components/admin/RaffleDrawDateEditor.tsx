
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Check, X, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RaffleDrawDateEditorProps {
  raffleId: string;
  currentDate: string | null;
  onDateUpdated: () => void;
}

const RaffleDrawDateEditor: React.FC<RaffleDrawDateEditorProps> = ({
  raffleId,
  currentDate,
  onDateUpdated
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(currentDate || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!newDate.trim()) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid date",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('raffles')
        .update({ draw_date: newDate })
        .eq('id', raffleId);

      if (error) throw error;

      toast({
        title: "Date Updated",
        description: "Draw date has been successfully updated"
      });

      setIsEditing(false);
      onDateUpdated();
    } catch (error) {
      console.error('Error updating draw date:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update draw date",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setNewDate(currentDate || '');
    setIsEditing(false);
  };

  const displayDate = currentDate 
    ? new Date(currentDate).toLocaleDateString()
    : 'TBD';

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <Input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-8 text-sm"
            disabled={isUpdating}
          />
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isUpdating}
            className="h-8 px-2 bg-green-500 hover:bg-green-600"
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
            className="h-8 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-3 w-3" />
            <span className={currentDate ? 'text-gray-700' : 'text-orange-600 font-semibold'}>
              {displayDate}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-6 px-1 hover:bg-blue-50"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </>
      )}
    </div>
  );
};

export default RaffleDrawDateEditor;
