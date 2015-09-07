/**
 * !
 * Ling  框架文件
 *
 */


var Ling = (function (window, document) {

	/**
	 * Ling Object
	 */
	Ling = function (element, options) {
		this.moveArea = typeof element == "string" ? document.querySelector(element) : element;
		this.options = {
			text: [{
				name: "世界"
			},{
				name: "中国"
			},{
				name: "美国"
			},{
				name: "俄罗斯"
			}],
			numberOfLines: 5
		};

		this.moveArea.style.position = "absolute";
		this.moveArea.style.width = "100%";
		this.moveArea.style.height = "100%";
		this.moveArea.style.left = "0";
		// document.body.style.overflowX = "hidden";

		// 初始化页面中显示的拖动条数
		for (var i = 0; i < this.options.text.length; i++) {
			var div = document.createElement("div");
			div.id = "moveArea-div-child";
			div.innerHTML = this.options.text[i].name;
			div.style.cssText = "position:relative;margin:0;padding:0;left:0;width:100%;height:50px;line-height:50px;";
			div.style.borderBottom = "1px solid #E5E5E5";
			this.moveArea.appendChild(div);
			div.addEventListener("touchstart", _touchStart);
			div.addEventListener("touchmove", _touchMove);
			div.addEventListener("touchend", _touchEnd);
		};




		// return true;
	}
	
	//版本
	Ling.version = "1.0.0";

	//配置
	Ling.config = {

	}

	var dragObj = Ling.dragObj;

	var _touchStart = Ling._touchStart = function(e) {
		e = e || event;
		if (dragObj) return false;
		e.preventDefault();
		dragObj = this;
		var xy = getXY(dragObj);
		this.style.position = "absolute";
		this.style.top = xy.topSet + "px";
		this.style.width = xy.widthSet + "px";
		this.style.borderTop = "1px solid #E5E5E5";
		this.style.borderColor = "#363C62";
		this.style.opacity = "0.6";
		var newBlank = Ling.newBlank = document.createElement("div");
		newBlank.style.cssText = "width:" + xy.widthSet + "px;height:" + xy.heightSet+ "px;" + 
			"border-top:1px dashed #363C62;border-bottom:1px dashed #363C62";
		this.parentNode.insertBefore(newBlank, this);
		return false;
	}
	var _touchMove = Ling._touchMove = function(e) {
		e = e || event;
		if (!dragObj) return false;
		dragObj.style.top = (e.touches[0].clientY - dragObj.offsetHeight/2) + "px";
		moveBlankDiv(e);
		// console.log(e);
	}
	var _touchEnd = Ling._touchEnd = function(e) {
		e = e || event;
		if (!dragObj) return false;
		this.parentNode.insertBefore(dragObj, Ling.newBlank);
		this.style.position = "";
		this.style.borderTop = "";
		this.style.borderColor = "#E5E5E5";
		this.parentNode.removeChild(Ling.newBlank);
		this.style.opacity = "1";
		drag0bj = Ling.dragObj = {};
	}

	var moveBlankDiv = Ling.moveBlankDiv = function(e) {
		var blocks = document.querySelectorAll("#moveArea-div-child");
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i] == dragObj) continue;
			var moveMark = upOrDown(blocks[i], e);
			if (moveMark == 0)
				continue;
			else if (moveMark == 1)
				blocks[i].parentNode.insertBefore(Ling.newBlank, blocks[i]);
			else {
				if (blocks[i].nextElementSibling == null || 
					blocks[i].nextSiling == null)
					blocks[i].parentNode.appendChild(Ling.newBlank);
				else
					blocks[i].parentNode.insertBefore(Ling.newBlank, blocks[i]);
			}
			return;
		};
	}

	var upOrDown = Ling.upOrDown = function(o, e) {
		var xy = getXY(o);
		if (e.touches[0].clientY > xy.topSet && e.touches[0].clientY < (xy.topSet + xy.heightSet)) {
		    if (e.touches[0].clientY < (xy.topSet + xy.heightSet / 2))
		        return 1; //UP
		    else
		        return 2; //DOWN
		} else
		    return 0; //NO MOVEING
	}

	var getXY = Ling.getXY = function(e) {
		var a = new Array();
		// var pTop = e.offsetParent.offsetTop;//父级标签的top值
	    var t = e.offsetTop; //e距离上方或上层控件的位置top值
	    var w = e.offsetWidth;
	    var h = e.offsetHeight;
	    while(e = e.offsetParent){
		    t += e.offsetTop;
	    }
	    //indicatorDialog元素滚动时，距离弹出页面的top值会改变，
	    //这样可以防止计算li元素top值的偏差
	    // var d3 = querySelectorFn(".indicatorDialog").scrollTop;
	    a.topSet = t;
	    a.widthSet = w;
	    a.heightSet = h;
	    // a.isTop = t;
	    return a;
	}


	// Ling.prototype = {
	// 	init: function(){
		
	// 	},
	// 	move: function(){
			
	// 	},
	// 	destory: function(){
			
	// 	}
	// };

	return Ling;

})(window, document);
