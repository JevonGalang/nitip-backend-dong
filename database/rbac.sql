ALTER TABLE users
MODIFY role ENUM('admin', 'yusuf', 'ahmad', 'ade') NOT NULL DEFAULT 'ade';

UPDATE users
SET role = 'yusuf'
WHERE LOWER(username) = 'pak yusuf';
