import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatButton = () => {
    const phoneNumber = "2347034546060";
    const message = encodeURIComponent("Hello! I would like to make an inquiry.");

    // Using WhatsApp link format
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-300"
        >
            <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title="Chat with us on WhatsApp"
            >
                <MessageCircle className="h-7 w-7 text-white" />
            </Button>
        </a>
    );
};

export default ChatButton;
