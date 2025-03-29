import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, BarChart2 } from 'lucide-react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import ChartContainer from './ChartContainer';

const Dashboard = ({ data }) => {
  const latestReport = data.reports[data.reports.length - 1];
  
  // State for filtered data
  const [filteredDailySums, setFilteredDailySums] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filteredHourlyRates, setFilteredHourlyRates] = useState([]);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  
  // Prepare data for charts
  const dailySumsData = [
    ...data.earlyDays.map(day => ({ 
      x: `Day ${day.day}`, 
      y: day.total,
      timestamp: day.timestamp || new Date(`2025-02-${19 + day.day}`).getTime() // Approximate dates for days 1-4
    })),
    ...data.timestampedDays.map(day => ({ 
      x: `Day ${day.day}`, 
      y: day.total,
      timestamp: day.timestamp
    }))
  ];
  
  const reportsData = data.reports.map(report => ({
    x: `Report ${report.id.replace('report-', '')}`,
    y: report.combinedCurrent,
    timestamp: report.timestamp
  }));
  
  const hourlyRatesData = data.reports
    .filter(report => report.hourlyRate)
    .map(report => ({
      x: `Report ${report.id.replace('report-', '')}`,
      y: report.hourlyRate,
      timestamp: report.timestamp
    }));
    
  const payoutsData = data.reports.map(report => ({
    x: `Report ${report.id.replace('report-', '')}`,
    y: report.totalPayouts,
    timestamp: report.timestamp
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Earnings</p>
              <h3 className="text-2xl font-bold">${latestReport?.combinedCurrent.toFixed(2) || '0.00'}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">All-Time Payouts</p>
              <h3 className="text-2xl font-bold">${latestReport?.totalPayouts.toFixed(2) || '0.00'}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Grand Total</p>
              <h3 className="text-2xl font-bold">${latestReport?.grandTotal.toFixed(2) || '0.00'}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Hourly Rate</p>
              <h3 className="text-2xl font-bold">${data.averageHourlyRate.toFixed(2)}/hr</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Daily Sums"
          data={dailySumsData}
          getTimestamp={(item) => item.timestamp}
          onFilteredDataChange={setFilteredDailySums}
        >
          <LineChart 
            data={filteredDailySums.length > 0 ? filteredDailySums : dailySumsData} 
            xLabel="Day" 
            yLabel="Amount ($)" 
            color="#4f46e5" 
          />
        </ChartContainer>
        
        <ChartContainer 
          title="Report Totals"
          data={reportsData}
          getTimestamp={(item) => item.timestamp}
          onFilteredDataChange={setFilteredReports}
        >
          <BarChart 
            data={filteredReports.length > 0 ? filteredReports : reportsData} 
            xLabel="Report" 
            yLabel="Current Earnings ($)" 
            color="#10b981" 
          />
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Hourly Rates by Report"
          data={hourlyRatesData}
          getTimestamp={(item) => item.timestamp}
          onFilteredDataChange={setFilteredHourlyRates}
        >
          <BarChart 
            data={filteredHourlyRates.length > 0 ? filteredHourlyRates : hourlyRatesData} 
            xLabel="Report" 
            yLabel="Hourly Rate ($/hr)" 
            color="#f59e0b" 
          />
        </ChartContainer>
        
        <ChartContainer 
          title="Payouts Over Time"
          data={payoutsData}
          getTimestamp={(item) => item.timestamp}
          onFilteredDataChange={setFilteredPayouts}
        >
          <LineChart 
            data={filteredPayouts.length > 0 ? filteredPayouts : payoutsData} 
            xLabel="Report" 
            yLabel="Total Payouts ($)" 
            color="#ef4444" 
          />
        </ChartContainer>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Latest Report Details</h3>
        
        {latestReport ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Report ID:</span>
              <span className="font-medium">Report {latestReport.id.replace('report-', '')}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Timestamp:</span>
              <span className="font-medium">{new Date(latestReport.timestamp).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Combined Current:</span>
              <span className="font-medium">${latestReport.combinedCurrent.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Total Payouts:</span>
              <span className="font-medium">${latestReport.totalPayouts.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Grand Total:</span>
              <span className="font-medium">${latestReport.grandTotal.toFixed(2)}</span>
            </div>
            
            {latestReport.hourlyRate && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Hourly Rate:</span>
                <span className="font-medium">${latestReport.hourlyRate.toFixed(2)}/hr</span>
              </div>
            )}
            
            {latestReport.netChange && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Net Change:</span>
                <span className="font-medium text-green-600">+${latestReport.netChange.toFixed(2)}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">No report data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;