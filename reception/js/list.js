//文章列表动态展示
let pagenum = 1,
    pagesize = 5;
let total = 1;

function loadList() {
    $.ajax({
        type: 'get',
        url: "/api/articles",
        data: {
            pagenum,
            pagesize
        },
        success: function(res) {
            if (res.status == 0) {
                total = res.total;
                $.each(res.data, (index, item) => {
                    let str = `<div class="item">
                                <h4>
                                    <a href="./detail.html?id=${item.id}">${item.title}</a>
                                </h4>
                                <p class="meta">
                                    <span>51分钟前 分享至</span>
                                        <a href="javascript:;" class="wechat"></a>
                                        <a href="javascript:;" class="weibo"></a>
                                </p>
                                <p class="brief">${item.content}</p>
                            </div>`;
                    $(str).appendTo('.kr_news_list')
                })
            }
            if (total <= pagesize * pagenum) {
                $('.kr_more a').html('到底啦...');

            } else {
                $('.kr_more a').html('加载更多...');
            }
        }
    })
}
loadList();

//文章列表加载更多
$('.kr_more').click(function() {
    if (total > pagesize * pagenum) {
        pagenum++;
    }
    loadList();
})