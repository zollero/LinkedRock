/**
 * LinkedRock  v1.0.0
 *
 */

"use strict";


var LinkedRock = (function (window, document) {

	/**
	 * @param {DOM element}
	 * @param {properties}
	 */
	LinkedRock = function (element, options) {
		this.moveArea = typeof element == "string" ? document.querySelector(element) : element;
		this.options = options;

		this.moveArea.style.position = "absolute";
		this.moveArea.style.width = "100%";
		this.moveArea.style.height = "100%";
		this.moveArea.style.left = "0";

		if (typeof(this.options.text) == "undefined" && this.options.text.length == 0) 
			throw new Error("The text must be not null!");

		/**
		 * Init the moving lines on the page
		 */
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
	}
	
	//The version
	LinkedRock.version = "1.0.0";

	var dragObj, newBlank;

	/**
	 * Define the event functions
	 */
	var _touchStart = LinkedRock._touchStart = function(e) {
		e = e || event;
		e.preventDefault();
		dragObj = this;
		var xy = getXY(dragObj);
		dragObj.style.position = "absolute";
		dragObj.style.top = xy.topSet + "px";
		dragObj.style.width = xy.widthSet + "px";
		dragObj.style.borderTop = "1px solid #E5E5E5";
		dragObj.style.borderColor = "#363C62";
		dragObj.style.opacity = "0.6";
		newBlank = document.createElement("div");
		newBlank.style.cssText = "width:" + xy.widthSet + "px;height:" + xy.heightSet+ "px;" + 
			"border-top:1px dashed #363C62;border-bottom:1px dashed #363C62";
		dragObj.parentNode.insertBefore(newBlank, dragObj);
		return false;
	}
	var _touchMove = LinkedRock._touchMove = function(e) {
		e = e || event;
		e.preventDefault();
		if (!dragObj) return false;
		dragObj.style.top = (e.touches[0].clientY - dragObj.offsetHeight/2) + "px";
		moveBlankDiv(e);
	}
	var _touchEnd = LinkedRock._touchEnd = function(e) {
		e = e || event;
		if (!dragObj) return false;
		dragObj.parentNode.insertBefore(dragObj, newBlank);
		dragObj.style.position = "";
		dragObj.style.borderTop = "";
		dragObj.style.borderColor = "#E5E5E5";
		dragObj.parentNode.removeChild(newBlank);
		dragObj.style.opacity = "1";
		dragObj = {};
	}

	/**
	 * Move the blank div accoring to the dragged div's position
	 * @param  {Event object}
	 * @return {null}
	 */
	var moveBlankDiv = LinkedRock.moveBlankDiv = function(e) {
		var blocks = document.querySelectorAll("#moveArea-div-child");
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i] == dragObj) continue;
			var moveMark = upOrDown(blocks[i], e);
			if (moveMark == 0) 
				continue;
			else if (moveMark == 1) 
				blocks[i].parentNode.insertBefore(newBlank, blocks[i]);
			else {
				if (blocks.length - 1 === i) 
					blocks[i].parentNode.appendChild(newBlank);
				else
					blocks[i].parentNode.insertBefore(newBlank, blocks[i + 1]);
			}
			return;
		};
	}

	/**
	 * Check the way of moving
	 * @param  {dragged object}
	 * @param  {event object}
	 * @return {moving direction}
	 */
	var upOrDown = LinkedRock.upOrDown = function(o, e) {
		var xy = getXY(o);
		var eClientY = e.touches[0].clientY;
		if ((eClientY > (xy.topSet + xy.heightSet * 0.5)) && (eClientY < (xy.topSet + xy.heightSet)) 
		    return 1; //UP
		else if ((eClientY > xy.topSet) && (eClientY <= (xy.topSet + xy.heightSet * 0.5))) 
		    return 2; //DOWN	
		else 
		    return 0; //NO MOVEING
	}
	
	/**
	 * Get the width,top,height of the dragged object
	 * @param  {event object}
	 * @return {array}
	 */
	var getXY = LinkedRock.getXY = function(e) {
		var a = new Array();
	    a.topSet = e.offsetTop; 
	    a.widthSet = e.offsetWidth;
	    a.heightSet = e.offsetHeight;
	    while(e = e.offsetParent){
		    a.topSet += e.offsetTop;
	    }
	    return a;
	}

	return LinkedRock;

})(window, document);
