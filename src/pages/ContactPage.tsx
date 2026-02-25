import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

const ContactPage = () => {
  const { data: settings, loading } = useFetch(getSettings);

  if (loading || !settings) {
    return (
      <main className="pb-20 md:pb-8 px-4 pt-4 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
        <div className="h-64 bg-muted animate-pulse rounded-2xl w-full"></div>
      </main>
    );
  }

  return (
    <main className="pb-20 md:pb-8 px-4 pt-4 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>

      {/* Store Info Card */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-4">
        <h2 className="text-xl font-bold text-foreground">{settings.siteName}</h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{settings.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <a href={`tel:${settings.phone}`} className="text-sm text-muted-foreground hover:text-foreground">
              +91 {settings.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <a href={`mailto:${settings.email}`} className="text-sm text-muted-foreground hover:text-foreground">
              {settings.email}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{settings.hours}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button asChild className="h-12 rounded-xl font-semibold">
          <a href={`tel:${settings.phone}`}>
            <Phone className="h-4 w-4 mr-2" /> Call Now
          </a>
        </Button>
        <Button
          asChild
          className="h-12 rounded-xl bg-success hover:bg-success/90 text-success-foreground font-semibold"
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
      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
        <iframe
          src={settings.mapEmbed}
          width="100%"
          height="300"
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
        className="block text-center text-sm text-primary hover:underline font-medium"
      >
        Open in Google Maps →
      </a>
    </main>
  );
};

export default ContactPage;
