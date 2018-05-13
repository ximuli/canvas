var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
//初始化线条粗细
var lineWidth = 5
/*********************/
//改变画笔颜色
red.onclick = function() {
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

green.onclick = function() {
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}

blue.onclick = function() {
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

black.onclick = function() {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

//改变画笔粗细
thin.onclick = function() {
    lineWidth = 5 
}

thick.onclick = function() {
    lineWidth = 8  
}

//清空画板
clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//下载图片
download.onclick = function() {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画板'
    a.target = '_blank'
    a.click()
}


//开始
autoSetCanvas(canvas)

listenToUser(canvas)

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
	eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}



function autoSetCanvas(canvas) {
	setCanvasSize()
	window.onresize = function () {
		setCanvasSize()
	}

	function setCanvasSize() {
		var pageWidth = document.documentElement.clientWidth
		var pageHeight = document.documentElement.clientHeight
		canvas.width = pageWidth
		canvas.height = pageHeight
	}
}


function drawLine(x1,y1,x2,y2) {
	context.beginPath()
    context.moveTo(x1,y1)  //起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)  //终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
	var using = false
	var point = {x: undefined, y: undefined}

  //特性检测：不去针对某个设备，就检测某个特性是否支持
  if (document.body.ontouchstart !== undefined ) {
    //触屏设备
    canvas.ontouchstart = function(aaa) {
	  	var x = aaa.touches[0].clientX
  		var y = aaa.touches[0].clientY

  		using = true
  		if (eraserEnabled) {
  			context.clearRect(x-5,y-5,10,10)
  		}
  		else {
  			point = {x: x,y: y}
  		}
	}

	canvas.ontouchmove = function(aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY

        if (!using) {return} 
            if(eraserEnabled) {
                context.clearRect(x-5,y-5,10,10)  
            }
            else {
                var newPoint = {x: x,y: y}
                drawLine(point.x,point.y,newPoint.x,newPoint.y)
                point = newPoint
            }
	}

	canvas.ontouchend = function() {
        using = false
	}
}
else {
  	//非触屏设备
  	canvas.onmousedown = function (aaa) {
  		var x = aaa.clientX
  		var y = aaa.clientY
  		using = true
  		if (eraserEnabled) {
  			context.clearRect(x-5,y-5,10,10)
  		}
  		else {
  			point = {x: x,y: y}
  		}
  	}

  	canvas.onmousemove = function (aaa) {
  		var x = aaa.clientX
  		var y = aaa.clientY
  		if (!using) {return} 
  			if(eraserEnabled) {
  				context.clearRect(x-5,y-5,10,10)  
  			}
  			else {
  				var newPoint = {x: x,y: y}
  				drawLine(point.x,point.y,newPoint.x,newPoint.y)
  				point = newPoint
  			}
  		}

  		canvas.onmouseup = function (aaa) {
  			using = false
  		}
  	}

  }

  