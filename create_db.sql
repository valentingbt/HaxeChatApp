create table user
(
	login varchar(20) not null
		primary key,
	password varchar(100) null,
	email varchar(100) null,
	data text null
);

create table token
(
    id char(32) not null
        primary key,
    user_id varchar(20) null,
    expiration datetime  null,
    constraint token_user_login_fk
        foreign key (user_id) references user (login)
);