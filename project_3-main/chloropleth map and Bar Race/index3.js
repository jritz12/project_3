

const config = {
    locateFile: filename => (
      'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/sql-wasm.wasm'
    )
  }
  
  const sqlPromise = initSqlJs(config)
  
  const dataPromise = fetch((
    'aqi_updated_db.sqlite'
  ))
    .then(res => res.arrayBuffer())
  
  Promise.all([sqlPromise, dataPromise])
    .then(([SQL, buf]) => {
      const db = new SQL.Database(new Uint8Array(buf))
      const filteredData = db.exec('SELECT * FROM aqi')[0].values
    


var stateName = []
var variables = ['Median AQI', 'Max AQI', 'Percent of days measured', 'Percent of counties reporting', 'Pop_Est']

for(let i=1; i<52;i++) {
    stateName.push(filteredData[i][1])
}
  
  function getStateData(chosenState, variable) {
    aqiData = [];
    currentYear = [];
    varIndex = filteredData[0].indexOf(variable)
    for (var i = stateName.indexOf(chosenState)+1 ; i < filteredData.length ; i+=51){
      aqiData.push(filteredData[i][varIndex])
      currentYear.push(filteredData[i][0])
    }
  };

// Default Country Data
setBubblePlot('Alabama', 'Median AQI');
  
function setBubblePlot(chosenState, variable) {
    getStateData(chosenState, variable);  

    var trace1 = {
      x: currentYear,
      y: aqiData,
      mode: 'lines+markers',
      marker: {
        size: 12, 
        opacity: 0.5
      }
    };
   

    var data = [trace1];

    var layout = {
      title: variable + ' in <br>'+ chosenState + ' per year',
      yaxis : {
        title: {
            text: variable
        }
    },
    xaxis : {
        title: {
            text: 'Year'
        }
    }
    };

    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
};
  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    stateSelector = innerContainer.querySelector('.statedata');
    variableSelector = innerContainer.querySelector('.datatype');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}


assignOptions(stateName, stateSelector);
assignOptions(variables, variableSelector)

function updateState(){
    setBubblePlot(stateSelector.value, variableSelector.value);
}
  
stateSelector.addEventListener('change', updateState, false);
variableSelector.addEventListener('change', updateState, false);

}); 
