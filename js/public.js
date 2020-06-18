//添加window.onload函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function tojson(arr){ 
  if(!arr.length) return null; 
  var i = 0; 
  len = arr.length, 
  array = []; 
  for(;i<len;i++){ 
    array.push({"projectname":arr[i][0],"projectnumber":arr[i][1]}); 
  } 
  return JSON.stringify(array); 
}