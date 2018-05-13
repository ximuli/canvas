var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
/*********************/
autoSetCanvas(canvas)

listenToUser(canvas)

var eraserEnabled = false
eraser.onclick = function () {
	eraserEnabled = true
	actions.className = 'actions x'
}
brush.onclick = function () {
	eraserEnabled = false
	actions.className = 'actions'
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

function drawCircle(x,y,radius) {
	context.beginPath()
	context.fillStyle = 'black'
	context.arc(x,y,radius,0,Math.PI*2)
	context.fill()
}

function drawLine(x1,y1,x2,y2) {
	context.beginPath()
	context.strokeStyle = 'black'
    context.moveTo(x1,y1)  //起点
    context.lineWidth = 5
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

  