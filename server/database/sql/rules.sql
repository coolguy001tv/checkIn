CREATE TABLE rules (
    id          INT( 32 )        PRIMARY KEY
                                 NOT NULL,
    name        VARCHAR( 32 )    NOT NULL,
    description VARCHAR( 64 ),
    rule        VARCHAR( 2000 )
);