(this.webpackJsonpwarehouse=this.webpackJsonpwarehouse||[]).push([[0],{20:function(t,e,n){},21:function(t,e,n){},23:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n(1),r=n.n(c),i=n(7),s=n.n(i),o=(n(20),n(6)),u=n(13),l=n(8),d=n(9),h=n(14),f=n(12),j=(n(21),n(5)),b=n.n(j),p=n(10),O=n(11),v="https://bad-api-assignment.reaktor.com/",m={method:"GET",headers:{"Content-Type":"application/json","Cache-Control":"max-age=300, must-revalidate","x-force-error-mode":"all"}};function g(){return(g=Object(O.a)(b.a.mark((function t(e){var n,a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,caches.open("my-cache");case 2:return n=t.sent,t.next=5,n.match("".concat(v).concat(e));case 5:if(void 0===(a=t.sent)){t.next=10;break}return t.abrupt("return",a.json());case 10:return t.abrupt("return",fetch("".concat(v).concat(e),m).then((function(t){if(!t.ok)throw new Error("request failed");var a,c=Object(p.a)(t.headers.entries());try{for(c.s();!(a=c.n()).done;){var r=a.value;if("content-length"===r[0])return Number(r[1])<50?void 0:(n.add("".concat(v).concat(e)),setTimeout((function(){return n.delete("".concat(v).concat(e))}),3e5),t.json());console.log(r)}}catch(i){c.e(i)}finally{c.f()}})));case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var y=function(t){return g.apply(this,arguments)},x=n.p+"static/media/loading.b33cf617.png";var C=function(){return Object(a.jsx)("div",{children:Object(a.jsx)("img",{src:x,alt:"loading",className:"rotation"})})};var T=function(t){return Object(a.jsx)("div",{className:"scroll",children:t.isLoading?Object(a.jsx)(C,{}):Object(a.jsx)("div",{children:t.children})})};var S=function(t){var e=t.info;return Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("p",{className:"name",children:e.name}),Object(a.jsxs)("p",{children:["Price: ",e.price]}),Object(a.jsxs)("p",{children:["Colors: ",e.color.join("-")]}),Object(a.jsxs)("p",{children:["Mfr.: ",e.manufacturer]}),e.availability?Object(a.jsx)("p",{className:"OUT OF STOCK"===e.availability?"out":"LESS THAN 10"===e.availability?"less-than-10":"",children:e.availability}):Object(a.jsx)(C,{})]})};var L=function(t){var e=t.list;return Object(a.jsx)("div",{className:"grid",children:e.map((function(t,e){return Object(a.jsx)(S,{info:t},e)}))})};var w=function(t){var e=t.categories,n=t.categoryOnDisplay,c=t.switchCategory;return Object(a.jsx)("div",{className:"switcher flex-row",children:e.map((function(t,e){return Object(a.jsx)("button",{style:n===t?{border:"2px solid black"}:{},onClick:function(){return c(t)},children:t},e)}))})},A=["jackets","shirts","accessories"],N="shirts",k=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(l.a)(this,n),(t=e.call(this)).fetchProduct=function(e){var n=new Set;return y("products/".concat(e)).then((function(e){e.forEach((function(t){return n.add(t.manufacturer)})),t.setState({products:e,isLoading:!1,manufacturers:Object(u.a)(n)})})).catch(console.log)},t.fetchAvailability=function(e){y("availability/".concat(e)).then((function(n){for(var a=n.response,c=t.state.products,r=function(t){if(c[t].manufacturer!==e)return"continue";var n=a.find((function(e){return c[t].id===e.id.toLowerCase()}));if(void 0!==n){var r=n.DATAPAYLOAD.replace("<AVAILABILITY>\n  <INSTOCKVALUE>","");switch(r=r.replace("</INSTOCKVALUE>\n</AVAILABILITY>","")){case"OUTOFSTOCK":r="OUT OF STOCK";break;case"LESSTHAN10":r="LESS THAN 10";break;case"INSTOCK":r="IN STOCK"}c[t].availability=r}},i=0;i<c.length;i++)r(i);t.setState((function(t){return Object(o.a)(Object(o.a)({},t),{},{products:c,manufacturers:t.manufacturers.slice(1,t.manufacturers.length)})}))})).catch(console.log)},t.switchCategory=function(e){t.setState({categoryOnDisplay:e,isLoading:!0}),t.fetchProduct(e)},t.state={productCategories:A,categoryOnDisplay:N,products:[],manufacturers:[],isLoading:!0},t}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.fetchProduct(N)}},{key:"componentDidUpdate",value:function(){this.state.manufacturers.length&&this.fetchAvailability(this.state.manufacturers[0])}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(w,{categoryOnDisplay:this.state.categoryOnDisplay,categories:this.state.productCategories,switchCategory:this.switchCategory}),this.state.isLoading?Object(a.jsx)(C,{}):Object(a.jsx)(T,{children:Object(a.jsx)(L,{list:this.state.products})})]})}}]),n}(c.Component),I=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,i=e.getTTFB;n(t),a(t),c(t),r(t),i(t)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(k,{})}),document.getElementById("root")),I()}},[[23,1,2]]]);
//# sourceMappingURL=main.29e9e9ce.chunk.js.map