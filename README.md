# LingJS
轻量级JS组件

最初版本（1.0.0）要实现页面元素拖动的功能。

# HOW TO USE?
1. 在HTML中新建一个DIV

  `<div class="moveDiv"></div>`
2. 在JS中新建一个Ling对象，并传入新建的DIV和一些属性作为参数。

  `var ss = new Ling(".moveDiv",{text:[{name: "世界"},{name: "中国"},{name: "美国"},{name: "俄罗斯"}]});`
  
  注：第二个参数中，text属性必填且数组的元素个数至少有一个。
