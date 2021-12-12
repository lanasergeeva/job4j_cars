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

INSERT INTO public.marks(name) VALUES ('Hyunday'), ('Daewoo'),
('Kia'), ('Mersedes'), ('Mitsubishi'), ('Nissan'), ('Renault');

INSERT INTO public.models(name, marks_id) VALUES ('Accent', 1), ('Tucson', 1),
('Elantra', 1), ('Solaris', 1), ('Matiz', 2), ('Nexia', 2), ('Sens', 2), ('Lanos', 2),
('Ceed', 3), ('Soul', 3), ('Vista', 3), ('Forte', 3), ('Sprinter', 4), ('Vito', 4)
('AMG GT', 4), ('Delicia', 5), ('Galant', 5), ('Carisma', 5), ('Terrano', 6), ('Violet', 6),
('Almera', 6), ('Logan', 7), ('Wind', 7), ('Arkana', 7);

INSERT INTO public.transmissions(name) VALUES ('Автомат'), ('Робот'), ('Вариатор'), ('Механика');

INSERT INTO public.bodies(name) VALUES ('Седан'), ('Хетчбэк'), ('Внедорожник'), ('Универсал')
('Купе'), ('Кабриолет');