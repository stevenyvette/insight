var count = 0;
adjmatrix = new Array();
promatrix = new Array();
re_adjmatrix = new Array();
re_promatrix = new Array();
candidate = new Array();
var R;
var echart_forced;
var echart_bar_pocc;
var circular_option;
var eff = 0;
var re_eff = 0;
var tmp = 0;
var maxn=99,INF=9999,k=1,t=0.85;
var predict = -1,max=0;
var dic = new Array();
var link_number = 0;
var trans;
var click_link;
var click_node;
var check;
var rp_value=[];
var top_three = {'top':-1,'second':-1,'third':-1};
var multi_reshape=[];

function show(file){
	$("#graph-1,#graph-ori").hide();
	set_block_1();
	filepath='graph/'+file;
   $("#show-file-name").html("Network ID: "+" "+file);

	show_forced(file);
	show_circular(file);
	show_degree_bc();
}

//主图 forced-chart
function show_forced(file){
	forced_chart = echarts.init(document.getElementById("graph"),'dark');
	forced_chart.showLoading();
	$.get(filepath, function (xml) {
		echart_forced = echarts.dataTool.gexf.parse(xml);
		forced_chart.hideLoading();
		categories = [];
		for (var i = 0; i < 9; i++) {
			categories[i] = {
				name: 'Role' + i,
			};
		}
		echart_forced.nodes.forEach(function (node) {
			node.itemStyle = null;
			node.value = node.weight;
			node.category = node.attributes.modularity_class;
			node.symbolSize = node.weight<20?Math.sqrt(node.weight)*10:node.weight*1.3;
			node.draggable = true;
			node.label = {
				normal: {
					show: node.weight > 15
				}
			};
		});
		forced_chart_option = {
			title: {
				text: file,
				subtext: 'nodes: each node represent a person'+'\n'
				+'links: each link represent a relationship between two persons',
				bottom: '20px',
				left: 'right'
			},
			tooltip: {
				formatter:function (params) {
					if (params.value) {
						return 'Name: '+ params.name + ' </br>'
						   + 'Node ID:' + promatrix[params.dataIndex][0]+'</br>'
						   + 'Partners:' + promatrix[params.dataIndex][4]+'</br>'
						   + 'Importance:' + promatrix[params.dataIndex][2]+'</br>'
						   + 'Role:' + params.data.category;
					}
					else {
						return 'Link Id:' + params.dataIndex+' </br>'
						   + 'A relationship between:</br>'
						   +promatrix[parseInt(params.data.source)][1] + ' and '+promatrix[parseInt(params.data.target)][1];
					}
				},
			},
			toolbox:{
				show: true,
				feature: {
					dataView: {
						//默认显示的是第一列 id {b}  第二列 value {c}（数据值）
						readOnly: false,
						optionToContent: function(opt) {
							var series = opt.series;
							var table = '<table style="width:100%;text-align:center"><tbody><tr>'
										 + '<td>节点id</td>'
										 + '<td>节点weight</td>'
										 + '</tr>';
							for (var i = 0;i < count; i++) {
								table += '<tr>'
										 + '<td>' + promatrix[i][0] + '</td>'
										 + '<td>' + promatrix[i][2] + '</td>'
										 + '</tr>';
							}
							table += '</tbody></table>';
							return table;
						}
					},
					restore: {},
					saveAsImage: {},
				},
				itemSize:20,
				orient:'vertical',
			},
			legend: [{
				// selectedMode: 'single',
				data: categories.map(function (a) {
					return a.name;
				}),
				selected:{},
				textStyle:{
					color:'gray',
				},
				tooltip: {
					show: true,
					formatter: '快捷按键:快速显示、隐藏属于',
				}
			}],
			series : [
				{
					name: 'Les Miserables',
					type: 'graph',
					layout: 'none',
					data: echart_forced.nodes,
					links: echart_forced.links,
					categories: categories,
					symbol:'image://images/avtar.png',
					roam: false,
					focusNodeAdjacency:true,
					draggable:true,
					animationDuration: 1000,
					animationEasingUpdate: 'quinticInOut',
					label: {
						normal: {
							position: 'top',
							formatter: '{b}' //a为系列名，b为数据名，c为数据值
						},
						emphasis:{
							position: 'top',
							formatter: '{b}'
						}
					},
					force: {
						repulsion: 1500,
						gravity: 0.05,
						edgeLength:30,

					},
					lineStyle:{
						normal:{
							color:'source',
							width:3,
							curveness: 0.3
						},
						emphasis:{
							width:6,
							color:'#FFD700'
						}
					},
				}
			],
		};

		forced_chart.setOption(forced_chart_option);
		window.addEventListener("resize", function () {
			forced_chart.resize(); 
			pocc_chart.resize();
			degree_bc.resize(); 
		});
		forced_chart.on('dblclick', function (params) {
			if (params.dataType === 'node') {
				node_action(parseInt(params.data.id));
				console.log(params);
			}
			else if (params.dataType === 'edge') {
				console.log(params);
				link_action(parseInt(params.data.source),parseInt(params.data.target));
			}
		});
		forced_chart.on('contextmenu', function (params) {
			//console.log(parames);
			if(params.dataType=="node"){
				trans=params;
			}
		});
		forced_chart.on('click',function (params){
			//console.log(params);
			click_node=undefined;
			click_link=undefined;
			if(params.dataType=="node"){
					click_node=params;
			}else{
				click_link=params;
			}
		})
	}, 'xml');
}

//环形图
function show_circular(file){
	count=0;
	circular_chart = echarts.init(document.getElementById("echart-forced"));
	circular_chart.showLoading();

	$.get(filepath, function (xml) {
		echart_circular = echarts.dataTool.gexf.parse(xml);

		init_matrix(echart_circular);
		ori_matrix(echart_circular);
		update_table();
		efficiency();


		set_init();

		circular_chart.hideLoading();
		categories = [];
		for (var i = 0; i < 9; i++) {
			categories[i] = {
				name: 'Role' + i,
			};
		}
		echart_circular.nodes.forEach(function (node) {
			node.itemStyle = null;
			node.value = node.symbolSize;
			node.category = node.attributes.modularity_class;
			node.degree = node.attributes.degree;
			node.draggable = false;
			node.label = {
				normal: {
					show: node.symbolSize > 30
				}
			};
		});
		circular_option = {
			title: {
				text: file,
				subtext: 'nodes: each node represent a person'+'\n'
				+'links: each link represent a relationship between two persons',
				bottom: '10px',
				left: 'right'
			},
			tooltip: {
				formatter:function (params) {
					if (params.value) {
						return 'Name: '+ params.name + ' <br/>'
						   + 'Node ID:' + promatrix[params.dataIndex][0]+'</br>'
						   + 'partners:' + promatrix[params.dataIndex][4]+'</br>'
						   + 'Importance:' + promatrix[params.dataIndex][2]+'</br>'
						   + 'Role:' + params.data.category;
					}
					else {
						return 'Link Id:' + params.dataIndex+' <br/>'
						   + 'source: '+promatrix[params.data.source][1] + '</br>'
						   + 'target: '+promatrix[params.data.target][1];
					}
				}
			},
			toolbox:{
				show: true,
				feature: {
					dataView: {
						//默认显示的是第一列 id {b}  第二列 value {c}（数据值）
						readOnly: false,
						optionToContent: function(opt) {
							var series = opt.series;
							var table = '<table style="width:100%;text-align:center"><tbody><tr>'
										 + '<td>节点id</td>'
										 + '<td>节点weight</td>'
										 + '</tr>';
							for (var i = 0;i < count; i++) {
								table += '<tr>'
										 + '<td>' + promatrix[i][0] + '</td>'
										 + '<td>' + promatrix[i][2] + '</td>'
										 + '</tr>';
							}
							table += '</tbody></table>';
							return table;
						}
					},
					restore: {},
					saveAsImage: {},
				},
				itemSize:20,
				orient:'vertical',
			},
			legend: [{
				// selectedMode: 'single',
				data: categories.map(function (a) {
					return a.name;
				}),
				selected:{},
				textStyle:{
					color:'gray',
				}
			}],
			animationDuration: 1500,
			animationEasingUpdate: 'quinticInOut',
			series : [
				{
					name: file,
					type: 'graph',
					layout: 'circular',
					circular: {
						rotateLabel: true
					},
					data: echart_circular.nodes,
					links: echart_circular.links,
					categories: categories,
					roam: false,
					focusNodeAdjacency:true,
					label: {
						normal: {
							show:true,
							position: 'top',
							formatter: '{b}' //a为系列名，b为数据名，c为数据值
						},
						emphasis:{
							show:true,
							position: 'top',
							formatter: '{c}'
						}
					},
					lineStyle: {
						normal: {
							color: 'source',
							curveness: 0.3
						}
					}
				}
			],
			lineStyle:{
				normal:{
					width:2,
					curveness:0.3
				},
				emphasis:{
					width:3,
					color:'#FFD700'
				}
			},
		};

		circular_chart.setOption(circular_option);
		window.addEventListener("resize", function () {
			circular_chart.resize(); 
			pocc_chart.resize(); 
		});
		//window.onresize = circular_chart.resize;
	}, 'xml');
}

//degree-bc分布图
function show_degree_bc(){
	degree_bc = echarts.init(document.getElementById("degree-bc"));
	degree_bc.showLoading();
	degree_bc_option = {
		grid: {
			left: '3%',
			right: '7%',
			bottom: '3%',
			containLabel: true
		},
		tooltip : {
			trigger: 'axis',
			showDelay : 0,
			formatter : function (params) {
				if (params.value.length > 1) {
					return 'Degree Distribution<br/>'
					   + 'Degree:'+params.value[0]+'</br>'
					   + 'Percent:'+parseFloat(params.value[1]).toFixed(3);
				}
				else {
					return 'Degree Distribution:<br/>'
					   + params.name + ' : '
					   + parseFloat(params.value).toFixed(3) ;
				}
			},
			axisPointer:{
				show: true,
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
		},
		legend: {
			data: ['nodes'],
			left: 'right'
		},
		xAxis : [
			{
				type : 'value',
				name : 'Degree',
				scale:true,
				axisLabel : {
					formatter: '{value} '
				},
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				name : 'Percent',
				scale:true,
				axisLabel : {
					formatter: '{value} '
				},
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				}
			}
		],
		series : [
			{
				name:'nodes',
				type:'scatter',
				data: [[36,0.012,'Valjean'],
					[22,0.012,'Gavroche'],
					[19,0.012,'Marius'],
					[17,0.012,'Javert'],
					[16,0.012,'Thenardier'],
					[15,0.026,'Fantine'],
					[13,0.026,'Courfeyrac'],
					[12,0.026,'Bahorel'],
					[11,0.039,'MmeThenardier'],
					[10,0.065,'Myriel'],
					[9,0.039,'Tholomyes'],
					[8,0.052,'Bamatabois'],
					[7,0.130,'Listolier'],
					[6,0.065,'Judge'],
					[4,0.039,'Fauchelevent'],
					[3,0.078,'Toussaint'],
					[2,0.130,'Child2'],
					[1,0.221,'MotherPlutarch'],
				],
				markPoint : {
					data : [
						{type : 'max', name: 'Max'},
						{type : 'min', name: 'Min'}
					]
				},
				markLine : {
					data : [
						{type : 'average', name: 'Average Degree',valueIndex: 0},
						{type : 'average', name: 'Average Percentage',valueIndex:1},
					]
				}
			},
		]
	};

	degree_bc.hideLoading();
	degree_bc.setOption(degree_bc_option);
}

//rv-rp分布图
function show_rv_rp(delete_node_id){
	rv_rp_line_chart = echarts.init(document.getElementById("rv-rp-line-chart"));
	rv_rp_line_chart.showLoading();

	option_rv_rp = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['RV','RP']
		},
		toolbox: {
			show: true,
			feature: {
				//dataZoom: {},
				dataView: {readOnly: false},
				magicType: {type: ['line', 'bar']},
				restore: {},
				saveAsImage: {}
			},

		},
		xAxis:  [
			{
				type: 'category',
				data: [],
				axisLabel:{'interval':0,'rotate':40},
			}
		],
		yAxis: [
			{
				type: 'value',
				name: 'RV',
				min: 0,
				max: 10,
				interval: 1,
				axisLabel: {
					formatter: '{value}'
				}
			},
			{
				type: 'value',
				name: 'RP',
				min: 0,
				max: 1,
				interval: 0.2,
				axisLabel: {
					formatter: '{value}'
				}
			}
		],
		series: [
			{
				name:'RV',
				type:'line',
				data:[],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
					]
				},
				markLine: {
					data: [
						{type: 'average', name: '平均值'}
					]
				}
			},
			{
				name:'RP',
				type:'line',
				data:[],
				yAxisIndex:1,
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
					]
				},
				markLine: {
					data: [
						{type: 'average', name: '平均值'},
						[{
							symbol: 'arrow',
							label: {
								normal: {
									formatter: '最大值'
								}
							},
							type: 'max',
							name: '最大值'
						}, {
							symbol: 'circle',
							x: '60%',
							y: '50%'
						}]
					]
				},
			}
		]
	};

	var rp_value3 = rp_value.concat();
	rp_value3.sort(function(a,b){
			return b-a;});
	//console.log(rp_value3);
	var dex=-1;
	for(var i=0;i<count;i++){
		if(rp_value3[i]>0){
			if(i>0&&rp_value3[i]==rp_value3[i-1]){
				dex=rp_value.indexOf(rp_value3[i],dex+1);
			}
			else{
				dex=rp_value.indexOf(rp_value3[i]);
			}
			option_rv_rp.xAxis[0].data.push(promatrix[dex][1]);
			option_rv_rp.series[0].data.push(ReplacementValue(dex,delete_node_id,count).toFixed(2));
			option_rv_rp.series[1].data.push(rp_value3[i].toFixed(2));
		}
		else{
			break;
		}
		//console.log(promatrix[dex][1]+' '+ReplacementValue(dex,delete_node_id,count).toFixed(2)+' '+rp_value3[i].toFixed(2));
	}
	console.log('best candidate: '+predict);
	//console.log(top_three);

	rv_rp_line_chart.hideLoading();

	rv_rp_line_chart.setOption(option_rv_rp);
	window.onresize = rv_rp_line_chart.resize;
}

function init_matrix(graph){
	graph.nodes.forEach(function (node) {
			dic[node.id]=count;
			count+=1;
		});
	tmp = count;

	for (var i=0;i<count;i++){
		adjmatrix[i] = new Array();
		promatrix[i] = new Array();
		re_promatrix[i] = new Array();
		re_adjmatrix[i] = new Array();
	}

	for (var i=0;i<count;i++){
		for (var j=0;j<count;j++){
			adjmatrix[i][j] = 0;
			re_adjmatrix[i][j] = 0;
		}
	}

	for (var i=0;i<count;i++){
		for (var j=0;j<6;j++){
			if (j==1){
				promatrix[i][j] = '';
				re_promatrix[i][j] = '';
			}
			else if(j==5){
				promatrix[i][j] = 1;
				re_promatrix[i][j] = 1;
			}
			else{
				promatrix[i][j] = 0;
				re_promatrix[i][j] = 0;
			}
		}
	}
}

function ori_matrix(graph){
	graph.links.forEach(function(edge){
		var i = dic[edge.source];
		var j = dic[edge.target];
		adjmatrix[i][j] = adjmatrix[j][i] = 1;
	});
	graph.nodes.forEach(function (node) {
		promatrix[dic[node.id]][0] = dic[node.id];
		promatrix[dic[node.id]][1] = node.name;
		promatrix[dic[node.id]][2] = node.weight;
		promatrix[dic[node.id]][3] = node.attributes.modularity_class;
		promatrix[dic[node.id]][4] = degree(dic[node.id],-1);
	});

	for (var i=0;i<count;i++){
		for(var j=i;j<count;j++){
			if(adjmatrix[i][j]==1)
				link_number++;
		}
	}

	POCC(count);
}

function node_add(){
	var add_node_id = count++;
	var add_node_name = document.getElementById('add-node-name').value;
	var add_node_group = parseInt(document.getElementById('add-node-group').value);
	var add_node_weight = parseInt(document.getElementById('add-node-weight').value);

	//更新 adjmatrix % promatrix
	var newadj=new Array();
	for(var i=0;i<count;i++)
		newadj.push(0);
	adjmatrix.push(newadj);

	for(var i=0;i<count-1;i++){
		adjmatrix[i].push(0);
	}
	var newpro=new Array(add_node_id,add_node_name,add_node_weight,add_node_group,degree(add_node_id,-1));
	promatrix.push(newpro);

	//更新promatrix table 信息
	update_table();

	//添加category信息
	categories.push({name:'节点'+add_node_id});
	circular_option.legend[0].data.push("Group"+add_node_id);

	//添加节点信息
	circular_option.series[0].data.push({id: add_node_id, name: add_node_name,label:{normal:{show: true}}, weight: add_node_weight, symbolSize: 5*add_node_weight, draggable:false, value: add_node_weight, category: add_node_group});

	//y = document.getElementById('add-node-id');
	console.log('成功添加id为 '+add_node_id+' 的节点！');
	circular_chart.setOption(circular_option);
	console.log(adjmatrix);
	console.log(promatrix);
	document.getElementById('add-node-name').value='';
	document.getElementById('add-node-weight').value='';
	document.getElementById('add-node-group').value='';
}

function node_delete (id) {
	if(id==null){
		delete_node_id = get_id(document.getElementById('delete-node-id').value);
	}else{
		delete_node_id = id;
	}

	console.log('成功删除id为 '+delete_node_id+' 的节点！');
	console.log('迭代次数为: '+times);
	//promatrix[delete_node_id][5]=0;

	if(delete_node_id<count&&promatrix[delete_node_id][2]!=0){
			$('#delete-node-id').value='';
		set_block_2();
			//初始化各可视化图
		forced_chart_option_delete=$.extend(true,{},forced_chart_option);
		circular_option_delete=$.extend(true,{},circular_option);
		forced_chart_remove=echarts.init(document.getElementById("graph-remove"));
		forced_chart_reshape_1=echarts.init(document.getElementById("graph-1"),'dark');
		forced_chart_reshape_ori=echarts.init(document.getElementById("graph-ori"),'dark');
		forced_chart_reshape=echarts.init(document.getElementById("graph-reshape"));
		circular_chart_remove = echarts.init(document.getElementById("relationship-remove"));
		circular_chart_reshape = echarts.init(document.getElementById("relationship-reshape"));
		forced_chart_reshape_ori.setOption(forced_chart_option);
		circular_chart_remove.setOption(circular_option);
		circular_chart.setOption(circular_option_delete);
		forced_chart_remove.setOption(forced_chart_option);
		set_style();

		//只进行一次迭代，显示最有可能的 3 个替换节点并且给出替换概率
		if(times == 1){
			Candidate(delete_node_id,k,count);
			Candidate_piechart(delete_node_id,k,count);
			for(var i=0;i<count;i++){
				if(ReplaceProbability(i,delete_node_id,count)>0){
					option_candidate.series[0].data.push({value:ReplaceProbability(i,delete_node_id,count).toFixed(3),name:"node "+i});
				}
			}

			if(option_candidate.series[0].data.length==0){
				option_candidate.series[0].data.push({value:0,name:"No Candidates"});
				option_candidate.title.subtext='No candidate.';
			}else{
					option_candidate.title.text='The best candidate is: \t'+promatrix[predict][1];
				option_candidate.title.subtext='Node id : '+predict;
			}

			candidate_chart.setOption(option_candidate);
			show_rv_rp(delete_node_id);

			var rp_value1 = rp_value.concat();
			rp_value1.sort(function(a,b){
					return b-a;});
			if(rp_value1[0]>0){
				var dex=rp_value.indexOf(rp_value1[0]);
				forced_chart_option_delete.series[0].data[dex].symbol='circle';
				forced_chart_option_delete.series[0].data[dex].itemStyle={normal:{color:'green'}};
			}
			if(rp_value1[1]>0){
				var dex=rp_value.indexOf(rp_value1[1]);
				forced_chart_option_delete.series[0].data[dex].symbol='circle';
				forced_chart_option_delete.series[0].data[dex].itemStyle={normal:{color:'blue'}};
			}
			if(rp_value1[2]>0){
				var dex=rp_value.indexOf(rp_value1[2]);
				forced_chart_option_delete.series[0].data[dex].symbol='circle';
				forced_chart_option_delete.series[0].data[dex].itemStyle={normal:{color:'yellow'}};
			}
			forced_chart.setOption(forced_chart_option_delete);

			//根据predict开始reshape
			if(predict!=-1){
				for(var i=0;i<count;i++){
					if(adjmatrix[delete_node_id][i]==1&&adjmatrix[predict][i]!=1){
						adjmatrix[delete_node_id][i]=0;
						adjmatrix[i][delete_node_id]=0;
						adjmatrix[i][predict]=1;
						adjmatrix[predict][i]=1;
						promatrix[i][4]=degree(i,-1);
						forced_chart_option.series[0].links.push({source:i,target:predict});
						circular_option.series[0].links.push({source:i,target:predict});
					}
				}
				promatrix[predict][4]=degree(predict,-1);
				forced_chart_option.series[0].data[predict].symbol='circle';
				forced_chart_option.series[0].data[predict].itemStyle={normal:{color:'green'}};
				circular_option.series[0].data[predict].itemStyle={normal:{color:'green'}};

				circular_chart_reshape.setOption(circular_option);
				forced_chart_reshape.setOption(forced_chart_option);
				forced_chart_reshape_1.setOption(forced_chart_option);
				console.log(forced_chart_option);
			}

			promatrix[delete_node_id][2]=0;
			promatrix[delete_node_id][3]=0;
			promatrix[delete_node_id][4]=0;
			show_result();
			window.addEventListener("resize", function () {
				circular_chart.resize();
				pocc_chart.resize();
				rv_rp_line_chart.resize();
				candidate_chart.resize();
			});
		}
		else{
			set_block_3();
			tmp_delete = delete_node_id;
			multi_reshape=[]
			while(times!=0){
				console.log('remove'+tmp_delete);
				Candidate(tmp_delete,k,count);
				for(var i=0;i<count;i++)
						ReplaceProbability(i,tmp_delete,count);
					if(predict!=-1){
						multi_reshape.push(predict);
						tmp_delete=predict;
					times--;
					predict=-1;
					}else{
						alert("在第"+(4-times)+"次迭代时失败！");
						break;
					}
				console.log(multi_reshape);
			}
			for (var i=0;i<multi_reshape.length;i++){
				forced_chart_option_delete.series[0].data[multi_reshape[i]].symbol='circle';
				forced_chart_option_delete.series[0].data[multi_reshape[i]].itemStyle={normal:{color:colorsN3[3-i]}};
				promatrix[multi_reshape[i]][2]=0;
				promatrix[multi_reshape[i]][3]=0;
				promatrix[multi_reshape[i]][4]=0;
			}
			forced_chart.setOption(forced_chart_option_delete);
			circular_chart_reshape.setOption(circular_option);
			forced_chart_reshape.setOption(forced_chart_option);
			forced_chart_reshape_1.setOption(forced_chart_option);
			show_multi_result();
		}

		update_table();
		}
	else{
		alert("节点不存在!");
	}

	$("#graph-reshape,#relationship-remove,#relationship-reshape,#graph-1,#graph-ori").hide();

	window.addEventListener("resize", function () {
			forced_chart_remove.resize();
			forced_chart_reshape.resize();
			circular_chart_remove.resize();
			circular_chart_reshape.resize();
		});
}

//设置移除后，各图形显示样式
function set_style(){
	for(var i=0;i<circular_option.series[0].data.length;i++){
		if(circular_option.series[0].data[i]["id"]==delete_node_id){
			circular_option.series[0].data[i].itemStyle={normal:{color:"red"}};
		}
	}
	for(var i=0;i<forced_chart_option.series[0].data.length;i++){
		if(forced_chart_option.series[0].data[i]["id"]==delete_node_id){
			forced_chart_option.series[0].data[i].itemStyle={normal:{color:"red",opacity:'0.2'},emphasis:{symbol:'image://images/avtar.png'}};
			forced_chart_option.series[0].data[i].symbol='circle';
			forced_chart_option_delete.series[0].data[i].symbol='circle';
			forced_chart_option_delete.series[0].data[i].itemStyle={normal:{color:"red",opacity:'0.4'}};
		}
	}
	for (var i = 0; i<circular_option.series[0].links.length;i++){
		if((circular_option.series[0].links[i]["source"]==delete_node_id || circular_option.series[0].links[i]["target"]==delete_node_id)){
			circular_option.series[0].links[i]='';
		}
	}
	for (var i = 0; i<forced_chart_option.series[0].links.length;i++){
		if((forced_chart_option.series[0].links[i]["source"]==delete_node_id || forced_chart_option.series[0].links[i]["target"]==delete_node_id)){
			forced_chart_option_delete.series[0].links[i].lineStyle.normal.type='dashed';
			forced_chart_option.series[0].links[i]='';
		}
	}
}

function link_add(){
	var add_link_source = get_id(document.getElementById('add-link-source').value);
	var add_link_target = get_id(document.getElementById('add-link-target').value); 

	if(add_link_source<count&&add_link_target<count&&adjmatrix[add_link_source][add_link_target]==0){
		adjmatrix[add_link_target][add_link_source]=1;
		adjmatrix[add_link_source][add_link_target]=1;
		promatrix[add_link_source][4]++;
		promatrix[add_link_target][4]++;
		update_table();

		//添加连边信息
		forced_chart_option.series[0].links.push({source:add_link_source,target:add_link_target});
		circular_option.series[0].links.push({source:add_link_source,target:add_link_target});

		//更新 adjmatrix & promatrix
		adjmatrix[add_link_target][add_link_source]=1;
		adjmatrix[add_link_source][add_link_target]=1;
		promatrix[add_link_target][4]=degree(add_link_target,-1);
		promatrix[add_link_source][4]=degree(add_link_source,-1);
		console.log('成功添加连边： '+add_link_source+'   to   '+add_link_target);
		circular_chart.setOption(circular_option);
		forced_chart.setOption(forced_chart_option);
	}
	else if(add_link_source>=count||add_link_target>=count){
		alert("节点不存在!")
	}
	else{
		alert("连边已存在!");
	}

	document.getElementById('add-link-source').value='';
	document.getElementById('add-link-target').value='';  
}

function link_delete(source,target){
	if(target==null||source==null){
		delete_link_source = parseInt(document.getElementById('delete-link-source').value);
		delete_link_target = parseInt(document.getElementById('delete-link-target').value);
	}else{
		delete_link_source=source;
		delete_link_target=target;
	}
	//更新 adjmatrix & promatrix
	if(delete_link_source<count&&delete_link_target<count&&adjmatrix[delete_link_target][delete_link_source]==1){
		adjmatrix[delete_link_source][delete_link_target]=0;
		adjmatrix[delete_link_target][delete_link_source]=0;
		promatrix[delete_link_source][4]=degree(delete_link_source,-1);
		promatrix[delete_link_target][4]=degree(delete_link_target,-1);
		console.log('成功删除连边： '+delete_link_source+'   to   '+delete_link_target);
		update_table();
		for (var i = 0; i<circular_option.series[0].links.length;i++){
			if((circular_option.series[0].links[i]["source"]==delete_link_source && circular_option.series[0].links[i]["target"]==delete_link_target)||(circular_option.series[0].links[i]["source"]==delete_link_target&& circular_option.series[0].links[i]["target"]==delete_link_source)){
				circular_option.series[0].links[i]='';
				forced_chart_option.series[0].links[i]='';
			}
		}
		forced_chart.setOption(forced_chart_option);
		circular_chart.setOption(circular_option);
	}
	else{
		alert("连边不存在!");
	}

	document.getElementById('delete-link-source').value='';
	document.getElementById('delete-link-target').value='';
}

//更新promatrix table
function update_table(){
	var table_content=new Array();
	for(var i=0;i<count;i++){
		table_content.push([promatrix[i][0],promatrix[i][1],promatrix[i][2],promatrix[i][3],promatrix[i][4]]);
	}
	$(document).ready(function () {
		$('#dataTables-example').dataTable({
			bDestroy:true,
			data:table_content,
		});
	});
}

function reshape_matrix(r,graph){
	graph.links.forEach(function(edge){
		var i = dic[edge.source];
		var j = dic[edge.target];
		if(i==r||j==r)
			re_adjmatrix[i][j] = re_adjmatrix[j][i] = 0;
		else
			re_adjmatrix[i][j] = re_adjmatrix[j][i] = 1;
	});

	graph.nodes.forEach(function (node) {
		node.id = dic[node.id];
		if(node.id!=r){
			re_promatrix[node.id][0] = node.id;
			re_promatrix[node.id][1] = node.name;
			re_promatrix[node.id][2] = node.weight;
			re_promatrix[node.id][3] = node.attributes.modularity_class;
			re_promatrix[node.id][4] = degree(node.id,r);
		}
		else
			re_promatrix[node.id][0] = r;
	});
	re_efficiency(r);
}
