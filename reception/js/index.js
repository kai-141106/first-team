//轮播图动态展示
(function() {
    $.ajax({
        type: 'get',
        url: '/api/swipers',
        success: function(res) {
            if (status == 0) {
                let str = '';
                $.each(res.data, (index, item) => {
                    str += ` <li class="img-effect">
                                <a href="javascript:;">
                                    <img src="http://localhost:8888/uploads/${item.swiperimg}" alt="">
                                </a>
                             </li>`;
                })
                $('#kr_carousel ul').html(str)
            }
        }
    })
})();

//友情链接动态展示
(function() {
    $.ajax({
        type: 'get',
        url: '/api/links',
        success: function(res) {
            if (status == 0) {
                let str = '<dt>合作伙伴</dt>';
                $.each(res.data, (index, item) => {
                    str += `<dd>
                                <a href="${item.linkurl}">
                                    <img src="http://localhost:8888/uploads/${item.linkicon}" alt="" title="${item.linkname}">
                                </a>
                                </dd>`;
                })
                $('.kr_collaborator').html(str)
            }
        }
    })
})();