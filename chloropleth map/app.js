
const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
    

	
	const geojson = L.geoJson(statesData).addTo(map);
    function runData(dataset, callback) {
        d3.csv("data.csv").then((data) => {
            const filteredData = data.filter(row => row.Year == dataset);
            callback(filteredData);
            
        });
    }
    
    function optionChanged() {
        let colors = []
        let states = []
        let dropdownMenu = d3.select("#selDataset");
        let year = dropdownMenu.property("value");
    
        runData(year, (filteredData) => {
            console.log(filteredData[0]);  

            for(let i = 0; i <51;i++) {
                colors.push(getColor(filteredData[i].Max_AQI))
                states.push(filteredData[i].State)

            }
            console.log(`colors ${colors}`)
            console.log(`states ${states}`)
            let index = states.indexOf('California')
            console.log(index)
            console.log(statesData.features[4].properties)
            console.log(colors[4])
           
            function getIndex(name) {
                let index = states.indexOf(name)
                return colors[index]

            }
            console.log(`Ohio index ${getIndex('Ohio')}`)
            function style(feature) {
                var color
                
                for(let i = 0; i <51;i++){
                    color = colors[states.indexOf(feature.properties.name)]
                    
                }
                
                
                return {
                    fillColor: color,
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }
         L.geoJson(statesData, {style: style}).addTo(map);
           
        });
    }

    

    function getColor(d) {
        return d > 300 ? '#7e0022' :
               d > 200  ? '#99004c' :
               d > 150  ? '#ff0000' :
               d > 100  ? '#ff7d00' :
               d > 50   ? '#fefe00' :
               d > 0   ? '#00e400' :
                        '#adadad';
            
    }
    const legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");

        div.innerHTML += '<i style="background: #adadad"></i><span>No Data</span><br>';
        div.innerHTML += '<i style="background: #00e400"></i><span>0-50</span><br>';
        div.innerHTML += '<i style="background: #fefe00"></i><span>50-100</span><br>';
        div.innerHTML += '<i style="background: #ff7d00"></i><span>100-150</span><br>';
        div.innerHTML += '<i style="background: #ff0000"></i><span>150-200</span><br>';
        div.innerHTML += '<i style="background: #99004c"></i><span>200-300</span><br>';
        div.innerHTML += '<i style="background: #7e0022"></i><span>300-400</span><br>';

		
		return div;
	};

	legend.addTo(map);

    
    
    

    