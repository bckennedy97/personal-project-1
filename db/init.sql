create table users(
    user_id serial primary key
    , auth0_id varchar not null
    , email varchar not null
    , profile_name text not null
)

create table user_charts(
    chart_id serial primary key
    , user_id integer references users(user_id)
    , age integer not null
    , gender varchar not null
    , orientation varchar not null
    , answer_1 varchar not null
    , answer_2 varchar not null
    , answer_3 varchar not null
    , answer_4 varchar not null
    , answer_5 varchar not null
)

