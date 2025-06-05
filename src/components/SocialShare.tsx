
import React, { useState } from 'react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';
import { Copy, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Raffle } from '@/data/raffles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface SocialShareProps {
  raffle: Raffle;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ raffle, url = window.location.href }) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareTitle = `🎁 Check out this amazing raffle: ${raffle.title}`;
  const shareText = `Win ${raffle.title} worth ₱${raffle.prize.toLocaleString()}! Only ₱${raffle.bettingCost.toLocaleString()} per entry. Organized by ${raffle.organization}. Join now! 🎯`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: url,
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="bg-white hover:bg-gray-50 border-2 border-purple-200 text-purple-600 hover:text-purple-700 transition-all duration-300 hover:shadow-md"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-center">Share this raffle</h3>
          
          {/* Social Media Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <FacebookShareButton
              url={url}
              title={shareTitle}
              hashtag="#raffle"
              className="hover:scale-110 transition-transform duration-200"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            
            <TwitterShareButton
              url={url}
              title={shareText}
              hashtags={['raffle', 'giveaway', 'win']}
              className="hover:scale-110 transition-transform duration-200"
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            
            <WhatsappShareButton
              url={url}
              title={shareText}
              separator=" - "
              className="hover:scale-110 transition-transform duration-200"
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            
            <TelegramShareButton
              url={url}
              title={shareText}
              className="hover:scale-110 transition-transform duration-200"
            >
              <TelegramIcon size={40} round />
            </TelegramShareButton>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Or copy link:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
              />
              <CopyToClipboard text={url} onCopy={handleCopy}>
                <Button
                  size="sm"
                  variant={copied ? "default" : "outline"}
                  className={copied ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CopyToClipboard>
            </div>
            {copied && (
              <p className="text-sm text-green-600 font-medium">Link copied to clipboard!</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialShare;
