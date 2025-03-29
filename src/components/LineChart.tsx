import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface LineChartProps {
  data: { x: string; y: number }[];
  xLabel: string;
  yLabel: string;
  color: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, xLabel, yLabel, color }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.x),
        datasets: [
          {
            label: yLabel,
            data: data.map(item => item.y),
            borderColor: color,
            backgroundColor: `${color}33`,
            borderWidth: 2,
            pointBackgroundColor: color,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 13,
            },
            callbacks: {
              label: (context) => `${yLabel}: $${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: xLabel,
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: yLabel,
            },
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`,
            },
          },
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, xLabel, yLabel, color]);

  return <canvas ref={chartRef} />;
};