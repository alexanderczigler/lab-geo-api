lab-geo-api
===========

This is a lab project - use at your own risk! =^-^=

In brief, lab-geo-api is a nodejs express api that lets your lookup cities' geo data in a database filled with maxmind's free ip data. It is probably far from usable in any real business application but you are free to use the code and play around with it.

howto
===========

Download the maxmind db (csv) and load it into a database of your choice. I use mysql server, so use that if you wish to use the code as-is.

http://dev.maxmind.com/geoip/legacy/geolite/

Create a table and load the csv, see the code examples below.

db
===========

The following scripts reflect how I use the data - you may want to do things in a different way.

First, create an import table and a locations table.

```
CREATE TABLE `maxmind`.`import` (
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
CREATE TABLE `maxmind`.`locations` (
  `city` VARCHAR(45) NULL,
  `latitude` FLOAT NULL,
  `longitude` FLOAT NULL);
```

Load the maxmind data from the csv. Note the path and the character set here, change them to suit your environment.

```
load data infile '/home/ilix/geo/GeoLiteCity_20140401/GeoLiteCity-Location.csv' into table import character set latin1 fields terminated by ',' enclosed by '"';
```

Copy the data you actually want to use to the locations table.

```
truncate table `locations`;
insert into `locations` select distinct city, latitude, longitude from `import` where country = 'SE';
```

Finally, you can truncate or drop the import table if you wish to save space.

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
