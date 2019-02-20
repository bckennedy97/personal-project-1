insert into users(auth0_id,email,profile_name)
values($1,$2,$3)
returning *;