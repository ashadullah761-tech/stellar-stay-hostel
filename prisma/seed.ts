import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing tables
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Hostel Admin / Chief Warden',
      email: 'admin@auraluxuryhostel.com',
      phone: '+91 98765 43210',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98123 45678',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    },
  });

  console.log('✅ Created Demo Users');

  // Sample Rooms Data
  const roomsData = [
    {
      title: '6-Bed Boutique Shared Dorm (AC)',
      slug: '6-bed-boutique-shared-dorm-ac',
      roomType: 'DORM_6',
      pricePerNight: 899,
      pricePerMonth: 8500,
      sizeSqFt: 280,
      bedType: 'Bunk Bed with Privacy Curtain',
      capacity: 6,
      floor: '1st Floor',
      isAc: true,
      hasPrivateBathroom: false,
      amenities: JSON.stringify([
        'High-Speed 5G Wi-Fi',
        'Individual Privacy Curtains',
        'Personal Digital Locker',
        'Bedside LED Reading Light & Socket',
        'Shared Executive Washroom',
        'Centralized AC',
        'Daily Housekeeping',
      ]),
      description:
        'Designed for social stay enthusiasts, students, and digital nomads. Features cozy privacy pods, custom oak wood bunks, individual reading lamps, USB charging docks, and secure electronic keycard lockers.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 4,
      availableQuantity: 3,
      rating: 4.8,
      reviewCount: 24,
    },
    {
      title: '4-Bed Executive Co-Living Dorm (AC)',
      slug: '4-bed-executive-co-living-dorm-ac',
      roomType: 'DORM_4',
      pricePerNight: 1199,
      pricePerMonth: 11000,
      sizeSqFt: 320,
      bedType: 'Ergonomic Bunk Bed',
      capacity: 4,
      floor: '2nd Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: JSON.stringify([
        'Attached Private Bathroom',
        '5G Wi-Fi',
        'Personal Workstation Pod',
        'Full Length Wardrobe',
        'Geyser Hot Water 24/7',
        '24/7 Power Backup',
        'Laundry Service',
      ]),
      description:
        'Spacious 4-sharing boutique dorm equipped with an ensuite modern bathroom, individual study desks, orthopedic mattresses, and extra under-bed luggage storage.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 5,
      availableQuantity: 2,
      rating: 4.9,
      reviewCount: 38,
    },
    {
      title: 'Triple Sharing Luxury Room (AC)',
      slug: 'triple-sharing-luxury-room-ac',
      roomType: 'TRIPLE',
      pricePerNight: 1499,
      pricePerMonth: 14500,
      sizeSqFt: 350,
      bedType: 'Single Orthopedic Bed',
      capacity: 3,
      floor: '2nd Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: JSON.stringify([
        'Private Balcony with City View',
        'Ensuite Bathroom with Rain Shower',
        'Individual Wooden Wardrobe',
        'Study Table & Chair',
        '5G Wi-Fi',
        'Mini Coffee Maker',
        'Daily Room Cleaning',
      ]),
      description:
        'Ideal balance of camaraderie and personal space. Comes with 3 single luxury beds, attached balcony, dedicated quiet study nooks, and individual lockable wardrobes.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 6,
      availableQuantity: 4,
      rating: 4.9,
      reviewCount: 19,
    },
    {
      title: 'Double Sharing Twin Suite (AC)',
      slug: 'double-sharing-twin-suite-ac',
      roomType: 'DOUBLE',
      pricePerNight: 1999,
      pricePerMonth: 18000,
      sizeSqFt: 380,
      bedType: 'Twin Single Beds',
      capacity: 2,
      floor: '3rd Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: JSON.stringify([
        'Ensuite Luxury Bathroom',
        '43" Smart TV with Netflix/Prime',
        'Mini Fridge',
        'Dual Executive Workdesks',
        '5G Ultra-Fast Wi-Fi',
        'Balcony Sitting Area',
        '24/7 Hot Water & Power Backup',
      ]),
      description:
        'A premium twin-sharing room designed for college friends or working professionals. Includes a private smart TV, mini fridge, twin study desks, and serene garden view.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 8,
      availableQuantity: 3,
      rating: 4.95,
      reviewCount: 42,
    },
    {
      title: 'Single Deluxe Private Sanctuary (AC)',
      slug: 'single-deluxe-private-sanctuary-ac',
      roomType: 'SINGLE',
      pricePerNight: 2999,
      pricePerMonth: 25000,
      sizeSqFt: 250,
      bedType: 'Queen Bed',
      capacity: 1,
      floor: '4th Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: JSON.stringify([
        '100% Private Room',
        'Queen Size Plush Mattress',
        'Private Bathroom',
        'Ergonomic Workstation & Herman Miller style chair',
        'Smart Ambient Lighting',
        '5G Dedicated Wi-Fi Router',
        'Weekly Linen & Towel Change',
      ]),
      description:
        'Your ultimate private haven. Quiet, sunlit room featuring a queen size bed, private ensuite, high-speed ethernet connection, and blackout curtains for maximum focus and rest.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 4,
      availableQuantity: 1,
      rating: 5.0,
      reviewCount: 31,
    },
    {
      title: 'Premium Penthouse AC Studio Suite',
      slug: 'premium-penthouse-ac-studio-suite',
      roomType: 'STUDIO',
      pricePerNight: 3999,
      pricePerMonth: 32000,
      sizeSqFt: 420,
      bedType: 'King Size Bed',
      capacity: 2,
      floor: 'Penthouse Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: JSON.stringify([
        'Private Penthouse Terrace Lounge',
        'Private Kitchenette with Microwave & Induction',
        '55" 4K OLED TV with Soundbar',
        'Premium Kohler Bath Fittings',
        'King Plush Mattress',
        'Walk-in Wardrobe',
        'Complimentary Daily Breakfast',
      ]),
      description:
        'The crown jewel of Aura Hostel. An opulent penthouse studio complete with a private rooftop terrace, microwave kitchenette, 4K screen, and panoramic views of Indiranagar city skyline.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      ]),
      totalQuantity: 2,
      availableQuantity: 1,
      rating: 5.0,
      reviewCount: 15,
    },
  ];

  for (const r of roomsData) {
    const createdRoom = await prisma.room.create({
      data: r,
    });

    // Add sample reviews
    await prisma.review.createMany({
      data: [
        {
          roomId: createdRoom.id,
          studentName: 'Aarav Mehta (IIT Alumni)',
          rating: 5,
          comment:
            'Hands down the best hostel experience in Bengaluru. Super fast Wi-Fi for WFH and immaculate cleanliness!',
        },
        {
          roomId: createdRoom.id,
          studentName: 'Priya Nambiar (Medical Student)',
          rating: 5,
          comment:
            'Security is top notch. The community lounge and study room environment helped me clear my exams easily.',
        },
      ],
    });
  }

  console.log('✅ Created 6 Luxury Rooms with Reviews');

  // Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        discountType: 'PERCENTAGE',
        value: 10,
        minAmount: 1000,
        maxDiscount: 2000,
        isActive: true,
      },
      {
        code: 'STUDENT500',
        discountType: 'FIXED',
        value: 500,
        minAmount: 5000,
        isActive: true,
      },
      {
        code: 'AURAEXCLUSIV',
        discountType: 'PERCENTAGE',
        value: 15,
        minAmount: 10000,
        maxDiscount: 3500,
        isActive: true,
      },
    ],
  });

  console.log('✅ Created Discount Coupons');

  // Sample Demo Complaint Tickets
  await prisma.complaint.createMany({
    data: [
      {
        ticketId: 'HST-2026-0001',
        studentName: 'Rohan Sharma',
        studentPhone: '+91 98123 45678',
        roomNumber: 'Room 204',
        category: 'WIFI',
        priority: 'MEDIUM',
        title: 'Wi-Fi connection drop on 2nd floor desk',
        description: 'Signal strength is flickering near the window study table.',
        preferredTime: 'Evening 6:00 PM - 8:00 PM',
        status: 'IN_PROGRESS',
        assignedStaff: 'Vikram (IT Specialist)',
        estimatedFixTime: 'Today by 7:00 PM',
      },
      {
        ticketId: 'HST-2026-0002',
        studentName: 'Ananya Roy',
        studentPhone: '+91 98765 11223',
        roomNumber: 'Room 102',
        category: 'AC',
        priority: 'URGENT',
        title: 'AC unit cooling low',
        description: 'AC unit needs filter cleaning or gas check.',
        preferredTime: 'Anytime today',
        status: 'ACKNOWLEDGED',
        assignedStaff: 'Suresh (HVAC Tech)',
        estimatedFixTime: 'Tomorrow morning',
      },
      {
        ticketId: 'HST-2026-0003',
        studentName: 'Karan Patel',
        studentPhone: '+91 99001 88776',
        roomNumber: 'Room 305',
        category: 'PLUMBING',
        priority: 'LOW',
        title: 'Bathroom tap aerator slow flow',
        description: 'Water pressure in washroom sink is slightly low.',
        preferredTime: 'Morning 9:00 AM',
        status: 'RESOLVED',
        assignedStaff: 'Ramesh (Plumber)',
        estimatedFixTime: 'Completed',
        rating: 5,
        feedback: 'Fixed within 30 minutes! Awesome service.',
      },
    ],
  });

  console.log('✅ Created Demo Complaint Tickets');

  // Sample Booking
  const firstRoom = await prisma.room.findFirst({ where: { roomType: 'DOUBLE' } });
  if (firstRoom) {
    await prisma.booking.create({
      data: {
        bookingNumber: 'BK-2026-8921',
        userId: studentUser.id,
        guestName: 'Rohan Sharma',
        guestEmail: 'rohan.sharma@example.com',
        guestPhone: '+91 98123 45678',
        roomId: firstRoom.id,
        stayType: 'MONTHLY',
        checkIn: new Date('2026-11-01'),
        checkOut: new Date('2026-12-01'),
        durationCount: 1,
        totalGuests: 1,
        roomPrice: 18000,
        taxAmount: 2160, // 12% GST
        depositAmount: 5000,
        discountAmount: 500,
        grandTotal: 24660,
        paymentStatus: 'PAID',
        paymentId: 'pay_MockRazorpay98765',
        razorpayOrderId: 'order_MockRazorpay12345',
        couponCode: 'STUDENT500',
      },
    });
    console.log('✅ Created Sample Paid Booking');
  }

  console.log('🎉 Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
