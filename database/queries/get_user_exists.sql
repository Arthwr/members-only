SELECT
    EXISTS (
        SELECT
            1
        FROM
            members
        WHERE
            username ILIKE $1
    );