create extension if not exists pgcrypto;

create table rooms (
  id uuid primary key default gen_random_uuid(),
  room_number integer unique not null
);

create table reservations (
  id uuid primary key default gen_random_uuid(),
  employee_name text not null,
  room_number integer not null,
  date_from date not null,
  date_to date not null,
  note text,
  status text default 'pending',
  created_at timestamp default now()
);

insert into rooms (room_number)
values (1),(2),(3),(4),(5),(6);