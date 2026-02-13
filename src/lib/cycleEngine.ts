// Cycle Phase Engine — calculates current menstrual phase and provides daily guidance

export type CyclePhase = "menstrual" | "follicular" | "ovulatory" | "luteal";

export interface PhaseInfo {
  phase: CyclePhase;
  day: number;
  totalDays: number;
  label: string;
  energy: string;
  emotionalForecast: string;
  bodySensitivity: string;
  foodPriorities: string[];
  selfCareFocus: string;
  productivity: string;
  color: string;
  emoji: string;
}

export interface CycleProfile {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
}

export interface SymptomLog {
  date: string;
  cramps: number; // 0-3
  fatigue: number; // 0-3
  moodSwings: number; // 0-3
  sleepQuality: number; // 1-5
  bloating: boolean;
  headache: boolean;
  notes: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: "great" | "good" | "okay" | "low" | "rough";
  symptoms: string[];
  reflection: string;
  createdAt: string;
}

export interface PatternInsight {
  type: "prediction" | "pattern" | "suggestion";
  message: string;
  icon: string;
}

const PHASE_DATA: Record<CyclePhase, Omit<PhaseInfo, "phase" | "day" | "totalDays">> = {
  menstrual: {
    label: "Menstrual Phase",
    energy: "Low — honor your body's need for rest",
    emotionalForecast: "Introspective & sensitive — be gentle with yourself",
    bodySensitivity: "High — cramps, fatigue, and tenderness are common",
    foodPriorities: ["Iron-rich foods (spinach, lentils)", "Warm soups & stews", "Dark chocolate", "Hydrating fruits"],
    selfCareFocus: "Rest, warmth, and comfort. Hot water bottles, gentle stretching",
    productivity: "Focus on light tasks. This is your reflection & planning phase",
    color: "rose",
    emoji: "🌙",
  },
  follicular: {
    label: "Follicular Phase",
    energy: "Rising — you'll feel increasingly energized",
    emotionalForecast: "Optimistic & creative — great time for new ideas",
    bodySensitivity: "Decreasing — your body is recovering and rebuilding",
    foodPriorities: ["Lean proteins", "Fermented foods", "Fresh vegetables", "Sprouted grains"],
    selfCareFocus: "Try new activities, socialize, and set intentions",
    productivity: "High creativity. Start new projects, brainstorm, learn new skills",
    color: "sage",
    emoji: "🌱",
  },
  ovulatory: {
    label: "Ovulatory Phase",
    energy: "Peak — your highest energy window",
    emotionalForecast: "Confident & social — you'll feel most outgoing",
    bodySensitivity: "Moderate — some may feel mild ovulation discomfort",
    foodPriorities: ["Light, fresh meals", "Raw fruits & vegetables", "Quinoa & whole grains", "Anti-inflammatory foods"],
    selfCareFocus: "Channel your energy — exercise, connect, and express yourself",
    productivity: "Peak performance. Schedule important meetings and challenging work",
    color: "gold",
    emoji: "✨",
  },
  luteal: {
    label: "Luteal Phase",
    energy: "Gradually declining — pace yourself",
    emotionalForecast: "Detail-oriented but may feel irritable. Practice patience",
    bodySensitivity: "Increasing — PMS symptoms may appear (bloating, tenderness)",
    foodPriorities: ["Complex carbs (sweet potatoes, oats)", "Magnesium-rich foods", "Omega-3 fatty acids", "Calming teas (chamomile)"],
    selfCareFocus: "Nesting & completion. Finish tasks, organize, practice self-compassion",
    productivity: "Good for detail work and completing projects. Avoid overcommitting",
    color: "lavender",
    emoji: "🍂",
  },
};

export function getCycleDay(profile: CycleProfile): number {
  const today = new Date();
  const lastPeriod = new Date(profile.lastPeriodDate);
  const diffMs = today.getTime() - lastPeriod.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return (diffDays % profile.cycleLength) + 1;
}

export function getCurrentPhase(profile: CycleProfile): PhaseInfo {
  const cycleDay = getCycleDay(profile);
  const { cycleLength, periodLength } = profile;

  let phase: CyclePhase;
  if (cycleDay <= periodLength) {
    phase = "menstrual";
  } else if (cycleDay <= Math.floor(cycleLength * 0.45)) {
    phase = "follicular";
  } else if (cycleDay <= Math.floor(cycleLength * 0.55)) {
    phase = "ovulatory";
  } else {
    phase = "luteal";
  }

  return {
    phase,
    day: cycleDay,
    totalDays: cycleLength,
    ...PHASE_DATA[phase],
  };
}

export function getPhaseProgress(profile: CycleProfile): number {
  const day = getCycleDay(profile);
  return (day / profile.cycleLength) * 100;
}

export function getDaysUntilNextPeriod(profile: CycleProfile): number {
  const day = getCycleDay(profile);
  return profile.cycleLength - day;
}

// Pattern Detection
export function detectPatterns(logs: SymptomLog[], profile: CycleProfile): PatternInsight[] {
  const insights: PatternInsight[] = [];
  if (logs.length < 3) return insights;

  const currentDay = getCycleDay(profile);

  // Find patterns around same cycle day
  const sameDayLogs = logs.filter((log) => {
    const logDate = new Date(log.date);
    const lastPeriod = new Date(profile.lastPeriodDate);
    const diff = Math.floor((logDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const logCycleDay = (diff % profile.cycleLength) + 1;
    return Math.abs(logCycleDay - currentDay) <= 2;
  });

  if (sameDayLogs.length >= 2) {
    const avgFatigue = sameDayLogs.reduce((s, l) => s + l.fatigue, 0) / sameDayLogs.length;
    if (avgFatigue >= 2) {
      insights.push({
        type: "prediction",
        message: "You often feel fatigue around this time — prioritize rest and hydration today.",
        icon: "💤",
      });
    }

    const avgCramps = sameDayLogs.reduce((s, l) => s + l.cramps, 0) / sameDayLogs.length;
    if (avgCramps >= 2) {
      insights.push({
        type: "prediction",
        message: "Cramps tend to be higher around this phase. Consider a warm compress and gentle stretching.",
        icon: "🫂",
      });
    }

    const avgMood = sameDayLogs.reduce((s, l) => s + l.moodSwings, 0) / sameDayLogs.length;
    if (avgMood >= 2) {
      insights.push({
        type: "prediction",
        message: "Mood shifts are common for you around this time. Be kind to yourself today.",
        icon: "💜",
      });
    }
  }

  // Recent stress pattern
  const recent = logs.slice(0, 5);
  const recentLowSleep = recent.filter((l) => l.sleepQuality <= 2).length;
  if (recentLowSleep >= 3) {
    insights.push({
      type: "suggestion",
      message: "Your recent sleep quality has been low. Try a calming bedtime routine tonight.",
      icon: "🌙",
    });
  }

  return insights;
}

// Wellness Blueprint
export interface WellnessBlueprint {
  commonSymptoms: { name: string; frequency: number }[];
  energyTrend: string;
  sensitiveDays: string;
  careRhythm: string;
}

export function generateBlueprint(logs: SymptomLog[], profile: CycleProfile): WellnessBlueprint | null {
  if (logs.length < 7) return null;

  const symptomCounts: Record<string, number> = {};
  logs.forEach((l) => {
    if (l.cramps >= 2) symptomCounts["Cramps"] = (symptomCounts["Cramps"] || 0) + 1;
    if (l.fatigue >= 2) symptomCounts["Fatigue"] = (symptomCounts["Fatigue"] || 0) + 1;
    if (l.moodSwings >= 2) symptomCounts["Mood Swings"] = (symptomCounts["Mood Swings"] || 0) + 1;
    if (l.bloating) symptomCounts["Bloating"] = (symptomCounts["Bloating"] || 0) + 1;
    if (l.headache) symptomCounts["Headache"] = (symptomCounts["Headache"] || 0) + 1;
  });

  const commonSymptoms = Object.entries(symptomCounts)
    .map(([name, frequency]) => ({ name, frequency: Math.round((frequency / logs.length) * 100) }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);

  const avgFatigue = logs.reduce((s, l) => s + l.fatigue, 0) / logs.length;
  const energyTrend = avgFatigue > 2 ? "Generally lower energy — build in more rest days" :
    avgFatigue > 1 ? "Moderate energy — balanced pacing recommended" :
    "Generally good energy — maintain your current rhythm";

  return {
    commonSymptoms,
    energyTrend,
    sensitiveDays: `Days ${profile.periodLength - 1}–${profile.periodLength + 2} and ${profile.cycleLength - 3}–${profile.cycleLength}`,
    careRhythm: `Focus self-care during menstrual (days 1–${profile.periodLength}) and late luteal (days ${profile.cycleLength - 4}–${profile.cycleLength})`,
  };
}

// Journal prompts based on patterns
export function getJournalPrompt(logs: SymptomLog[], journalEntries: JournalEntry[]): string {
  const recentLogs = logs.slice(0, 3);
  const recentStress = recentLogs.filter((l) => l.moodSwings >= 2).length;
  const recentFatigue = recentLogs.filter((l) => l.fatigue >= 2).length;

  if (recentStress >= 2) return "You've been experiencing mood shifts lately — what's been on your mind?";
  if (recentFatigue >= 2) return "You've logged fatigue recently. How is your body feeling today?";

  const prompts = [
    "What are you grateful for today?",
    "How did your body feel when you woke up this morning?",
    "What's one kind thing you did for yourself recently?",
    "Describe your energy in one word today.",
    "What would make today a good day?",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
