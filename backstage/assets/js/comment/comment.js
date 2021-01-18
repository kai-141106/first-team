//加载评论列表
function loadComments() {
    $.ajax({
        url: `admin/comments`,
        type: `GET`,
        success: (res) => {
            if (res.status == 0) {
                let str = '';
                $.each(res.data, (index, item) => {
                    str += `<tr>
                    <td>${item.id}</td>
                    <td>${item.uname}</td>
                    <td>${item.content}</td>
                    <td>${item.cdate.slice(0, 10)}</td>
                    <td>
                      <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                    </td>
                  </tr>`
                })
                $('tbody').html(str);
            } else {
                layer.msg(res.message);
            }
        }
    })
}
loadComments();

//删除评论
$("tbody").on('click', '.delete', (e) => {
    let id = e.target.dataset.id;
    layer.confirm('您确定要删除吗？', {
        icon: 3,
        title: '删除评论'
    }, function() {
        $.ajax({
            url: `admin/comments/` + id,
            type: `DELETE`,
            success: (res) => {
                layer.msg(res.message);
                if (res.status == 0) {
                    loadComments();
                }
            }
        })
    })
})