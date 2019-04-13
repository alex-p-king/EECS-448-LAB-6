let app = new Vue({
    el: '#app',
    data: {
        stops: []
    },
    mounted: fetch("https://utils.pauliankline.com/stops.json")
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            for(let i = 0; i < myJson.length; i++)
            {
                app.stops.push(myJson[i]);
                console.log(myJson[i]);
            }
            
            //console.log(myJson);
            
            
            
            
        })
})
