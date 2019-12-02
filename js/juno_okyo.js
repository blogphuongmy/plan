(function () {
    new Vue({
        el: "#juno_okyo",
        data: {
            days:'Họp;Nghỉ phép;Nghỉ;Travel;Ký hợp đồng;Tư vấn hợp đồng;Họp vùng;Hình ảnh sản phẩm bạn đang bán;Đăng hình ảnh thật của chính bạn hoặc team bạn;Đăng mấy nội dung kiểu "hé lộ", "bật mí" trước (teaser);Quảng cáo việc cho tải miễn phí cái gì đó (của bạn);Đặt một câu hỏi;Chia sẻ nguồn tài nguyên nào đó bạn thích hoặc công cụ mà bạn dùng;Đăng clip ngắn;Đăng lại một bài đăng hữu ích của người khác;Giới thiệu một sản phẩm bạn ưa thích;Chia sẻ trang web hoặc blog bạn thấy lý thú;Tag một đứa bạn hoặc người nào mà bạn hâm mộ;Chia sẻ về sản phẩm, dịch vụ của bạn;Khuyến khích khách hàng đăng ký nhận Newsletter từ bạn;Đăng một câu chuyện truyền cảm hứng hoặc vượt khó thành công;Đăng hình chụp nơi làm việc;Chia sẻ một bài bạn từng đăng trên trang khác;Đăng câu trích dẫn từ người mà bạn coi như anh hùng;Tung ưu đãi giảm giá hoặc mã khuyến mãi;Đăng thống kê gây sốc về ngành bạn kinh doanh;Đăng câu trích dẫn tạo động lực;Đăng hình selfie chính bạn hoặc ảnh chụp nơi làm việc của bạn;Đăng ảnh hay clip hay bất kỳ cái gì thật vui nhộn vào;Đăng hình kiểu "Oaaah sẵn sàng quẩy cuối tuần rồi đây!

'.split(";"),
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
