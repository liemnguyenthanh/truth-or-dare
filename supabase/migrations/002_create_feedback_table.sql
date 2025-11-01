-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
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
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback(priority);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to insert feedback
CREATE POLICY "Allow public to insert feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read pending feedback (for public display)
CREATE POLICY "Allow public to read pending feedback" ON feedback
  FOR SELECT USING (status = 'pending');

-- Allow authenticated users to read all feedback (for admin)
CREATE POLICY "Allow authenticated users to read all feedback" ON feedback
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update feedback status (for admin)
CREATE POLICY "Allow authenticated users to update feedback" ON feedback
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_feedback_updated_at 
  BEFORE UPDATE ON feedback 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
