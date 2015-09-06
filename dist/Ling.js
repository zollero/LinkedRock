/**
 * !
 * Ling  框架文件
 *
 */


var Ling = (function (window, document) {

	// console.log(window);
	// console.log(document);
	
	

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
		this.moveArea.style.margin = "100%";
		// this.moveArea.style.left = "0";
		// document.body.style.overflowX = "hidden";

		// 初始化页面中显示的拖动条数
		for (var i = 0; i < this.options.text.length; i++) {
			var div = document.createElement("div");
			div.id = "moveArea-div-child";
			div.innerHTML = this.options.text[i].name;
			div.style.cssText = "position:relative;margin:0;padding:0;left:0;width:100%;height:50px;line-height:50px;";
			div.style.borderBottom = "1px solid #E5E5E5";
			this.moveArea.appendChild(div);
		};



		// return true;
	}
	
	//版本
	Ling.version = "1.0.0";

	//配置
	Ling.config = {

	}


	Ling.prototype = {
		init: function(){
		
		},
		move: function(){
			
		},
		destory: function(){
			
		}
	};

	return Ling;

})(window, document);
