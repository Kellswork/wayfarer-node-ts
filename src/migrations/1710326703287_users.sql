-- Up Migration
CREATE TABLE
  IF NOT EXISTS users (
    id UUID PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,

  created_at TIMESTAMP,
  updated_at TIMESTAMP
  );
-- Down Migration
DROP TABLE IF EXISTS users;

-- INSERT INTO "public"."pgmigrations" (name, run_on) VALUES ('1710326703287_users', NOW());