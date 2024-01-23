// initializes map and loads OSM
const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
    


    
// function to be called whenever the map year is updated    
    function runData(dataset, callback) {
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
              const filteredData = db.exec('SELECT * FROM aqi')
            
            callback(filteredData);
            
        });
    }
    
 
    
    
    // function that is called when year selector changes
    function optionChanged() {

        
        // deletes previous hover legend
        if(document.getElementsByClassName("info leaflet-control")) {

            var element = document.getElementsByClassName("info leaflet-control")
            while(element[0]) {
                element[0].parentNode.removeChild(element[0]);
            }
        }


       
        // empty arrays for later iterating 
        let colors = []
        let states = []
        let AQI_Value = []
        // grabs year from selector
        let dropdownMenu = d3.select("#selDataset");
        let year = dropdownMenu.property("value");
        // runs the runData function and then gets the AQI value for each state
        runData(year, (filteredData) => {
            let aqi_data = filteredData[0].values
           
            

            for(let i = (year-1980)*51+1; i <(year-1980)*51+52;i++) {
                colors.push(getColor(aqi_data[i][15])) // assigns a color based on AQI number
                states.push(aqi_data[i][1])
                AQI_Value.push(aqi_data[i][15])

            }
            // gives each state outline and fill a style and color
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
            // highlights the state being hovered over and pulls its name and data
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
            // un-highlights previously highlighted state when no longer targeted
            function resetHighlight(e) {
                geojson.resetStyle(e.target);
                info.update();
            }
            // zooms when state is clicked on
            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }
            // binds functions to their respective actions
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
        
           
            // creates the hovering legend
            const info = L.control();
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            // updates info for hovering legend
            info.update = function (props) {
        
                const contents = props ? `<b>${props.name}</b><br />${Math.round(AQI_Value[states.indexOf(props.name)])}` : 'Hover over a state';
                this._div.innerHTML = `<h4>Max Recorded AQI</h4>${contents}`;
            };
            // adds hovering legend to map
            info.addTo(map);
        
            
            
            
        // styles states and adds them to the map  
         L.geoJson(statesData, {style: style}).addTo(map);
         geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
        
           
        });
        
    }
    

    // function to assign states colors based on their AQI value
    function getColor(d) {
        return d > 300 ? '#7e0022' :
               d > 200  ? '#99004c' :
               d > 150  ? '#ff0000' :
               d > 100  ? '#ff7d00' :
               d > 50   ? '#fefe00' :
               d > 0   ? '#00e400' :
                        '#adadad';
            
    }
    // adds legend for colors
    const legend = L.control({position: 'bottomright'});
    // adds labels for legend   
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
    // adds legend to map
	legend.addTo(map);

    
    
    

    