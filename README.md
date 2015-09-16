# LinkedRock
轻量级JS组件

LinkedRock比喻相连的石头。每一条比喻成一块石头，拖动排序相当于打乱这些“石头”的连接顺序。

最初版本（1.0.0）要实现页面元素拖动的功能。
后续准备添加：左滑显示删除按钮等功能。

# HOW TO USE?
1. 在HTML中新建一个DIV

  `<div class="moveDiv"></div>`
2. 在JS中新建一个LinkedRock对象，并传入新建的DIV和一些属性作为参数。
  
  ```
  var ss = new LinkedRock(".moveDiv",{
		text: [{
			name: "世界"
		},{
			name: "中国"
		},{
			name: "美国"
		},{
			name: "俄罗斯"
		}]
	});
	```
  
  注：第二个参数中，text属性必填且数组的元素个数至少有一个。
