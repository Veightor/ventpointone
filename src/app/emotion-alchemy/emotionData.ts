// Emotion Alchemy Data System
// Based on Plutchik's Wheel of Emotions and Character Archetypes

export interface BaseElement {
  id: string;
  name: string;
  type: "emotion" | "character" | "mood";
  description: string;
  color: string;
  icon: string;
  discovered?: boolean;
  isStarting?: boolean;
  intensity?: "mild" | "moderate" | "intense";
}

export interface Combination {
  id: string;
  element1: string;
  element2: string;
  result: string;
  description: string;
  discoveryMessage: string;
}

// Starting Elements - Plutchik's 8 Primary Emotions
export const startingEmotions: BaseElement[] = [
  {
    id: "joy",
    name: "Joy",
    type: "emotion",
    description: "Pure happiness and contentment",
    color: "#FFD700",
    icon: "😊",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "trust",
    name: "Trust",
    type: "emotion",
    description: "Confidence and faith in others",
    color: "#32CD32",
    icon: "🤝",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "fear",
    name: "Fear",
    type: "emotion",
    description: "Anxiety and apprehension",
    color: "#8B008B",
    icon: "😰",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "surprise",
    name: "Surprise",
    type: "emotion",
    description: "Unexpected wonder and amazement",
    color: "#FF6347",
    icon: "😲",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "sadness",
    name: "Sadness",
    type: "emotion",
    description: "Melancholy and sorrow",
    color: "#4169E1",
    icon: "😢",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "disgust",
    name: "Disgust",
    type: "emotion",
    description: "Revulsion and aversion",
    color: "#9ACD32",
    icon: "🤢",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "anger",
    name: "Anger",
    type: "emotion",
    description: "Rage and indignation",
    color: "#DC143C",
    icon: "😠",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
  {
    id: "anticipation",
    name: "Anticipation",
    type: "emotion",
    description: "Excitement for what's to come",
    color: "#FF8C00",
    icon: "🤔",
    isStarting: true,
    discovered: true,
    intensity: "moderate",
  },
];

// Starting Characters - Classic Archetypes
export const startingCharacters: BaseElement[] = [
  {
    id: "hero",
    name: "Hero",
    type: "character",
    description: "The protagonist who overcomes challenges",
    color: "#FFD700",
    icon: "🎭",
    isStarting: true,
    discovered: true,
  },
  {
    id: "mentor",
    name: "Mentor",
    type: "character",
    description: "The wise guide who offers knowledge",
    color: "#8A2BE2",
    icon: "🧙",
    isStarting: true,
    discovered: true,
  },
  {
    id: "shadow",
    name: "Shadow",
    type: "character",
    description: "The dark reflection of the hero",
    color: "#2F4F4F",
    icon: "🌑",
    isStarting: true,
    discovered: true,
  },
  {
    id: "trickster",
    name: "Trickster",
    type: "character",
    description: "The agent of chaos and change",
    color: "#FF1493",
    icon: "🤡",
    isStarting: true,
    discovered: true,
  },
];

// Complex Mood Elements (discovered through combinations)
export const discoveredMoods: BaseElement[] = [
  // Primary Emotion Combinations (Plutchik's Adjacent Emotions)
  {
    id: "love",
    name: "Love",
    type: "mood",
    description: "Deep affection and care (Joy + Trust)",
    color: "#FF69B4",
    icon: "💖",
    discovered: false,
  },
  {
    id: "submission",
    name: "Submission",
    type: "mood",
    description: "Yielding to authority (Trust + Fear)",
    color: "#9370DB",
    icon: "🙏",
    discovered: false,
  },
  {
    id: "alarm",
    name: "Alarm",
    type: "mood",
    description: "Sudden alertness (Fear + Surprise)",
    color: "#FF4500",
    icon: "🚨",
    discovered: false,
  },
  {
    id: "disappointment",
    name: "Disappointment",
    type: "mood",
    description: "Unmet expectations (Surprise + Sadness)",
    color: "#708090",
    icon: "😞",
    discovered: false,
  },
  {
    id: "remorse",
    name: "Remorse",
    type: "mood",
    description: "Deep regret (Sadness + Disgust)",
    color: "#4682B4",
    icon: "😔",
    discovered: false,
  },
  {
    id: "contempt",
    name: "Contempt",
    type: "mood",
    description: "Scornful disdain (Disgust + Anger)",
    color: "#B22222",
    icon: "😤",
    discovered: false,
  },
  {
    id: "aggressiveness",
    name: "Aggressiveness",
    type: "mood",
    description: "Assertive hostility (Anger + Anticipation)",
    color: "#DC143C",
    icon: "😡",
    discovered: false,
  },
  {
    id: "optimism",
    name: "Optimism",
    type: "mood",
    description: "Hopeful expectation (Anticipation + Joy)",
    color: "#FFD700",
    icon: "😄",
    discovered: false,
  },

  // Character + Emotion Combinations
  {
    id: "noble_warrior",
    name: "Noble Warrior",
    type: "mood",
    description: "Courageous defender (Hero + Joy)",
    color: "#DAA520",
    icon: "⚔️",
    discovered: false,
  },
  {
    id: "dark_knight",
    name: "Dark Knight",
    type: "mood",
    description: "Brooding protector (Hero + Sadness)",
    color: "#2F4F4F",
    icon: "🗡️",
    discovered: false,
  },
  {
    id: "wise_sage",
    name: "Wise Sage",
    type: "mood",
    description: "Tranquil teacher (Mentor + Trust)",
    color: "#9370DB",
    icon: "📚",
    discovered: false,
  },
  {
    id: "mysterious_oracle",
    name: "Mysterious Oracle",
    type: "mood",
    description: "Enigmatic prophet (Mentor + Fear)",
    color: "#483D8B",
    icon: "🔮",
    discovered: false,
  },
  {
    id: "chaotic_jester",
    name: "Chaotic Jester",
    type: "mood",
    description: "Unpredictable entertainer (Trickster + Surprise)",
    color: "#FF1493",
    icon: "🃏",
    discovered: false,
  },
  {
    id: "dark_tempter",
    name: "Dark Tempter",
    type: "mood",
    description: "Seductive corruptor (Shadow + Disgust)",
    color: "#8B0000",
    icon: "😈",
    discovered: false,
  },

  // Secondary Combinations (more complex moods)
  {
    id: "melancholic_poet",
    name: "Melancholic Poet",
    type: "mood",
    description: "Beautiful sadness and creativity",
    color: "#4682B4",
    icon: "🎨",
    discovered: false,
  },
  {
    id: "passionate_rebel",
    name: "Passionate Rebel",
    type: "mood",
    description: "Fiery determination against the system",
    color: "#DC143C",
    icon: "✊",
    discovered: false,
  },
  {
    id: "serene_philosopher",
    name: "Serene Philosopher",
    type: "mood",
    description: "Calm contemplation of existence",
    color: "#9370DB",
    icon: "🧘",
    discovered: false,
  },
  {
    id: "whimsical_dreamer",
    name: "Whimsical Dreamer",
    type: "mood",
    description: "Playful imagination and wonder",
    color: "#FF69B4",
    icon: "🌟",
    discovered: false,
  },
  {
    id: "stoic_guardian",
    name: "Stoic Guardian",
    type: "mood",
    description: "Unwavering protector of principles",
    color: "#2F4F4F",
    icon: "🛡️",
    discovered: false,
  },
];

// Combination Rules
export const combinations: Combination[] = [
  // Primary Emotion Combinations (Plutchik's Adjacent Pairs)
  {
    id: "joy_trust_love",
    element1: "joy",
    element2: "trust",
    result: "love",
    description:
      "Joy and Trust create Love - the perfect harmony of happiness and faith",
    discoveryMessage: "When joy meets trust, love blooms eternal! 💖",
  },
  {
    id: "trust_fear_submission",
    element1: "trust",
    element2: "fear",
    result: "submission",
    description:
      "Trust and Fear create Submission - yielding to respected authority",
    discoveryMessage: "Fear tempered by trust creates humble submission 🙏",
  },
  {
    id: "fear_surprise_alarm",
    element1: "fear",
    element2: "surprise",
    result: "alarm",
    description: "Fear and Surprise create Alarm - sudden alertness to danger",
    discoveryMessage: "Unexpected fear triggers alarm! 🚨",
  },
  {
    id: "surprise_sadness_disappointment",
    element1: "surprise",
    element2: "sadness",
    result: "disappointment",
    description:
      "Surprise and Sadness create Disappointment - unmet expectations",
    discoveryMessage: "When surprise turns sad, disappointment follows 😞",
  },
  {
    id: "sadness_disgust_remorse",
    element1: "sadness",
    element2: "disgust",
    result: "remorse",
    description:
      "Sadness and Disgust create Remorse - deep regret for past actions",
    discoveryMessage: "Sadness mixed with disgust brings deep remorse 😔",
  },
  {
    id: "disgust_anger_contempt",
    element1: "disgust",
    element2: "anger",
    result: "contempt",
    description: "Disgust and Anger create Contempt - scornful disdain",
    discoveryMessage: "Disgust and anger unite in contempt 😤",
  },
  {
    id: "anger_anticipation_aggressiveness",
    element1: "anger",
    element2: "anticipation",
    result: "aggressiveness",
    description:
      "Anger and Anticipation create Aggressiveness - assertive hostility",
    discoveryMessage: "Anger awaiting action becomes aggressiveness! 😡",
  },
  {
    id: "anticipation_joy_optimism",
    element1: "anticipation",
    element2: "joy",
    result: "optimism",
    description: "Anticipation and Joy create Optimism - hopeful expectation",
    discoveryMessage: "Joy meets anticipation in bright optimism! 😄",
  },

  // Character + Emotion Combinations
  {
    id: "hero_joy_noble",
    element1: "hero",
    element2: "joy",
    result: "noble_warrior",
    description: "Hero with Joy creates Noble Warrior - a courageous defender",
    discoveryMessage: "A joyful hero becomes a noble warrior! ⚔️",
  },
  {
    id: "hero_sadness_dark",
    element1: "hero",
    element2: "sadness",
    result: "dark_knight",
    description: "Hero with Sadness creates Dark Knight - a brooding protector",
    discoveryMessage: "A sad hero transforms into a dark knight 🗡️",
  },
  {
    id: "mentor_trust_sage",
    element1: "mentor",
    element2: "trust",
    result: "wise_sage",
    description: "Mentor with Trust creates Wise Sage - a tranquil teacher",
    discoveryMessage: "A trusted mentor becomes a wise sage 📚",
  },
  {
    id: "mentor_fear_oracle",
    element1: "mentor",
    element2: "fear",
    result: "mysterious_oracle",
    description:
      "Mentor with Fear creates Mysterious Oracle - an enigmatic prophet",
    discoveryMessage: "A fearful mentor becomes a mysterious oracle 🔮",
  },
  {
    id: "trickster_surprise_jester",
    element1: "trickster",
    element2: "surprise",
    result: "chaotic_jester",
    description:
      "Trickster with Surprise creates Chaotic Jester - unpredictable entertainer",
    discoveryMessage: "A surprising trickster becomes a chaotic jester! 🃏",
  },
  {
    id: "shadow_disgust_tempter",
    element1: "shadow",
    element2: "disgust",
    result: "dark_tempter",
    description:
      "Shadow with Disgust creates Dark Tempter - seductive corruptor",
    discoveryMessage: "A disgusted shadow becomes a dark tempter 😈",
  },

  // Complex Mood Combinations (require specific mood elements)
  {
    id: "love_sadness_poet",
    element1: "love",
    element2: "sadness",
    result: "melancholic_poet",
    description:
      "Love and Sadness create Melancholic Poet - beautiful sadness and creativity",
    discoveryMessage: "Love touched by sadness births the melancholic poet 🎨",
  },
  {
    id: "anger_hero_rebel",
    element1: "aggressiveness",
    element2: "hero",
    result: "passionate_rebel",
    description:
      "Aggressiveness and Hero create Passionate Rebel - fiery determination",
    discoveryMessage: "An aggressive hero becomes a passionate rebel! ✊",
  },
  {
    id: "trust_mentor_philosopher",
    element1: "submission",
    element2: "mentor",
    result: "serene_philosopher",
    description:
      "Submission and Mentor create Serene Philosopher - calm contemplation",
    discoveryMessage: "Submissive wisdom creates the serene philosopher 🧘",
  },
  {
    id: "joy_trickster_dreamer",
    element1: "optimism",
    element2: "trickster",
    result: "whimsical_dreamer",
    description:
      "Optimism and Trickster create Whimsical Dreamer - playful imagination",
    discoveryMessage: "Optimistic trickery sparks the whimsical dreamer! 🌟",
  },
  {
    id: "fear_hero_guardian",
    element1: "submission",
    element2: "hero",
    result: "stoic_guardian",
    description:
      "Submission and Hero create Stoic Guardian - unwavering protector",
    discoveryMessage: "A submissive hero becomes the stoic guardian 🛡️",
  },
];

// All Elements Combined
export const allElements: BaseElement[] = [
  ...startingEmotions,
  ...startingCharacters,
  ...discoveredMoods,
];

// Helper Functions
export const getElementById = (id: string): BaseElement | undefined => {
  return allElements.find((element) => element.id === id);
};

export const getCombination = (
  element1Id: string,
  element2Id: string
): Combination | undefined => {
  return combinations.find(
    (combo) =>
      (combo.element1 === element1Id && combo.element2 === element2Id) ||
      (combo.element1 === element2Id && combo.element2 === element1Id)
  );
};

export const getStartingElements = (): BaseElement[] => {
  return [...startingEmotions, ...startingCharacters];
};

export const getDiscoverableElements = (): BaseElement[] => {
  return discoveredMoods;
};
