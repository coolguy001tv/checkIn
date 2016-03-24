CREATE TABLE extras ( 
    id          INTEGER         PRIMARY KEY AUTOINCREMENT
                                NOT NULL,
    description VARCHAR( 200 ),
    time        CHAR( 14 )      NOT NULL,
    userid      INT( 32 )       NOT NULL,
    extra       INT( 32 )       NOT NULL,
    validated   INT( 32 )       DEFAULT ( 0 ) 
);
