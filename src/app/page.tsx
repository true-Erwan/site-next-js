import React from "react";
import TradingChart from "../components/TradingChart";
import styles from "./portfolio.module.css";

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>ERWAN ZOUAOUI</h1>
          <div className={styles.tagline}>Trader • Builder • Problem Solver</div>
        </div>

        <div className={styles.contactWrapper}>
          <div className={styles.contactIcon}>Contact</div>
          <div className={styles.contactMenu}>
            <div className={styles.contactSection}>
              <div className={styles.contactName}>ERWAN ZOUAOUI</div>
              <a href="https://wa.me/33762654830" target="_blank" rel="noreferrer" className={styles.contactLink}>
                <span>WhatsApp:</span>+33 07 62 65 48 30
              </a>
              <a href="mailto:ezouaoui@eugeniaschool.com" className={styles.contactLink}>
                <span>Email:</span>ezouaoui@eugeniaschool.com
              </a>
              <a href="https://fr.linkedin.com/in/erwan-zouaoui-39843b2b7" target="_blank" rel="noreferrer" className={styles.contactLink}>
                <span>LinkedIn:</span>Erwan Zouaoui
              </a>
            </div>

            <div className={styles.contactSection}>
              <div className={styles.contactName}>DJAMEL ZOUAOUI</div>
              <div className={styles.contactDesc}>
                Business Law Attorney specializing in Real Estate. Proven track record of securing profits across all transactions and auctions, having successfully acquired hundreds of apartments for himself and his clients.
              </div>
              <a href="tel:+33660820506" className={styles.contactLink}>
                <span>Tel:</span>+33 6 60 82 05 06
              </a>
              <a href="mailto:dja.zouaoui@gmail.com" className={styles.contactLink}>
                <span>Email:</span>dja.zouaoui@gmail.com
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className={styles.dashboardLayout}>
        {/* Informational overlay resembling standard chart widgets */}
        <div className={styles.infoOverlay}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
            SYMBOLS: <span style={{ color: 'var(--text-main)' }}>XAUUSD, XAGUSD, USDJPY, EURUSD</span> <br/>
            TIMEFRAME: <span style={{ color: 'var(--neon-green)' }}>ALL TIME</span><br/>
            STATUS: <span style={{ color: 'var(--neon-green)' }}>ACTIVE TRENDUP</span>
          </div>
        </div>

        <TradingChart />
      </main>
    </div>
  );
}
