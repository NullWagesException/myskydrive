//提交的方法名称
var method = "";
var listParam = "";
var saveParam = "";
$(function() {
    $('#win').window('close');  // close a window
    //加载表格数据
    $('#grid').datagrid({
        url: name + '/getAll' + listParam,
        columns: columns,
        singleSelect: true,
        pagination: true
    });

    //点击查询按钮
    $('#btnSearch').bind('click', function () {
        //把表单数据转换成json对象
        var formData = $('#searchForm').serializeJSON();
        $('#grid').datagrid('load', formData);
    });

    var h = 300;
    var w = 400;
    if (typeof (height) != "undefined") {
        h = height;
    }
    if (typeof (width) != "undefined") {
        w = width;
    }
    //初始化编辑窗口
    $('#editDlg').dialog({
        title: '编辑',//窗口标题
        width: w,//窗口宽度
        height: h,//窗口高度
        closed: true,//窗口是是否为关闭状态, true：表示关闭
        modal: true//模式窗口
    });

    //点击保存按钮
    $('#btnSave').bind('click', function () {
        //做表单字段验证，当所有字段都有效的时候返回true。该方法使用validatebox(验证框)插件。
        var isValid = $('#editForm').form('validate');
        if (isValid == false) {
            return;
        }
        var formData = $('#editForm').serializeJSON();
        $.ajax({
            url: name + '/' + method + saveParam,
            data: formData,
            dataType: 'json',
            type: 'post',
            success: function (rtn) {
                $.messager.alert("提示", rtn.message, 'info', function () {
                    //成功的话，我们要关闭窗口
                    $('#editDlg').dialog('close');
                    //刷新表格数据
                    $('#grid').datagrid('reload');
                });
            }
        });
    });
});


    /**
     * 删除
     */
    function del(uuid) {
        $.messager.confirm("确认", "确认要删除吗？", function (yes) {
            if (yes) {
                $.ajax({
                    url: name + '/delete?id=' + uuid,
                    dataType: 'json',
                    type: 'post',
                    success: function (rtn) {
                        $.messager.alert("提示", rtn.message, 'info', function () {
                            //刷新表格数据
                            $('#grid').datagrid('reload');
                        });
                    }
                });
            }
        });
    }

    /**
     * 查看文档
     */
    function edit(uuid) {
        //是否拥有权限查看
        $.ajax({
            url: name + '/check?id=' + uuid,
            dataType: 'json',
            type: 'post',
            success: function (rtn) {
                if (rtn.success){
                    window.location.href="word?filepath=" + rtn.filepath;
                }else{
                    $.messager.alert('提示','您没有权限查看该文档，请申请提升用户等级','info');
                }
            }
        });

    }

/**
 * 更改文档等级
 */
function upfile(uuid) {
    $('#fileid').val(uuid);
    //是否拥有权限更改
    $.ajax({
        url: name + '/check?id=' + uuid,
        dataType: 'json',
        type: 'post',
        success: function (rtn) {
            if (rtn.success){
                $('#win').window('open');  // open a window
            }else{
                $.messager.alert('提示','您没有权限进行该操作，请申请提升用户等级','info');
            }
        }
    });

}

/**
 * 更改用户等级
 */
function useredit(uuid) {
    $('#userid').val(uuid);
    //是否拥有权限更改
    $.ajax({
        url: 'checkuserlevel?id=' + uuid,
        dataType: 'json',
        type: 'post',
        success: function (rtn) {
            if (rtn.success){
                $('#win').window('open');  // open a window
            }else{
                $.messager.alert('提示','您没有权限进行该操作，请申请提升用户等级','info');
            }
        }
    });

}

/**
 * 确认修改文件等级
 */
function upfilebtn() {
    var formData = $('#fileform').serializeJSON();
    $.ajax({
        url:"file/upfile",
        data: formData,
        dataType: 'json',
        type: 'post',
        success:function(data) {
            if (data){
                    $.messager.alert('提示',"等级修改成功",'info',function () {
                    $('#win').window('close');
                    $('#grid').datagrid('reload');
                });
            }else{
                $.messager.alert('提示',"等级修改失败",'info');
            }
        }
    });
}

/**
 * 确认修改用户
 */
function upuserbtn() {
    var formData = $('#fileform').serializeJSON();
    $.ajax({
        url:"edituser",
        data: formData,
        dataType: 'json',
        type: 'post',
        success:function(data) {
            if (data){
                $.messager.alert('提示',"用户修改成功",'info',function () {
                    $('#win').window('close');
                    $('#grid').datagrid('reload');
                });
            }else{
                $.messager.alert('提示',"用户修改失败",'info');
            }
        }
    });
}

/**
 * 删除用户
 */
function userdel(uuid) {
    //是否拥有权限更改
    $.ajax({
        url: 'checkuserlevel?id=' + uuid,
        dataType: 'json',
        type: 'post',
        success: function (rtn) {
            if (rtn.success){
                $.ajax({
                    url: 'userdel?id=' + uuid,
                    dataType: 'json',
                    type: 'post',
                    success: function (rtn) {
                        if (rtn){
                            $.messager.alert('提示',"用户删除成功",'info',function () {
                                $('#grid').datagrid('reload');
                            });
                        }else{
                            $.messager.alert('提示','用户删除失败','info');
                        }
                    }
                });
            }else{
                $.messager.alert('提示','您没有权限进行该操作，请申请提升用户等级','info');
            }
        }
    });
}

/**
 * 同意
 */
function allow(uuid) {
    //是否拥有权限
    $.ajax({
        url: name + '/checklevel?id=' + uuid,
        dataType: 'json',
        type: 'post',
        success: function (rtn) {
            if (rtn.success){
                $.messager.confirm("确认", "确认要同意吗？", function (yes) {
                    if (yes) {
                        $.ajax({
                            url: name + '/allow?id=' + uuid,
                            dataType: 'json',
                            type: 'post',
                            success: function (rtn) {
                                $.messager.alert("提示", rtn.message, 'info', function () {
                                    //刷新表格数据
                                    $('#grid').datagrid('reload');
                                });
                            }
                        });
                    }
                });
            }else{
                $.messager.confirm('提示','您没有权限操作该用户，请申请提升用户等级',function(r){
                });
            }
        }
    });

}



/**
 * 拒绝
 */
function notallow(uuid) {
    //是否拥有权限
    $.ajax({
        url: name + '/checklevel?id=' + uuid,
        dataType: 'json',
        type: 'post',
        success: function (rtn) {
            if (rtn.success){
                $.ajax({
                    url: name + '/notallow?id=' + uuid,
                    dataType: 'json',
                    type: 'post',
                    success: function () {
                        $('#grid').datagrid('reload');
                    }
                });
            }else{
                $.messager.confirm('提示','您没有权限操作该用户，请申请提升用户等级',function(r){
                });
            }
        }
    });

}