drop table user_charts;
drop table users;

create table users(
    user_id serial primary key
    , auth0_id varchar not null
    , email varchar not null
    , profile_name text not null
    , first_name varchar
    , last_name varchar
    , city varchar
    , state varchar
    , gender varchar
)

create table user_charts(
    chart_id serial primary key
    , user_id integer references users(user_id)
    ,first_name varchar not null
    ,last_name varchar not null
    ,city varchar not null
    ,state varchar not null
    , gender varchar not null
    , favorites json
)

