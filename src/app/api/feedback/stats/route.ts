import { NextRequest, NextResponse } from 'next/server';

import { getFeedbackStats, initializeDatabase } from '@/lib/database';

// Initialize database on first API call
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();

    // Simple auth check - in production, use proper authentication
    const authHeader = request.headers.get('authorization');
    const isAdmin = authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const stats = await getFeedbackStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải thống kê',
      },
      { status: 500 }
    );
  }
}
