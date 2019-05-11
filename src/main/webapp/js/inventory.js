var type = 1;
$(function() {
    var url = 'inventory_getList';
    var inoutTitle = "";
    if(Request['oper']=='inventory'){
        type = 1;
        url = "inventory_myListByPage";
        document.title="盘盈盘亏登记";
        //关闭查询选项
        $('#searchPanel').hide();
        $('#grid').datagrid({
            toolbar: [{
                text: '盘盈盘亏登记',
                iconCls: 'icon-add',
                handler: function(){
                    //设置保存按钮提交的方法为add
                    method = "add";
                    //打开编辑窗口
                    $('#editDlg').dialog('open');
                    //清空表单内容
                    $('#editForm').form('clear');
                }
            }]
        });
    }


    //点击保存按钮
    $('#btnSave').bind('click',function(){
        //做表单字段验证，当所有字段都有效的时候返回true。该方法使用validatebox(验证框)插件。
        var formData = $('#editForm').serializeJSON();
        $.ajax({
            url: 'inventory' + '_' + method,
            data: formData,
            dataType: 'json',
            type: 'post',
            success:function(rtn){
                $.messager.alert("提示",rtn.message,'info',function(){
                    //成功的话，我们要关闭窗口
                    $('#editDlg').dialog('close');
                    //刷新表格数据
                    $('#grid').datagrid('reload');
                });
            }
        });
    });


    //点击审核按钮
    $('#btnCheck').bind('click',function(){
        //做表单字段验证，当所有字段都有效的时候返回true。该方法使用validatebox(验证框)插件。
        doCheck();
    });

    //初始化编辑窗口
    $('#editDlg').dialog({
        title: '编辑',//窗口标题
        width: 250,//窗口宽度
        height: 200,//窗口高度
        closed: true,//窗口是是否为关闭状态, true：表示关闭
        modal: true//模式窗口
    });



    //添加审核按钮
    if(Request['oper'] == 'doCheck'){
        url = "inventory_myListByPage?state=0";
        //关闭查询选项
        $('#searchPanel').hide();
        document.title="盘盈盘亏审核";
    }

    $('#grid').datagrid({
        url: url,
        columns: getColumns(),
        singleSelect: true,
        pagination: true,
        fitColumns: true
    });

    //添加双击事件
    if(Request['oper'] == 'doCheck'){
        $('#grid').datagrid({
            onDblClickRow:function(rowIndex, rowData){
                method = 'doCheck?uuid=' + rowData.uuid;
                //显示数据
                $('#uuid').html(rowData.uuid);
                $('#goodsName').html(rowData.goodsName);
                $('#storeName').html(rowData.storeName);
                $('#createtime').html(formatDate(rowData.createtime));
                $('#type').html(getType(rowData.type));
                $('#num').html(rowData.num);
                $('#remark').html(rowData.remark);
                //打开入库窗口
                $('#ordersDlg').dialog('open');
            }
        });
    }


    //入库窗口
    $('#itemDlg').dialog({
        width:300,
        height:200,
        title:inoutTitle,
        modal:true,
        closed:true,
        buttons:[
            {
                text:inoutTitle,
                iconCls:'icon-save',
                handler:doInOutStore
            }
        ]
    });

    //增加订单的窗口
    $('#addOrdersDlg').dialog({
        title:'增加订单',
        width:700,
        height:400,
        modal:true,
        closed:true
    });
});


/**
 * 日期格式化器
 * @param value
 * @returns
 */
function formatDate(value) {
    return new Date(value).Format('yyyy-MM-dd');
}



/**
 * 修改
 */
function add(uuid){
    //弹出窗口
    $('#editDlg').dialog('open');

    //清空表单内容
    $('#editForm').form('clear');

    //设置保存按钮提交的方法为update
    method = "add";

    //加载数据
    $('#editForm').form('load',name + '_get?uuid=' + uuid);
}


/**
 * 获取订单的状态
 * @param value
 * @returns
 * 采购: 0:未审核 1:已审核, 2:已确认, 3:已入库
 * 销售：0：未出库，1：已出库
 */
function getState(value){
    if(type * 1 == 1){
        switch(value * 1){
            case 1:return '未审核';
            case 2:return '已审核';
            default: return '';
        }
    }
    if(type * 1 == 2){
        switch(value * 1){
            case 0:return '未出库';
            case 1:return '已出库';
            default: return '';
        }
    }
}

/**
 * 获取订单明细的状态
 * 0=未入库，1=已入库
 * @param value
 */
function getDetailState(value){
    if(type * 1 == 1){
        switch(value * 1){
            case 0:return '未入库';
            case 1:return '已入库';
            default: return '';
        }
    }
    if(type * 1 == 2){
        switch(value * 1){
            case 0:return '未出库';
            case 1:return '已出库';
            default: return '';
        }
    }
}

/**
 * 审核
 */
function doCheck() {
    $.messager.confirm('确认', '确认要审核吗？', function (yes) {
        if (yes) {
            $.ajax({
                url: 'inventory_doCheck?uuid=' + $('#uuid').html(),
                dataType: 'json',
                type: 'post',
                success: function (rtn) {
                    $.messager.alert('提示', rtn.message, 'info', function () {
                        if (rtn.success) {
                            //关闭窗口
                            $('#ordersDlg').dialog('close');
                            //刷新表格
                            $('#grid').datagrid('reload');
                        }
                    });
                }
            });
        }
    });
}



/**
 * 出入库
 */
function doInOutStore() {
    var message = "";
    var url = "";
    if (type * 1 == 1) {
        message = "确认要入库吗？";
        url = "orderdetail_doInStore";
    }
    if (type * 1 == 2) {
        message = "确认要出库吗？";
        url = "orderdetail_doOutStore";
    }
    var formdata = $('#itemForm').serializeJSON();
    if (formdata.storeuuid == '') {
        $.messager.alert('提示', '请选择仓库!', 'info');
        return;
    }
    $.messager.confirm("确认", message, function (yes) {
        if (yes) {
            $.ajax({
                url: url,
                data: formdata,
                dataType: 'json',
                type: 'post',
                success: function (rtn) {
                    $.messager.alert('提示', rtn.message, 'info', function () {
                        if (rtn.success) {
                            //关闭入库窗口
                            $('#itemDlg').dialog('close');
                            //设置明细的状态
                            $('#itemgrid').datagrid('getSelected').state = "1";
                            //刷新明细列
                            var data = $('#itemgrid').datagrid('getData');
                            $('#itemgrid').datagrid('loadData', data);
                            //如果所有明细都 入库了，应该关闭订单详情，并且刷新订单列表
                            var allIn = true;
                            $.each(data.rows, function (i, row) {
                                if (row.state * 1 == 0) {
                                    allIn = false;
                                    //跳出循环
                                    return false;
                                }
                            });
                            if (allIn == true) {
                                //关闭详情窗口
                                $('#ordersDlg').dialog('close');
                                //刷新订单列表
                                $('#grid').datagrid('reload');
                            }
                        }
                    });
                }
            });
        }
    });
}

/**
 * 获取订单的状态
 * @param value
 * @returns
 */
function getState(value){
        switch(value * 1){
            case 0:return '未审核';
            case 1:return '已审核';
            case 2:return '已确认';
            default: return '';
        }
}

/**
 * 获取订单的状态
 * @param value
 * @returns
 */
function getType(value){
    switch(value * 1){
        case 0:return '盘盈';
        case 1:return '盘亏';
        default: return '';
    }
}

/**
 * 根据订单类型，获取列
 */
function getColumns(){
    return [[
        {field:'uuid',title:'编号',width:100},
        {field:'goodsName',title:'商品',width:100},
        {field:'storeName',title:'仓库',width:100},
        {field:'num',title:'数量',width:100},
        {field:'type',title:'类型',width:100,formatter:getType},
        {field:'createtime',title:'登记日期',width:100,formatter:formatDate},
        {field:'checktime',title:'审核日期',width:100,formatter:formatDate},
        {field:'createrName',title:'登记人',width:100},
        {field:'checkerName',title:'审核人',width:100},
        {field:'state',title:'状态',width:100,formatter:getState},
        {field:'remark',title:'备注',width:100}

    ]];
}



