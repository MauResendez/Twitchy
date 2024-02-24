import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(timeString: string) {
  // Create a new Date object from the time string
  const date = new Date(timeString);
  
  // Extract the year, month, and day from the Date object
  const year = date.getFullYear();
  // Add 1 to the month because getMonth() returns 0-based index (0 for January)
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Format the date in month/day/year format
  const formattedDate = month + '/' + day + '/' + year;
  
  return formattedDate;
}