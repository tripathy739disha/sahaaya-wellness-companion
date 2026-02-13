import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sun, Moon, Flame, Zap, Heart, Brain, Utensils, Shield, Sparkles,
  TrendingUp, Calendar, ChevronRight, Lightbulb, BarChart3
} from "lucide-react";
import {
  CycleProfile, SymptomLog, PhaseInfo, PatternInsight, WellnessBlueprint,
  getCurrentPhase, getCycleDay, getDaysUntilNextPeriod, getPhaseProgress,
  detectPatterns, generateBlueprint,
} from "@/lib/cycleEngine";

const PHASE_COLORS: Record<string, string> = {
  rose: "from-rose to-rose/60",
  sage: "from-sage to-sage/60",
  gold: "from-gold to-gold/60",
  lavender: "from-lavender to-lavender/60",
};

const PHASE_BG: Record<string, string> = {
  rose: "bg-rose/30",
  sage: "bg-sage/30",
  gold: "bg-gold/30",
  lavender: "bg-lavender/30",
};

const Dashboard = () => {
  const [profile, setProfile] = useState<CycleProfile | null>(() => {
    const saved = localStorage.getItem("sahaaya-cycle-profile");
    return saved ? JSON.parse(saved) : null;
  });
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>(() => {
    const saved = localStorage.getItem("sahaaya-symptom-logs");
    return saved ? JSON.parse(saved) : [];
  });
  const [setupForm, setSetupForm] = useState({
    lastPeriodDate: new Date().toISOString().split("T")[0],
    cycleLength: 28,
    periodLength: 5,
  });

  useEffect(() => {
    if (profile) localStorage.setItem("sahaaya-cycle-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("sahaaya-symptom-logs", JSON.stringify(symptomLogs));
  }, [symptomLogs]);

  const phaseInfo = useMemo(() => profile ? getCurrentPhase(profile) : null, [profile]);
  const progress = useMemo(() => profile ? getPhaseProgress(profile) : 0, [profile]);
  const daysLeft = useMemo(() => profile ? getDaysUntilNextPeriod(profile) : 0, [profile]);
  const insights = useMemo(() => profile ? detectPatterns(symptomLogs, profile) : [], [symptomLogs, profile]);
  const blueprint = useMemo(() => profile ? generateBlueprint(symptomLogs, profile) : null, [symptomLogs, profile]);

  const activateProfile = () => {
    setProfile(setupForm);
    localStorage.setItem("sahaaya-cycle-profile", JSON.stringify(setupForm));
  };

  if (!profile) {
    return <SetupScreen form={setupForm} setForm={setSetupForm} onActivate={activateProfile} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Phase Header */}
          <div className={`rounded-2xl p-6 mb-6 bg-gradient-to-br ${PHASE_COLORS[phaseInfo!.color]} border border-border`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Day {phaseInfo!.day} of {phaseInfo!.totalDays}
                </p>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground flex items-center gap-2">
                  {phaseInfo!.emoji} {phaseInfo!.label}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next period in</p>
                <p className="text-2xl font-bold text-foreground">{daysLeft}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-background/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>

          {/* Predictive Insights */}
          {insights.length > 0 && (
            <div className="mb-6 space-y-2">
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-lavender/50 border border-lavender flex items-start gap-3"
                >
                  <span className="text-lg">{insight.icon}</span>
                  <p className="text-sm text-foreground">{insight.message}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Daily Guidance Grid */}
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Today's Guidance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <GuidanceCard icon={Zap} label="Energy" value={phaseInfo!.energy} color="gold" />
            <GuidanceCard icon={Heart} label="Emotional Forecast" value={phaseInfo!.emotionalForecast} color="rose" />
            <GuidanceCard icon={Shield} label="Body Sensitivity" value={phaseInfo!.bodySensitivity} color="lavender" />
            <GuidanceCard icon={Brain} label="Productivity" value={phaseInfo!.productivity} color="sage" />
          </div>

          {/* Food & Self-Care */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-accent" /> Food Priorities
              </h3>
              <ul className="space-y-2">
                {phaseInfo!.foodPriorities.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sun className="w-4 h-4 text-accent" /> Self-Care Focus
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{phaseInfo!.selfCareFocus}</p>
            </div>
          </div>

          {/* Symptom Quick Log */}
          <SymptomQuickLog logs={symptomLogs} setLogs={setSymptomLogs} />

          {/* Wellness Blueprint */}
          {blueprint && <BlueprintPanel blueprint={blueprint} />}

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Link to="/journal" className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow flex items-center gap-3 group">
              <Lightbulb className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Journal</p>
                <p className="text-xs text-muted-foreground">Reflect & track</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </Link>
            <Link to="/tracker" className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow flex items-center gap-3 group">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Cycle Log</p>
                <p className="text-xs text-muted-foreground">Full tracker</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </Link>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-lavender/50 border border-lavender">
            <p className="text-xs text-lavender-foreground">
              🔒 All your data stays on this device. Nothing is sent to any server.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// -- Sub-components --

function GuidanceCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className={`p-4 rounded-xl ${PHASE_BG[color]} border border-border`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-foreground" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
    </div>
  );
}

function SetupScreen({ form, setForm, onActivate }: { form: any; setForm: any; onActivate: () => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🌸</span>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">Tell us a little about your cycle to personalize your experience.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Last period start date</label>
            <input
              type="date"
              value={form.lastPeriodDate}
              onChange={(e) => setForm((f: any) => ({ ...f, lastPeriodDate: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Average cycle length (days)</label>
            <input
              type="number"
              min={21}
              max={40}
              value={form.cycleLength}
              onChange={(e) => setForm((f: any) => ({ ...f, cycleLength: parseInt(e.target.value) || 28 }))}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Average period length (days)</label>
            <input
              type="number"
              min={2}
              max={10}
              value={form.periodLength}
              onChange={(e) => setForm((f: any) => ({ ...f, periodLength: parseInt(e.target.value) || 5 }))}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm"
            />
          </div>
          <button
            onClick={onActivate}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Activate My Dashboard
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          🔒 This data is stored only on your device and never shared.
        </p>
      </motion.div>
    </div>
  );
}

function SymptomQuickLog({ logs, setLogs }: { logs: SymptomLog[]; setLogs: React.Dispatch<React.SetStateAction<SymptomLog[]>> }) {
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((l) => l.date === today);
  const [form, setForm] = useState<SymptomLog>(
    todayLog || { date: today, cramps: 0, fatigue: 0, moodSwings: 0, sleepQuality: 3, bloating: false, headache: false, notes: "" }
  );

  const save = () => {
    setLogs((prev) => [form, ...prev.filter((l) => l.date !== today)]);
    setOpen(false);
  };

  const intensityLabels = ["None", "Mild", "Moderate", "Severe"];

  return (
    <div className="mb-6">
      <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" /> Symptom Check-In
      </h2>
      {todayLog && !open ? (
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">✅ You've logged today's symptoms</p>
            <button onClick={() => setOpen(true)} className="text-xs text-primary font-medium hover:underline">Edit</button>
          </div>
        </div>
      ) : !open ? (
        <button onClick={() => setOpen(true)} className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors text-muted-foreground hover:text-foreground text-sm">
          + Log how you're feeling today
        </button>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card border border-border rounded-xl p-5 space-y-4">
            {[
              { key: "cramps", label: "Cramps" },
              { key: "fatigue", label: "Fatigue" },
              { key: "moodSwings", label: "Mood Swings" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
                <div className="flex gap-2">
                  {intensityLabels.map((il, i) => (
                    <button
                      key={il}
                      onClick={() => setForm((f) => ({ ...f, [key]: i }))}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        (form as any)[key] === i ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {il}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Sleep Quality</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setForm((f) => ({ ...f, sleepQuality: v }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      form.sleepQuality === v ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {v}★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { key: "bloating", label: "Bloating" },
                { key: "headache", label: "Headache" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setForm((f) => ({ ...f, [key]: !(f as any)[key] }))}
                  className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    (form as any)[key] ? "bg-secondary text-secondary-foreground border-secondary" : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any other notes..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none"
            />
            <div className="flex gap-2">
              <button onClick={save} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">Save</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors">Cancel</button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function BlueprintPanel({ blueprint }: { blueprint: WellnessBlueprint }) {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" /> Your Wellness Blueprint
      </h2>
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        {blueprint.commonSymptoms.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Common Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {blueprint.commonSymptoms.map((s) => (
                <span key={s.name} className="px-3 py-1 rounded-full text-xs bg-rose/50 text-rose-foreground font-medium">
                  {s.name} ({s.frequency}%)
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Energy Trend</p>
          <p className="text-sm text-muted-foreground">{blueprint.energyTrend}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Sensitive Days</p>
          <p className="text-sm text-muted-foreground">{blueprint.sensitiveDays}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Care Rhythm</p>
          <p className="text-sm text-muted-foreground">{blueprint.careRhythm}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
