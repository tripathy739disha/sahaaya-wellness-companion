import { motion } from "framer-motion";
import { Phone, MessageCircle, HelpCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Is Sahaaya a medical app?", a: "No. Sahaaya provides wellness information and educational content. It is not a substitute for professional medical advice, diagnosis, or treatment." },
  { q: "Is my cycle data shared with anyone?", a: "No. All cycle tracking data is stored locally on your device only. We never collect, transmit, or store your personal health data on any server." },
  { q: "Can I delete my data?", a: "Yes. You can delete all your cycle tracking data anytime from the Cycle Tracker page. Once deleted, it cannot be recovered." },
  { q: "Who is this platform for?", a: "Sahaaya is for anyone who menstruates — regardless of age, background, or literacy level. Our content is designed to be accessible and inclusive." },
  { q: "Are the wellness tips medically verified?", a: "Our wellness suggestions are based on common traditional practices and general health guidance. They are not medical prescriptions. Always consult your healthcare provider." },
  { q: "How can I get more help?", a: "You can use the support options below to call, chat, or reach out to organizations that can provide professional assistance." },
];

const FaqItem = ({ faq }: { faq: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>}
    </button>
  );
};

const Support = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-rose-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Support Center</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            We're here for you. Reach out anytime — you don't have to navigate this alone.
          </p>

          {/* Quick Actions */}
          <div className="grid gap-3 sm:grid-cols-2 mb-10">
            <a
              href="tel:+1800000000"
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Call Support</h3>
                <p className="text-xs text-muted-foreground">One-tap call for help</p>
              </div>
            </a>
            <a
              href="https://wa.me/1800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow"
            >
              <div className="w-11 h-11 rounded-lg bg-sage flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-sage-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">WhatsApp Chat</h3>
                <p className="text-xs text-muted-foreground">Chat with our team</p>
              </div>
            </a>
          </div>

          {/* Emergency */}
          <div className="p-5 rounded-xl bg-secondary/10 border border-secondary/20 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-2">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you or someone you know is experiencing a medical emergency or severe distress:
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>• <strong className="text-foreground">Emergency:</strong> Call 112 (India) or your local emergency number</li>
                  <li>• <strong className="text-foreground">Women's Helpline:</strong> 181 (India)</li>
                  <li>• <strong className="text-foreground">Mental Health:</strong> iCall — 9152987821</li>
                  <li>• <strong className="text-foreground">NIMHANS:</strong> 080-46110007</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
