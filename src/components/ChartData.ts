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
    yPosition: 15, // Small spike early on
  },
  {
    id: "2",
    displayYear: "2022",
    label: "Trading Entry",
    description: "Started with copy trading, then transitioned to manual trading",
    visualType: "consolidation",
    status: "neutral",
    xPosition: 25,
    yPosition: 40,
  },
  {
    id: "3",
    displayYear: "2023–2025",
    label: "Knowledge Accumulation Phase",
    description: "Completed 2 years studying physics at university",
    visualType: "accumulation",
    status: "neutral",
    xPosition: 45,
    yPosition: 20, // Sideways accumulation, slight dip
  },
  {
    id: "4",
    displayYear: "2024",
    label: "Trading Bot Team",
    description: "Member of a team managing a trading bot with over €700k in equity.",
    visualType: "breakout",
    status: "positive",
    xPosition: 57,
    yPosition: 60,
  },
  {
    id: "5",
    displayYear: "2024",
    label: "Personal Trading Bot",
    description: "Developed my own trading bot (managing €120k) to significantly improve performance and risk management.",
    visualType: "breakout",
    status: "positive",
    xPosition: 70,
    yPosition: 45,
  },
  {
    id: "6",
    displayYear: "2022–2025",
    label: "FTMO Funding",
    description: "Funded 4 times, totaling €80,000 in capital",
    visualType: "stacked",
    status: "positive",
    xPosition: 82,
    yPosition: 80,
  },
  {
    id: "7",
    displayYear: "Late 2025",
    label: "Elite Performance Phase (Eugenia School)",
    description: "Participated in BDD & hackathons: 🥇 1st place (LVMH), 🥈 2nd place (Payfit), 🥉 3rd place (Licter)",
    visualType: "rally",
    status: "positive",
    xPosition: 90,
    yPosition: 65,
  },
  {
    id: "8",
    displayYear: "Very Late 2025",
    label: "Portfolio Diversification",
    description: "Acquired over €200k in real estate capital to diversify revenue streams, alongside a portfolio of publicly traded stocks.",
    visualType: "consolidation",
    status: "positive",
    xPosition: 100,
    yPosition: 100,
  }
];
