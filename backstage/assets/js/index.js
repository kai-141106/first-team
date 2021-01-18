//判断是否是登录状态进的首页
if (localStorage.getItem('mytoken') == undefined) {
    location.href = './login.html';
}

//点击退出按钮
$('#logout-btn').click(function() {
    layer.confirm('你确实要退出吗', {
        icon: 3,
        title: '提示'
    }, function() {
        localStorage.removeItem('mytoken');
        location.href = './login.html';
    })
})