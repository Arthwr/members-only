INSERT INTO
    secret (id, hash)
VALUES
    (1, $1) ON CONFLICT (id) DO
UPDATE
SET
    hash = EXCLUDED.hash
RETURNING *;