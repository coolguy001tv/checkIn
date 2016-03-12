CREATE TABLE checkins (
    id        INT( 32 )      PRIMARY KEY
                             NOT NULL,
    time      VARCHAR( 14 )  NOT NULL,
    userid    INT( 32 )      NOT NULL,
    validated INT( 4 )       NOT NULL
                             DEFAULT ( 0 ),
    errorid   INT( 32 ),
    extraid   INT( 32 ) 
);
