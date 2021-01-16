var form = layui.form;

form.verify({
    same: function (value, item) {
        var pwdOne = $('.pwdOne').val();
        if (value !== pwdOne) {
            return '两次输入的密码不一致';
        }
    }
});
$('.layui-form').submit(function (e) {
    e.preventDefault();
    var data = form.val('text1');
    // console.log(data);
    layer.confirm('确认添加该用户吗？', function (index) {
        $.ajax({
            url: 'admin/users',
            type: 'POST',
            data: data,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);

                if (res.status == 0) {
                    $('.layui-form')[0].reset();
                }
                // //
                // else if (res.status == -1) {
                //     layer.msg(res.message);
                // }
            }
        });
        layer.close(index);
    })

})