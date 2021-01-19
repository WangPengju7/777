$(function () {
    var layer = layui.layer;
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var hymlStr = template('tpl_table', res);
                $('tbody').html(hymlStr);
            }

        })
    }
    var index = null;
    $('#tianjialei').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类',
            content: $('#dialog-add').html(),
        });

    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('引入失败');
                }
                initArtCateList();
                layer.msg('新增成功');
                layer.close(index);
            }
        })

    })
    var xiugai = null;
    $('body').on('click', '.bianjiya', function () {
        xiugai = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改类',
            content: $('#dialog-elent').html(),
        })
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // if (res.status !== 0) {
                //     return layer.msg('引入失败');
                // }
                console.log(res);
            }
        })

    })
})