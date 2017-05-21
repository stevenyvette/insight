/*
*右侧弹出浮动框
*/
var currentColorN3 = 0;
var colorsN3 = ['red','yellow','blue','green' ];
var titlesN3 = ['More Information','Third Candidate', 'Second Candidate', 'Best Candidate'];
var contentsN3 = ['See Candidate pie chart below','Third Candidate', 'Second Candidate', 'Best Candidate'];
var multi_titles = ['More Information','Successor III','Successor II','Successor I'] 
var multi_contents = ['See details below :)','The Successor after the third reshaping action','The Successor after the second reshaping action','The Successor after the first reshaping action']

function show_jbox(){
    new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'top'
                },
                theme: 'NoticeBorder',
                color: 'black',
                animation: {
                    open: 'slide:top',
                    close: 'slide:right'
                },
                onInit: function() {
                    this.options.color = colorsN3[currentColorN3];
                    this.options.title = titlesN3[currentColorN3];
                    this.options.content = contentsN3[currentColorN3];
                    currentColorN3++; (currentColorN3 >= colorsN3.length) && (currentColorN3 = 0)
                },
            })
}

function show_multi_jbox(){
	new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'top'
                },
                theme: 'NoticeBorder',
                color: 'black',
                animation: {
                    open: 'slide:top',
                    close: 'slide:right'
                },
                onInit: function() {
                    this.options.color = colorsN3[3-currentColorN3];
                    this.options.title = multi_titles[currentColorN3];
                    this.options.content = multi_contents[currentColorN3];
                    currentColorN3++; 
                    (currentColorN3 >= colorsN3.length) && (currentColorN3 = 0)
                },
            })
}
