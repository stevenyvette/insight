var filename="";
var id=-1;
var filepath="";
var times=1;

function get_filepath(text){
	$("#introduction").hide();
	$("#network-id").fadeIn('slow');
	setTimeout('show("'+text+'")',200);
	filename=text;
}

function get_filepath_more(){
	filename = document.getElementById("filename").files[0].name;
	show(filename);
	$("#introduction").hide();
	$("#network-id").show();
}

function set_block_1(){
	$('#1-1,#1-2,#1-3,#1-4,#1-5,#page-inner').fadeIn('slow');
}

function set_block_2 () {
	$('#nav-example,#graph-1,#graph-ori,#2-1').fadeIn('slow');
}

function graph(){
	$("#graph").show();
    $("#graph-1").hide();
    $("#graph-ori").hide();    
}

function graph_1(){
	$("#graph").hide();
    $("#graph-1").show();
    $("#graph-ori").hide();
}

function graph_ori(){
	$("#graph").hide();
    $("#graph-1").hide();
    $("#graph-ori").show();
}

function graph_remove () {
	$("#graph-remove").show();
    $("#graph-reshape,#relationship-remove,#relationship-reshape").hide();
}

function graph_reshape () {
	$("#graph-reshape").show();
    $("#graph-remove,#relationship-remove,#relationship-reshape").hide();
}

function relationship_remove () {
	$("#relationship-remove").show();
    $("#graph-reshape,#graph-remove,#relationship-reshape").hide();
}

function relationship_reshape () {
	$("#relationship-reshape").show();
    $("#graph-reshape,#graph-remove,#relationship-remove").hide();
}

function set_init () {
	document.getElementById("1-1").style.visibility="visible";
	document.getElementById("1-2").style.visibility="visible";
	document.getElementById("1-3").style.visibility="visible";

	document.getElementById("easypiechart-blue").style.visibility="visible";
	document.getElementById("node-count").innerHTML = count;

	document.getElementById("easypiechart-red").style.visibility="visible";
	document.getElementById("lethality").innerHTML = eff;

	document.getElementById("easypiechart-teal").style.visibility="visible";
	document.getElementById("node-link-number").innerHTML = link_number;

	document.getElementById("easypiechart-orange").style.visibility="visible";
	document.getElementById("connectivity").innerHTML = "100%";
}

function table_start(){
	$(document).ready(function () {
        $('#dataTables-example').dataTable();
    });
}

function node_action(){
	layer.open({
			  type: 1,
			  title: false,
			  closeBtn: false,
			  area: '300px;',
			  shade: 0.8,
			  id: 'LAY_layuipro3', //设定一个id，防止重复弹出
			  resize: false,
			  btn: ['确认', '取消'],
			  btnAlign: 'c',
			  moveType: 1, //拖拽模式，0或者1
			  content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;text-align:center">是否确认删除节点：<br><br><big style="color:#F09B22;">' + promatrix[id][1] + '</big></div>',
			  success: function(){
					$('.layui-layer-btn0').click(function(){
						times=$('#times').val();
						node_delete(id);
						window.location.hash="#network-graph";
					});
			  },
	});
};

function show_result(){
	var rp_value2 = rp_value.concat();
    rp_value2.sort(function(a,b){
            return b-a;});
	for (var i=0;i<3;i++){
        if(rp_value2[i]>0){
            var dex=rp_value.indexOf(rp_value2[i]);
            titlesN3[3-i] = titlesN3[3-i]+': '+ promatrix[dex][1];
            contentsN3[3-i] = 'PR: '+rp_value2[i].toFixed(8)+''; 
        }
    }
	setTimeout("show_jbox()",1500);
	setTimeout("show_jbox()",2000);
	setTimeout("show_jbox()",2500);
	setTimeout("show_jbox()",3000);
	currentColorN3=0;
}

function show_multi_result(){
	var time=1500
	for (var i=0;i<multi_reshape.length;i++){
		multi_contents[3-i] = promatrix[multi_reshape[i]][1];
		setTimeout("show_multi_jbox()",time);
		time+=500;
	}
	while(time<3000){
		multi_contents[6-time/500]='None';
		setTimeout("show_multi_jbox()",time);
		time+=500;
	}
	setTimeout("show_multi_jbox()",time);
	currentColorN3=0;
}

function link_action(source,target){
	var se=confirm("Make sure to remove this link:\n "+promatrix[source][1]+"--"+promatrix[target][1]);
	if (se==true){
		link_delete(source,target);
	}
}

//重置
function reset(){
	for (var i=0;i<($('input[type="checkbox"]').length);i++){
		$('input[type="checkbox"]')[i].checked=false;
	};
	$('#times').val('1');
}

function reset_1(){
	$('#remove-option-1,#remove-option-2').slideToggle('slow'); 
	show(filename);
}

function remove_cancel(){
	for (var i=0;i<($('input[type="checkbox"]').length);i++){
		$('input[type="checkbox"]')[i].checked=false;
	};
	$('#times').val('1');
	$('#remove-option-1,#remove-option-2').slideUp('slow');
}

function left_click_delete(){
	id = parseInt(click_node.data.id);
	$('#remove-option-1,#remove-option-2').slideDown('slow');
	$('.user').fadeOut('slow');
	click_node=undefined;
}

//右键功能菜单实现函数
function right_click_delete(){
	id = parseInt(trans.data.id);
	$('#remove-option-1,#remove-option-2').slideDown('slow');
	$(".circle").removeClass("open");
	$("#overlay").hide();
	$("#option").hide();
	trans={};
}

function cancel(){
	$(".circle").removeClass("open");
	$("#overlay").fadeOut('slow');
	$("#option").hide();
	$(".user").hide();
	trans=undefined;
	click_node=undefined;
	click_link=undefined;
}

function info(){
	var id = parseInt(trans.data.id);
	$(".circle").removeClass("open");
	$("#overlay").fadeOut('slow');
	$("#option").hide();
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: '300px;',
		shade: 0.8,
		id: 'LAY_layuipro2', //设定一个id，防止重复弹出
		resize: false,
		btn: ['我知道了'],
		btnAlign: 'c',
		moveType: 1, //拖拽模式，0或者1
		content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;"><div align="center"><img src="images/avtar.png" /></div></br><div align="center">名称：' + trans.name + "<br />好友数：" + promatrix[trans.dataIndex][4] + "<br />重要度：" + trans.value + '<br />角色：' + trans.data.category + '</div></div>',
	});
}

function refresh(){
	cancel();
	show(filename);
}

function tbd(){
	$(".circle").removeClass("open");
	$("#overlay").fadeOut('slow');
	$("#option").hide();
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: '300px;',
		shade: 0.8,
		id: 'LAY_layuipro1', //设定一个id，防止重复弹出
		resize: false,
		btn: ['我知道了'],
		btnAlign: 'c',
		moveType: 1, //拖拽模式，0或者1
		content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #F09B22; font-weight: 300;text-align:center">更多功能完善中<br><br><i>~敬请期待~</i></div>',
	});
}

function help(){
	window.open("help/help.html");
	$(".circle").removeClass("open");
	$("#overlay").fadeOut('slow');
	$("#option").hide();
}


