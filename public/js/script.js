(function() {
    new Vue({
        el: '#app', //where our app loads
        data: {
            images: [],
        },
        mounted: function() { //mounted is where we should do our initial api calls
            console.log("running mounted");
            var app = this;
            axios.get('/images').then(function(resp) {
                //attach this to our data
                app.images = resp.data.images;
                //then create a v-for, loop through images and display.
            });
        },
        methods: {
            emphasize: function(e) {
                e.target.style.opacity = '0.5';
                console.log("mouse over")
            },
            deemphasize: function(e) {
                e.target.style.opacity = '';
                console.log("mouse out");
            }
        }
    });
})();
