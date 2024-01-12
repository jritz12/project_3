var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;



d3.csv("data.csv", function(data){
   //console.log(data.Pop_Est)
   
})
    d3.csv("data.csv").then((d) => {
        let stateData =[]
        let stateName = []
        let allData = []
        
        for(let i=0; i<51;i++) {
            stateData.push(parseInt(d[i].Median_AQI))
            stateName.push(d[i].State)
            
        }
        for(let i =0;i<d.length;i++) {
            allData.push(parseInt(d[i].Median_AQI))
        }
        //console.log(stateName)
        console.log(stateName)
        
       

    //console.log(allData.length)   2193 
  /*  
 const stateColors = {
  
Alabama : '#7cf787',
Alaska : '#88e6ec',
Arizona : '#c7aa05',
Arkansas : '#9cd342',
California : '#11e415',
Colorado : '#05977a',
Connecticut : '#9dfe67',
Delaware : '#efbbb7',
District Of Columbia : '#03ab42',
Florida : '#b7fc68',
Georgia : '#e3afc6',
Hawaii : '#b27dce',
Idaho : '#99cd3d',
Illinois : '#85075c',
Indiana : '#689153',
Iowa : '#2a9013',
Kansas : '#e0d07d',
Kentucky : '#a64caf',
Louisiana : '#c20985',
Maine : '#4fe5c2',
Maryland : '#e95d5a',
Massachusetts : '#00e835',
Michigan : '#1848f1',
Minnesota : '#e12022',
Mississippi : '#455c84',
Missouri : '#37bde3',
Montana : '#6de53a',
Nebraska : '#095c16',
Nevada : '#5950c4',
New Hampshire : '#538b62',
New Jersey : '#585847',
New Mexico : '#86402e',
New York : '#d20738',
North Carolina : '#b27644',
North Dakota : '#978ec4',
Ohio : '#12919a',
Oklahoma : '#0352d5',
Oregon : '#2c73e9',
Pennsylvania : '#f48484',
Rhode Island : '#1b7fd4',
South Carolina : '#1b7fd4',
South Dakota : '#74b0ca',
Tennessee : '#76e016',
Texas : '#a5624b',
Utah : '#ffb5f4',
Vermont : '#5ae05a',
Virginia : '#50e372',
Washington : '#f43114',
West Virginia : '#df7776',
Wisconsin : '#84eed3'

 }   
 */


const data = stateData

option = {
  xAxis: {
    max: 80 
  },
  yAxis: {
    type: 'category',
    data: stateName,
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 500,
    max: 9 // only the largest 10 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: 'States',
      type: 'bar',
      data: data,
      color: 'green',
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

function run() { 
  
   for(let i =51; i<allData.length;i+=51){
    //console.log(`i value ${i}`)
    
    for(let j = 0; j<50; j++) {
      //console.log(`i value ${i}`)
     // console.log(`multi value ${j}`)
      
      //console.log(`j value ${j}`)
     // console.log(`i + j value ${j+i}`)
      data[j]=allData[i+j]
      

    }

   }
   console.log(data[0])

 
  myChart.setOption({
    series: [
      {
        type: 'bar',
        data
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
