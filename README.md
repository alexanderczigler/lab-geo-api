lab-geo-api
===========

=^-^=

db
===========

```
CREATE TABLE `maxmind`.`locations` (
  `locId` INT NULL,
  `country` VARCHAR(100) NULL,
  `region` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `latitude` FLOAT NULL,
  `longitude` FLOAT NULL,
  `metroCode` VARCHAR(45) NULL,
  `areaCode` VARCHAR(45) NULL);
```

```
load data infile '/home/ilix/geo/GeoLiteCity_20140401/GeoLiteCity-Location.csv' into table locations character set latin1 fields terminated by ',' enclosed by '"';
```

config
===========

Create a file called app.config.json where app.js is.

```
{
  "db": {
    "host": "127.0.0.1",
    "port": 3306,
    "password": "iHasSikrit",
    "username": "meow"
  }
}
```
