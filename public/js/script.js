(function() {
    Vue.component("popup", {
        /* data, methods, etc. go here */
        props: ["id"],
        data: function() {
            return {
                image: {},
                comments: [],
                form: {
                    comment: "",
                    username: ""
                }
            };
        },
        mounted: function() {
            var app = this;
            axios.get(`/popup/` + this.id).then(function(resp) {
                console.log(resp);
                app.image = resp.data.image;
                app.comments = resp.data.comments;
            });
        },
        methods: {
            notifyParentClosePopup: function() {
                this.$emit("closepopup");
            },
            submitComment: function() {
                var app = this;
                axios
                    .post("/comment", {
                        comment: this.form.comment,
                        username: this.form.username,
                        image_id: this.id
                    })
                    .then(function(results) {
                        app.comments.unshift(results.data.comments);
                    });
            }
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
            console.log("running mounted");
            var app = this;
            axios.get("/images").then(function(resp) {
                app.images = resp.data.images;
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
            handleSubmit: function() {
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
            closePopup: function() {
                this.selectedImage = null;
            }
        }
    });
})();
