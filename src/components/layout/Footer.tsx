import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">PlateToPurpose</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Code for Compassion. Connecting surplus food with those in need through 
              technology, transparency, and community action.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-smooth">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@platetopurpose.org</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>123 Compassion St, Hope City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 PlateToPurpose. All rights reserved. Built with ❤️ for Zero Hunger.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-smooth">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};