create database websocket;
use websocket;

create table productos (
	id integer primary key auto_increment,
    name varchar(150) not null,
    price integer not null,
    image varchar(256)
);

create table mensajes (
	id integer primary key auto_increment,
    de varchar(200) not null,
    mensaje varchar(8000) not null,
    date varchar(256)
);

select * from productos;
select * from mensajes;