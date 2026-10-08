export type RoomTypeEnum =
  | 'DORM_6'
  | 'DORM_4'
  | 'TRIPLE'
  | 'DOUBLE'
  | 'SINGLE'
  | 'STUDIO';

export type StayTypeEnum = 'NIGHTLY' | 'MONTHLY';

export type ComplaintStatusEnum =
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'IN_PROGRESS'
  | 'RESOLVED';

export type PriorityEnum = 'LOW' | 'MEDIUM' | 'URGENT';

export interface RoomType {
  id: string;
  title: string;
  slug: string;
  roomType: RoomTypeEnum;
  pricePerNight: number;
  pricePerMonth: number;
  sizeSqFt: number;
  bedType: string;
  capacity: number;
  floor: string;
  isAc: boolean;
  hasPrivateBathroom: boolean;
  amenities: string[]; // parsed array
  description: string;
  images: string[]; // parsed array
  totalQuantity: number;
  availableQuantity: number;
  rating: number;
  reviewCount: number;
}

export interface BookingType {
  id: string;
  bookingNumber: string;
  userId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomTitle?: string;
  stayType: StayTypeEnum;
  checkIn: string;
  checkOut: string;
  durationCount: number;
  totalGuests: number;
  roomPrice: number;
  taxAmount: number;
  depositAmount: number;
  discountAmount: number;
  grandTotal: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentId?: string;
  razorpayOrderId?: string;
  couponCode?: string;
  createdAt: string;
}

export interface ComplaintType {
  id: string;
  ticketId: string;
  studentName: string;
  studentPhone: string;
  roomNumber: string;
  category:
    | 'FAN'
    | 'LIGHT'
    | 'WIFI'
    | 'AC'
    | 'WATER'
    | 'PLUMBING'
    | 'ELECTRICITY'
    | 'CLEANLINESS'
    | 'FURNITURE'
    | 'OTHER';
  priority: PriorityEnum;
  title: string;
  description: string;
  preferredTime?: string;
  photoUrl?: string;
  status: ComplaintStatusEnum;
  assignedStaff?: string;
  estimatedFixTime?: string;
  rating?: number;
  feedback?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PriceBreakdown {
  stayType: StayTypeEnum;
  unitPrice: number;
  durationCount: number;
  baseTotal: number;
  taxAmount: number; // 12% GST
  depositAmount: number; // Refundable deposit for monthly
  discountAmount: number;
  grandTotal: number;
}
