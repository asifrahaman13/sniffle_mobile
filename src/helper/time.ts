function formatDateInIST(timestamp: number): string {
  // Convert timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  // Get the time zone offset for IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

  // Adjust the date to IST
  const istDate = new Date(date.getTime() + istOffset);

  // Format the date
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return istDate.toLocaleDateString('en-GB', options);
}

export {formatDateInIST};
