var filename="";
var id=-1;

function get_filepath(text){
	show(text);
	filename=text
	document.getElementById("introduction").style.display="none";
	document.getElementById("network-id").style.display="block";
}

function get_filepath_more(){
	filename = document.getElementById("filename").files[0].name;
	show(filename);
	document.getElementById("introduction").style.display="none";
	document.getElementById("network-id").style.display="block";
}

function set_block_1(){
	$('#1-1,#1-2,#1-3,#1-4,#1-5,#page-inner').fadeIn('slow');
}

function set_block_2 () {
	$('#nav-example,#graph-1,#graph-ori,#2-1').fadeIn('slow');
}

function graph(){
	document.getElementById("graph").style.display="block";
    document.getElementById("graph-1").style.display="none";
    document.getElementById("graph-ori").style.display="none";    
}

function graph_1(){
	document.getElementById("graph").style.display="none";
    document.getElementById("graph-1").style.display="block";
    document.getElementById("graph-ori").style.display="none";
}

function graph_ori(){
	document.getElementById("graph").style.display="none";
    document.getElementById("graph-1").style.display="none";
    document.getElementById("graph-ori").style.display="block"; 
}

function graph_remove () {
	document.getElementById("graph-remove").style.display="block";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="none";
}

function graph_reshape () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="block";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="none";
}

function relationship_remove () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="block";
    document.getElementById("relationship-reshape").style.display="none";
}

function relationship_reshape () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="block";
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
	var se=confirm("Make sure to remove this node: \n\t\t"+promatrix[id][1]);
	if (se==true){
		node_delete(id);
		window.location.hash="#open-graph-confirm";
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
		console.log(contentsN3);
	}
};

function link_action(source,target){
	var se=confirm("Make sure to remove this link:\n "+promatrix[source][1]+"--"+promatrix[target][1]);
	if (se==true){
		link_delete(source,target);
	}
}

function remove_cancel(){
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
//	alert("To Be Determined");
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
		content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #F09B22; font-weight: 300;text-align:center">更多功能完善中<br><br><i>~敬请期待~</i></div>',
	});
}

function help(){
	window.open("help/help.html");
	$(".circle").removeClass("open");
	$("#overlay").fadeOut('slow');
	$("#option").hide();
}

function reset_1(){
	$('#remove-option-1,#remove-option-2').slideToggle('slow'); 
	show(filename);
}
