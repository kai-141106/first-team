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
                    //获取时间差
                    let timeDiff = timeFn(item.pub_date);

                    let str = `<div class="item">
                                <h4>
                                    <a href="./detail.html?id=${item.id}">${item.title}</a>
                                </h4>
                                <p class="meta">
                                    <span>${timeDiff} 分享至</span>
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


//封装一个函数来获取时间差
function timeFn(pub_date) {
    let dateBegin = new Date(pub_date);
    let dateEnd = new Date();
    //时间差的毫秒数
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();
    //计算出相差天数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算天数后剩余的毫秒数
    let leave1 = dateDiff % (24 * 3600 * 1000);
    //计算出小时数
    let hours = Math.floor(leave1 / (3600 * 1000));
    ////计算小时数后剩余的毫秒数
    let leave2 = leave1 % (3600 * 1000);
    //计算相差分钟数
    let minutes = Math.floor(leave2 / (60 * 1000));
    //计算分钟数后剩余的毫秒数
    let leave3 = leave2 % (60 * 1000);
    //计算相差秒数
    let seconds = Math.round(leave3 / 1000)

    //获取相差的月份，以30天为一个月不够精准严谨
    let monthDiff = Math.floor(dayDiff / 30);
    //获取相差的年份
    let yearDiff = Math.floor(monthDiff / 12);

    let timeDiff;
    if (yearDiff >= 1) {
        timeDiff = yearDiff + "年前"; //获取相差的年份
        return timeDiff;
    }

    if (monthDiff >= 1) {
        timeDiff = monthDiff + "个月前"; //获取相差的月份
        return timeDiff;
    }

    if (dayDiff >= 1) {
        timeDiff = dayDiff + "天前"; //获取相差的月份
        return timeDiff;
    }

    if (hours >= 1) {
        timeDiff = hours + "小时前"; //获取相差的月份
        return timeDiff;
    }
    if (minutes >= 1) {
        timeDiff = minutes + "分钟前"; //获取相差的月份
        return timeDiff;
    }
}