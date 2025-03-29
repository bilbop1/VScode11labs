export const initialData = {
  // Days 1-4 (no timestamps)
  earlyDays: [
    { id: 'day-1', day: 1, total: 252 },
    { id: 'day-2', day: 2, total: 271 },
    { id: 'day-3', day: 3, total: 283 },
    { id: 'day-4', day: 4, total: 305 }
  ],
  
  // Days 5-8 (with timestamps)
  timestampedDays: [
    { id: 'day-5', day: 5, timestamp: new Date('2025-02-24T18:00:00').getTime(), total: 353 },
    { id: 'day-6', day: 6, timestamp: new Date('2025-02-25T00:36:00').getTime(), total: 361 },
    { id: 'day-7', day: 7, timestamp: new Date('2025-02-25T10:45:00').getTime(), total: 369 },
    { id: 'day-8', day: 8, timestamp: new Date('2025-02-26T23:21:00').getTime(), total: 392 }
  ],
  
  // Reports 9-12 (multi-account data)
  reports: [
    {
      id: 'report-9',
      timestamp: new Date('2025-02-27T14:25:00').getTime(),
      accounts: [
        { id: 1, current: 101.15, payouts: 106.57 },
        { id: 2, current: 52.05, payouts: 49.23 },
        { id: 3, current: 14.54, payouts: 29.18 },
        { id: 4, current: 12.90, payouts: 25.85 },
        { id: 5, current: 9.54, payouts: 0 },
        { id: 6, current: 2.96, payouts: 22.35 }
      ],
      combinedCurrent: 193.14,
      totalPayouts: 233.18,
      grandTotal: 426.32
    },
    {
      id: 'report-10',
      timestamp: new Date('2025-02-27T22:00:00').getTime(),
      accounts: [
        { id: 1, current: 111.72, payouts: 106.57 },
        { id: 2, current: 53.48, payouts: 49.23 },
        { id: 3, current: 14.58, payouts: 29.18 },
        { id: 4, current: 13.22, payouts: 25.85 },
        { id: 5, current: 9.92, payouts: 0 },
        { id: 6, current: 3.50, payouts: 22.35 }
      ],
      combinedCurrent: 206.42,
      totalPayouts: 233.18,
      grandTotal: 439.60
    },
    {
      id: 'report-11',
      timestamp: new Date('2025-02-28T13:43:00').getTime(),
      accounts: [
        { id: 1, current: 0.00, payouts: 228.24 },
        { id: 2, current: 0.10, payouts: 104.85 },
        { id: 3, current: 18.08, payouts: 29.18 },
        { id: 4, current: 14.49, payouts: 25.85 },
        { id: 5, current: 0.00, payouts: 10.07 },
        { id: 6, current: 4.79, payouts: 22.35 }
      ],
      combinedCurrent: 37.46,
      totalPayouts: 420.54,
      grandTotal: 458.00
    },
    {
      id: 'report-12',
      timestamp: new Date('2025-02-28T20:40:00').getTime(), // Using the last_update_timestamp as a fallback
      accounts: [
        { id: 1, current: 3.23, payouts: 228.24 },
        { id: 2, current: 2.44, payouts: 104.85 },
        { id: 3, current: 19.24, payouts: 29.18 },
        { id: 4, current: 14.50, payouts: 25.85 },
        { id: 5, current: 1.27, payouts: 10.07 },
        { id: 6, current: 5.20, payouts: 22.35 }
      ],
      combinedCurrent: 45.88,
      totalPayouts: 420.54,
      grandTotal: 466.42
    }
  ]
};