var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;




//d3.csv("data.csv", function(data){
   //console.log(data.Pop_Est)
   
//})
    d3.csv("data.csv").then((d) => {
        let stateData =[]
        let stateName = []
        let allData = []
        let years = []
        
        for(let i=0; i<51;i++) {
            stateData.push(parseInt(d[i].Median_AQI))
            stateName.push(d[i].State)
            
            
        }
        for(let i =0;i<d.length;i++) {
            allData.push(parseInt(d[i].Median_AQI))
            years.push(d[i].Year)
        }
       
        console.log(years)
  


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
   console.log(data[0])

 
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
