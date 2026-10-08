import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_COMPLAINTS } from '@/lib/data';
import { generateTicketId } from '@/lib/utils';
import { notifications } from '@/lib/notifications';

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (complaints.length > 0) {
      return NextResponse.json({ success: true, complaints });
    }
  } catch (err) {
    console.warn('DB complaints fetch fallback:', err);
  }

  return NextResponse.json({ success: true, complaints: INITIAL_COMPLAINTS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ticketId = body.ticketId || generateTicketId();

    const studentName = body.isAnonymous ? 'Anonymous Resident' : body.studentName || 'Resident';
    const studentPhone = body.isAnonymous ? 'Hidden' : body.studentPhone || 'N/A';

    let complaintRecord = null;
    try {
      complaintRecord = await prisma.complaint.create({
        data: {
          ticketId,
          studentName,
          studentPhone,
          roomNumber: body.roomNumber || 'Room 101',
          category: body.category || 'WIFI',
          priority: body.priority || 'MEDIUM',
          title: body.title || 'Room issue report',
          description: body.description || '',
          preferredTime: body.preferredTime || 'Evening',
          status: 'SUBMITTED',
          assignedStaff: 'Dispatched to Duty Warden',
          estimatedFixTime: 'Within 4 Hours',
          isAnonymous: body.isAnonymous ?? false,
        },
      });
    } catch (e) {
      console.warn('DB Complaint insertion fallback');
    }

    const complaintData = complaintRecord || {
      id: `complaint-${Date.now()}`,
      ticketId,
      studentName,
      studentPhone,
      roomNumber: body.roomNumber,
      category: body.category,
      priority: body.priority,
      title: body.title,
      description: body.description,
      preferredTime: body.preferredTime,
      status: 'SUBMITTED',
      assignedStaff: 'Dispatched to Duty Warden',
      estimatedFixTime: 'Within 4 Hours',
      isAnonymous: body.isAnonymous ?? false,
      createdAt: new Date().toISOString(),
    };

    // Send Notification Alert
    if (!body.isAnonymous && body.studentPhone) {
      await notifications.sendSMS({
        to: body.studentPhone,
        message: `Aura Hostel: Maintenance ticket ${ticketId} created for ${body.roomNumber} (${body.category}). Tracking active on portal.`,
      });
    }

    return NextResponse.json({
      success: true,
      ticketId,
      complaint: complaintData,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
