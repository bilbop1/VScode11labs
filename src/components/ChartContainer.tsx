import React, { useState, useEffect } from 'react';
import TimeRangeSelector from './TimeRangeSelector';
import DateRangePicker from './DateRangePicker';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  data: any[];
  getTimestamp: (item: any) => number;
  onFilteredDataChange: (filteredData: any[]) => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  data,
  getTimestamp,
  onFilteredDataChange
}) => {
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showCustomRange, setShowCustomRange] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) return;

    const now = new Date();
    let start = new Date();
    
    if (selectedRange === '1d') {
      start.setDate(now.getDate() - 1);
    } else if (selectedRange === '1w') {
      start.setDate(now.getDate() - 7);
    } else if (selectedRange === '1m') {
      start.setMonth(now.getMonth() - 1);
    } else if (selectedRange === '3m') {
      start.setMonth(now.getMonth() - 3);
    } else if (selectedRange === '12m') {
      start.setFullYear(now.getFullYear() - 1);
    } else if (selectedRange === 'all') {
      // Find the earliest timestamp in the data
      const timestamps = data.map(item => getTimestamp(item));
      start = new Date(Math.min(...timestamps));
    } else if (selectedRange === 'custom') {
      setShowCustomRange(true);
      // Don't filter data yet, wait for user to apply custom range
      return;
    }

    setShowCustomRange(selectedRange === 'custom');
    
    if (selectedRange !== 'custom') {
      const filteredData = data.filter(item => {
        const timestamp = getTimestamp(item);
        return timestamp >= start.getTime() && timestamp <= now.getTime();
      });
      
      onFilteredDataChange(filteredData);
    }
  }, [selectedRange, data, getTimestamp, onFilteredDataChange]);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    
    if (range === 'custom') {
      // Set default custom range to last 7 days
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      
      setStartDate(start.toISOString().slice(0, 16));
      setEndDate(end.toISOString().slice(0, 16));
    }
  };

  const applyCustomRange = () => {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    
    const filteredData = data.filter(item => {
      const timestamp = getTimestamp(item);
      return timestamp >= start && timestamp <= end;
    });
    
    onFilteredDataChange(filteredData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold">{title}</h3>
        <TimeRangeSelector selectedRange={selectedRange} onChange={handleRangeChange} />
      </div>
      
      {showCustomRange && (
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={applyCustomRange}
        />
      )}
      
      <div className="h-64 mt-4">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;