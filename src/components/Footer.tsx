import { Link } from "react-router-dom";
import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/category", label: "Categories" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact Us" },
];

const Footer = () => {
    const { data: settings } = useFetch(getSettings);

    if (!settings) return null;

    return (
        <footer className="bg-card border-t border-border mt-12 pb-20 md:pb-8 pt-12 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                {/* Brand & Address */}
                <div className="space-y-4">
                    <Link to="/" className="inline-block">
                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-10" />
                        ) : (
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">
                                {settings.siteName}
                            </h2>
                        )}
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {settings.description || "Your premium local store for all things tech."}
                    </p>
                    <div className="flex items-start gap-3 mt-4">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{settings.address}</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                    <ul className="space-y-4">
                        <li>
                            <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Phone className="h-4 w-4 shrink-0" />
                                +91 {settings.phone}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-4 w-4 shrink-0" />
                                {settings.email}
                            </a>
                        </li>
                    </ul>

                    {/* Social Links */}
                    {settings.socialLinks && Object.values(settings.socialLinks).some(Boolean) && (
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Follow Us</h4>
                            <div className="flex items-center gap-4">
                                {settings.socialLinks.instagram && (
                                    <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-600 transition-colors">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.socialLinks.facebook && (
                                    <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.socialLinks.youtube && (
                                    <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-600 transition-colors">
                                        <Youtube className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.socialLinks.twitter && (
                                    <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-sky-500 transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
                </p>
                <p className="mt-2 text-primary/80">
                    Powered by WhatNext Solutions
                </p>
            </div>
        </footer>
    );
};

export default Footer;
