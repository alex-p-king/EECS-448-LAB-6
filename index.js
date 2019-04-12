let bStopInfo = [];
let app = new Vue({
    el: '#app',
    data: {
        stops: bStopInfo
    },
    mounted: fetch("https://utils.pauliankline.com/stops.json")
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            for(let i = 0; i < myJson.length; i++)
            {
                bStopInfo.push(myJson[i])
            }
            
            console.log(myJson);
            
            
            
            
        })
})
