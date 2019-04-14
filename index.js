let app = new Vue({
    el: '#app',
    data: {
        stops: [],
        numStops: 10
    },
    computed: {
        filteredStops: function () {
            console.log("filtered stops function runnign")
            let arr = []
            for (let i = 0; i < this.numStops; i++) {
                //console.log(this.stops[i])
                arr.push(this.stops[i])
            }
            console.log(arr);
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
                //console.log(myJson[i]);
            }

            //console.log(myJson);




        }),
})
