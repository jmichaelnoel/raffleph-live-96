
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface DrawDateBadgeProps {
  drawDate: string | null;
  size?: 'sm' | 'default';
}

const DrawDateBadge: React.FC<DrawDateBadgeProps> = ({ drawDate, size = 'default' }) => {
  if (!drawDate) {
    return (
      <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
        <Clock className="h-3 w-3 mr-1" />
        Draw date TBD
      </Badge>
    );
  }

  const date = new Date(drawDate);
  const isUpcoming = date > new Date();
  
  return (
    <Badge 
      variant={isUpcoming ? "default" : "secondary"}
      className={isUpcoming ? "text-green-700 border-green-300 bg-green-50" : ""}
    >
      <Calendar className="h-3 w-3 mr-1" />
      {date.toLocaleDateString()}
    </Badge>
  );
};

export default DrawDateBadge;
