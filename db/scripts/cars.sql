CREATE TABLE users
(
    id       serial primary key, ,
    email    character varying(255) NOT NULL,
    name     character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone    character varying(255) NOT NULL
);

alter table users add constraint user_email_unique UNIQUE(email)

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

CREATE TABLE models
(
        id serial primary key
        name character varying (255) NOT NULL UNIQUE,
        marks_id references marks (id)  NOT NULL
);

CREATE TABLE transmissions (
        id serial primary key
        name character varying (255) NOT NULL UNIQUE
);


CREATE TABLE public.ads (
    id          serial primary key,
    created     timestamp          NOT NULL,
    description character varying(255) NOT NULL,
    status      boolean            NOT NULL,
    body_id references bodies (id) NOT NULL,
    mark_id references marks (id)  NOT NULL,
    user_id references users (id)  NOT NULL
);