update user_charts 
set favorites = (
    case
        when favorites is null then '[]'::jsonb
        else favorites
    end
) || $2 ::jsonb
where user_id = $1
returning *;