(function () {
    new Vue({
        el: "#juno_okyo",
        data: {
            days: 'Gặp khách hàng;Ký hợp đồng;Họp"'.split(";"),
            loading: {
                state: !1,
                btn: ""
            },
            edit_mode: !1
        },
        methods: {
            getNewList: function () {
                this.shuffle(this.days)
            },
            shuffle: function (a) {
                a.sort(function () {
                    return Math.random() - .5
                })
            },
            savePlan: function () {
                var a = this;
                this.loading.state = !0;
                this.loading.btn = "save";
                this.edit_mode && (this.edit_mode = !1);
                localforage.setItem("saved", this.days).then(function (b) {
                    setTimeout(function () {
                        a.loading.state = !1
                    }, 500)
                })["catch"](function (a) {
                    console.error(a)
                })
            },
            clearPlan: function () {
                var a = this;
                this.loading.state = !0;
                this.loading.btn = "clear";
                localforage.clear().then(function () {
                    setTimeout(function () {
                        a.loading.state = !1;
                        window.top.location.reload()
                    }, 500)
                })
            },
            toggleEditMode: function () {
                this.edit_mode = !this.edit_mode
            },
            saveDay: function (a, b) {
                this.days[a] = b
            }
        },
        mounted: function () {
            var a = this;
            localforage.getItem("saved").then(function (b) {
                null !== b && (a.days = b)
            })
        },
        updated: function () {
            this.edit_mode && document.querySelector("input.form-control").focus()
        }
    })
})();
