update user_charts
set age = $1
, gender = $2
, orientation = $3
, answer_1 = $ 4
, answer_2 = $ 5
, answer_3 = $ 6
, answer_4 = $ 7
, answer_5 = $ 8
where id = $9 returning *;
