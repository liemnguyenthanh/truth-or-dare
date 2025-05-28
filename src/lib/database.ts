import { neon } from '@neondatabase/serverless';

// Database connection
const sql = neon(process.env.DATABASE_URL!);

// Database initialization - create tables if not exist
export async function initializeDatabase() {
  try {
    // Create table first
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature', 'general', 'rating')),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        email VARCHAR(255),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        category VARCHAR(100),
        priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
        user_agent TEXT,
        ip_address INET,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create indexes separately
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at)`;

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Feedback operations
export async function createFeedback({
  type,
  title,
  description,
  email,
  rating,
  category,
  priority = 'medium',
  userAgent,
  ipAddress,
}: {
  type: 'bug' | 'feature' | 'general' | 'rating';
  title: string;
  description: string;
  email?: string;
  rating?: number;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  ipAddress?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO feedback (type, title, description, email, rating, category, priority, user_agent, ip_address)
      VALUES (${type}, ${title}, ${description}, ${email || null}, ${
      rating || null
    }, ${category || null}, ${priority}, ${userAgent || null}, ${
      ipAddress || null
    })
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('❌ Failed to create feedback:', error);
    throw error;
  }
}

export async function getAllFeedback({
  limit = 50,
  offset = 0,
  type,
  status,
}: {
  limit?: number;
  offset?: number;
  type?: string;
  status?: string;
} = {}) {
  try {
    // Build dynamic query based on filters
    if (type && status) {
      return await sql`
        SELECT * FROM feedback 
        WHERE type = ${type} AND status = ${status}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else if (type) {
      return await sql`
        SELECT * FROM feedback 
        WHERE type = ${type}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else if (status) {
      return await sql`
        SELECT * FROM feedback 
        WHERE status = ${status}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      return await sql`
        SELECT * FROM feedback 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    }
  } catch (error) {
    console.error('❌ Failed to fetch feedback:', error);
    throw error;
  }
}

export async function getFeedbackById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM feedback WHERE id = ${id}
    `;
    return result[0] || null;
  } catch (error) {
    console.error('❌ Failed to fetch feedback by ID:', error);
    throw error;
  }
}

export async function updateFeedbackStatus(
  id: number,
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected'
) {
  try {
    const result = await sql`
      UPDATE feedback 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('❌ Failed to update feedback status:', error);
    throw error;
  }
}

export async function getFeedbackStats() {
  try {
    const totalResult = await sql`SELECT COUNT(*) as total FROM feedback`;
    const typeStatsResult = await sql`
      SELECT type, COUNT(*) as count 
      FROM feedback 
      GROUP BY type
    `;
    const statusStatsResult = await sql`
      SELECT status, COUNT(*) as count 
      FROM feedback 
      GROUP BY status
    `;
    const ratingStatsResult = await sql`
      SELECT 
        AVG(rating) as average_rating,
        COUNT(*) as total_ratings
      FROM feedback 
      WHERE rating IS NOT NULL
    `;

    return {
      total: parseInt(totalResult[0].total),
      byType: typeStatsResult.reduce((acc: any, row: any) => {
        acc[row.type] = parseInt(row.count);
        return acc;
      }, {}),
      byStatus: statusStatsResult.reduce((acc: any, row: any) => {
        acc[row.status] = parseInt(row.count);
        return acc;
      }, {}),
      averageRating: ratingStatsResult[0].average_rating
        ? parseFloat(ratingStatsResult[0].average_rating)
        : null,
      totalRatings: parseInt(ratingStatsResult[0].total_ratings),
    };
  } catch (error) {
    console.error('❌ Failed to fetch feedback stats:', error);
    throw error;
  }
}

export default sql;
