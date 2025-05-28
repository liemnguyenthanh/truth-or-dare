import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  createFeedback,
  getAllFeedback,
  initializeDatabase,
} from '@/lib/database';
import { feedbackSchema } from '@/lib/validations/feedback';

// Initialize database on first API call
let initialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!initialized) {
      await initializeDatabase();
      initialized = true;
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = feedbackSchema.parse(body);

    // Get user agent and IP address
    const userAgent = request.headers.get('user-agent') || undefined;
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded
      ? forwarded.split(',')[0]
      : request.headers.get('x-real-ip') || '127.0.0.1';

    // Create the feedback
    const feedback = await createFeedback({
      ...validatedData,
      userAgent,
      ipAddress,
    });

    return NextResponse.json(
      {
        success: true,
        feedback,
        message: 'Cảm ơn bạn đã gửi góp ý!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Feedback creation error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu không hợp lệ',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi tạo góp ý',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!initialized) {
      await initializeDatabase();
      initialized = true;
    }

    const { searchParams } = new URL(request.url);

    // Get pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Get filter parameters
    const type = searchParams.get('type') || undefined;
    const search = searchParams.get('search') || undefined;
    const status = 'pending'; // Show all pending feedbacks for public view

    // Get feedbacks
    const feedbacks = await getAllFeedback({
      limit,
      offset,
      type: type && type !== 'all' ? type : undefined,
      status,
    });

    // Get total count for the same filters (without pagination)
    const totalFeedbacks = await getAllFeedback({
      type: type && type !== 'all' ? type : undefined,
      status,
    });

    // Filter by search if provided
    let filteredFeedbacks = feedbacks;
    let total = totalFeedbacks.length;

    if (search) {
      filteredFeedbacks = feedbacks.filter(
        (feedback: any) =>
          feedback.title.toLowerCase().includes(search.toLowerCase()) ||
          feedback.description.toLowerCase().includes(search.toLowerCase())
      );
      total = filteredFeedbacks.length;
    }

    return NextResponse.json({
      success: true,
      feedbacks: filteredFeedbacks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Feedback fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi lấy danh sách góp ý',
      },
      { status: 500 }
    );
  }
}
