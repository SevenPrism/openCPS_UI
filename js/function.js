var list={
   humidity1:0,//环境湿度1模块数量
   temp1:0,//温度模块1数量
   temp2:0,//温度模块2数量
   soilMoisture:0,//土壤湿度模块数量
   waterDepth:0,//水深模块数量
   gm:0,
   andGate:0,//与门模块数量
   orGate:0,//或门模块数量
   notGate:0,//非门模块数量
   delay:0,
   light:0,//灯泡模块数量
   UAV:0,//无人机数量
   pump:0,//水泵数量
   relay101:0,//继电器101数量
   relay102:0,//继电器102数量
   relay106:0,//继电器106数量

   humidity1_flag:0,//环境湿度1模块数量
   temp1_flag:0,//温度模块1数量
   temp2_flag:0,//温度模块2数量
   soilMoisture_flag:0,//土壤湿度模块数量
   waterDepth_flag:0,//水深模块数量
   gm_flag:0,
   andGate_flag:0,//与门模块数量
   orGate_flag:0,//或门模块数量
   notGate_flag:0,//非门模块数量
   delay_flag:0,
   light_flag:0,//灯泡模块数量
   UAV_flag:0,//无人机数量
   pump_flag:0,//水泵数量
   relay101_flag:0,//继电器101数量
   relay102_flag:0,//继电器102数量
   relay106_flag:0//继电器106数量
};

var num = 0;//矩阵内id的标号
var id = new Array();

var instance = jsPlumb.getInstance({
				Connector:["Bezier",{curviness: 50}],//连接线的样式为贝塞尔曲线，曲率为50
				DragOptions:{cousor:"pointer",zIndex:2000},//拖拉时的鼠标样式
				PaintStyle:{stroke:"#1ABDE6",strokeWidth:4},//连线的样式
				EndpointStyle:{radius:5,fill:"#eee"},//连线断点的样式
				HoverPaintStyle:{stroke:"#ff0000"},//鼠标移动到连线上时的样式
				EndpointHoverStyle:{fill:"#ec9f2e"},//鼠标移动到连接点的样式
				Container:"canvas"//拖拉的容器的ID
			});//jsplumb的初始基本配置

function setOperate(obj,del,point,str){
   obj.onmouseover=function(){//鼠标放在上面，显示删除标记
      del.style.display='block';
   };

   obj.onmouseleave=function(){//鼠标挪走，删除标记消失
   	  del.style.display='none';
   };
  
   obj.ondblclick = function(){//canvas内双击显示阈值设置页面
       var k = document.getElementById(obj.getAttribute("id")+"-win");
       k.style.display="block";
   };
   del.onclick=function(){
   		canvas=document.getElementsByClassName("canvas");
   		for(var i=0;i<4;i++){
   			instance.deleteEndpoint(point[i]);
   		}
   		canvas[0].removeChild(obj);
   		var O = document.getElementById(str);
   		if(str == "humidity1"){
   			list.humidity1_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "temp1"){
   			list.temp1_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "temp2"){
   			list.temp2_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "soilMoisture"){
   			list.soilMoisture_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "waterDepth"){
   			list.waterDepth_flag = 0;
   			O.classList.remove("stop");
   		}
        if(str == "gm"){
            list.gm_flag = 0;
            O.classList.remove("stop");
        }
   		/*if(str == "andGate"){
   			list.andGate_flag = 0;
   			O.classList.remove("stop");
   		}
		if(str == "orGate"){
   			list.orGate_flag = 0;
   			O.classList.remove("stop");
   		}
		if(str == "notGate"){
   			list.notGate_flag = 0;
   			O.classList.remove("stop");
   		}*/
   		if(str == "light"){
   			list.light_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "UAV"){
   			list.UAV_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "pump"){
   			list.pump_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "relay101"){
   			list.relay101_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "relay102"){
   			list.relay102_flag = 0;
   			O.classList.remove("stop");
   		}
   		if(str == "relay106"){
   			list.relay106_flag = 0;
   			O.classList.remove("stop");
   		}
   };
}

//添加canvas内拖动项目的logo
function setLogo(obj){
	var logo = document.createElement("div");
	logo.classList.add("logo");
	logo.setAttribute("id", obj.getAttribute("id")+"-logo");
	obj.appendChild(logo);


}

var comString = "";//全局比较字符判断大于还是小于

var threhold = "";//阈值，需要放到全局，因为可能在拉出实例之前或之后填入
//设置实例参数框
function setWindow(obj){
	var win = document.createElement("div");
	win.classList.add("win");
	win.setAttribute("id", obj.getAttribute("id")+"-win");
	//利用h3标签显示实例ID
	var h=document.createElement("h3");
	h.innerHTML = obj.getAttribute("id")+"设置阈值:";
	h.classList.add("title");
	//实例阈值的输入text
	var input = document.createElement("input");
	input.type = "text";
	input.value = "";
	input.classList.add("text");
	input.setAttribute("id",obj.getAttribute("id")+"-text" );
	//实例阈值的确认键
	var button = document.createElement("input");
	button.type = "button";
	button.value = "确认";
	button.classList.add("button");
	button.setAttribute("id",obj.getAttribute("id")+"-button");
	//实例阈值是大于还是小于选项
	/*大于还是小于、开还是关选择，第二版去掉
	var selDiv = document.createElement("div");
	selDiv.classList.add("clearfix");
	selDiv.innerHTML = "<input type='radio' name='"+obj.getAttribute("id")+"' value='gt' class='gt' checked='checked' /><label for='gt'>大于</label><input type='radio' name='"+obj.getAttribute("id")+"' value='lt' class='lt'/><label for='lt'>小于</label>"
    
	
	var key = document.createElement("select");
	key.classList.add("select");
	key.setAttribute("id", obj.getAttribute("id")+"-select");
	key.innerHTML = "<option value='on'>ON</option><option value='off'>OFF</option>";
    */
	
	//win.appendChild(selDiv);
    //win.appendChild(key);
	win.appendChild(h);
	win.appendChild(input);
    win.appendChild(button);
	
	
	
	var radioSel = document.getElementsByName(obj.getAttribute("id"));//获取当前实例的id
	//var a = radioSel[0].value;
	//var b = radioSel[1].value;
	//var comString = radioSel[0].checked = 'checked' ? a : b;
	/*for(var i = 0; i < radioSel.length;i++){
		if(radioSel[i].checked){
			obj.comString = radioSel[i].value;
			//console.log(comString);
		}
	}*/

    obj.appendChild(win);
    button.onclick = function(){
		var target = document.getElementById(obj.getAttribute("id")+"-logo");
		var value = input.value;
		window.threhold = value;//把值传出全局
		if(value == ""){
			win.style.top= "-100px";
			target.style.display = "none";
			win.style.display = "none";
		}
		else{
			//判断单选项是选择lt还是gt，需要注意全局变量comString必须加window.
			for(var i = 0; i < radioSel.length;i++){
				if(radioSel[i].checked){
					window.comString = radioSel[i].value;
					console.log(comString);
				}
			}
			win.style.display = "none";
			win.style.top = "-150px";
			input.value = "";
			target.innerHTML =  ">"+value;
			target.style.display = "block";
			//alert(window.threhold);
			console.log(obj.getAttribute("id"));
			var iInId = array.indexOf(obj.getAttribute("id"));
			array[iInId] = array[iInId] + ':' + value;
			console.log(array);



		}
	};

}
function setPoint(obj){//设置元素的连接点
	var e1=instance.addEndpoint(obj.getAttribute("id"), {  //添加连接点到模块上
    	        uuid: obj.getAttribute("id") + "-bottom",
                isSource:true,
                isTarget:true,
                anchor: "Bottom" ,
                connectorOverlays: [["Arrow", { width: 20, length: 20, location: 0.5 }]],
                maxConnections:10 
            }); 
     
    var e2=  instance.addEndpoint(obj.getAttribute("id"), {  
            	uuid: obj.getAttribute("id") + "-top",
          		isSource:true,
                isTarget:true,
                anchor: "Top" ,
                connectorOverlays: [["Arrow", { width: 20, length: 20, location: 0.5 }]],
                maxConnections:10

            });  
     var e3=       instance.addEndpoint(obj.getAttribute("id"), {  
            	uuid: obj.getAttribute("id") + "-left",
                isSource:true,
                isTarget:true,  
                anchor: "Left",
                connectorOverlays: [["Arrow", { width: 20, length: 20, location: 0.5}]],
                maxConnections:10
            }); 
     var e4=       instance.addEndpoint(obj.getAttribute("id"), { 
                uuid: obj.getAttribute("id") + "-right", 
                isSource:true,
                isTarget:true,
                anchor: "Right" ,
                connectorOverlays: [["Arrow", { width: 20, length:20, location: 0.5 }]],
                maxConnections:10
            }); 
     return point=new Array(e1,e2,e3,e4);
}
function createhumidity1(){
	list.humidity1_flag ++;
	var li = document.getElementById("humidity1");
	li.classList.add("stop");			
	if(list.humidity1_flag > 1){
		return false;
	}
	list.humidity1++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_humi2"/*+list.humidity1*/);//设置新模块的ID
	windows.innerHTML="<img src='images/datacollect_humidity.png'>";
    windows.style.left = '98px';
    windows.style.top = '661px';
	setLogo(windows);
	setWindow(windows);
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"humidity1");

	
	id[num] = windows.id;
	window.num++;

	console.log(id);
      
}
function createtemp1(){
	// $("#temp1").click(function(){
    list.temp1_flag ++;
	var li = document.getElementById("temp1");
	li.classList.add("stop");			
	if(list.temp1_flag > 1){
		return false;
	}
	list.temp1++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_smoke1"/*+list.temp1*/);//设置新模块的ID
	windows.innerHTML="<img src='images/datacollect_temperature.png'>";
    windows.style.left = '509px';
    windows.style.top = '147px';
	setLogo(windows);
	setWindow(windows);
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"temp1");

	id[num] = windows.id;
	window.num++;

	
	console.log(id);
	// });
	
}
function createtemp2(){
	list.temp2_flag ++;
	var li = document.getElementById("temp2");
	li.classList.add("stop");			
	if(list.temp2_flag > 1){
		return false;
	}
	list.temp2++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_temp");//设置新模块的ID
	windows.innerHTML="<img src='images/datacollect_temperature.png'>";
    windows.style.left = '528px';
    windows.style.top = '661px';
	setLogo(windows);
	setWindow(windows);
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"temp2");

	id[num] = windows.id;
	window.num++;

	
	console.log(id);
	
	
}
function createsoilMoisture(){
	// $("#soilMoisture").click(function(){
	list.soilMoisture_flag ++;
	var li = document.getElementById("soilMoisture");
	li.classList.add("stop");			
	if(list.soilMoisture_flag > 1){
		return false;
	}
	list.soilMoisture++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_soli1");//设置新模块的ID
	windows.innerHTML="<img src='images/datacollect_soilwet.png'>";
    windows.style.left = '951px';
    windows.style.top = '614px';
	setLogo(windows);
	setWindow(windows);
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"soilMoisture");

	id[num] = windows.id;
	window.num++;

	
	
	console.log(id);
	// });
	
}
function createsoilMoisture1(){
    // $("#soilMoisture").click(function(){
    var li = document.getElementById("soilMoisture1");
    li.classList.add("stop");           
    if(list.soilMoisture_flag > 1){
        return false;
    }
    list.soilMoisture++;//创建一个模块，数量加一
    var windows=document.createElement("div");//建立一个模块
    var img=document.createElement("img");
    img.classList.add('delete');
    img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
    windows.classList.add('window');//新模块添加类名，以继承CSS样式
    windows.setAttribute("id", "c_soli2");//设置新模块的ID
    windows.innerHTML="<img src='images/datacollect_soilwet.png'>";
    windows.style.left = '1163px';
    windows.style.top = '610px';
    setLogo(windows);
    setWindow(windows);
    windows.appendChild(img);
    canvas[0].appendChild(windows);//添加新模块到容器里
    instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    var point=setPoint(windows);
    setOperate(windows,img,point,"soilMoisture");

    id[num] = windows.id;
    window.num++;

    
    
    console.log(id);
    // });
    
}
function createwaterDepth(){
	list.waterDepth_flag ++;
	var li = document.getElementById("waterDepth");
    li.classList.add("stop");           
    if(list.waterDepth > 1){
        return false;
    }
	
	list.waterDepth++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_waterdepth");//设置新模块的ID
	windows.innerHTML="<img src='images/datacollect_waterdeep.png'>";
    windows.style.left = "1143px";
    windows.style.top = "88px";
	setLogo(windows);
	setWindow(windows);
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"waterDepth");

	id[num] = windows.id;
	window.num++;

	
	console.log(id);
	
}
function createwGM(){
    list.gm_flag ++;
    var li = document.getElementById("gm");
    li.classList.add("stop");           
    if(list.gm > 1){
        return false;
    }
    
    list.waterDepth++;//创建一个模块，数量加一
    var windows=document.createElement("div");//建立一个模块
    var img=document.createElement("img");
    img.classList.add('delete');
    img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
    windows.classList.add('window');//新模块添加类名，以继承CSS样式
    windows.setAttribute("id", "c_lumi");//设置新模块的ID
    windows.innerHTML="<img src='images/gm.png'>";
    windows.style.left = "323px";
    windows.style.top = "661px";
    setLogo(windows);
    setWindow(windows);
    windows.appendChild(img);
    canvas[0].appendChild(windows);//添加新模块到容器里
    instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    var point=setPoint(windows);
    setOperate(windows,img,point,"gm");

    id[num] = windows.id;
    window.num++;

    
    console.log(id);
    
}
function createandGate(){
	$("#andGate").click(function(){
			list.andGate_flag ++;
			var li = document.getElementById("andGate");
			/*li.classList.add("stop");			
			if(list.andGate_flag > 1){
				return false;
			}*/
			list.andGate++;//创建一个模块，数量加一
			var windows=document.createElement("div");//建立一个模块
			var img=document.createElement("img");
			img.classList.add('delete');
			img.src="images/delete.png";
            var canvas=document.getElementsByClassName("canvas");//得到容器对象
			windows.classList.add('window');//新模块添加类名，以继承CSS样式
			if(list.andGate===1){
				windows.setAttribute("id", "and");//设置新模块的ID
			} else {
				windows.setAttribute("id", "and" + (list.andGate-1));
			}
			windows.innerHTML="<img src='images/1.png'>";
			windows.appendChild(img);
			canvas[0].appendChild(windows);//添加新模块到容器里
    		instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    		var point=setPoint(windows);
    		setOperate(windows,img,point,"andGate");

			id[num] = windows.id;
			window.num++;

			
			console.log(id);
	});
	
}

function createorGate(){
	$("#orGate").click(function(){
			list.orGate ++;
			var li = document.getElementById("orGate");
			list.orGate_flag++;//创建一个模块，数量加一
			var windows=document.createElement("div");//建立一个模块
			var img=document.createElement("img");
			img.classList.add('delete');
			img.src="images/delete.png";
            var canvas=document.getElementsByClassName("canvas");//得到容器对象
			windows.classList.add('window');//新模块添加类名，以继承CSS样式
			if(list.orGate===1){
				windows.setAttribute("id", "or");//设置新模块的ID
			} else {
				windows.setAttribute("id", "or" + (list.orGate-1));
			}
			windows.innerHTML="<img src='images/2.png'>";
			windows.appendChild(img);
			canvas[0].appendChild(windows);//添加新模块到容器里
    		instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    		var point=setPoint(windows);
    		setOperate(windows,img,point,"orGate");

			id[num] = windows.id;
			window.num++;

			
			console.log(id);
	});
	
}

function createnotGate(){
	$("#notGate").click(function(){
			list.notGate ++;
			var li = document.getElementById("notGate");
			list.notGate_flag++;//创建一个模块，数量加一
			var windows=document.createElement("div");//建立一个模块
			var img=document.createElement("img");
			img.classList.add('delete');
			img.src="images/delete.png";
            var canvas=document.getElementsByClassName("canvas");//得到容器对象
			windows.classList.add('window');//新模块添加类名，以继承CSS样式
			if(list.notGate===1){
				windows.setAttribute("id", "not");//设置新模块的ID
			} else {
				windows.setAttribute("id", "not" + (list.notGate-1));
			}
			windows.innerHTML="<img src='images/3.png'>";
			windows.appendChild(img);
			canvas[0].appendChild(windows);//添加新模块到容器里
    		instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    		var point=setPoint(windows);
    		setOperate(windows,img,point,"notGate");

			id[num] = windows.id;
			window.num++;

			
			console.log(id);
	});
	
}

function createDelay(){
	$("#delay").click(function(){
			list.delay ++;
			var li = document.getElementById("delay");
			list.delay_flag++;//创建一个模块，数量加一
			var windows=document.createElement("div");//建立一个模块
			var img=document.createElement("img");
			img.classList.add('delete');
			img.src="images/delete.png";
            var canvas=document.getElementsByClassName("canvas");//得到容器对象
			windows.classList.add('window');//新模块添加类名，以继承CSS样式
			windows.setAttribute("id", "delay"+list.delay);//设置新模块的ID
			windows.innerHTML="<img src='images/4.png'>";
			windows.appendChild(img);
			canvas[0].appendChild(windows);//添加新模块到容器里
    		instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能

    		setLogo(windows);
			setWindow(windows);

    		var point=setPoint(windows);
    		setOperate(windows,img,point,"delay");

			id[num] = windows.id;
			window.num++;

			
			
			console.log(id);
	});
	
}


function createlight(){

	list.light_flag ++;
	var li = document.getElementById("light");
	li.classList.add("stop");			
	if(list.light_flag > 1){
		return false;
	}
	list.light++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_house"/*+list.light*/);//设置新模块的ID
	windows.innerHTML="<img src='images/function_bulb.png'>";
    windows.style.left = "908px"; 
    windows.style.top = "145px";
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"light");

	id[num] = windows.id;
	window.num++;

	
	
	//arr[0].id = "dht106";
	//arr[1].id = "switcher";
	//arr[2].id = "switch103";
	console.log(id);

	
}
function createAlarm(){

	var li = document.getElementById("alarm");
	li.classList.add("stop");			
	
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_fruit_A");//设置新模块的ID
	windows.innerHTML="<img src='images/alarm.png'>";
    windows.style.left = '124px';
    windows.style.top = '147px';
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"Alarm");

	id[num] = windows.id;
	window.num++;

	console.log(id);
	
}

function createBuzzer(){
    var windows=document.createElement("div");//建立一个模块
    var img=document.createElement("img");
    img.classList.add('delete');
    img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
    windows.classList.add('window');//新模块添加类名，以继承CSS样式
    windows.setAttribute("id", "c_sound");//设置新模块的ID
    windows.innerHTML="<img src='images/buzzer.png'>";
    windows.style.left = '902px';
    windows.style.top = '16px';
    windows.appendChild(img);
    canvas[0].appendChild(windows);//添加新模块到容器里
    instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    var point=setPoint(windows);
    setOperate(windows,img,point,"Buzzer");
}
function createpump(){

	list.pump_flag ++;
	var li = document.getElementById("pump");
	li.classList.add("stop");			
	if(list.pump_flag > 1){
		return false;
	}
	list.pump++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_waterpump");//设置新模块的ID
	windows.innerHTML="<img src='images/function_waterpump.png'>";
    windows.style.left = '1046px';
    windows.style.top = '487px';
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"pump");

	id[num] = windows.id;
	window.num++;

	
	console.log(id);

	
}
function createrelay101(){
	list.relay101_flag ++;
	var li = document.getElementById("relay101");
	li.classList.add("stop");			
	if(list.relay101_flag > 1){
		return false;
	}
	list.relay101++;//创建一个模块，数量加一
	var windows=document.createElement("div");//建立一个模块
	var img=document.createElement("img");
	img.classList.add('delete');
	img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
	windows.classList.add('window');//新模块添加类名，以继承CSS样式
	windows.setAttribute("id", "c_motor_up");//设置新模块的ID
	windows.innerHTML="<img src='images/up.png'>";
    windows.style.left = '229px';
    windows.style.top = '386px';
	windows.appendChild(img);
	canvas[0].appendChild(windows);//添加新模块到容器里
	instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
	var point=setPoint(windows);
	setOperate(windows,img,point,"relay101");
}
function createrelay102(){

    var li = document.getElementById("relay102");
    li.classList.add("stop");           
    if(list.relay102_flag > 1){
        return false;
    }
    list.relay102++;//创建一个模块，数量加一
    var windows=document.createElement("div");//建立一个模块
    var img=document.createElement("img");
    img.classList.add('delete');
    img.src="images/delete.png";
    var canvas=document.getElementsByClassName("canvas");//得到容器对象
    windows.classList.add('window');//新模块添加类名，以继承CSS样式
    windows.setAttribute("id", "c_motor_down");//设置新模块的ID
    windows.innerHTML="<img src='images/down.png'>";
    windows.style.left = '407px';
    windows.style.top = '386px';
    windows.appendChild(img);
    canvas[0].appendChild(windows);//添加新模块到容器里
    instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    var point=setPoint(windows);
    setOperate(windows,img,point,"relay101");
}

function createrelay106(){
	$("#relay106").click(function(){
			list.relay106_flag ++;
			var li = document.getElementById("relay106");
			li.classList.add("stop");			
			if(list.relay106_flag > 1){
				return false;
			}
			list.relay106++;//创建一个模块，数量加一
			var windows=document.createElement("div");//建立一个模块
			var img=document.createElement("img");
			img.classList.add('delete');
			img.src="images/delete.png";
            var canvas=document.getElementsByClassName("canvas");//得到容器对象
			windows.classList.add('window');//新模块添加类名，以继承CSS样式
			windows.setAttribute("id", "relay106"+list.relay106);//设置新模块的ID
			windows.innerHTML="<img src='images/function_switch.png'>";
			windows.appendChild(img);
			canvas[0].appendChild(windows);//添加新模块到容器里
    		instance.draggable(windows,{containment:"parent"});//设置模块可以拖动的范围，并使能
    		var point=setPoint(windows);
    		setOperate(windows,img,point,"relay106");

			id[num] = windows.id;
			window.num++;

			
			// for(var i = 0; i < devices.length; i++){
			// 	window.arr[i]={
			// 		"id":"",
			// 		"next":"",
			// 		"last":"",
			// 		"threhold":""
			// 	};
			// 	window.arr[i].id = devices[i].id;
			// 	if(arr[i].id.indexOf("humidity"||"temp"||"illumination"||"soilMoisture"||"waterDepth")>=0){
			// 		arr[i].threhold = "";
			// 	}	
			// }
			
			console.log(id);
	});
	
}


//运行操作
//var jsonarr="";
function submit(){
	$("#submit").click(function(){
		//给后端适应的json格式
		
		var load = document.getElementById("loading");
		var load1 = document.getElementById("loading1");

		
  //       var a = [[0,1],[0,0]];
		
		// var id = ["c_smoke1:0", "c_fruit_A"];
		
		// var agent = ["c_smoke1","c_fruit_A"];

        console.log(b);
        console.log(array);
        console.log(agent);
		$.get(
	        'http://192.168.12.1:36666/controller/clearAgent/', 
	        function(data){
	        	if(data == "success"){
	        		console.log("clear agent done");
	        		load.style.display = "block";
	        		$.post(
				        'http://192.168.12.1:36666/controller/addagent/', 
				        {
				            Agents : JSON.stringify(agent) 
				        },
				        function(data1) {
				        	if(data1 == "success"){
				        		console.log("add agent done");
				        		load.style.display = "none";
				        		load1.style.display = "block";
				        		$.post(
							        'http://192.168.12.1:36666/controller/add/', 
							        {
							            task : JSON.stringify(b),
							            devices : JSON.stringify(array)
							        },
							        function(data2) {
							            console.log("all done");
							            load1.style.display = "none";
							            alert("Success!")
							        }
						        );
				        	}
				            
				        }
			        );

	        	}
	        }
        );
        
	});
	
}

$("#confirmDe").click(function(){
	for( var i = 0; i < devices.length; i++ ){
		a[i] = [];
		for( var j = 0; j < devices.length; j++ ){
			a[i][j] = 0;
		}
	}
	var update = document.getElementById("rtUpdate");
	update.style.display = "block";
	console.log(a);
	console.log(id);
});

function create(){
	createhumidity1();
	createtemp1();
	createtemp2();
	createsoilMoisture();
    createsoilMoisture1();
	createwaterDepth();
    createwGM();
	createandGate();
	createorGate();
	createnotGate();
	createDelay();
	createlight();
    createAlarm();
    createBuzzer();
	createpump();
	createrelay101();
	createrelay102();
	createrelay106();
	submit();
}


//生成矩阵描述关系部分
var a = [[0,0],[0,0]];//连接时用的关系矩阵
var b = [[0,0],[0,0]];//等待发送的关系矩阵
let list_set = new Set();//用于存放有连接线的设备
var array = [];
var devices = document.getElementsByClassName("window");
$(function(){
	create();
	var source = [];
	var target = [];
	
	//绑定连接事件
	instance.bind("connection",function(info){
        console.log("处理前的b");
        console.log(window.b);
        list_set.add(info.sourceId);
        list_set.add(info.targetId)
        console.log("处在连接中的设备");
        console.log(list_set);

        //把set转换为数组，并找到起始连接设备和末端设备在矩阵中的位置
        window.agent = Array.from(list_set);
        array = Array.from(list_set);
        var start = array.indexOf(info.sourceId);
        var end   = array.indexOf(info.targetId);
        
        /*
            新增表示两个设备连接关系的矩阵
        */
        for( let i = 0; i < list_set.size; i++ ){
            a[i] = new Array();
            for( let j = 0; j < list_set.size; j++ ){
                a[i][j] = 0;
            }
        }
        a[start][end] = 1;
        // for(let i = 0; i < list_set.size;i++){
        //     a[list_set.size-1][i] = 0;
        // }
        
        console.log("处理后的a");
        console.log(a);
        var d = [];
        console.log("a的长度"+a.length);
        console.log("b的长度"+b.length);

        if(a.length-b.length==1){
            window.b.push([]);
            for( let i = 0; i < a.length; i++ ){
                d[i] = [];
                for( let j = 0; j < a.length; j++ ){
                    d[i][j] = b[i][j] || a[i][j];
                }
            }
            window.b = d;
            console.log("d"+d);
        } else if(a.length-b.length==2){
            window.b.push([]);
            window.b.push([]);
            for( let i = 0; i < a.length; i++ ){
                d[i] = [];
                for( let j = 0; j < a.length; j++ ){
                    d[i][j] = b[i][j] || a[i][j];
                }
            }
            window.b = d;
            console.log("d"+d);
        } else{
            if(b.length<3){
                window.b = [[0,1],[0,0]];
            } else{
                for( let i = 0; i < a.length; i++ ){
                    d[i] = [];
                    for( let j = 0; j < a.length; j++ ){
                        d[i][j] = b[i][j] || a[i][j];
                    }
                }
                window.b = d;
            }
        }
        console.log("处理后的b");
        console.log(b);
	});
})

//实时更新数据部分

setInterval("updateV()",1000);
function updateV(){
	//cluster1是温度，cluster3是湿度
    var health = ["cluster3"];
    var health1 = ["cluster1"];
	// $.post(
 //        //'http://192.168.12.245:4444/health_degree',
 //        'http://192.168.12.1:4444/value',
 //        {
 //            cluster_id : JSON.stringify(health)

 //        },
 //        function(data){
 //        	Hum = document.getElementById("humUpdate");
 //        	Hum.innerHTML = data;
 //        }
 //    );
 //    $.post(
 //        'http://192.168.12.1:4444/value',
 //        {
 //            cluster_id : JSON.stringify(health1)
 //        },
 //        function(data1){
 //        	Hum = document.getElementById("temUpdate");
 //        	Hum.innerHTML = data1;
 //        }
 //    );

};
