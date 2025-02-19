SELECT
    EXISTS (
        SELECT
            1
        FROM
            members
        WHERE
            username = $1
    );