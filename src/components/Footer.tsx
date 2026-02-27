import { Link } from "react-router-dom";
import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter, Heart } from "lucide-react";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/category", label: "Categories" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact Us" },
];

const paymentLogos = [
    { name: "UPI", src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg", className: "h-4 md:h-5" },
    { name: "Visa", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1CefFQibodbtysbX6PStx8gLRhlPgfMoLlA&s", className: "h-3.5 md:h-4" },
    { name: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", className: "h-5 md:h-6" },
    { name: "RuPay", src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg", className: "h-4 md:h-5" },
];

const Footer = () => {
    const { data: settings } = useFetch(getSettings);

    if (!settings) return null;

    return (
        <footer className="relative bg-card border-t border-border/50 mt-16 pb-24 md:pb-10 pt-14 px-4 overflow-hidden">
            {/* Decorative gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '40px 40px',
            }} />

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 relative">

                {/* Brand & Address */}
                <div className="space-y-5">
                    <Link to="/" className="inline-block">
                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-10" />
                        ) : (
                            <h2 className="text-2xl font-extrabold tracking-tight gradient-text">
                                {settings.siteName}
                            </h2>
                        )}
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        {settings.description || "Your premium local store for all things tech."}
                    </p>
                    <div className="flex items-start gap-3 mt-4">
                        <div className="p-2 rounded-xl bg-primary/5">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{settings.address}</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-3.5">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">Contact</h3>
                    <ul className="space-y-4">
                        <li>
                            <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                                <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                    <Phone className="h-4 w-4 shrink-0" />
                                </div>
                                +91 {settings.phone}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                                <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                    <Mail className="h-4 w-4 shrink-0" />
                                </div>
                                {settings.email}
                            </a>
                        </li>
                    </ul>

                    {/* Social Links */}
                    {settings.socialLinks && Object.values(settings.socialLinks).some(Boolean) && (
                        <div className="mt-7">
                            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Follow Us</h4>
                            <div className="flex items-center gap-3">
                                {settings.socialLinks.instagram && (
                                    <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-secondary hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                )}
                                {settings.socialLinks.facebook && (
                                    <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-secondary hover:bg-blue-600 text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                        <Facebook className="h-4 w-4" />
                                    </a>
                                )}
                                {settings.socialLinks.youtube && (
                                    <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-secondary hover:bg-red-600 text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                        <Youtube className="h-4 w-4" />
                                    </a>
                                )}
                                {settings.socialLinks.twitter && (
                                    <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-secondary hover:bg-sky-500 text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 100% Secure Payments */}
            <div className="flex flex-col items-center justify-center pt-5 md:pt-8 mb-6 md:mb-8 border-t border-border/30">
                <h4 className="text-[10px] md:text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">
                    100% Secure Payments
                </h4>
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    {paymentLogos.map((logo) => (
                        <div
                            key={logo.name}
                            className="bg-white/90 dark:bg-white px-3 py-2 rounded-xl premium-shadow-sm flex items-center justify-center min-w-[60px] md:min-w-[70px] border border-border/50 hover:-translate-y-0.5 transition-transform duration-300"
                        >
                            <img src={logo.src} alt={logo.name} className={`${logo.className} object-contain`} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative border-t border-border/40 pt-7 text-center">
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
                </p>
                <p className="mt-2.5 text-xs text-muted-foreground/80 flex items-center justify-center gap-1">
                    Crafted with <Heart className="h-3 w-3 text-accent fill-accent" /> by
                    <span className="font-semibold gradient-text">WhatNext Solutions</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
