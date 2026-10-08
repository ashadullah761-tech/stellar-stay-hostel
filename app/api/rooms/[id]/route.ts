import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SAMPLE_ROOMS } from '@/lib/data';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const room = await prisma.room.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
      include: {
        reviews: true,
      },
    });

    if (room) {
      return NextResponse.json({
        success: true,
        room: {
          ...room,
          amenities: typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities,
          images: typeof room.images === 'string' ? JSON.parse(room.images) : room.images,
        },
      });
    }
  } catch (error) {
    console.warn('DB single room fetch error:', error);
  }

  // Fallback match
  const fallback = SAMPLE_ROOMS.find((r) => r.id === id || r.slug === id);
  if (fallback) {
    return NextResponse.json({ success: true, room: fallback });
  }

  return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
}
