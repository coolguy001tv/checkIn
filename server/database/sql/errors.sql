CREATE TABLE errors ( 
    id          INTEGER         PRIMARY KEY AUTOINCREMENT
                                NOT NULL,
    description VARCHAR( 200 ),
    checkin     CHAR( 14 )      NOT NULL,
    userid      INT( 32 )       NOT NULL,
    late        INT( 32 )       NOT NULL,
    extraid     INT( 32 ) 
);
