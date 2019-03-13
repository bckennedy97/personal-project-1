delete from user_favorites
where user_id = $1 and doctor_uid = $2
returning *;