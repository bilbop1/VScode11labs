// Calculate hourly rates and other derived data
export const calculateHourlyRates = (data) => {
  const processedData = { ...data };
  
  // Process timestamped days
  processedData.timestampedDays = data.timestampedDays.map((day, index) => {
    if (index === 0) {
      // First timestamped day compared to last early day
      const prevTotal = data.earlyDays[data.earlyDays.length - 1].total;
      const change = day.total - prevTotal;
      return { ...day, change };
    } else {
      const prevDay = data.timestampedDays[index - 1];
      const hoursSinceLastUpdate = (day.timestamp - prevDay.timestamp) / (1000 * 60 * 60);
      const change = day.total - prevDay.total;
      const hourlyRate = change / hoursSinceLastUpdate;
      
      return {
        ...day,
        hoursSinceLastUpdate,
        change,
        hourlyRate
      };
    }
  });
  
  // Process reports
  processedData.reports = data.reports.map((report, index) => {
    if (index === 0) {
      // First report compared to last timestamped day
      const lastDay = data.timestampedDays[data.timestampedDays.length - 1];
      const hoursSinceLastReport = (report.timestamp - lastDay.timestamp) / (1000 * 60 * 60);
      const netChange = report.grandTotal - lastDay.total;
      const hourlyRate = netChange / hoursSinceLastReport;
      
      return {
        ...report,
        hoursSinceLastReport,
        netChange,
        hourlyRate
      };
    } else {
      const prevReport = data.reports[index - 1];
      const hoursSinceLastReport = (report.timestamp - prevReport.timestamp) / (1000 * 60 * 60);
      const netChange = report.grandTotal - prevReport.grandTotal;
      const hourlyRate = netChange / hoursSinceLastReport;
      
      return {
        ...report,
        hoursSinceLastReport,
        netChange,
        hourlyRate
      };
    }
  });
  
  // Create master timeline
  const masterTimeline = [
    ...data.earlyDays.map(day => ({
      id: day.id,
      label: `Day ${day.day}`,
      total: day.total,
      timestamp: null
    })),
    ...processedData.timestampedDays.map(day => ({
      id: day.id,
      label: `Day ${day.day}`,
      total: day.total,
      timestamp: day.timestamp,
      hoursSinceLastUpdate: day.hoursSinceLastUpdate,
      change: day.change,
      hourlyRate: day.hourlyRate
    })),
    ...processedData.reports.map(report => ({
      id: report.id,
      label: `Report ${report.id.replace('report-', '')}`,
      total: report.grandTotal,
      timestamp: report.timestamp,
      hoursSinceLastUpdate: report.hoursSinceLastReport,
      change: report.netChange,
      hourlyRate: report.hourlyRate
    }))
  ];
  
  // Calculate average hourly rate from reports
  const hourlyRates = processedData.reports
    .filter(report => report.hourlyRate)
    .map(report => report.hourlyRate);
  
  const averageHourlyRate = hourlyRates.length > 0
    ? hourlyRates.reduce((sum, rate) => sum + rate, 0) / hourlyRates.length
    : 0;
  
  // Get current grand total
  const currentGrandTotal = processedData.reports.length > 0
    ? processedData.reports[processedData.reports.length - 1].grandTotal
    : 0;
  
  return {
    ...processedData,
    masterTimeline,
    averageHourlyRate,
    currentGrandTotal
  };
};

// Calculate projections based on hourly rate
export const calculateProjections = (data, hourlyRate, days) => {
  const projections = [];
  const dailyEarnings = hourlyRate * 24;
  const currentTotal = data.currentGrandTotal;
  
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const cumulativeEarnings = dailyEarnings * (i + 1);
    const grandTotal = currentTotal + cumulativeEarnings;
    
    projections.push({
      date,
      dailyEarnings,
      cumulativeEarnings,
      grandTotal
    });
  }
  
  return projections;
};