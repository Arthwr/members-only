UPDATE members
SET
    is_member = true
WHERE
    id = $1;