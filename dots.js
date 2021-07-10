var selectDot = '#fff';
var deselectDot = '#CD113B';
var selectedDots = [];
var width;
da(document,'DOMContentLoaded', function(){
    resetDots();
    dotMatrix();
    button();
});


function resetDots(){
    selectedDots = [];
    for(var i=0; i<8; i++)
        selectedDots[i] = [0,0,0,0,0,0,0,0];
}

function dotMatrix(){
    let dm = d('matrix');
    dm.innerHTML = '';
    dm.innerHTML = `<div class='matrixRow'><div class='cell'><div class='dot'></div></div></div>`
    width = dc('cell').getBoundingClientRect().width * 0.9869;
    var fontSize = width*0.5-4;
    var padding = width*0.25;
    er(width);
    dm.innerHTML = '';
    //grid variables
    var gridType = d('gridType').checked;
    var gridOn = d('grid').checked;
    var flipGrid = d('flipGrid').checked;
    //col grid
    if(gridOn && !gridType){
        dc('gridY').innerHTML='';
        dc('gridY').innerHTML = `<div class='corner'></div>`;
        dc('corner').style.height = fontSize+2+padding+'px';
        for(var i=0; i<8; i++){
            dc('gridY').innerHTML+=`<div class='yCol'><p>${1<<i}</p></div>`;
            dc('yCol', i).style.width = 12.5+'%';
            dc('yCol', i).style.height = width+'px';
            dc('yCol', i).style.padding = `${padding+'px'} 0`;
            dcn(dc('yCol', i)).style.fontSize = `${fontSize + 'px'}`;
        }
    }else{
        dc('gridY').innerHTML='';
    }
    //row grid
   
    dm.innerHTML += `<div class='gridX'></div>`;
    var grid = dc('gridX');
    for(var i=0; i<8; i++){
        grid.innerHTML += `<div class='xCol'><p class='center'></p></div>`;
        dc('xCol',i).style.height = fontSize+2+padding+'px';
    }
    if(gridOn && gridType){
        for(var i=0; i<8; i++){
            dcn(dc('xCol', i)).innerHTML = 1<<(i);
            dc('xCol', i).style.padding = `0 0 ${padding + 'px'} 0`;
            dcn(dc('xCol', i)).style.fontSize = `${fontSize + 'px'}`; 
        }
    }
    for(var i=0; i<8; i++){
        dm.innerHTML += "<div class='matrixRow'></div>"; 
        var mc = dc('matrixRow', i);
        for(var j=0; j<8; j++){
            mc.innerHTML += `<div class='cell'><div id='d${parseInt(8*i+j)}' class='dot center'></div></div>`;
            var cell = dcn(mc, j);
            cell.style.height = width+'px';
            var dot = dcn(cell);
            var currDot = selectedDots[i][j];
            dot.style.backgroundColor = (currDot == 1)? selectDot : deselectDot;
        }
    }
   

    button();
    updateTextBox();
    
}

da(window, 'resize', dotMatrix);
da(window, 'mousedown', mouseDown);
da(window, 'mouseup', mouseUp);

function button(){
    for(var i=0; i<64; i++){
       da(d('d'+i).parentElement, 'click', deselect);
    }
}

function select(i){
    this.style.backgroundColor = selectDot;
    var i=parseInt(this.id.substring(1));
    var col = i%8;
    var row = parseInt(i/8);
    selectedDots[row][col] = 1;
    updateTextBox();
}

function deselect(){
    var i=parseInt(dcn(this).id.substring(1));
    var col = i%8;
    var row = parseInt(i/8);
    dcn(this).style.backgroundColor = selectedDots[row][col] == 0? selectDot : deselectDot;
    selectedDots[row][col] = !selectedDots[row][col];
    updateTextBox();
}

function mouseDown(){
    for(var i=0; i<64; i++){
        da(d('d'+i), 'mousemove', select);
    }
}
function mouseUp(){
    for(var i=0; i<64; i++){
        re(d('d'+i), 'mousemove',select);
    }
}
function updateTextBox(){
    var arr = [0,0,0,0,0,0,0,0]
    var cString = 'uint8_t arr[8] = {'
    for(var i=0; i<8; i++){
        var temp = 0;
        for(var j=0; j<8; j++){
            temp += parseInt((d('gridType').checked? selectedDots[i][j] : selectedDots[j][i])*(1<<j));
        }
        arr[i] = temp;
        cString += temp + ',';
    }

    d('clear').src = (arr.every(item => item === 0))? 'trash.svg' : 'trash-2.svg';

    cString = cString.substring(0, cString.length - 1) + '};';
    d('selectionBar').value = cString;
}

da(d('rotate-i'), 'click', rotateAni);

function rotateAni(){
    animate({
        duration: 1000,
        timing: function(timeFraction) {
            return val = (1/(1+Math.exp(-(30*timeFraction-5))));
        },
        draw: function(progress){
            d('rotate-i').style.transform = 'rotate('+Math.round(progress*360)+'deg)';
        }
    });
    var rotatedMatrix = [];
    for(var i =0; i<8; i++)
        rotatedMatrix[i] = [0,0,0,0,0,0,0,0];
    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            rotatedMatrix[j][8-(i+1)] = selectedDots[i][j];
        }
    }
    selectedDots = rotatedMatrix;
    dotMatrix();
}

da(d('flip'), 'change', function(){
    var flippedMatrix= [];
    for(var i =0; i<8; i++)
        flippedMatrix[i] = [0,0,0,0,0,0,0,0];
    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            flippedMatrix[i][8-(j+1)] = selectedDots[i][j];
        }
    }
    selectedDots = flippedMatrix;
    dotMatrix();
});

da(d('grid'), 'change', dotMatrix);
da(d('gridType'), 'change', function(){
    dotMatrix();
    d('gridTypeName').innerHTML = this.checked? 'Row Wise' : 'Col Wise';
});
da(d('clear'), 'click', function(){
    resetDots();
    dotMatrix();
})