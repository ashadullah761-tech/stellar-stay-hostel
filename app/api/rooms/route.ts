import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SAMPLE_ROOMS } from '@/lib/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomType = searchParams.get('roomType');
  const isAc = searchParams.get('isAc');

  try {
    const where: any = {};
    if (roomType && roomType !== 'ALL') {
      where.roomType = roomType;
    }
    if (isAc === 'true') {
      where.isAc = true;
    }

    const rooms = await prisma.room.findMany({
      where,
      orderBy: { pricePerNight: 'asc' },
    });

    if (rooms.length > 0) {
      const formattedRooms = rooms.map((r) => ({
        ...r,
        amenities: typeof r.amenities === 'string' ? JSON.parse(r.amenities) : r.amenities,
        images: typeof r.images === 'string' ? JSON.parse(r.images) : r.images,
      }));

      return NextResponse.json({ success: true, rooms: formattedRooms });
    }
  } catch (error) {
    console.warn('DB Fetch failed, serving SAMPLE_ROOMS fallback:', error);
  }

  // Fallback to static sample rooms
  let fallback = SAMPLE_ROOMS;
  if (roomType && roomType !== 'ALL') {
    fallback = fallback.filter((r) => r.roomType === roomType);
  }
  return NextResponse.json({ success: true, rooms: fallback });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRoom = await prisma.room.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/ /g, '-'),
        roomType: body.roomType || 'DOUBLE',
        pricePerNight: Number(body.pricePerNight),
        pricePerMonth: Number(body.pricePerMonth),
        sizeSqFt: Number(body.sizeSqFt || 300),
        bedType: body.bedType || 'Single Bed',
        capacity: Number(body.capacity || 2),
        floor: body.floor || '1st Floor',
        isAc: body.isAc ?? true,
        hasPrivateBathroom: body.hasPrivateBathroom ?? true,
        amenities: JSON.stringify(body.amenities || []),
        description: body.description || '',
        images: JSON.stringify(body.images || []),
        totalQuantity: Number(body.totalQuantity || 5),
        availableQuantity: Number(body.availableQuantity || 5),
      },
    });

    return NextResponse.json({ success: true, room: newRoom });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
