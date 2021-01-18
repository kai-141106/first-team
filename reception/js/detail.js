let id = location.search;
id = id.slice(id.indexOf('=') + 1);

//每页展示3条评论
let pagesize = 3,
    pagenum = 1;
let total;
//文章评论列表展示
function getComment() {
    $.ajax({
        url: `/api/articles/${id}/comments`,
        success: function(res) {
            if (res.status == 0) {
                total = res.data.length;
                let str = `<h4><i class="sprites"></i>评论区</h4>`
                $.each(res.data, (index, item) => {
                    let time = item.cdate.slice(0, 10);

                    if (index < pagesize * pagenum) {
                        str += `<div class="kr_comment_card">
                        <div class="img-wrap">
                            <img src="./uploads/avatar_3.jpg" alt="">
                        </div>
                        <div class="info">
                            <p>${item.uname} · <span>${time}</span></p>
                            <p>${item.content}</p>
                        </div>
                        <a href="javascript:;" class="like">${item.count}</a>
                        </div>`
                    }
                })
                str += `<div class="kr_more" id='more_comments'>
                     <a href="javascript:;">查看更多评论...</a>
                    </div>`
                $('.comment_list').html(str)
            }
            if (total <= pagesize * pagenum) {
                $('#more_comments a').html('没有更多评论了～')
            } else {
                $('#more_comments a').html('查看更多评论...')
            }
        }
    })
}
getComment();

//查看更多评论
$('.comment_list').on('click', '#more_comments', function() {
    if (total > pagesize * pagenum) {
        pagenum++;
    }
    getComment();
})

// 发布文章评论
$('#comment_form').submit(function(e) {
    e.preventDefault();
    let params = $(this).serialize();
    $.ajax({
        type: 'post',
        url: `/api/articles/${id}/comments`,
        data: params,
        success: function(res) {
            layer.msg(res.message);
            if (status == 0) {
                $('#comment_form')[0].reset();
                getComment();
            }
        }
    })

})