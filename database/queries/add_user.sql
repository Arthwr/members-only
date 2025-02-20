INSERT INTO
    members (username, password)
VALUES
    ($1, $2)
RETURNING username;