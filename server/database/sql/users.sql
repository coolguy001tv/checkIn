CREATE TABLE users (
    id       INT( 32 )      PRIMARY KEY
                            NOT NULL,
    name     VARCHAR( 32 )  NOT NULL,
    password CHAR( 64 )     NOT NULL,
    employid VARCHAR( 32 ),
    lasttime CHAR( 14 ),
    role     INT( 16 )      DEFAULT ( 1 ),
    ruleid   INT( 32 )
);
