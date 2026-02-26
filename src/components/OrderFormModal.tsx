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
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
            {/* Modal Content */}
            <div
                className="bg-background w-full max-w-md md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-200"
            >
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Complete Your Order
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-4">
                    <div className="bg-secondary/50 p-3 rounded-xl border border-border flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm mr-2 truncate">{product.name}</span>
                        <span className="font-bold text-primary flex-shrink-0">{formatPrice(product.price)}</span>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</label>
                        <input
                            type="text"
                            className={`w-full p-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-card focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Mobile Number</label>
                        <input
                            type="tel"
                            className={`w-full p-3 rounded-xl border ${errors.mobile ? 'border-destructive' : 'border-border'} bg-card focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                        {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Delivery Address</label>
                        <textarea
                            className={`w-full p-3 rounded-xl border ${errors.address ? 'border-destructive' : 'border-border'} bg-card focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none h-24`}
                            placeholder="House Number, Street, Area, City, Pincode"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Quantity</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted active:scale-95 transition-all"
                                onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                            >
                                -
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{formData.quantity}</span>
                            <button
                                type="button"
                                className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted active:scale-95 transition-all"
                                onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                            >
                                +
                            </button>
                        </div>
                        {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
                    </div>

                    <div className="pt-4 pb-2 md:pb-0">
                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg shadow-lg shadow-[#25D366]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
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
