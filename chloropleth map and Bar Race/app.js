
const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
    


    
    
    function runData(dataset, callback) {
        d3.csv("data.csv").then((data) => {
            const filteredData = data.filter(row => row.Year == dataset);
            callback(filteredData);
            
        });
    }
    
 
    
    
    
    function optionChanged() {

        
        
        if(document.getElementsByClassName("info leaflet-control")) {

            var element = document.getElementsByClassName("info leaflet-control")
            while(element[0]) {
                element[0].parentNode.removeChild(element[0]);
            }
        }


       
         
        let colors = []
        let states = []
        let AQI_Value = []
        let dropdownMenu = d3.select("#selDataset");
        let year = dropdownMenu.property("value");
    
        runData(year, (filteredData) => {

            

           
            

            for(let i = 0; i <51;i++) {
                colors.push(getColor(filteredData[i].Max_AQI))
                states.push(filteredData[i].State)
                AQI_Value.push(filteredData[i].Max_AQI)

            }
            

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
            function highlightFeature(e) {
                var layer = e.target;
            
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });
            
                layer.bringToFront();
                info.update(layer.feature.properties);
            }
            function resetHighlight(e) {
                geojson.resetStyle(e.target);
                info.update();
            }
            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
        
           
           
            const info = L.control();
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            info.update = function (props) {
        
                const contents = props ? `<b>${props.name}</b><br />${Math.round(AQI_Value[states.indexOf(props.name)])}` : 'Hover over a state';
                this._div.innerHTML = `<h4>Max Recorded AQI</h4>${contents}`;
            };
            info.addTo(map);
        
            
            
            
            
         L.geoJson(statesData, {style: style}).addTo(map);
         geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
        
           
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
        div.innerHTML += '<i style="background: #7e0022"></i><span>300-500</span><br>';

        
        return div;
    };

	legend.addTo(map);

    
    
    

    