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
			div.addEventListener("touchstart", this._touchStart);
			div.addEventListener("touchmove", this._touchMove);
			div.addEventListener("touchend", this._touchEnd);
		};
	}
	
	var dragObj, newBlank;

	LinkedRock.prototype = {
		constructor: LinkedRock,
		version: "1.0.0",
		getXY: function(e) {
			var a = new Array();
		    a.topSet = e.offsetTop; 
		    a.widthSet = e.offsetWidth;
		    a.heightSet = e.offsetHeight;
		    while(e = e.offsetParent){
			    a.topSet += e.offsetTop;
		    }
		    return a;
		},
		moveBlankDiv: function(e) {
			var blocks = document.querySelectorAll("#moveArea-div-child");
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i] == dragObj) continue;

				var a = this.getXY(blocks[i]);
			    var eClientY = e.touches[0].clientY;
			    
			    if ((eClientY > (a.topSet + a.heightSet * 0.5)) && (eClientY < (a.topSet + a.heightSet))) {
			    	//向上移动
		        blocks[i].parentNode.insertBefore(newBlank, blocks[i]);
			    } else if ((eClientY > a.topSet) && (eClientY <= (a.topSet + a.heightSet * 0.5))) {
			    	//向下移动
			      if (blocks.length - 1 === i)
						blocks[i].parentNode.appendChild(newBlank);
					else
						blocks[i].parentNode.insertBefore(newBlank, blocks[i + 1]);
			    } else 
			    	continue;
				return;
			};
		},
		_touchStart: function(e) {
			e = e || event;
			e.preventDefault();
			dragObj = this;
			var xy = LinkedRock.prototype.getXY(dragObj);
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
		},
		_touchMove: function(e) {
			e = e || event;
			e.preventDefault();
			if (!dragObj) return false;
			dragObj.style.top = (e.touches[0].clientY - dragObj.offsetHeight/2) + "px";
			LinkedRock.prototype.moveBlankDiv(e);
		},
		_touchEnd: function(e) {
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
	}
	return LinkedRock;

})(window, document);
