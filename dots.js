var selectDot = '#fff';
var deselectDot = '#CD113B';
var selectedDots = [];

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
    let width = dm.getBoundingClientRect().width/8;
    er(width)
    for(var i=0; i<8; i++){
        dm.innerHTML += "<div class='matrixRow'></div>"; 
        for(var j=0; j<8; j++){
            var mc = dc('matrixRow', i);
            mc.innerHTML += `<div class='cell'><div id='d${parseInt(8*i+j)}' class='dot center'></div></div>`;
            var cell = dcn(mc, j);
            cell.style.height = width+'px';
            var dot = dcn(cell);
            dot.style.backgroundColor = (selectedDots[i][j] == 1)? selectDot : deselectDot;
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
            temp += parseInt(selectedDots[j][i]*(1<<j));
        }
        arr[i] = temp;
        cString += temp + ','
    }
    cString = cString.substring(0, cString.length - 1) + '};';
    er(cString)
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