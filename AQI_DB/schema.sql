-- Schema was put into command line in sqlite3 and the csv was imported, then exported as .sqlite file
CREATE TABLE aqi(
   Year                                  INTEGER  NOT NULL
  ,State                                 VARCHAR(20) NOT NULL
  ,"Pop Est"                             INTEGER  NOT NULL
  ,"TTL Cnty"                            INTEGER  NOT NULL
  ,"Cnty Rpt"                            INTEGER  NOT NULL
  ,"Dys w AQI"                           INTEGER  NOT NULL
  ,"Dys NM"                              INTEGER  NOT NULL
  ,"Dys Blw Thr"                         INTEGER  NOT NULL
  ,"Dys Abv Thr"                         FLOAT(22) NOT NULL
  ,"Good Days"                           FLOAT(19) NOT NULL
  ,"Moderate Days"                       FLOAT(21) NOT NULL
  ,"Unhealthy for Sensitive Groups Days" FLOAT(22) NOT NULL
  ,"Unhealthy Days"                      FLOAT(22) NOT NULL
  ,"Very Unhealthy Days"                 FLOAT(22) NOT NULL
  ,"Hazardous Days"                      FLOAT(22) NOT NULL
  ,"Max AQI"                             FLOAT(18) NOT NULL
  ,"90th Percentile AQI"                 FLOAT(18) NOT NULL
  ,"Median AQI"                          FLOAT(18) NOT NULL
  ,"Days CO"                             FLOAT(22) NOT NULL
  ,"Days NO2"                            FLOAT(22) NOT NULL
  ,"Days Ozone"                          FLOAT(20) NOT NULL
  ,"Days PM25"                           FLOAT(21) NOT NULL
  ,"Days PM10"                           FLOAT(22) NOT NULL
  ,"Days Measured"            FLOAT(19) NOT NULL
  ,"Percent of Counties Reporting"       FLOAT(20) NOT NULL
  ,"Percent of Days Below Unhealthy"     FLOAT(18) NOT NULL
  ,"Population Estimate"                 INTEGER  NOT NULL
);