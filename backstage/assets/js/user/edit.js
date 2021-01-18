var form = layui.form;
var layer = layui.layer;
//获取id  首先声明一下 随便赋个值也行
// let a = new URLSearchParams(location.search);
// 然后通过a.get()的方式输入键 拿到值
// 就简单点吧 拿到前一个页面传过来的id
// let id = a.get(‘id’);
// 这样就可以直接拿到id了
//内置对象获取地址栏的参数 通过键的方式拿到值
var id = new URLSearchParams(location.search).get('id');
//根据id查询用户详情
$.ajax({
    url: 'admin/users/' + id,
    success: function (res) {
        // console.log(res);
        if (res.status == 0) {
            // layui.form快速赋值,
            form.val('editForm', res.data);
        }
        //
        else {
            layer.msg(res.message);
        }
    }

});


// 绑定添加用户表单提交事件
$('.layui-form').submit(function (e) {
    e.preventDefault();
    //获取该表单内所有带有name属性的值
    var data = $(this).serialize()
    layer.confirm('确认修改云端数据？', function (index) {
        $.ajax({
            url: 'admin/users',
            type: 'PUT',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    location.href = '/backstage/user/user.html';
                }
            }
        });
        layer.close(index);
    })

})