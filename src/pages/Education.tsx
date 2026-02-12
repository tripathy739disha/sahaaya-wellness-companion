import { motion } from "framer-motion";
import { BookOpen, AlertCircle, Stethoscope, Lightbulb, ChevronDown } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    icon: BookOpen,
    title: "What is PCOS/PCOD?",
    color: "bg-lavender text-lavender-foreground",
    content: [
      "PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovarian Disease) are common hormonal conditions that affect many women of reproductive age.",
      "They involve an imbalance in reproductive hormones, which can affect the ovaries and menstrual cycle. While related, they have some differences in severity.",
      "PCOD is generally considered milder — the ovaries release immature eggs, leading to hormonal imbalance. PCOS is a more serious metabolic condition.",
      "Both are very common and manageable with the right awareness and lifestyle changes. You are not alone.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Common Symptoms",
    color: "bg-rose text-rose-foreground",
    content: [
      "Irregular or missed periods",
      "Unexpected weight changes",
      "Acne or oily skin",
      "Excessive hair growth (face or body)",
      "Thinning hair on the scalp",
      "Mood changes and fatigue",
      "Difficulty with fertility",
      "Note: Having one or more symptoms does not mean you have PCOS/PCOD. Only a healthcare professional can diagnose these conditions.",
    ],
  },
  {
    icon: Lightbulb,
    title: "Lifestyle Awareness",
    color: "bg-sage text-sage-foreground",
    content: [
      "Regular physical activity — even gentle walks — can help manage symptoms.",
      "A balanced diet rich in whole grains, fruits, vegetables, and lean protein supports hormonal balance.",
      "Managing stress through mindfulness, yoga, or breathing exercises can be beneficial.",
      "Getting adequate sleep (7-9 hours) supports overall hormonal health.",
      "Reducing processed foods and added sugars may help manage weight and insulin levels.",
      "These are general wellness suggestions, not medical prescriptions. Consult your doctor for personalized advice.",
    ],
  },
  {
    icon: Stethoscope,
    title: "When to Seek Medical Care",
    color: "bg-lavender text-lavender-foreground",
    content: [
      "If your periods have been absent for more than 3 months",
      "If you experience severe pain that interferes with daily life",
      "If you notice significant, unexplained weight changes",
      "If you're having difficulty conceiving",
      "If symptoms are affecting your mental health or quality of life",
      "Early consultation with a gynecologist or endocrinologist can make a significant difference. Don't hesitate to reach out.",
    ],
  },
];

const irregularPeriodTopics = [
  {
    title: "Possible Lifestyle Factors",
    items: ["Stress & anxiety", "Sudden weight changes", "Excessive exercise", "Poor sleep patterns", "Dietary changes", "Hormonal fluctuations"],
  },
  {
    title: "Comfort Techniques",
    items: ["Warm compress on lower abdomen", "Gentle stretching & yoga", "Herbal teas (chamomile, ginger)", "Rest and adequate sleep", "Hydration", "Light walking"],
  },
  {
    title: "Stress Management",
    items: ["Deep breathing exercises", "Progressive muscle relaxation", "Journaling thoughts", "Gentle meditation", "Connecting with supportive people", "Limiting screen time"],
  },
];

const AccordionItem = ({ section }: { section: typeof sections[0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center shrink-0`}>
          <section.icon className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground flex-1">{section.title}</h3>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-5 pt-0"
        >
          <ul className="space-y-2 ml-14">
            {section.content.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                {item.startsWith("Note:") || item.startsWith("These are") || item.startsWith("Early") ? (
                  <span className="italic text-secondary">{item}</span>
                ) : (
                  <>• {item}</>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const Education = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-lavender flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-lavender-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Education Hub</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Understand your body with supportive, clear guidance. This is awareness, not diagnosis.
          </p>

          <div className="space-y-3 mb-12">
            {sections.map((s) => (
              <AccordionItem key={s.title} section={s} />
            ))}
          </div>

          {/* Irregular Periods */}
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
            Irregular & Painful Periods
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {irregularPeriodTopics.map((topic) => (
              <div key={topic.title} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-serif font-semibold text-foreground mb-3 text-sm">{topic.title}</h3>
                <ul className="space-y-1.5">
                  {topic.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-rose/50 border border-rose">
            <p className="text-xs text-rose-foreground">
              ⚠️ If you experience severe pain, very heavy bleeding, or symptoms that disrupt your daily life, 
              please consult a healthcare professional. You deserve proper care and support.
            </p>
          </div>

          {/* Reading Resources */}
          <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">
            📚 Recommended Resources
          </h2>
          <div className="space-y-3">
            {[
              { title: "Taking Charge of Your Fertility", author: "Toni Weschler", desc: "Comprehensive guide to understanding your menstrual cycle." },
              { title: "Period Power", author: "Maisie Hill", desc: "Harness your hormones and get your cycle working for you." },
              { title: "WomanCode", author: "Alisa Vitti", desc: "Optimize your cycle, fertility, and energy." },
              { title: "The Period Repair Manual", author: "Lara Briden", desc: "Natural treatment for better periods and hormonal health." },
            ].map((book) => (
              <div key={book.title} className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-serif font-semibold text-foreground text-sm">{book.title}</h4>
                <p className="text-xs text-muted-foreground">by {book.author} — {book.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
