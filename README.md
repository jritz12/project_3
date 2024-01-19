# Project 3: Air Quality Index in the U.S. since 1980
## Project Overview
The purpose of this project was to examine how the air quality index (AQI) in the United States has changed since measurements began in 1980. We looked at a state level, at variables such as the maximum recorded AQI in a given year, the median recorded AQI in a given year, and the percentage of days where the AQI is below an unhealthy level. AQI is defined on a scale in accordance with the following chart:

![AQIbasics](https://github.com/jritz12/project_3/assets/143362143/800e83c5-c0a3-4e42-84e8-73652b54c572)

## Project Usage and Interaction
To use and interact with the project, download all files and open any html file. The buttons at the bottom can be used to select whichever visualization one wishes to view. The dropdown menus on the line charts can be used to select a state and a variable to be viewed over time. The dropdown menu on the choropleth map can be used to select a year to compare the maximum AQI of all 50 states and the District of Columbia for the selected year. The bar graph will run automatically when the page loads, and can be restarted by refreshing the page.

## Ethical Considerations
Our dataset was acquired from Kaggle:
https://www.kaggle.com/datasets/adampq/air-quality-index-by-state-1980-2022

This dataset was modified from data originally collected and aggregated by the EPA, and since it is public government data, under 17 U.S.C § 105, it exists within the public domain and is not subject to copyright protection. Similarly, datasets on Kaggle are also dedicated to the public domain. Also contained within the dataset files from Kaggle is the above image explaining AQI, which we could not find an exact match for via reverse image search, but many similar images exist on the web and it displays the standard colors and ratings for the AQI numbers.


## External Code Usage
Starter code for the three javascript files and their associated html files can be found here:

index.js/html - https://leafletjs.com/examples/choropleth/

index2.js/html - https://echarts.apache.org/examples/en/editor.html?c=bar-race

index3.js/html - https://plotly.com/javascript/dropdowns/

Additionally, code for segments of index.html (commented within the code) was gotten from: https://stackoverflow.com/questions/46572406/appending-text-and-value-when-creating-newoption-with-javascript and https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
