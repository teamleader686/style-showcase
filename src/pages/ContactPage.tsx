import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Mail, Store } from "lucide-react";

const ContactPage = () => {
  const { data: settings, loading } = useFetch(getSettings);

  if (loading || !settings) {
    return (
      <main className="pb-24 md:pb-12 px-4 pt-5 space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Contact Us</h1>
        <div className="h-64 bg-muted animate-pulse rounded-2xl w-full premium-shadow" />
      </main>
    );
  }

  return (
    <main className="pb-24 md:pb-12 px-4 pt-5 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Contact Us</h1>
        <p className="text-sm text-muted-foreground mt-1.5">We'd love to hear from you</p>
      </div>

      {/* Store Info Card */}
      <div className="bg-card rounded-2xl p-6 md:p-8 premium-shadow border border-border/30 space-y-5 relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">{settings.siteName}</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5 group">
              <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{settings.address}</p>
            </div>
            <div className="flex items-center gap-3.5 group">
              <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <a href={`tel:${settings.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                +91 {settings.phone}
              </a>
            </div>
            <div className="flex items-center gap-3.5 group">
              <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <a href={`mailto:${settings.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                {settings.email}
              </a>
            </div>
            <div className="flex items-start gap-3.5 group">
              <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{settings.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3.5">
        <Button asChild className="h-14 rounded-2xl font-bold text-base bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
          <a href={`tel:${settings.phone}`}>
            <Phone className="h-4 w-4 mr-2" /> Call Now
          </a>
        </Button>
        <Button
          asChild
          className="h-14 rounded-2xl font-bold text-base bg-[#25D366] hover:bg-[#20BD5C] text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hi! I have a query.")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </a>
        </Button>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border/30 premium-shadow-lg">
        <iframe
          src={settings.mapEmbed}
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Location"
          className="w-full"
        />
      </div>

      <a
        href={settings.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
      >
        Open in Google Maps →
      </a>
    </main>
  );
};

export default ContactPage;
