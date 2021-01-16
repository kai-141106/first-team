$(function() {
    // 菜单展开/折叠交互
    $('.menus .triangle').click(function() {
        $(this).parents('li').toggleClass('collapsed');
    })
})

//通用的接口调用设置
var baseURL = 'http://localhost:8888'
$.ajaxPrefilter(function(option) {
    //设置公共路径
    option.url = baseURL + option.url;
})