export type VisualType = 'spike' | 'consolidation' | 'accumulation' | 'breakout' | 'stacked' | 'rally';

export interface Milestone {
  id: string;
  displayYear: string;
  label: string;
  description: string;
  visualType: VisualType;
  status: 'positive' | 'neutral' | 'negative';
  // Abstract coordinates used for SVG chart drawing (0 to 1 scaling, scaled by component)
  xPosition: number; // 0 to 100 timeline position
  yPosition: number; // 0 to 100 relative price height (100 is top)
}

export const chartData: Milestone[] = [
  {
    id: "1",
    displayYear: "2018",
    label: "Digital Marketing Automation",
    description: "Created an automated bot generating €1,800 revenue",
    visualType: "spike",
    status: "positive",
    xPosition: 10,
    yPosition: 85, // Small spike early on
  },
  {
    id: "2",
    displayYear: "2022",
    label: "Trading Entry",
    description: "Started with copy trading, then transitioned to manual trading",
    visualType: "consolidation",
    status: "neutral",
    xPosition: 25,
    yPosition: 75, // Consolidating somewhat higher than base
  },
  {
    id: "3",
    displayYear: "2023–2025",
    label: "Knowledge Accumulation Phase",
    description: "Completed 2 years studying physics at university",
    visualType: "accumulation",
    status: "neutral",
    xPosition: 45,
    yPosition: 70, // Sideways accumulation, slight dip
  },
  {
    id: "4",
    displayYear: "2024",
    label: "Trading Bot Development",
    description: "Co-developed a trading bot reaching €120,000 capital",
    visualType: "breakout",
    status: "positive",
    xPosition: 65,
    yPosition: 40, // Strong breakout upwards (lower Y is higher on screen usually, or if we map Y=100 bottom, let's map Y=100 as top, Y=0 as bottom, but standard SVG has 0 at top. Let's provide standard cartesian with Y=100 as top, and convert in UI)
  },
  {
    id: "5",
    displayYear: "2022–2025",
    label: "FTMO Funding",
    description: "Funded 4 times, totaling €80,000 in capital",
    visualType: "stacked",
    status: "positive",
    xPosition: 80,
    yPosition: 30, // Stacked gains extending breakout
  },
  {
    id: "6",
    displayYear: "Late 2025",
    label: "Elite Performance Phase (Eugenia School)",
    description: "Participated in databases & hackathons: 🥇 1st place (LVMH), 🥈 2nd place (Payfit)",
    visualType: "rally",
    status: "positive",
    xPosition: 95,
    yPosition: 10, // Peak performance zone
  }
];
