    //   // 当前页码
    //   var data = {
    //       pagenum = 1,
    //       pagesize = 3
    //   }
    var form = layui.form;
    var laypage = layui.laypage;
    var layer = layui.layer;

    //新建不可重复规则
    form.verify({
        same: function (value, item) {
            var pwdOne = $('.pwdOne').val();
            if (value !== pwdOne) {
                return '两次输入的密码不一致';
            }
        }
    });

    var pagenum = 1;
    var pagesize = 3;
    //********************************************************************* */ 获取用户列表
    function getUserList() {
        $.ajax({

            url: 'admin/users',
            // headers: {
            //     Authorization: localStorage.getItem('mytoken')
            // },
            data: {
                pagenum: pagenum,
                pagesize: pagesize
            },
            success: function (res) {
                if (res.status == 0) {
                    var str = '';
                    $.each(res.data, function (index, item) {

                        str += `<tr>
                        <td>${item.id}</td>
                        <td>${item.username}</td>
                        <td>${item.nickname}</td>
                        <td>${item.email}</td>
                        <td>
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs ">
                            <a style="color: #fff" target="iframeArea" href="./edit.html?id=${item.id}">编辑</a>
                        </button>
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-normal reset">重置密码</button>
                        </td>
                    </tr>`;
                    });
                    //
                    $('tbody').html(str);
                    // laypage.render();
                    laypage.render({
                        elem: 'articlePage',
                        count: `${res.total}`,
                        curr: pagenum,
                        limit: pagesize, //每页显示几条
                        limits: [3, 6, 10, 15],
                        jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            pagenum = obj.curr;
                            // console.log(obj.limit); //得到每页显示的条数
                            pagesize = obj.limit
                            //首次不执行
                            if (!first) {
                                //do something
                                getUserList()
                            }
                        }
                    })
                }

            }
        })
    }
    getUserList();

    //********************************************************************* */ 删除用户
    $('tbody').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除该用户吗？', function (index) {
            $.ajax({
                url: 'admin/users/' + id,
                type: 'delete',
                success: function (res) {
                    // console.log(res);
                    layer.msg(res.message);
                    getUserList();
                }
            });
            layer.close(index);
        })

    });

    //********************************************************************* */ 重置密码
    $('tbody').on('click', '.reset', function () {
        var id = $(this).attr('data-id');
        var jiegou = ` <form id="repwd-form" class="layui-form" style="margin: 15px 30px 0 0">
        <!-- 第一行：密码 -->
        <div class="layui-form-item">
        <label class="layui-form-label">密码</label>
        <div class="layui-input-block">
            <input type="text" name="password" required  lay-verify="required" placeholder="请输入新密码" autocomplete="off" class="layui-input newPaw">
        </div>
        </div>
        <!-- 第二行：确认密码 -->
        <div class="layui-form-item">
        <label class="layui-form-label">确认密码</label>
        <div class="layui-input-block">
            <input type="text" required  lay-verify="required|same" placeholder="请重复输入新密码" autocomplete="off" class="layui-input">
        </div>
        </div>
        <!-- 第三行：按钮 -->
        <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
        </div>
    </form>`;
        //
        var index = layer.open({
            type: 1, // 1 表示  页面层
            title: '重置密码',
            content: jiegou,
            area: ['500px', '250px']
        });
        //// 重置密码
        $('#repwd-form').submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: 'admin/users/' + id,
                type: 'PUT',
                data: {
                    password: $('.newPaw').val()
                },
                success: function (res) {
                    // console.log(res);
                    layer.msg(res.message);
                    layer.close(index);
                }
            })
        })
    });