var filename="";

function get_filepath1(){
	filename = document.getElementById("filename").files[0];
	show(filename.name);
}

function get_filepath2(){
	filename = document.getElementById("file-name").value;
	show(filename);
}

function set_block_1(){

	//document.getElementById("tmp").style.display="none";
	document.getElementById("1-1").style.display="block";
	document.getElementById("1-2").style.display="block";
	document.getElementById("1-3").style.display="block";
	document.getElementById("1-4").style.display="block";
	document.getElementById("1-5").style.display="block";
	document.getElementById("1-6").style.display="block";
	document.getElementById("page-inner").style.display="block";
}

function set_block_2(){
	document.getElementById("2-1").style.display="block";
	document.getElementById("2-2").style.display="block";
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

function set_init(){
	document.getElementById("1-1").style.visibility="visible";
	document.getElementById("1-2").style.visibility="visible";
	document.getElementById("1-3").style.visibility="visible";


	document.getElementById("easypiechart-blue").style.visibility="visible";
	document.getElementById("node-count").innerHTML = count;

	document.getElementById("easypiechart-red").style.visibility="visible";
	document.getElementById("lethality").innerHTML = eff;

	document.getElementById("easypiechart-teal").style.visibility="visible";
	document.getElementById("average_path_length").innerHTML = "2.641";

	document.getElementById("easypiechart-orange").style.visibility="visible";
	document.getElementById("connectivity").innerHTML = "100%";
}

function table_start(){
	$(document).ready(function () {
        $('#dataTables-example').dataTable();
    });
}

function mouse_over_credit(){
	document.getElementById("credit").innerHTML = "楼6000";
}

function mouse_out_credit(){
	document.getElementById("credit").innerHTML = "楼4800";
}

Array.prototype.del = function(varElement)
{
    var numDeleteIndex = -1;
    for (var i=0; i<this.length; i++)
    {
        // 严格比较，即类型与数值必须同时相等。
        if (this[i] == varElement)
        {
            this.splice(i, 1);
            numDeleteIndex = i;
            break;
        }
    }
    return numDeleteIndex;
}

function test(){
	alert("asdfsda!");
}