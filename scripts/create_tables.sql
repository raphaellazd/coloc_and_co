BEGIN;


DROP TABLE IF EXISTS public.colocation, public.allergy_has_tag_color ,public."user", public.calendar_event, public.household_task, public.reward, public.poll, public.response, public.allergy, public.tag_color,  public.house_rule, public.expense, public.article_shoplist, public.message, public.user_has_reward, public.user_has_allergy, public.colocation_has_house_rule; 

CREATE TABLE public.colocation
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_name text NOT NULL,
    address text, --NOT NULL-,
    code_coloc text, --integer NOT NULL,
    population integer NOT NULL DEFAULT 1
);


CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    firstname text, --NOT NULL,
    lastname text, --NOT NULL,
    birthdate date, --NOT NULL,
    phone_number text, --NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    description text,
    worktime_table text,
    pet boolean DEFAULT false,
    emergency_name text,
    emergency_link text,
    emergency_number text,
    profession text,
    avatar_file text,
    available boolean NOT NULL DEFAULT false,
    colocation_id integer REFERENCES colocation(id),
    PRIMARY KEY (id)
);

CREATE TABLE public.calendar_event
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    date timestamp without time zone NOT NULL,
    tag text,
    user_id integer,
    colocation_id integer REFERENCES colocation(id)

);
CREATE TABLE public.household_task
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description text NOT NULL,
    date timestamp without time zone NOT NULL default now(),
    done boolean NOT NULL DEFAULT False,
    user_id integer REFERENCES "user"(id),
    colocation_id integer REFERENCES colocation(id) NOT NULL
);

CREATE TABLE public.reward
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    picture text NOT NULL
);

CREATE TABLE public.poll
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date timestamp without time zone NOT NULL,
    question text NOT NULL,
    colocation_id int NOT NULL REFERENCES colocation(id)
);

CREATE TABLE public.response
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    response boolean NOT NULL,
    user_id integer REFERENCES "user"(id),
    poll_id integer NOT NULL REFERENCES poll(id)
);

CREATE TABLE public.tag_color
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL
);

CREATE TABLE public.allergy
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    tag_color_id integer NOT NULL REFERENCES tag_color(id) 
);

CREATE TABLE public.house_rule
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT now(),
    colocation_id integer REFERENCES colocation(id)
);

CREATE TABLE public.expense
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    sum integer NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT now(),
    user_id integer REFERENCES public."user"(id),
    colocation_id integer REFERENCES public.colocation(id)
);

CREATE TABLE public.article_shoplist
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    buyed boolean NOT NULL DEFAULT false,
    colocation_id INT REFERENCES public.colocation (id),
    expense_id INT REFERENCES public.expense(id)
);

CREATE TABLE public.message
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT now(),
    colocation_id INT REFERENCES public.colocation(id),
    user_id INT REFERENCES public."user"(id)
);

--! TABLE DE LIAISONS

CREATE TABLE public.user_has_reward
(
    user_id integer REFERENCES public."user"(id),
    reward_id integer REFERENCES public.reward(id)
);

CREATE TABLE public.user_has_allergy
(
    user_id integer REFERENCES public."user"(id),
    allergy_id integer REFERENCES public.allergy(id)
);

CREATE TABLE public.colocation_has_house_rule
(
    colocation_id integer REFERENCES colocation(id),
    house_rule_id integer REFERENCES public.house_rule(id)
);

COMMIT;