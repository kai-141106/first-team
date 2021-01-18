let layer = layui.layer;
//加载轮播图
function loadSwiper() {
    $.ajax({
        url: `admin/swipers`,
        success: function(res) {
            if (res.status == 0) {
                let str = '';
                $.each(res.data, function(index, item) {
                    let swiperstatus = 2,
                        swiperFlag = '√',
                        background = 'layui-bg-green';

                    if (item.swiperstatus == 2) {
                        swiperstatus = 1;
                        swiperFlag = '×';
                        background = 'layui-bg-cyan';
                    }

                    str += `<tr>
                    <td>${item.id}</td>
                    <td>
                      <img src="http://localhost:8888/uploads/${item.swiperimg}">
                    </td>
                    <td>${item.swiperimg}</td>
                    <td>
                        <span data-id="${item.id}" data-status="${swiperstatus}" class="layui-badge ${background}">${swiperFlag}</span>
                    </td>
                    <td>
                      <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                    </td>
                  </tr>`;
                })
                $('tbody').html(str);
            }
        }
    })
}
loadSwiper();

//修改轮播图状态
(function() {
    $('tbody').on('click', '.layui-badge', (e) => {
        let id = $(e.target).attr('data-id');
        let status = $(e.target).attr('data-status');
        $.ajax({
            type: `PUT`,
            url: 'admin/swipers/' + id,
            data: {
                status: status
            },
            success: (res) => {
                if (res.status == 0) {
                    if (status == 1) {
                        layer.msg('该图片已启用');
                    } else {
                        layer.msg('该图片已禁用');
                    }
                    loadSwiper();
                } else {
                    layer.msg(res.message);
                }
            }
        })
    })
})();

//删除轮播图
(function() {
    $('tbody').on('click', '.delete', (e) => {
        let id = $(e.target).attr('data-id');
        layer.confirm('您确定要删除吗？', {
            icon: 3,
            title: '删除轮播图'
        }, function() {
            $.ajax({
                type: `DELETE`,
                url: 'admin/swipers/' + id,
                success: (res) => {
                    layer.msg(res.message);
                    if (res.status == 0) {
                        loadSwiper();
                    }
                }
            })
        })
    })
})();

//批量上传轮播图
(function() {
    $('#uploadSwiper').click(function() {
        $('#myfile').click();
    });

    $('#myfile').change(function() {
        let files = this.files;
        let fd = new FormData();
        $.each(files, (index, item) => {
            fd.append('swipers', item);
        })
        $.ajax({
            url: `admin/swipers`,
            type: `POST`,
            data: fd,
            processData: false,
            contentType: false,
            success: (res) => {
                layer.msg(res.message);
                if (res.status == 0) {
                    loadSwiper();
                }
            }
        })
    });
})();