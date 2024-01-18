var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;





d3.csv("data.csv", function(data){
   //console.log(data.Pop_Est)
   
})
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


console.log(filteredData)
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

option = {
  xAxis: {
    max: 80 
  },
  yAxis: {
    type: 'category',
    data: stateName,
    axisLabel: {
      width:1,
      setInterval: 0,
      rotate: 30
    },
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 500,
    max: 19 // only the largest 10 bars will be displayed
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

function restart() {
  console.log('button pressed')
 
}

function run() { 
  
   for(let i =51; i<allData.length;i+=51){
    
    for(let j = 0; j<51; j++) {
      data[j]=allData[i+j]
      

    }

   }

 
  myChart.setOption({
    series: [
      {
        type: 'bar',
        data,
        barWidth: "80%"
      }
    ]
  });
}


setTimeout(function () {
    
  run();
}, 0);
setInterval(function () {
  //run();
}, 3000);

option && myChart.setOption(option);

});