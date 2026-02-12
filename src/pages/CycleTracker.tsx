import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Smile, Frown, Meh, Zap, Moon, Droplets, Trash2 } from "lucide-react";

interface CycleEntry {
  date: string;
  flow: "light" | "medium" | "heavy";
  mood: "happy" | "neutral" | "low";
  symptoms: string[];
  notes: string;
}

const SYMPTOMS = ["Cramps", "Headache", "Bloating", "Fatigue", "Back pain", "Breast tenderness", "Nausea", "Acne"];

const CycleTracker = () => {
  const [entries, setEntries] = useState<CycleEntry[]>(() => {
    const saved = localStorage.getItem("sahaaya-cycles");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CycleEntry>({
    date: new Date().toISOString().split("T")[0],
    flow: "medium",
    mood: "neutral",
    symptoms: [],
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem("sahaaya-cycles", JSON.stringify(entries));
  }, [entries]);

  const toggleSymptom = (s: string) => {
    setForm((f) => ({
      ...f,
      symptoms: f.symptoms.includes(s) ? f.symptoms.filter((x) => x !== s) : [...f.symptoms, s],
    }));
  };

  const addEntry = () => {
    setEntries((prev) => [form, ...prev.filter((e) => e.date !== form.date)]);
    setShowForm(false);
    setForm({ date: new Date().toISOString().split("T")[0], flow: "medium", mood: "neutral", symptoms: [], notes: "" });
  };

  const deleteEntry = (date: string) => {
    setEntries((prev) => prev.filter((e) => e.date !== date));
  };

  const moodIcons = { happy: Smile, neutral: Meh, low: Frown };
  const flowColors = { light: "bg-rose/50", medium: "bg-secondary/30", heavy: "bg-secondary/60" };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose flex items-center justify-center">
              <Calendar className="w-5 h-5 text-rose-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Cycle Tracker</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Log your cycle privately. All data stays on your device.
          </p>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <Plus className="w-5 h-5" /> Log Today
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-card border border-border rounded-xl p-6 mb-8 space-y-5"
            >
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
                <label className="text-sm font-medium text-foreground mb-2 block">Flow</label>
                <div className="flex gap-2">
                  {(["light", "medium", "heavy"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setForm((prev) => ({ ...prev, flow: f }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize border transition-colors ${
                        form.flow === f
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mood</label>
                <div className="flex gap-2">
                  {(["happy", "neutral", "low"] as const).map((m) => {
                    const Icon = moodIcons[m];
                    return (
                      <button
                        key={m}
                        onClick={() => setForm((prev) => ({ ...prev, mood: m }))}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize border flex items-center justify-center gap-1.5 transition-colors ${
                          form.mood === m
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" /> {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        form.symptoms.includes(s)
                          ? "bg-lavender text-lavender-foreground border-lavender"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="How are you feeling?"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={addEntry}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Entries */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-foreground">Recent Logs</h2>
            {entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Droplets className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No entries yet. Start by logging today.</p>
              </div>
            ) : (
              entries.slice(0, 10).map((e) => {
                const MoodIcon = moodIcons[e.mood];
                return (
                  <motion.div
                    key={e.date}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-card border border-border flex items-start gap-4"
                  >
                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${flowColors[e.flow]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <div className="flex items-center gap-2">
                          <MoodIcon className="w-4 h-4 text-muted-foreground" />
                          <button onClick={() => deleteEntry(e.date)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize mb-1">{e.flow} flow</p>
                      {e.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {e.symptoms.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      )}
                      {e.notes && <p className="text-xs text-muted-foreground mt-1">{e.notes}</p>}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-lavender/50 border border-lavender">
            <p className="text-xs text-lavender-foreground">
              🔒 Your data is stored only on this device and is never sent to any server. You can delete all data anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CycleTracker;
