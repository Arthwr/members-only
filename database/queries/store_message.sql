INSERT INTO
    messages (username, text, sent_at)
VALUES
    ($1, $2, CURRENT_TIMESTAMP)
RETURNING
    id,
    username,
    text,
    sent_at;