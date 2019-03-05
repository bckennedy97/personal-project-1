delete from user_charts where user_id = $1;
insert into user_charts(user_id,gender,orientation,answer_1,answer_2,answer_3,answer_4,answer_5,answer_6,answer_7,answer_8,answer_9)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
returning *;