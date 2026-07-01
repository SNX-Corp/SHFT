export interface SeasonPhase {
  period: string;
  title: string;
  description: string;
  intensity: "low" | "medium" | "high";
}

export const seasonPhases: SeasonPhase[] = [
  {
    period: "JUN – AUG",
    title: "Off-Season Foundation",
    description: "Team formation, skill assessments, introductory workshops. Students learn CAD, basic fabrication, and team workflows. Practice robot projects to build confidence.",
    intensity: "low",
  },
  {
    period: "SEP – DEC",
    title: "Pre-Season Training",
    description: "Intensive skill development, advanced workshops, strategy analysis of previous games. Build subsystem prototypes. Full-team practice sessions and design reviews.",
    intensity: "medium",
  },
  {
    period: "JANUARY",
    title: "Game Reveal & Design Sprint",
    description: "FRC releases the new game. The team analyzes the challenge, develops strategy, and finalizes robot design within the first week. This is where preparation meets execution.",
    intensity: "high",
  },
  {
    period: "JAN – FEB",
    title: "Build Season",
    description: "Six weeks of intense engineering. CAD to fabrication to wiring to code to testing. The robot comes to life. Every student has a critical role.",
    intensity: "high",
  },
  {
    period: "MAR – APR",
    title: "Competition Season",
    description: "District events across Ontario. Alliance selection, qualification matches, elimination rounds. The path to District Championship and beyond.",
    intensity: "high",
  },
  {
    period: "APR – MAY",
    title: "Championships & Debrief",
    description: "District Championship qualification push. If qualified, Worlds in Houston. Season debrief, documentation, and celebrating what we built together.",
    intensity: "medium",
  },
];
