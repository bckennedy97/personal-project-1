update users
set first_name = $1
, last_name = $2
, city = $3
, state = $4
, gender = $5
where user_id= $6
returning *;