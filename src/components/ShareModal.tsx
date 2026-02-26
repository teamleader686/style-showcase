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
        <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
            <div className="bg-background w-full max-w-sm md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
                    <h2 className="text-xl font-bold">Share this</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {/* WhatsApp */}
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-7 h-7 fill-current" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">WhatsApp</span>
                        </a>

                        {/* Facebook */}
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 rounded-full bg-[#1877f2] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Facebook className="w-7 h-7 fill-current" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Facebook</span>
                        </a>

                        {/* Twitter */}
                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform dark:bg-white dark:text-black">
                                <Twitter className="w-6 h-6 fill-current" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">X (Twitter)</span>
                        </a>

                        {/* Copy Link */}
                        <button type="button" onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 rounded-full bg-secondary text-foreground flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform border border-border">
                                <Link2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Copy Link</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
