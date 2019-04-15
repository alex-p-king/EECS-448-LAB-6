let app = new Vue({
    el: '#app',
    data: {
        stops: [],
        numStops: 10,
        userDistance: [],
        uPos: []
    },
    computed: {
        filteredStops: function () {
            let oArr = [{}]
            let arr = []
            for (let i = 0; i < this.numStops; i++) {
                arr.push(this.stops[i])
                oArr.push({stop: this.stops[i], distanceFromUser: this.userDistance[i]});
                console.log(oArr[i]);
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
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    app.uPos.push(lat);
    app.uPos.push(lon);

    console.log(lat);
    console.log(lon);
    for(let i = 0; i < app.numStops; i++){
        app.userDistance.push(calculateDistance(lat, lon, app.stops[i].lat, app.stops[i].lon));
        console.log(app.userDistance[i]);
    }
    
}
function calculateDistance(uLat,uLon,sLat,sLon){
    if(uLat === sLat && uLon === sLon ){
        return 0;
    }
    else{
        let r_uLat = (Math.PI * uLat/180)//*(Math.PI * uLat/180);
        let r_sLat = (Math.PI * sLat/180)//*(Math.PI * sLat/180);
        let r_uLon = (Math.PI * uLon/180)//*(Math.PI * uLon/180);
        let r_sLon = (Math.PI * sLon/180)//*(Math.PI * sLon/180);

        let latDiff = (r_sLat-r_uLat);
        let lonDiff = (r_sLon-r_uLon);
        latDiff = latDiff*latDiff;
        lonDiff = lonDiff*lonDiff;
        //d = sqrt((x2-x1)^2 + (y2-y1)^2)
        //distance formula in terms of radians
        let distance = Math.sqrt(latDiff + lonDiff);
        distance = distance*24901;
        return distance.toFixed(2);
    }
}


