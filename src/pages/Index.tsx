import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, Leaf, Phone, ShoppingBag, Shield } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const features = [
  {
    icon: Calendar,
    title: "Cycle Tracker",
    desc: "Log your cycle, moods, and symptoms privately and easily.",
    color: "bg-rose text-rose-foreground",
    link: "/tracker",
  },
  {
    icon: BookOpen,
    title: "PCOS Education",
    desc: "Understand PCOS/PCOD with supportive, clear guidance.",
    color: "bg-lavender text-lavender-foreground",
    link: "/education",
  },
  {
    icon: Leaf,
    title: "Wellness Toolkit",
    desc: "Herbal teas, exercises, breathing & stress relief tips.",
    color: "bg-sage text-sage-foreground",
    link: "/wellness",
  },
  {
    icon: Phone,
    title: "Support Center",
    desc: "One-tap help, FAQs, and emergency guidance.",
    color: "bg-rose text-rose-foreground",
    link: "/support",
  },
  {
    icon: ShoppingBag,
    title: "Product Access",
    desc: "Browse menstrual care products with hygiene guidance.",
    color: "bg-lavender text-lavender-foreground",
    link: "/",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your data stays yours. Full control, always.",
    color: "bg-sage text-sage-foreground",
    link: "/",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Sahaaya wellness" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container relative z-10 py-20 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              Menstrual Health & Care Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Your Wellness,{" "}
              <span className="text-gradient-primary">Your Way</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A warm, supportive companion for menstrual health, cycle awareness, 
              PCOS education, and holistic wellness — designed with care and respect.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tracker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Start Tracking <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/education"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A complete wellness experience — from tracking your cycle to finding comfort and knowledge.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={itemVariants}>
                <Link
                  to={f.link}
                  className="block p-6 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow group"
                >
                  <div className={`w-11 h-11 rounded-lg ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-gradient-warm">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            Built with Care, Guided by Respect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Sahaaya is not a medical tool. It's a wellness companion that provides education, 
            awareness, and emotional support. Always consult a healthcare professional for medical advice.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy First", "No Medical Claims", "Your Data, Your Control", "Inclusive & Accessible"].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground border border-border shadow-soft">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
