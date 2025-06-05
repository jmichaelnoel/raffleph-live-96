
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const TestimonialAvatars = () => {
  return (
    <div className="flex items-center justify-center mt-8 animate-fade-in delay-3">
      <div className="flex items-center rounded-full border border-border bg-background/80 backdrop-blur-sm p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
        <div className="flex -space-x-2">
          <Avatar className="w-8 h-8 ring-2 ring-background transition-transform duration-300 hover:scale-110 hover:z-10 hover:-translate-y-1 hover:ring-4 hover:ring-purple-400/50">
            <AvatarImage src="/lovable-uploads/b6bf12db-98f4-4eef-8cd4-5401e261d602.png" alt="Filipino bettor 1" />
            <AvatarFallback>FB1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background transition-transform duration-300 hover:scale-110 hover:z-10 hover:-translate-y-1 hover:ring-4 hover:ring-pink-400/50 delay-75">
            <AvatarImage src="/lovable-uploads/371527ea-cec1-4a17-bff1-58c959fef7ce.png" alt="Filipino bettor 2" />
            <AvatarFallback>FB2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background transition-transform duration-300 hover:scale-110 hover:z-10 hover:-translate-y-1 hover:ring-4 hover:ring-blue-400/50 delay-150">
            <AvatarImage src="/lovable-uploads/4ce42990-1785-40d7-b220-e085b10c21c7.png" alt="Filipino bettor 3" />
            <AvatarFallback>FB3</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 ring-2 ring-background transition-transform duration-300 hover:scale-110 hover:z-10 hover:-translate-y-1 hover:ring-4 hover:ring-green-400/50 delay-225">
            <AvatarImage src="/lovable-uploads/14543840-bb43-45c3-aab3-e87be6c53441.png" alt="Filipino bettor 4" />
            <AvatarFallback>FB4</AvatarFallback>
          </Avatar>
        </div>
        <p className="px-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          <strong className="font-semibold text-foreground group-hover:text-purple-600 transition-colors duration-300">Thousands</strong> have already joined, take your chance too.
          <span className="inline-block ml-1 animate-pulse">✨</span>
        </p>
      </div>
    </div>
  );
};

export default TestimonialAvatars;
