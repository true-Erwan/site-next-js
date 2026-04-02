import React from "react";
import TradingChart from "../components/TradingChart";
import styles from "./portfolio.module.css";

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Erwan</h1>
          <div className={styles.tagline}>Trader • Builder • Problem Solver</div>
        </div>
      </header>
      
      <main className={styles.dashboardLayout}>
        {/* Informational overlay resembling standard chart widgets */}
        <div className={styles.infoOverlay}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
            SYMBOL: <span style={{ color: 'var(--text-main)' }}>CRER</span> <br/>
            TIMEFRAME: <span style={{ color: 'var(--neon-green)' }}>ALL TIME</span><br/>
            STATUS: <span style={{ color: 'var(--neon-green)' }}>ACTIVE TRENDUP</span>
          </div>
        </div>

        <TradingChart />
      </main>
    </div>
  );
}
