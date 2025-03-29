import React from 'react';

interface TimeRangeSelectorProps {
  selectedRange: string;
  onChange: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selectedRange, onChange }) => {
  const ranges = [
    { value: '1d', label: '1D' },
    { value: '1w', label: '1W' },
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '12m', label: '1Y' },
    { value: 'all', label: 'All' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="flex items-center space-x-1 text-sm">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1 rounded-md ${
            selectedRange === range.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;