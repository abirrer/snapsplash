(function() {
    new Vue({
        el: '#app', //where our app loads
        data: {
            images: [],
            form: {
                title: '',
                description: '',
                username: '',
                file: void 0
            }
        },
        mounted: function() { //mounted is where we should do our initial api calls
            console.log("running mounted");
            var app = this;
            axios.get('/images').then(function(resp) {
                app.images = resp.data.images;
                //then create a v-for, loop through images and display.
            });
        },
        methods: {
            emphasize: function(e) {
                e.target.style.opacity = '0.5';
                // console.log("mouse over");
            },
            deemphasize: function(e) {
                e.target.style.opacity = '';
                // console.log("mouse out");
            },
            handleChange: function(e) {
                e.preventDefault();
                this.form.file = e.target.files[0];
            },
            handleSubmit: function(e) {
                const formData = new FormData();

                formData.append('file', this.form.file);
                formData.append('title', this.form.title);
                formData.append('description', this.form.description);
                formData.append('username', this.form.username);

                var app = this;
                axios.post('/upload', formData)
                .then(function(results) {

                    console.log("upload was successful");
                    console.log(results.data);
                    app.images.unshift(results.data.images);
                })
            }
        }
    });
})();

// var file = $('input[type="file"]').get(0).files[0];
