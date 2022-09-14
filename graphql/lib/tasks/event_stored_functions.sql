CREATE OR REPLACE FUNCTION day_name(day_name VARCHAR)
    RETURNS INTEGER
    LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN CASE LOWER(day_name)
                   WHEN 'sunday' THEN 0
                   WHEN 'monday' THEN 1
                   WHEN 'tuesday' THEN 2
                   WHEN 'wednesday' THEN 3
                   WHEN 'thursday' THEN 4
                   WHEN 'friday' THEN 5
                   WHEN 'saturday' THEN 6
            END;
    END;
$$;

CREATE OR REPLACE FUNCTION get_next_weekday(start_date TIMESTAMP)
    RETURNS TIMESTAMP
    LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN (start_date + INTERVAL '1 week')::TIMESTAMP;
    END;
$$;

CREATE OR REPLACE FUNCTION get_timestamp_from_weekday(weekday_with_time VARCHAR, start_date TIMESTAMP, end_date TIMESTAMP)
    RETURNS TIMESTAMP[]
    LANGUAGE plpgsql
AS $$
    DECLARE parsed_weekday_with_time VARCHAR[];
        DECLARE selected_weekday INTEGER;
        DECLARE selected_time VARCHAR;
        DECLARE start_date_weekday INTEGER;
        -- current_date is reserved word
        DECLARE crnt_date TIMESTAMP := start_date;
        DECLARE result TIMESTAMP[] := ARRAY[]::TIMESTAMP[];
    BEGIN
        -- RAISE NOTICE 'weekday_with_time: %, start_date: %, end_date: %', weekday_with_time, start_date, end_date;
        parsed_weekday_with_time := REGEXP_MATCH(weekday_with_time, '(.*)\s+(.*)');

        selected_weekday := day_name(parsed_weekday_with_time[1]);
        selected_time := parsed_weekday_with_time[2];

        -- get weekday of start_date
        -- if it's equal to selected_weekday
        -- add time to selected_weekday
        -- then if timestamp bigger then start_date
        -- add this timestamp to output
        -- add 7 days to timestamp
        -- repeat until timestamp will begin bigger than end_date

        start_date_weekday := EXTRACT(dow FROM start_date);
        crnt_date := (start_date::DATE||' '||selected_time)::TIMESTAMP;

        -- prepare crnt_date
        IF start_date_weekday != selected_weekday THEN
            crnt_date := crnt_date - (start_date_weekday - selected_weekday||' days')::INTERVAL;
        END IF;

        IF crnt_date <= start_date THEN
            crnt_date := get_next_weekday(crnt_date);
        END IF;

        --  iterate dates
        result := array_append(result, crnt_date);

        WHILE get_next_weekday(crnt_date) < end_date LOOP
            crnt_date := get_next_weekday(crnt_date);
            result := array_append(result, crnt_date);
        END LOOP;

        RETURN result;
    END
$$;