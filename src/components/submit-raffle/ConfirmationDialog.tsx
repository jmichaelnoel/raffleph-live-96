
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmationDialog = ({ open, onOpenChange }: ConfirmationDialogProps) => {
  const navigate = useNavigate();

  const handleReturnToBrowse = () => {
    onOpenChange(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <span className="mr-3 text-3xl animate-bounce">✅</span>
            Raffle Submitted Successfully!
            <span className="ml-3 text-3xl animate-pulse">🎉</span>
          </DialogTitle>
          <DialogDescription className="text-base pt-4">
            Thank you for submitting your raffle entry. Once we verify your payment and the legitimacy of the raffle, we will approve it in less than 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-200 my-4">
          <div className="flex items-center text-lg font-semibold text-green-800">
            <span className="mr-2 text-2xl animate-bounce">🚀</span>
            What's next?
          </div>
          <ul className="text-green-700 mt-3 space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-lg">👀</span>
              We'll verify your payment and raffle legitimacy
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg">📱</span>
              Your raffle will appear on our homepage once approved
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg">🎮</span>
              Wait for bettors to join your raffle
            </li>
          </ul>
        </div>

        <DialogFooter className="pt-4">
          <Button 
            onClick={handleReturnToBrowse} 
            className="w-full text-lg py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold rounded-xl border-0"
          >
            <span className="mr-2 text-xl animate-pulse">🏠</span>
            Return to Browse Raffles
            <span className="ml-2 text-xl animate-pulse">🎯</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
