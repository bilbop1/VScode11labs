import React, { useState } from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApply: () => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 p-3 bg-gray-50 rounded-md">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">From:</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="p-1.5 text-sm border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">To:</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="p-1.5 text-sm border rounded-md"
        />
      </div>
      <button
        onClick={onApply}
        className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
};

export default DateRangePicker;