export type VisualType = 'spike' | 'consolidation' | 'accumulation' | 'breakout' | 'stacked' | 'rally';

export interface Milestone {
  id: string;
  displayYear: string;
  label: string;
  description: string;
  detailedDescription?: string;
  visualType: VisualType;
  status: 'positive' | 'neutral' | 'negative';
  // Abstract coordinates used for SVG chart drawing (0 to 1 scaling, scaled by component)
  xPosition: number; // 0 to 100 timeline position
  yPosition: number; // 0 to 100 relative price height (100 is top)
}


export const chartData: Milestone[] = [
  {
    id: "1",
    displayYear: "2021",
    label: "Digital Marketing Automation",
    description: "Created and ran an automated bot generating €1,800 revenue at just 15 years old.",
    detailedDescription: `This project represents a significant milestone in my partnership with my long-time friend and current business associate. While he took the lead on developing the core source code, my role focused primarily on system optimization—refining the logic and performance to ensure the tool operated at peak efficiency.

**How the Bot Works**
The mechanism behind the bot is straightforward yet effective:

• Analysis: It scans various digital advertising slots to evaluate their market potential.
• Acquisition: If the bot identifies a placement as "profitable" based on our pre-set parameters, it automatically executes the purchase.
• Resale: The bot then flips these placements to major brands—such as Carrefour or Decathlon—securing a margin on the transaction.

**Strategic Impact**
The primary value of this bot was its ability to generate passive income. Although the total profits were modest—largely due to our limited initial capital as young entrepreneurs—the real success was in the automation.

Because the bot handled the transactions autonomously, it allowed us to maintain our academic responsibilities and focus on developing other projects simultaneously. It was our first true venture into scalable, automated business logic.`,
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
    detailedDescription: `Initially, I had no background in the financial markets. However, after seeing the impressive results achieved by my childhood friend, Loris Rameau, I decided to take the leap. I started with copy trading, mirroring his moves without fully grasping the underlying mechanics.

**The Learning Curve**
As I watched the daily flow of open and closed positions on my account, my curiosity took over. What began as a simple desire to understand my own finances quickly evolved:

• Observation: Tracking live transactions sparked my initial interest.
• Curiosity: I moved from passive watching to active researching to understand the "why" behind each trade.
• Passion: What started as a necessity became a hobby, and eventually, a genuine passion for the markets.

**Personal Growth**
Once the passion took hold, I dedicated myself to rigorous self-training. I moved beyond simply following others and began developing my own strategies and technical analysis. Through consistent practice and study, I refined my skills to reach the level of proficiency I hold today.`,
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
    detailedDescription: `I completed two years of a Bachelor’s degree in Physics at Paris-Sud University (Paris XI), specializing in Space Mechanics. This period allowed me to immerse myself in the world of academic research, which was my primary focus at the time. My ultimate goal was to pursue a PhD and join the CNRS (French National Centre for Scientific Research) as an Astrophysicist.

**The Turning Point**
However, during my studies, I conducted several interviews with professionals and researchers in the field. These conversations led to two major realizations:

• Limited Opportunities: The number of available positions in public research is extremely low, making the path to a stable career path nearly non-existent.
• Financial Disparity: The salary prospects in the public sector were not competitive, especially when compared to the income I was already beginning to generate through trading.

Ultimately, I decided to pivot. I chose to leverage my analytical skills and mathematical background—honed during my physics degree—to focus fully on the financial markets, where the rewards are more closely aligned with performance and individual initiative.`,
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
    detailedDescription: `Building on my trading expertise, I eventually joined a specialized development team focused on building an automated trading bot. My role was that of a Technical Analyst, serving as the strategic bridge between the financial markets and the software engineering team.

**Role & Responsibilities**
My primary objective was to guide the developers on which features and logic to integrate into the bot to ensure peak performance. This included:

• Strategic Direction: Selecting and validating relevant technical indicators (such as RSI, Moving Averages, or Order Flow) for the bot to track.
• Logic Design: Defining the entry and exit parameters to ensure the bot operated with a statistical edge.

**Team Collaboration & Workflow**
To maintain a high pace of development, we utilized a structured communication framework:

• Cross-Functional Communication: Continuous exchange of technical documentation and updates via email between the analysis and development teams.
• Weekly Sprint Meetings: I participated in weekly all-hands meetings to review the project’s global progress, analyze backtesting results, and refine the bot’s performance based on live market data.`,
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
    detailedDescription: `Following my experience as an analyst, I co-founded my own trading bot venture alongside my childhood friend, who served as a lead developer in our previous team.

**Development & Risk Management**
Leveraging the foundation of our previous project with full authorization, we undertook an extensive overhaul of the system. Our primary focus was Risk Mitigation. To ensure the long-term viability of the algorithm, we:

• High-Performance Infrastructure: Invested in next-generation processors to handle massive datasets.
• Extensive Backtesting: Conducted rigorous simulations over a 6-year historical period.
• Stress Testing: Specifically ensured the bot’s resilience during major market shocks, such as the COVID-19 volatility, to guarantee it could survive extreme "Black Swan" events.

**Roles & Business Model**
In this partnership, we maintained a clear division of labor:

• Technical Lead: My partner managed the core software development.
• Commercial & Strategy: I spearheaded the Business Development and marketing efforts, focusing on investor relations and client acquisition. I also continued to contribute to the optimization of the trading logic.
• Revenue Model: We implemented a performance-based model, where our firm earns a commission (success fee) on the net profits generated for our clients.`,
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
    detailedDescription: `I successfully secured €80,000 in funding through the prop firm FTMO. While the concept of prop firm funding is straightforward in principle, passing the evaluation requires deep market knowledge and disciplined execution to reach a "cash-out" stage.

**The Evaluation Process**
To prove my consistency, I had to complete a rigorous two-step challenge on a simulated account:

• Phase 1 (The Challenge): I was required to reach a 10% profit target while adhering to strict drawdown limits: a 10% maximum overall loss and a 5% maximum daily loss.
• Phase 2 (Verification): Upon passing, I was given a second account with a 5% profit target, maintaining the same loss constraints.

**Live Funding & Risk Management**
Once I validated these steps, I was granted access to a live funded account. The rules remained strict: a 10% maximum total drawdown and a daily loss limit. Under this agreement, the profit-sharing model allows me to keep 80% of the gains, with 20% going to the firm.

The key takeaway from this experience is that Risk Management is the single most important factor. Success isn't just about making profits; it’s about protecting the capital through disciplined trade sizing and emotional control.`,
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
    detailedDescription: `During my time at Eugenia School, I participated in several Business Deep Dives and Hackathons. In these intensive challenges, established companies and startups presented us with real-world business bottlenecks. Our task was to analyze the problems, engineer viable solutions, and present them to a professional jury.

**Proven Track Record**
Throughout these experiences, I consistently performed at the highest level, frequently securing a spot on the top three podium. These competitions allowed me to refine my public speaking and strategic thinking.

**LVMH Challenge Winner**
My most notable achievement was winning first place in a challenge hosted by the prestigious LVMH Group. This victory provided my team and me with a unique opportunity to:

• On-site Visit: Tour the LVMH headquarters and gain an inside look at their operations.
• Executive Pitch: Present our solution directly to a panel of LVMH executives and experts within their offices.

This experience was instrumental in learning how to tailor a high-level business pitch to meet the standards of one of the world's leading luxury conglomerates.`,
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
    detailedDescription: `In 2025, I successfully expanded my investment portfolio into the real estate market, focusing on two distinct strategic acquisitions through competitive bidding:

**Property Portfolio**
• Paris Residential Asset: I acquired a property in Paris, which is currently occupied by tenants and generating consistent rental income.
• Seine-et-Marne Value-Add Project: My second acquisition is located in Seine-et-Marne, approximately one hour from Paris Gare de Lyon. I am currently overseeing a full renovation of this property with the goal of "flipping" it for a profit. The capital gained from this resale will be reinvested into larger-scale developments.

**Equity & Dividend Strategy**
To balance the high-intensity nature of my trading activities, I have also built a long-term stock portfolio. I focus on low-volatility, blue-chip companies to stabilize my finances. My objective with this equity strategy is to secure a steady stream of dividends, ensuring long-term financial health and capital preservation.`,
    visualType: "consolidation",
    status: "positive",
    xPosition: 100,
    yPosition: 100,
  }
];
