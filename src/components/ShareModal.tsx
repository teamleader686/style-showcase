import { X, Link2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareData: {
        title: string;
        text: string;
        url: string;
    };
}

const ShareModal = ({ isOpen, onClose, shareData }: ShareModalProps) => {
    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareData.url);
            toast.success("Link copied to clipboard!");
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    // Construct precise social sharing links that mimic react-share package functionality
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareData.title} - ${shareData.url}`)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.title)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`;

    return (
        <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4 transition-all duration-300">
            <div className="bg-card w-full max-w-sm md:rounded-3xl rounded-t-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom border border-border/50 duration-300 premium-shadow-lg">
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-border/50">
                    <h2 className="text-xl font-extrabold flex items-center gap-2 text-foreground">
                        <Link2 className="w-5 h-5 text-primary" /> Share
                    </h2>
                    <button onClick={onClose} className="p-2.5 rounded-2xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-4 gap-4 md:gap-5 text-center">
                        {/* WhatsApp */}
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2.5 group">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/20 group-hover:shadow-[#25D366]/40 group-hover:-translate-y-1 transition-all duration-300">
                                <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-current" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">WhatsApp</span>
                        </a>

                        {/* Facebook */}
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2.5 group">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#1877f2] to-[#0d5ebb] text-white flex items-center justify-center shadow-lg shadow-[#1877f2]/20 group-hover:shadow-[#1877f2]/40 group-hover:-translate-y-1 transition-all duration-300">
                                <Facebook className="w-7 h-7 md:w-8 md:h-8 fill-current" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">Facebook</span>
                        </a>

                        {/* Twitter */}
                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2.5 group">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                <Twitter className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">X</span>
                        </a>

                        {/* Copy Link */}
                        <button type="button" onClick={handleCopy} className="flex flex-col items-center gap-2.5 group">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 text-foreground flex items-center justify-center premium-shadow group-hover:premium-shadow-hover border border-border/50 group-hover:border-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                                <Link2 className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">Copy Link</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
