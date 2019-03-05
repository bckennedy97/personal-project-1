drop table user_charts;
drop table users;

create table users(
    user_id serial primary key
    , auth0_id varchar not null
    , email varchar not null
    , profile_name text not null
)

create table user_charts(
    chart_id serial primary key
    , user_id integer references users(user_id)
    ,first_name varchar not null
    ,last_name varchar not null
    ,city varchar not null
    ,state varchar not null
    , gender varchar not null
    , orientation varchar not null
    , answer_1 varchar not null
    , answer_2 varchar not null
    , answer_3 varchar not null
    , answer_4 varchar not null
    , answer_5 varchar not null
    , answer_6 varchar not null
    , answer_7 varchar not null
    , answer_8 varchar not null
    , answer_9 varchar not null
    , answer_10 varchar not null
    , answer_11 varchar not null
    , answer_12 varchar not null
    , answer_13 varchar not null
)

