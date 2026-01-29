import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = "1234567890", 
  message = "Hello! I'm interested in your books." 
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg"
      size="icon"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
};

export default WhatsAppButton;
