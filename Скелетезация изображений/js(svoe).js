function contains(a, obj) {// поиск нужного элемента в массиве, возвращает true или false
    return a.some((elem) => elem == obj);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function skelet() { // Преобразует изображение в черно-белое изображение, после этого производит скелетизацию и выводит изображение
// Get a reference to the image you want the pixels of and its dimensions
var myImage = document.getElementById('image1');
var w = myImage.width, h = myImage.height;
// Create a Canvas element
var canvas = document.createElement('canvas');
// Size the canvas to the element
canvas.width = w;
canvas.height = h;
// Draw image onto the canvas
var ctx = canvas.getContext('2d');
ctx.drawImage(myImage, 0, 0);
// Finally, get the image data
// ('data' is an array of RGBA pixel values for each pixel)
var data = ctx.getImageData(0, 0, w, h);

const canvas2 = document.getElementById('canvas1');
const context = canvas2.getContext('2d');
var black_and_white = [w][h];
for(let x = 0; x < data.width; x++){
    for(let y = 0; y < data.height; y++){
          
        const colorIndices =  y * (data.width * 4) + x * 4;

        const red = data.data[colorIndices];
        const green = data.data[colorIndices+1];
        const blue = data.data[colorIndices+2]; 
        

        if(red + green + blue > 340){
            data.data[colorIndices] = 255;
            data.data[colorIndices+1] = 255;
            data.data[colorIndices+2] = 255;
        }
        else{
            data.data[colorIndices] = 0;
            data.data[colorIndices+1] = 0;
            data.data[colorIndices+2] = 0;// преобразует в чб изображение по порогу
        }
        
    }
}
context.putImageData(data,0,0);


    var array1 = [7,10,11,15,18,19,22,23,41,43,47,72,80,84,104,105,112,116,146,147,148,150,151,208,212,214,215,224,232,233,240,244,246,248,249,252];
    var array2 = [107,111,235];
    var array3 = [31,63,159];
    var a = data.width ;
    var b = data.height;
    var input = [];
    for (var i = 0; i < a+4; i++){
        
        input[i] = [];
        for (var j = 0; j < b+4; j++){
            if(i < 2 || i >= a+2 || j < 2 || j >= b+2){
                input[i][j] = 0;
            }
            else{
                input[i][j] = data.data[(j-2) * (a * 4) + (i-2) * 4];
                input[i][j] = data.data[(j-2) * (a * 4) + (i-2) * 4 + 1];
                input[i][j] = data.data[(j-2) * (a * 4) + (i-2) * 4 + 2];
            }

            
        }
    }
    var delete_ = [];
    var it = [];
    for (var i = 0; i < a+4; i++){       
        delete_[i] = [];
        it[i] = [];
        for (var j = 0; j < b+4; j++){
            delete_[i][j] = 0;
            it[i][j] = input[i][j];      
        }
    }

    var c = 1;
    var num;
    var bug = 0;
    while (c != 0){
        c = 0;
        for(var i = 1; i <= a+3; i++){// не 1 а 3
            
            for(var j = 1; j <= b+3; j++){// не 3 а 2
                if( it [i][j] == 255){
                    
                    num =  it[i-1][j-1]*128 + it[i-1][j]*64+it[i-1][j+1]*32+it[i][j-1]*16 + it[i][j+1]*8 + it[i+1][j-1]*4+it[i+1][j]*2+it[i+1][j+1];
                    num = Math.floor(num/255);
                    if(contains(array1, num) || (contains(array2, num)&& it[i][j+2] == 255) || (contains(array3, num) && it[i+2][j] == 255)){
                        
                        delete_[i][j] = 255;
                        c = c+1;
                    }
                }
                
            }
        }
        
        for(var i = 0; i < a+4; i++){
            for(var j = 0; j < b+4; j++){
                
                it[i][j] = it[i][j] - delete_[i][j];
                delete_[i][j] = 0;
            }
        }
        
        for (var i = 0; i < a+4; i++){
            
            for (var j = 0; j < b+4; j++){
                if(!(i < 2 || i >= a+2 || j < 2 || j >= b+2)){
                    data.data[(j-2) * (a * 4) + (i-2) * 4] = it[i][j];
                    data.data[(j-2) * (a * 4) + (i-2) * 4 +1] = it[i][j];
                    data.data[(j-2) * (a * 4) + (i-2) * 4 +2] = it[i][j];
                }
            }
        }
        context.putImageData(data,0,0);  
          
    }   
    return data; 
}


function saveContent(fileContents, fileName)
     {
        var link = document.createElement('a');
        link.download = fileName;
        link.href = 'data:,' + fileContents;
        link.click();
     }
async function saveAsFile() {// Сохранение в Exel
    var data = await skelet();
    if(data !== undefined){
      var ar = "";
      for(let i = 1; i <= data.height ; i++){
        for(let j = 1; j <= data.width; j++){
          ar += data.data[(j) * (data.height * 4) + (i) * 4]+";";
        }
        ar+="\n"
      }
      saveContent(ar, "Matrix_of_extrema.csv");
    }
}

function saveimg(){// загрузка изображения скелетезации
    var link = document.createElement('a');
    const canvas2 = document.getElementById('canvas1');
    link.href = canvas2.toDataURL("image/jpeg");

    link.download = "bmp_file.jpg";
    link.click();
}

document.addEventListener('DOMContentLoaded', (event) => {
    var inp = document.getElementById("file1");
inp.type = "file";
inp.addEventListener('change', function(e)
{
    var reader = new FileReader();
    reader.onload = function(event)
    {
        var img = new Image();
        img.onload = function()
        {
            document.getElementById("image1").getContext("2d").drawImage(img, 0, 0, 256, 256);
        }
        img.src = event.target.result;

    }
    reader.readAsDataURL(e.target.files[0]);
}, false);
  })
