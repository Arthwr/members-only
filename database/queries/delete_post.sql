DELETE FROM messages
WHERE
    id = $1
RETURNING *;