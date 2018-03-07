(function() {
    Vue.component("popup", {
        /* data, methods, etc. go here */
        props: ["id"],
        data: function() {
            return {
                image: {},
                comments: [],
                form: {}
            };
        },
        mounted: function() {
            var app = this;
            axios.get(`/popup/` + this.id).then(function(resp) {
                console.log(resp);
                app.image = resp.data.image;
            });
        },
        methods: {
            notifyParentClosePopup: function() {
                console.log("this closepopup emits");
                this.$emit("close");
            },
            submitComment: function() {}
            // notifyParentSubmitComment: function() {
            //     this.$emit("close");
        },
        template: "#popup-template"
    });

    new Vue({
        el: "#app", //where our app loads
        data: {
            images: [],
            selectedImage: null,
            form: {
                title: "",
                description: "",
                username: "",
                file: void 0
            }
        },
        mounted: function() {
            //mounted is where we should do our initial api calls
            console.log("running mounted");
            var app = this;
            axios.get("/images").then(function(resp) {
                app.images = resp.data.images;
                //then create a v-for, loop through images and display.
            });
        },
        methods: {
            emphasize: function(e) {
                e.target.style.filter = "brightness(60%)";
            },
            deemphasize: function(e) {
                e.target.style.filter = "";
            },
            handleChange: function(e) {
                e.preventDefault();
                this.form.file = e.target.files[0];
            },
            handleSubmit: function(e) {
                const formData = new FormData();

                formData.append("file", this.form.file);
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);
                formData.append("username", this.form.username);

                var app = this;
                axios.post("/upload", formData).then(function(results) {
                    console.log("upload was successful");
                    console.log(results.data);
                    app.images.unshift(results.data.images);
                });
            },
            closePopup: function(e) {
                console.log("this closepopup is active");
                this.selectedImage = null;
            }
        }
    });
})();
