// initializes echart
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// required for sql.js to function
const config = {
  locateFile: filename => (
    'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/sql-wasm.wasm'
  )
}
// initializes sql.js 
const sqlPromise = initSqlJs(config)
// acquires data promise from the local database file  
const dataPromise = fetch((
  'aqi_updated_db.sqlite'
))
  .then(res => res.arrayBuffer())
// stores all the data from the database as a constant 
Promise.all([sqlPromise, dataPromise])
  .then(([SQL, buf]) => {
    const db = new SQL.Database(new Uint8Array(buf))
    const filteredData = db.exec('SELECT * FROM aqi')[0].values

// populating arrays with initial state data, state names, and all remaining data
        let stateData =[]
        let stateName = []
        let allData = []
        
        for(let i=1; i<52;i++) {
            stateData.push(parseInt(filteredData[i][17]))
            stateName.push(filteredData[i][1])
            
            
        }
        for(let i =1;i<filteredData.length;i++) {
            allData.push(parseInt(filteredData[i][17]))
        }
  


const data = stateData
// creates the specifications for the bar race chart
option = {
  xAxis: {
    max: 80,
    name: 'Median AQI',
    nameLocation: 'end',
    nameGap: 0,
    nameTextStyle: {
      fontSize: 20,
      align: 'right',
      verticalAlign: 'top',
      padding: [30, 425, 0, 0], // centering the x axis
    }

  },
  yAxis: {
    type: 'category',
    data: stateName,
    axisLabel: {
      width:1,
      setInterval: 0,
      rotate: 30
    },
    inverse: true, // high to low
    animationDuration: 300,
    animationDurationUpdate: 500,
    max: 19 // only the largest 20 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      
      type: 'bar',
      data: data,
      colorBy: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 10000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

// function that sets the moving bar chart in motion
function run() { 
// iterates on all data to pull the next data point for each state into the const data
   for(let i =51; i<allData.length;i+=51){
    
    for(let j = 0; j<51; j++) {
      data[j]=allData[i+j]
      

    }

   }

 
  myChart.setOption({
    title: {
      text: "Median AQI from 1980-2022",
      left: "center",
      textStyle: {
        fontSize: 30
      }
    },
    series: [
      {
        type: 'bar',
        data,
        barWidth: "80%"
      }
    ]
  });
}

// can set an optional delay when page loads
setTimeout(function () {
    
  run();
}, 0);
// if
option && myChart.setOption(option);

});