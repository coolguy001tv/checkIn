CREATE TABLE rules ( 
    id          INTEGER          PRIMARY KEY AUTOINCREMENT
                                 NOT NULL,
    name        VARCHAR( 32 )    NOT NULL,
    description VARCHAR( 64 ),
    rule        VARCHAR( 2000 ) 
);
