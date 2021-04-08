# IPV4-GeolocationJS
```
This is a JavaScript project that uses the free LITE database provided by IP2LOCATION.com to create an IP 
lookup service and match the IP to a country code based on the IPV4 address , for this you will need 
to create an account on ip2location.com and download the free database file !
```
![Alt text](https://media.giphy.com/media/EkPvDGDf0Xq2ttUAAp/giphy.gif "Example")

## Basic setup guide
```
1 | Download LITE IP-COUNTRY Database from ip2location (link below)
2 | Create DB table (SQL query below)
3 | Insert records via .csv file (SQL query below)
4 | Add mySQL credentials to GeoIP.js
5 | Install required packages via npm
6 | Check its working :)
```

## Add mySQL credentials to GeoIP.js
![Alt text](https://i.imgur.com/uKshws0.png "Example")


## SQL query (create table)
```SQL
CREATE DATABASE ip2location; USE ip2location; CREATE TABLE `ip2location_db1`( `ip_from` INT(10) UNSIGNED, `ip_to` 
INT(10) UNSIGNED, `country_code` CHAR(2), `country_name` VARCHAR(64), INDEX `idx_ip_from` (`ip_from`), 
INDEX `idx_ip_to` (`ip_to`), INDEX `idx_ip_from_to` (`ip_from`, `ip_to`) ) ENGINE=MyISAM 
DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```
## SQL query (insert records via csv)
```SQL
LOAD DATA LOCAL INFILE 'IP2LOCATION-LITE-DB1.CSV' INTO TABLE `ip2location_db1` FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 0 LINES;
```
## Npm packages
```
1 | npm i chalk
2 | npm i mysql
```
## Downloads & links
[Database records (ip2location.com)](https://lite.ip2location.com/database/ip-country)    
[Chalk node package](https://www.npmjs.com/package/chalk)    
[mySQL node package](https://www.npmjs.com/package/mysql)    


```
Admin@hvh.site
```
