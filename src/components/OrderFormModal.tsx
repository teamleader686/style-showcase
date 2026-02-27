import { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/mock";

interface OrderFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        price: number;
    };
    whatsappNumber: string;
}

const OrderFormModal = ({ isOpen, onClose, product, whatsappNumber }: OrderFormModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: "",
        quantity: 1,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
            newErrors.mobile = "Valid 10-digit number is required";
        }
        if (!formData.address.trim()) newErrors.address = "Delivery address is required";
        if (formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const message = `*New Order Request*\n\n*Product:* ${product.name}\n*Price:* ${formatPrice(product.price)}\n*Quantity:* ${formData.quantity}\n*Total:* ${formatPrice(product.price * formData.quantity)}\n\n*Customer Details:*\n*Name:* ${formData.name}\n*Mobile:* ${formData.mobile}\n*Address:* ${formData.address}\n\n*Product Link:* ${window.location.href}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
            onClose(); // Optional: close form after ordering
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4 transition-all duration-300">
            {/* Modal Content */}
            <div
                className="bg-card w-full max-w-md md:rounded-3xl rounded-t-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom border border-border/50 duration-300 premium-shadow-lg"
            >
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-border/50">
                    <h2 className="text-xl font-extrabold flex items-center gap-2.5">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Complete Order
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-2xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-5">
                    <div className="bg-gradient-to-r from-secondary/80 to-secondary/30 p-3.5 rounded-2xl border border-border/50 flex justify-between items-center premium-shadow">
                        <span className="font-bold text-sm mr-2 truncate text-foreground">{product.name}</span>
                        <span className="font-extrabold text-primary flex-shrink-0">{formatPrice(product.price)}</span>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                        <input
                            type="text"
                            className={`w-full p-3.5 rounded-2xl border ${errors.name ? 'border-destructive ring-destructive/20' : 'border-border/50 focus:border-primary/50'} bg-background focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all premium-shadow-sm text-sm font-medium`}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1.5 font-semibold">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mobile Number</label>
                        <input
                            type="tel"
                            className={`w-full p-3.5 rounded-2xl border ${errors.mobile ? 'border-destructive ring-destructive/20' : 'border-border/50 focus:border-primary/50'} bg-background focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all premium-shadow-sm text-sm font-medium`}
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                        {errors.mobile && <p className="text-xs text-destructive mt-1.5 font-semibold">{errors.mobile}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Delivery Address</label>
                        <textarea
                            className={`w-full p-3.5 rounded-2xl border ${errors.address ? 'border-destructive ring-destructive/20' : 'border-border/50 focus:border-primary/50'} bg-background focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-none h-24 premium-shadow-sm text-sm font-medium`}
                            placeholder="House Number, Street, Area, City, Pincode"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <p className="text-xs text-destructive mt-1.5 font-semibold">{errors.address}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quantity</label>
                        <div className="flex items-center gap-3 bg-secondary/30 w-fit p-1.5 rounded-2xl border border-border/50">
                            <button
                                type="button"
                                className="w-10 h-10 rounded-xl border border-transparent flex items-center justify-center bg-card hover:bg-white text-foreground premium-shadow-sm active:scale-95 transition-all text-xl font-medium"
                                onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                            >
                                -
                            </button>
                            <span className="font-extrabold text-base w-8 text-center">{formData.quantity}</span>
                            <button
                                type="button"
                                className="w-10 h-10 rounded-xl border border-transparent flex items-center justify-center bg-card hover:bg-white text-foreground premium-shadow-sm active:scale-95 transition-all text-xl font-medium"
                                onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                            >
                                +
                            </button>
                        </div>
                        {errors.quantity && <p className="text-xs text-destructive mt-1.5 font-semibold">{errors.quantity}</p>}
                    </div>

                    <div className="pt-4 pb-4 md:pb-0">
                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-base shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2.5"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Confirm via WhatsApp
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderFormModal;
