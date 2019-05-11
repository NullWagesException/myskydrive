$(function(){
	//列表
	$('#grid').datagrid({
		url:'storedetail_getList',
		columns:[[
		  		    {field:'uuid',title:'编号',width:100},
		  		    {field:'storeName',title:'仓库',width:100},
		  		    {field:'goodsName',title:'商品',width:100},
		  		    {field:'num',title:'数量',width:100}
					]],
		singleSelect: true,
		pagination: true,
        onDblClickRow: function (rowIndex, rowData) {
            //rowIndex， 行的索引
            //rowData， 行里的数据
            //显示详情
            $('#goodsName').html(rowData.goodsName);
            $('#storename').html(rowData.storeName);
            // $('#state').html(getState(rowData.state));
            // $('#creater').html(rowData.createrName);
            // $('#checker').html(rowData.checkerName);
            // $('#starter').html(rowData.starterName);
            // $('#ender').html(rowData.enderName);
            // $('#createtime').html(formatDate(rowData.createtime));
            // $('#checktime').html(formatDate(rowData.checktime));
            // $('#starttime').html(formatDate(rowData.starttime));
            // $('#endtime').html(formatDate(rowData.endtime));
            //打开窗口
            $('#ordersDlg').dialog('open');
            //明细表格
            $('#itemgrid').datagrid({
                url:'storeoper_getList?goodsuuid='+ rowData.goodsuuid,
                columns:[[
                    {field:'uuid',title:'编号',width:50},
                    {field:'empName',title:'操作员工编号',width:100},
                    {field:'opertime',title:'操作日期',width:150,formatter:formatDate},
                    {field:'num',title:'数量',width:100},
                    {field:'type',title:'类型',width:70,formatter:function(value){
                            //1：入库 2：出库
                            if(value * 1 == 1){
                                return "入库";
                            }
                            if(value * 1 == 2){
                                return "出库";
                            }
                        }}
                ]],
                singleSelect:true,
                paginatioin:true
            });
        }
	});

    function formatDate(value){
        return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
    }

	//点击查询按钮
	$('#btnSearch').bind('click',function(){
		//把表单数据转换成json对象
		var formData = $('#searchForm').serializeJSON();
		$('#grid').datagrid('load',formData);
	});
});
	
