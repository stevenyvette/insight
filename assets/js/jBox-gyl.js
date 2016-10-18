var currentColorN3 = 0;
var colorsN3 = ['green','yellow', 'red' ];
var titlesN3 = ['Third', 'Second', 'Best'];
var contentsN3 = ['Third Candidate', 'Second Candidate', 'Best Candidate aaaaaaaaaaaaaaaaaaaaaa'];

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
