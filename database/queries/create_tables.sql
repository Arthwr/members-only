-- Users
CREATE TABLE
    IF NOT EXISTS members (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
    );

-- User's messages
CREATE TABLE
    IF NOT EXISTS messages (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255),
        text TEXT NOT NULL,
        sent_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

-- Session storage
CREATE TABLE
    IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    )
WITH
    (OIDS = FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");