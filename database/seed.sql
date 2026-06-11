-- ============================================================
-- Portfolio Database Seed Data
-- Run after schema.sql for sample/demo data
-- ============================================================

-- Sample contact messages
INSERT INTO contact_messages (name, email, subject, message, ip_address, is_read, created_at) VALUES
('Rahul Sharma', 'rahul.sharma@example.com', 'Internship Opportunity', 'Hi Tanmay, I came across your portfolio and was impressed by your Employee Attendance Management project. We have an internship opening for a Java developer at our startup. Would you be interested?', '103.21.45.10', false, NOW() - INTERVAL '2 days'),
('Priya Patel', 'priya.patel@example.com', 'Collaboration on Open Source Project', 'Hello! I am working on an open-source attendance tracking tool and saw your similar project on GitHub. Would love to collaborate if you are interested.', '49.36.12.88', false, NOW() - INTERVAL '5 days'),
('Tech Recruiter', 'recruiter@techcorp.com', 'Java Developer Role - TechCorp', 'We have reviewed your resume and would like to schedule an interview for our Junior Java Developer position. Please let us know your availability.', '157.40.22.5', true, NOW() - INTERVAL '10 days');

-- Sample visitor records
INSERT INTO visitors (ip_address, user_agent, page_visited, referrer, visited_at) VALUES
('103.21.45.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '/', 'https://www.google.com', NOW() - INTERVAL '1 day'),
('49.36.12.88', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15', '/', 'https://github.com/tanmayyy05', NOW() - INTERVAL '2 days'),
('157.40.22.5', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', '/', 'https://www.linkedin.com', NOW() - INTERVAL '3 days'),
('103.21.45.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '/projects', 'https://tanmaywagh.dev', NOW() - INTERVAL '1 day'),
('182.64.10.20', 'Mozilla/5.0 (Linux; Android 13)', '/', 'direct', NOW());

-- Sample project view records
INSERT INTO project_views (project_name, ip_address, viewed_at) VALUES
('Employee Attendance Management Platform', '103.21.45.10', NOW() - INTERVAL '1 day'),
('Employee Attendance Management Platform', '49.36.12.88', NOW() - INTERVAL '2 days'),
('Netflix Clone', '157.40.22.5', NOW() - INTERVAL '3 days'),
('Employee Attendance Management Platform', '182.64.10.20', NOW()),
('Netflix Clone', '103.21.45.10', NOW() - INTERVAL '1 day');

-- Sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, is_active, subscribed_at) VALUES
('interested.recruiter@example.com', true, NOW() - INTERVAL '7 days'),
('fellow.developer@example.com', true, NOW() - INTERVAL '14 days');
