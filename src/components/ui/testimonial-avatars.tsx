
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const TestimonialAvatars = () => {
  return (
    <div className="flex items-center justify-center mt-8 animate-fade-in delay-3">
      <div className="flex items-center rounded-full border border-border bg-background/80 backdrop-blur-sm p-3 shadow-lg">
        <div className="flex -space-x-2">
          <Avatar className="w-8 h-8 ring-2 ring-background">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Filipino bettor 1" />
            <AvatarFallback>FB1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Filipino bettor 2" />
            <AvatarFallback>FB2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Filipino bettor 3" />
            <AvatarFallback>FB3</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background">
            <AvatarImage src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=80&h=80&fit=crop&crop=face" alt="Filipino bettor 4" />
            <AvatarFallback>FB4</AvatarFallback>
          </Avatar>
        </div>
        <p className="px-3 text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">Thousands</strong> have already joined, take your chance too.
        </p>
      </div>
    </div>
  );
};

export default TestimonialAvatars;
