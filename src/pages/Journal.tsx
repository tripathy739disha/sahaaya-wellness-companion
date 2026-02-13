import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Sparkles, Lock } from "lucide-react";
import { JournalEntry, SymptomLog, getJournalPrompt } from "@/lib/cycleEngine";

const MOOD_OPTIONS = [
  { value: "great", emoji: "😊", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "low", emoji: "😔", label: "Low" },
  { value: "rough", emoji: "😢", label: "Rough" },
] as const;

const SYMPTOM_TAGS = ["Cramps", "Fatigue", "Headache", "Bloating", "Mood swings", "Anxiety", "Back pain", "Nausea", "Insomnia", "Low energy"];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("sahaaya-journal");
    return saved ? JSON.parse(saved) : [];
  });
  const [symptomLogs] = useState<SymptomLog[]>(() => {
    const saved = localStorage.getItem("sahaaya-symptom-logs");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [form, setForm] = useState<Omit<JournalEntry, "id" | "createdAt">>({
    date: new Date().toISOString().split("T")[0],
    mood: "okay",
    symptoms: [],
    reflection: "",
  });

  useEffect(() => {
    localStorage.setItem("sahaaya-journal", JSON.stringify(entries));
  }, [entries]);

  const prompt = useMemo(() => getJournalPrompt(symptomLogs, entries), [symptomLogs, entries]);

  // Detect patterns for intelligent prompts
  const patternAlert = useMemo(() => {
    const recent = entries.slice(0, 5);
    const lowMoods = recent.filter((e) => e.mood === "low" || e.mood === "rough").length;
    if (lowMoods >= 3) return "You've been feeling low recently. Would you like some grounding suggestions? Check our Wellness toolkit. 💜";
    const stressSymptoms = recent.filter((e) => e.symptoms.includes("Anxiety") || e.symptoms.includes("Insomnia")).length;
    if (stressSymptoms >= 2) return "You've logged stress-related symptoms several days — consider a breathing exercise or gentle walk today. 🌿";
    return null;
  }, [entries]);

  const toggleSymptom = (s: string) => {
    setForm((f) => ({
      ...f,
      symptoms: f.symptoms.includes(s) ? f.symptoms.filter((x) => x !== s) : [...f.symptoms, s],
    }));
  };

  const addEntry = () => {
    const entry: JournalEntry = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setShowForm(false);
    setForm({ date: new Date().toISOString().split("T")[0], mood: "okay", symptoms: [], reflection: "" });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-lavender flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-lavender-foreground" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Journal</h1>
            </div>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`p-2 rounded-lg transition-colors ${privacyMode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              title={privacyMode ? "Unlock journal" : "Lock journal"}
            >
              <Lock className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground mb-6">A private space for your thoughts, feelings, and reflections.</p>

          {/* Pattern Alert */}
          {patternAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-lavender/50 border border-lavender mb-6 flex items-start gap-3"
            >
              <Sparkles className="w-5 h-5 text-lavender-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{patternAlert}</p>
            </motion.div>
          )}

          {/* New Entry */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <Plus className="w-5 h-5" /> New Entry
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-card border border-border rounded-xl p-6 mb-6 space-y-5"
            >
              {/* Smart Prompt */}
              <div className="p-3 rounded-lg bg-sage/50 border border-sage">
                <p className="text-sm text-sage-foreground italic flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> {prompt}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">How are you feeling?</label>
                <div className="flex gap-2">
                  {MOOD_OPTIONS.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setForm((f) => ({ ...f, mood: m.value }))}
                      className={`flex-1 py-3 rounded-lg text-center border transition-colors ${
                        form.mood === m.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="text-lg block">{m.emoji}</span>
                      <span className="text-xs mt-1 block">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tag symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOM_TAGS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        form.symptoms.includes(s) ? "bg-secondary text-secondary-foreground border-secondary" : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Reflection</label>
                <textarea
                  value={form.reflection}
                  onChange={(e) => setForm((f) => ({ ...f, reflection: e.target.value }))}
                  placeholder="Write freely — this is your space..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={addEntry} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  Save Entry
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Entries List */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-foreground">Your Entries</h2>
            {entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Start journaling to see your entries here.</p>
              </div>
            ) : (
              entries.slice(0, 20).map((e) => {
                const moodInfo = MOOD_OPTIONS.find((m) => m.value === e.mood);
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{moodInfo?.emoji}</span>
                        <span className="text-sm font-medium text-foreground">
                          {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">— {moodInfo?.label}</span>
                      </div>
                      <button onClick={() => deleteEntry(e.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {e.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {e.symptoms.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    )}
                    {privacyMode ? (
                      <p className="text-sm text-muted-foreground italic">🔒 Content hidden</p>
                    ) : (
                      e.reflection && <p className="text-sm text-muted-foreground leading-relaxed">{e.reflection}</p>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-lavender/50 border border-lavender">
            <p className="text-xs text-lavender-foreground">
              🔒 Your journal is stored only on this device. Use the lock icon to hide entry content.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Journal;
