CREATE TABLE users
(
    id       serial primary key, ,
    email    character varying(255) NOT NULL,
    name     character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone    character varying(255) NOT NULL
);

CREATE TABLE marks
(
    id   serial primary key,
    name character varying(255) NOT NULL UNIQUE
);

CREATE TABLE bodies
(
        id serial primary key
        name character varying (255) NOT NULL UNIQUE
);

CREATE TABLE public.ads
(
    id          serial primary key,
    created     timestamp          NOT NUL,
    description character varying(255) NOT NUL,
    name        character varying(255) NOT NUL,
    status      boolean            NOT NULL,
    body_id references bodies (id) NOT NULL,
    mark_id references marks (id)  NOT NULL,
    user_id references users (id)  NOT NULL
);