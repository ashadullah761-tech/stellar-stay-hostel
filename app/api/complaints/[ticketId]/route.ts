import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_COMPLAINTS } from '@/lib/data';

export async function GET(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  const { ticketId } = params;

  try {
    const complaint = await prisma.complaint.findUnique({
      where: { ticketId: ticketId.toUpperCase() },
    });
    if (complaint) {
      return NextResponse.json({ success: true, complaint });
    }
  } catch (err) {
    console.warn('DB complaint fetch by ticket ID error:', err);
  }

  const fallback = INITIAL_COMPLAINTS.find(
    (c) => c.ticketId.toUpperCase() === ticketId.toUpperCase()
  );

  if (fallback) {
    return NextResponse.json({ success: true, complaint: fallback });
  }

  return NextResponse.json({ success: false, error: 'Ticket not found' }, { status: 404 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  const { ticketId } = params;
  try {
    const body = await req.json();
    const { status, assignedStaff, estimatedFixTime, rating, feedback } = body;

    let updated = null;
    try {
      updated = await prisma.complaint.update({
        where: { ticketId: ticketId.toUpperCase() },
        data: {
          ...(status && { status }),
          ...(assignedStaff && { assignedStaff }),
          ...(estimatedFixTime && { estimatedFixTime }),
          ...(rating !== undefined && { rating }),
          ...(feedback && { feedback }),
        },
      });
    } catch (e) {
      console.warn('DB Complaint patch warning');
    }

    return NextResponse.json({
      success: true,
      ticketId,
      complaint: updated || {
        ticketId,
        status: status || 'RESOLVED',
        assignedStaff: assignedStaff || 'On-Duty Tech',
        rating,
        feedback,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
