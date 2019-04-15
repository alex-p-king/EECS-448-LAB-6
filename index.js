let app = new Vue({
    el: '#app',
    data: {
        stops: [],
        numStops: 10,
        userLocation: null
    },
    computed: {
        filteredStops: function () {

            let arr = []
            for (let i = 0; i < this.numStops; i++) {
                arr.push(this.stops[i])
            }
            return arr;
        }
    },
    mounted: fetch("https://utils.pauliankline.com/stops.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            for (let i = 0; i < myJson.length; i++) {
                app.stops.push(myJson[i]);
            }
        })
        .then(function (){
            navigator.geolocation.getCurrentPosition(onPositionReceived);
        })
})
function onPositionReceived(position){
    console.log(position);
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    console.log(lat);
    console.log(lon);
    
}
//www.geodatasource.com/developers/javascript*/
function calculateDistance(uLat,uLon,sLat,sLon){
    if(uLat === sLat && uLon === sLon ){
        return 0;
    }
    else{
        let r_uLat = (Math.PI * uLat/180);
        let r_sLat = (Math.PI * sLat/180);
        let theta = uLon-sLon;
        let r_theta = Math.PI * theta/180;
        let distance = Math.sin(r_uLat)*Math.sin(r_sLat) + Math.cos(r_uLat)*Math.cos(r_sLat)*Math.cos(r_theta);
        if(distance > 1){
            distance = 1
        }
        distance = math.acos(distance);
        distance = distance*(180/Math.PI);
        distance = distance*60*1.1515*1.609344
        return distance;
    }
}


