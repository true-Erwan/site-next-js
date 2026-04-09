"use client";

import React, { useState, useRef, useEffect } from 'react';
import { chartData, Milestone } from './ChartData';
import styles from '../app/portfolio.module.css';

export default function TradingChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Milestone | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [candles, setCandles] = useState<any[]>([]);

  useEffect(() => {
    const numCandles = 80;
    const newCandles = [];
    
    // Base anchors
    const anchors = [
       { x: 0, y: 15 },
       ...chartData.map(c => ({x: c.xPosition, y: c.yPosition}))
    ];
    
    const getBaseY = (xPos: number) => {
       for (let i = 0; i < anchors.length - 1; i++) {
          if (xPos >= anchors[i].x && xPos <= anchors[i+1].x) {
             const dx = anchors[i+1].x - anchors[i].x;
             const dy = anchors[i+1].y - anchors[i].y;
             if (dx === 0) return anchors[i].y;
             const progress = (xPos - anchors[i].x) / dx;
             return anchors[i].y + dy * progress;
          }
       }
       return anchors[anchors.length - 1].y;
    };

    let prevClose = getBaseY(0);

    for (let i = 0; i < numCandles; i++) {
        const xPos = (i / (numCandles - 1)) * 100;
        const targetY = getBaseY(xPos);
        
        let open = prevClose;
        if (Math.random() > 0.8) {
           open += (Math.random() - 0.5) * 8; 
        }

        const close = targetY + (Math.random() - 0.5) * 16;
        const top = Math.max(open, close);
        const bottom = Math.min(open, close);
        const high = top + Math.random() * 12;
        const low = bottom - Math.random() * 12;
        
        newCandles.push({
           id: i,
           xPos, 
           open, 
           close, 
           high, 
           low,
           isGreen: close >= open
        });
        
        prevClose = close;
    }
    setCandles(newCandles);
  }, []);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  // Convert logical coordinates (0-100) to actual pixels
  const getPixelCoords = (xPos: number, yPos: number) => {
    const w = dimensions.width;
    const h = dimensions.height;
    // Map X so it doesn't touch the exact edges (leave 5% padding)
    const paddingX = w * 0.05;
    const drawWidth = w - paddingX * 2;
    const x = paddingX + (xPos / 100) * drawWidth;
    
    // Map Y (0 is top, 100 is bottom for SVG standard, but our data has high Y for spikes. Let's invert: 100 yPos = near top, 0 yPos = near bottom)
    const paddingY = h * 0.15; // padding top and bottom
    const drawHeight = h - paddingY * 2;
    const y = h - paddingY - (yPos / 100) * drawHeight;
    
    return { x, y };
  };


  return (
    <div 
      className={styles.chartContainer} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Moving Averages indicators (fake background lines) */}
      <svg className={styles.svgContext}>
        <defs>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main candlestick chart */}
        {dimensions.width > 0 && candles.map((candle) => {
          const xCenter = getPixelCoords(candle.xPos, 0).x;
          const yOpen = getPixelCoords(0, candle.open).y;
          const yClose = getPixelCoords(0, candle.close).y;
          const yHigh = getPixelCoords(0, candle.high).y;
          const yLow = getPixelCoords(0, candle.low).y;
          
          const topBox = Math.min(yOpen, yClose);
          const bottomBox = Math.max(yOpen, yClose);
          const boxHeight = Math.max(bottomBox - topBox, 2);
          
          const drawWidth = dimensions.width - (dimensions.width * 0.1);
          const candleSpacing = drawWidth / candles.length;
          const candleWidth = Math.max(candleSpacing * 0.6, 2);
          
          const color = candle.isGreen ? "var(--neon-green)" : "var(--neon-red)";
          
          return (
            <g key={candle.id} style={{ opacity: 0.85 }}>
              <line
                x1={xCenter} y1={yHigh}
                x2={xCenter} y2={yLow}
                stroke={color}
                strokeWidth="1.5"
              />
              <rect
                x={xCenter - candleWidth / 2}
                y={topBox}
                width={candleWidth}
                height={boxHeight}
                fill={candle.isGreen ? "transparent" : color}
                stroke={color}
                strokeWidth="1.5"
                filter="url(#neonGlow)"
              />
            </g>
          );
        })}

        {/* Crosshair */}
        {mousePos && dimensions.width > 0 && (
          <g style={{ opacity: 0.4 }}>
            <line 
              x1={mousePos.x} y1={0} 
              x2={mousePos.x} y2={dimensions.height} 
              stroke="var(--text-dim)" strokeWidth="1" strokeDasharray="4 4" 
            />
            <line 
              x1={0} y1={mousePos.y} 
              x2={dimensions.width} y2={mousePos.y} 
              stroke="var(--text-dim)" strokeWidth="1" strokeDasharray="4 4" 
            />
          </g>
        )}

        {/* Highlight points / interactive nodes */}
        {dimensions.width > 0 && chartData.map((point) => {
          let closestCandle = candles[0];
          if (candles.length > 0) {
            let minDiff = Infinity;
            for (const c of candles) {
               const diff = Math.abs(c.xPos - point.xPosition);
               if (diff < minDiff) {
                  minDiff = diff;
                  closestCandle = c;
               }
            }
          }
          const { x: snappedX } = getPixelCoords(closestCandle ? closestCandle.xPos : point.xPosition, 0);
          const { y: snappedY } = getPixelCoords(0, closestCandle ? closestCandle.close : point.yPosition);
          
          const isHovered = hoveredNode?.id === point.id;
          return (
            <circle
              key={point.id}
              cx={snappedX}
              cy={snappedY}
              r={isHovered ? 8 : 6}
              fill="var(--bg-dark)"
              stroke="var(--neon-blue)"
              strokeWidth={3}
              filter="url(#neonGlow)"
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setHoveredNode(point)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          );
        })}
      </svg>

      {/* HTML tooltip corresponding to hovered node */}
      <div 
        className={`${styles.nodeCard} ${hoveredNode ? styles.active : styles.hidden}`}
        style={hoveredNode && dimensions.width > 0 ? (() => {
          let closest = candles[0];
          if (candles.length > 0) {
             for (const c of candles) {
                 if (!closest || Math.abs(c.xPos - hoveredNode.xPosition) < Math.abs(closest.xPos - hoveredNode.xPosition)) {
                    closest = c;
                 }
             }
          }
          const coords = {
            x: getPixelCoords(closest ? closest.xPos : hoveredNode.xPosition, 0).x,
            y: getPixelCoords(0, closest ? closest.close : hoveredNode.yPosition).y
          };
          
          const isNearTop = coords.y < dimensions.height * 0.3;
          const isNearRight = coords.x > dimensions.width * 0.8;
          return {
            left: coords.x,
            top: coords.y,
            transform: `translate(${isNearRight ? '-90%' : '-50%'}, ${isNearTop ? '20px' : 'calc(-100% - 20px)'})`
          };
        })() : undefined}
      >
        {hoveredNode && (
          <>
            <div className={styles.nodeYear}>{hoveredNode.displayYear}</div>
            <div className={styles.nodeLabel}>{hoveredNode.label}</div>
            <div className={styles.nodeDesc}>{hoveredNode.description}</div>
          </>
        )}
      </div>

      <div className={styles.priceLabelWrap}>
        <div className={styles.priceLabel}>
          Now: Building the Future
        </div>
        <div className={styles.priceLabelTooltip}>
          Ultimately, I plan to launch an investment fund, while also continuing to leverage my expertise to significantly accelerate the growth of the companies I work with.
        </div>
      </div>

      <div className={styles.volumeContainer}>
        {/* Fake volume bars */}
        {Array.from({ length: 40 }).map((_, i) => {
          const height = Math.random() * 60 + 10;
          return (
            <div 
              key={i} 
              style={{
                background: Math.random() > 0.8 ? 'var(--neon-red)' : 'var(--neon-green-dim)',
                height: `${height}%`,
                width: 'calc(100% / 40 - 2px)',
                margin: '0 1px'
              }} 
            />
          );
        })}
      </div>
    </div>
  );
}
