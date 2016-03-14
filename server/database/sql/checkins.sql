CREATE TABLE checkins ( 
    time      CHAR( 13 )  NOT NULL,
    userid    INT( 32 )   NOT NULL,
    validated INT( 4 )    NOT NULL
                          DEFAULT ( 0 ),
    errorid   INT( 32 ),
    extraid   INT( 32 ),
    id        INTEGER     PRIMARY KEY 
);
