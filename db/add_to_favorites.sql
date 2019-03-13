insert into user_favorites(user_id,doctor_uid,doctor)
values($1,$2,$3::jsonb)
returning *;