import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-secondary fill-secondary" />
              <span className="font-serif text-lg font-bold text-foreground">Sahaaya</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              A supportive menstrual wellness companion designed to empower, educate, and care. 
              Your health, your way — with warmth and respect.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/tracker" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cycle Tracker</Link>
              <Link to="/education" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Education Hub</Link>
              <Link to="/wellness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Wellness Toolkit</Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-3">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Sahaaya provides wellness information only — not medical advice. Always consult a healthcare professional for medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
