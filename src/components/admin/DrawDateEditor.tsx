
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DrawDateEditorProps {
  raffleId: string;
  currentDate: string | null;
  onUpdate: (newDate: string | null) => void;
}

const DrawDateEditor: React.FC<DrawDateEditorProps> = ({ raffleId, currentDate, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(currentDate || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('approved_raffles')
        .update({ draw_date: date || null })
        .eq('id', raffleId);

      if (error) throw error;

      onUpdate(date || null);
      setIsOpen(false);
      toast({
        title: "Success",
        description: date ? "Draw date updated successfully" : "Draw date cleared",
      });
    } catch (error) {
      console.error('Error updating draw date:', error);
      toast({
        title: "Error",
        description: "Failed to update draw date",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Edit Date
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Draw Date</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Draw Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to mark as "TBD"
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading}>
              <Calendar className="h-4 w-4 mr-1" />
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DrawDateEditor;
