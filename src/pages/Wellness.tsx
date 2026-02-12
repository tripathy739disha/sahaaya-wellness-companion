import { motion } from "framer-motion";
import { Leaf, Coffee, Dumbbell, Wind, Moon, Heart } from "lucide-react";

const categories = [
  {
    icon: Coffee,
    title: "Herbal Tea Suggestions",
    color: "bg-sage text-sage-foreground",
    items: [
      { name: "Chamomile Tea", desc: "Calming, may ease cramps and promote sleep." },
      { name: "Ginger Tea", desc: "May help with nausea and reduce menstrual pain." },
      { name: "Peppermint Tea", desc: "Refreshing, may ease bloating and headaches." },
      { name: "Raspberry Leaf Tea", desc: "Traditionally used to support uterine health." },
      { name: "Cinnamon Tea", desc: "May help regulate cycles and reduce cramps." },
    ],
    disclaimer: "These are traditional suggestions, not medical prescriptions. If you have allergies or are on medication, consult your doctor.",
  },
  {
    icon: Dumbbell,
    title: "Light Exercise & Stretching",
    color: "bg-rose text-rose-foreground",
    items: [
      { name: "Gentle Yoga", desc: "Child's pose, cat-cow, and reclined twists for relief." },
      { name: "Light Walking", desc: "15-20 minutes of gentle walking can boost mood." },
      { name: "Stretching", desc: "Hip openers and lower back stretches for comfort." },
      { name: "Swimming", desc: "Low-impact and soothing for the entire body." },
      { name: "Tai Chi", desc: "Gentle flowing movements for balance and calm." },
    ],
    disclaimer: "Listen to your body. Rest when needed. Avoid intense exercise if experiencing severe pain.",
  },
  {
    icon: Wind,
    title: "Breathing & Meditation",
    color: "bg-lavender text-lavender-foreground",
    items: [
      { name: "4-7-8 Breathing", desc: "Inhale 4s, hold 7s, exhale 8s. Deeply calming." },
      { name: "Box Breathing", desc: "Equal counts of inhale, hold, exhale, hold (4s each)." },
      { name: "Body Scan Meditation", desc: "Slowly notice each body part, releasing tension." },
      { name: "Guided Visualization", desc: "Imagine a peaceful place — engage all senses." },
      { name: "Mindful Breathing", desc: "Simply observe your breath without changing it." },
    ],
    disclaimer: "Start with just 3-5 minutes. Consistency matters more than duration.",
  },
  {
    icon: Moon,
    title: "Sleep & Rest Hygiene",
    color: "bg-sage text-sage-foreground",
    items: [
      { name: "Consistent Schedule", desc: "Go to bed and wake up at the same time daily." },
      { name: "Cool, Dark Room", desc: "Optimal sleep environment for better rest." },
      { name: "Screen-Free Hour", desc: "Avoid screens 1 hour before bed." },
      { name: "Warm Bath", desc: "A warm bath before bed can ease cramps and relax." },
      { name: "Lavender Aromatherapy", desc: "A few drops on your pillow may promote relaxation." },
    ],
    disclaimer: "Quality sleep supports hormonal balance. Prioritize it, especially during your cycle.",
  },
  {
    icon: Heart,
    title: "Stress Reduction",
    color: "bg-rose text-rose-foreground",
    items: [
      { name: "Journaling", desc: "Write your thoughts freely — release without judgment." },
      { name: "Nature Time", desc: "Even 10 minutes outdoors can lower stress hormones." },
      { name: "Creative Expression", desc: "Drawing, music, or crafts as emotional outlets." },
      { name: "Social Connection", desc: "Talk to someone you trust. You don't have to be alone." },
      { name: "Digital Detox", desc: "Scheduled breaks from social media and news." },
    ],
    disclaimer: "If stress feels overwhelming, consider speaking with a counselor. Asking for help is strength.",
  },
];

const Wellness = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
              <Leaf className="w-5 h-5 text-sage-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Wellness Toolkit</h1>
          </div>
          <p className="text-muted-foreground mb-10">
            Curated practices for comfort, balance, and well-being — gentle support for every phase of your cycle.
          </p>

          <div className="space-y-8">
            {categories.map((cat) => (
              <section key={cat.title}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-lg ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">{cat.title}</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="p-4 rounded-xl bg-card border border-border">
                      <h3 className="font-medium text-sm text-foreground mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground italic px-1">⚕️ {cat.disclaimer}</p>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wellness;
