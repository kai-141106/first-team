//登录
$('form').submit(function(e) {
    e.preventDefault();
    let params = $(this).serialize();
    $.ajax({
        type: 'post',
        url: `api/login`,
        data: params,
        success: function(res) {
            layer.msg(res.message);
            if (res.status == 0) {
                localStorage.setItem('mytoken', res.token);
                location.href = './index.html';
            }
        }
    })
})