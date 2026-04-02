"use client";

import React, { useState, useRef, useEffect } from 'react';
import { chartData, Milestone } from './ChartData';
import styles from '../app/portfolio.module.css';

export default function TradingChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Milestone | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
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

  // Generate path string for the glowing curve
  const generateChartPath = () => {
    if (dimensions.width === 0) return '';
    let path = '';
    
    chartData.forEach((point, index) => {
      const { x, y } = getPixelCoords(point.xPosition, point.yPosition);
      if (index === 0) {
        path += `M ${x} ${y} `;
      } else {
        const prev = getPixelCoords(chartData[index - 1].xPosition, chartData[index - 1].yPosition);
        // Simple bezier curve for smooth segments
        const cx1 = prev.x + (x - prev.x) / 2;
        const cy1 = prev.y;
        const cx2 = prev.x + (x - prev.x) / 2;
        const cy2 = y;
        path += `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y} `;
      }
    });
    return path;
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

        {/* Main curved chart path */}
        {dimensions.width > 0 && (
          <path
            d={generateChartPath()}
            fill="none"
            stroke="var(--neon-green)"
            strokeWidth="3"
            filter="url(#neonGlow)"
          />
        )}

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
          const { x, y } = getPixelCoords(point.xPosition, point.yPosition);
          const isHovered = hoveredNode?.id === point.id;
          return (
            <circle
              key={point.id}
              cx={x}
              cy={y}
              r={isHovered ? 8 : 5}
              fill="var(--bg-dark)"
              stroke="var(--neon-green)"
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
        style={hoveredNode && dimensions.width > 0 ? {
          left: getPixelCoords(hoveredNode.xPosition, hoveredNode.yPosition).x,
          top: getPixelCoords(hoveredNode.xPosition, hoveredNode.yPosition).y - 20
        } : undefined}
      >
        {hoveredNode && (
          <>
            <div className={styles.nodeYear}>{hoveredNode.displayYear}</div>
            <div className={styles.nodeLabel}>{hoveredNode.label}</div>
            <div className={styles.nodeDesc}>{hoveredNode.description}</div>
          </>
        )}
      </div>

      <div className={styles.priceLabel}>
        Now: Building the Future
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
