import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PriceBreakdown, StayTypeEnum } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePriceBreakdown(params: {
  stayType: StayTypeEnum;
  pricePerNight: number;
  pricePerMonth: number;
  durationCount: number; // number of nights or months
  couponDiscountPercentage?: number;
  couponDiscountFixed?: number;
}): PriceBreakdown {
  const {
    stayType,
    pricePerNight,
    pricePerMonth,
    durationCount = 1,
    couponDiscountPercentage = 0,
    couponDiscountFixed = 0,
  } = params;

  const unitPrice = stayType === 'NIGHTLY' ? pricePerNight : pricePerMonth;
  const baseTotal = unitPrice * Math.max(1, durationCount);

  // Calculate Coupon Discount
  let discountAmount = 0;
  if (couponDiscountPercentage > 0) {
    discountAmount = (baseTotal * couponDiscountPercentage) / 100;
  } else if (couponDiscountFixed > 0) {
    discountAmount = Math.min(baseTotal, couponDiscountFixed);
  }

  const discountedBase = Math.max(0, baseTotal - discountAmount);

  // Tax 12% GST
  const taxAmount = Math.round(discountedBase * 0.12);

  // Refundable Security Deposit (Applicable for Monthly Stays)
  const depositAmount = stayType === 'MONTHLY' ? 5000 : 0;

  const grandTotal = Math.round(discountedBase + taxAmount + depositAmount);

  return {
    stayType,
    unitPrice,
    durationCount,
    baseTotal,
    taxAmount,
    depositAmount,
    discountAmount: Math.round(discountAmount),
    grandTotal,
  };
}

export function generateBookingNumber(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `BK-2026-${randomDigits}`;
}

export function generateTicketId(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `HST-2026-${randomDigits}`;
}
