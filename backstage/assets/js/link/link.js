let layer = layui.layer,
    form = layui.form;

//加载友情链接列表
function getLinks() {
    $.ajax({
        url: 'admin/links',
        success: function(res) {
            if (res.status == 0) {
                let str = '';
                $.each(res.data, function(index, item) {
                    str += `<tr>
                        <td>${item.id}</td>
                        <td>
                            <div class="bg">
                            <img src="http://localhost:8888/uploads/${item.linkicon}">
                            </div>
                        </td>
                        <td>${item.linkname}</td>
                        <td>${item.linkurl}</td>
                        <td>${item.linkdesc}</td>
                        <td>
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                        </td>
                    </tr>`;
                })
                $('tbody').html(str);
            }

        }
    });

}
getLinks();

//添加友情链接
(function() {
    //点添加调起弹窗
    $('#add-link').click(function() {
        layer.open({
            type: 1,
            title: '添加友情链接',
            content: $('#add-form-tpl').html(),
            area: ['500px', '340px'],
            success: function(dom, index) {
                addForm(index);
            }
        });
    });

    //弹窗创建好后，操作弹窗内form表单
    function addForm(index) {
        //1.图标上传
        $('#urlIcon').click(function() {
            $('#linkFile').click();
        })
        $('#linkFile').change(function() {
            //1.this.files 获取所有选中文件伪数组，files[0]就是图片对象：；
            let file = this.files[0];
            //2.把选择的图片对象生成一个临时的url
            var url = URL.createObjectURL(file);
            $('#preIcon').attr('src', url)
        })

        //2.form表单提交
        $('#add-form').submit(function(e) {
            e.preventDefault();
            let fd = new FormData(this);
            $.ajax({
                type: 'POST',
                url: 'admin/links',
                data: fd,
                processData: false,
                contentType: false,
                success: function(res) {
                    layer.msg(res.message);
                    if (res.status == 0) {
                        layer.close(index);
                        getLinks();
                    }
                }
            })
        })
    }
})();

//编辑友情链接
(function() {
    //点添加调起弹窗
    $('tbody').on('click', '.edit', function(e) {
        let id = $(e.target).attr('data-id')
        layer.open({
            type: 1,
            title: '编辑友情链接',
            content: $('#edit-form-tpl').html(),
            area: ['500px', '340px'],
            success: function(dom, index) {
                editForm(id, index);
            }
        });
    });
    //弹窗创建好后，操作弹窗内form表单
    function editForm(id, index) {
        let data;
        //1.表单回填
        $.ajax({
            url: `admin/links/` + id,
            success: function(res) {
                if (res.status == 0) {
                    data = res.data;
                    form.val('editForm', data);
                    //设置图标预览
                    $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + data.linkicon)
                } else {
                    layer.msg(res.msg);
                }
            }
        });

        //2.重置按钮
        $('button[type=reset]').click(function(e) {
            e.preventDefault();
            form.val('editForm', data);
        })

        //3.上传图片
        $('#urlIcon').click(function() {
            $('#linkFile').click();
        })
        let file = null;
        $('#linkFile').change(function() {
            file = this.files[0];
            var url = URL.createObjectURL(file);
            //设置修改后的图标预览
            $('#preIcon').attr('src', url)
        })

        //4.提交表单
        $('#edit-form').submit(function(e) {
            e.preventDefault();
            let fd = new FormData(this);
            //如果重新上传了图片，file有值
            if (file) {
                //清空原来的图标文件
                delete data.linkicon;
                fd.append('linkicon', file)
            }
            $.ajax({
                type: 'PUT',
                url: 'admin/links/' + id,
                data: fd,
                processData: false,
                contentType: false,
                success: function(res) {
                    layer.msg(res.message);
                    if (res.status == 0) {
                        layer.close(index);
                        getLinks();
                    }
                }
            })
        })
    }
})();

//删除友情链接
(function() {
    $('tbody').on('click', '.delete', function(e) {
        let id = $(e.target).attr('data-id')
        layer.confirm('你确定删除此信息么？', {
            icon: 3,
            title: '删除友情链接'
        }, function(index) {
            layer.close(index);
            $.ajax({
                type: `DELETE`,
                url: 'admin/links/' + id,
                success: function(res) {
                    layer.msg(res.message);
                    getLinks();
                }
            })
        });
    });
})();