(this["webpackJsonpbezier-visualisation"]=this["webpackJsonpbezier-visualisation"]||[]).push([[0],{24:function(e,t,a){},25:function(e,t,a){},26:function(e,t){},28:function(e,t){},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var c=a(10),n=a.n(c),i=a(17),r=a.n(i),b=(a(24),a(25),a(8)),o=a(5),j=a(9),O=a(0),u=a(15),l=a(11),s=a(7),d=a(6),h=a(1),f=a(2),p=a(3),v=a.n(p),w=a(4),P=Object(f.a)("ref"),y=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return e=t.call.apply(t,[this].concat(i)),Object.defineProperty(Object(O.a)(e),P,{writable:!0,value:Object(c.createRef)()}),e.scope=void 0,e.setupIsComplete=!1,e.componentDidMount=function(){e.setup()},e.componentDidUpdate=function(){e.setup()},e.renderChildren=function(){return null},e.render=function(){return Object(w.jsxs)("div",{className:"showcase",children:[e.renderChildren(),Object(w.jsx)("canvas",{ref:Object(h.a)(Object(O.a)(e),P)[P],onContextMenu:function(e){return e.preventDefault()}})]})},e}return Object(j.a)(a,[{key:"setup",value:function(){!this.setupIsComplete&&Object(h.a)(this,P)[P].current&&(this.scope=new v.a.PaperScope,this.scope.setup(Object(h.a)(this,P)[P].current),this.setupIsComplete=!0)}}]),a}(n.a.Component),C=Object(f.a)("basePoints"),g=Object(f.a)("eventEmitter"),m=Object(f.a)("update"),k=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e){var c;return Object(o.a)(this,a),c=t.call(this),Object.defineProperty(Object(O.a)(c),C,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(c),g,{writable:!0,value:new EventTarget}),Object.defineProperty(Object(O.a)(c),m,{writable:!0,value:function(){c.removeChildren(),c.addChildren(Object(h.a)(Object(O.a)(c),C)[C].map((function(e,t){var a=new v.a.Path.Circle(e,5);a.fillColor=new v.a.Color("red"),a.onMouseDrag=function(e){e.stop(),c.points=Object(h.a)(Object(O.a)(c),C)[C].map((function(a,c){return c===t?a.clone().add(e.delta):a}))},a.onClick=function(e){if(2===e.event.button){e.stop();var a=new Event("removePoint");a.index=t,Object(h.a)(Object(O.a)(c),g)[g].dispatchEvent(a),c.points=Object(h.a)(Object(O.a)(c),C)[C].filter((function(e,a){return a!==t}))}};var n="default";return a.onMouseEnter=function(){var e,t=null===(e=a.project.view)||void 0===e?void 0:e.element;t&&(n=t.style.cursor,t.style.cursor="pointer")},a.onMouseLeave=function(){var e,t=null===(e=a.project.view)||void 0===e?void 0:e.element;t&&(t.style.cursor=n)},a})))}}),Object(h.a)(Object(O.a)(c),C)[C]=e.map((function(e){return e.clone()})),Object(h.a)(Object(O.a)(c),m)[m](),c}return Object(j.a)(a,[{key:"addEventListener",value:function(){var e;(e=Object(h.a)(this,g)[g]).addEventListener.apply(e,arguments)}},{key:"removeEventListener",value:function(){var e;(e=Object(h.a)(this,g)[g]).removeEventListener.apply(e,arguments)}},{key:"points",get:function(){return Object(h.a)(this,C)[C]},set:function(e){Object(h.a)(this,C)[C]=e.map((function(e){return e.clone()})),Object(h.a)(this,m)[m](),Object(h.a)(this,g)[g].dispatchEvent(new Event("update"))}},{key:"length",get:function(){return this.points.length}}]),a}(v.a.Group),x=a(19),E=function(e){if(e<0||e%1!==0)throw new Error("Invalid value n = ".concat(e," for computing n!"));for(var t=1,a=1;a<=e;a++)t*=a;return t},M=a(18),A=a.n(M),_=Object(f.a)("minX"),S=Object(f.a)("maxX"),L=Object(f.a)("stepSize"),N=Object(f.a)("config"),V=Object(f.a)("funcs"),G=Object(f.a)("draw"),I=Object(f.a)("drawCoordinateSystem"),B=Object(f.a)("drawGraphs"),D=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e,c,n,i,r){var b;return Object(o.a)(this,a),b=t.call(this),Object.defineProperty(Object(O.a)(b),_,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(b),S,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(b),L,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(b),N,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(b),V,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(b),G,{writable:!0,value:function(){b.removeChildren(),Object(h.a)(Object(O.a)(b),B)[B](),Object(h.a)(Object(O.a)(b),I)[I]()}}),Object.defineProperty(Object(O.a)(b),I,{writable:!0,value:function(){var e,t,a=new v.a.Group;a.addChild(new v.a.Path.Line(new v.a.Point(0,0),new v.a.Point(Object(h.a)(Object(O.a)(b),S)[S],0))),a.addChild(new v.a.Path.Line(new v.a.Point(0,-.1),new v.a.Point(0,1.1)));var c=null!==(e=null===(t=Object(h.a)(Object(O.a)(b),N)[N])||void 0===t?void 0:t.xScaleStepSize)&&void 0!==e?e:1;a.addChildren(Array(Object(h.a)(Object(O.a)(b),S)[S]/c+1).fill(1).map((function(e,t){var a=Object(h.a)(Object(O.a)(b),_)[_]+c*t;return new v.a.Path.Line(new v.a.Point(a,-.1),new v.a.Point(a,.1))}))),a.strokeColor=new v.a.Color("grey"),b.addChild(a)}}),Object.defineProperty(Object(O.a)(b),B,{writable:!0,value:function(){var e=A()({count:Object(h.a)(Object(O.a)(b),V)[V].length,seed:"abcd"}).map((function(e){return new v.a.Color(e)}));Object(h.a)(Object(O.a)(b),V)[V].forEach((function(t,a){var c=Array(Math.floor((Object(h.a)(Object(O.a)(b),S)[S]-Object(h.a)(Object(O.a)(b),_)[_])/Object(h.a)(Object(O.a)(b),L)[L])+1).fill(1).map((function(e,t){return Object(h.a)(Object(O.a)(b),_)[_]+t*Object(h.a)(Object(O.a)(b),L)[L]})).map((function(e){return new v.a.Point(e,t(e))})).filter((function(e){return!isNaN(e.x)&&!isNaN(e.y)})),n=new v.a.Path(c);n.closed=!1,n.strokeColor=e[a],n.strokeWidth=2,b.addChild(n)}))}}),Object(h.a)(Object(O.a)(b),_)[_]=e,Object(h.a)(Object(O.a)(b),S)[S]=c,Object(h.a)(Object(O.a)(b),L)[L]=n,Object(h.a)(Object(O.a)(b),V)[V]=i,Object(h.a)(Object(O.a)(b),N)[N]=r,Object(h.a)(Object(O.a)(b),G)[G](),b}return a}(v.a.Group),z=function(e,t,a){var c;try{c=function(e,t){return E(e)/(E(t)*E(e-t))}(e,t)}catch(n){c=0}return c*Math.pow(a,t)*Math.pow(1-a,e-t)},T=Object(f.a)("basePoints"),F=Object(f.a)("curvePath"),U=Object(f.a)("basePointVisualisation"),W=Object(f.a)("config"),J=Object(f.a)("plot"),R=Object(f.a)("plotBernsteinCurves"),X=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e,c){var n;return Object(o.a)(this,a),n=t.call(this),Object.defineProperty(Object(O.a)(n),T,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(n),F,{writable:!0,value:new v.a.Path}),Object.defineProperty(Object(O.a)(n),U,{writable:!0,value:new v.a.Group}),Object.defineProperty(Object(O.a)(n),W,{writable:!0,value:{}}),Object.defineProperty(Object(O.a)(n),J,{writable:!0,value:void 0}),n.drawCurve=function(){Object(h.a)(Object(O.a)(n),F)[F].removeSegments(),Object(h.a)(Object(O.a)(n),F)[F].strokeColor=new v.a.Color("black");var e=Array(51).fill(1).map((function(e,t){return t/50})).map((function(e){return function(e,t){for(var a=new v.a.Point(0,0),c=t.length-1,n=0;n<=c;n++)a=a.add(t[n].clone().multiply(z(c,n,e)));return a}(e,n.basePoints)}));Object(x.a)(e).slice(0).forEach((function(e){return Object(h.a)(Object(O.a)(n),F)[F].add(e)})),Object(h.a)(Object(O.a)(n),R)[R]()},Object.defineProperty(Object(O.a)(n),R,{writable:!0,value:function(){var e;if(null===(e=Object(h.a)(Object(O.a)(n),J)[J])||void 0===e||e.remove(),Object(h.a)(Object(O.a)(n),W)[W].plotBernsteinCurves){var t=n.basePoints.map((function(e,t){return function(e){return z(n.degree,t,e)}})),a=function(e){return t.reduce((function(t,a){return t+a(e)}),0)},c=new D(0,1,.05,[a,function(e){return Math.abs(1-a(e))<=.001?1:0}].concat(Object(b.a)(t)),{xScaleStepSize:.1});c.scale(500,150),c.scale(1,-1),c.translate(new v.a.Point(1e3,100)),n.addChild(c),Object(h.a)(Object(O.a)(n),J)[J]=c}}}),Object(h.a)(Object(O.a)(n),T)[T]=e,n.addChild(Object(h.a)(Object(O.a)(n),F)[F]),n.addChild(Object(h.a)(Object(O.a)(n),U)[U]),c&&(Object(h.a)(Object(O.a)(n),W)[W]=c),e instanceof k&&e.addEventListener("update",n.drawCurve),n.drawCurve(),n}return Object(j.a)(a,[{key:"degree",get:function(){return this.basePoints.length-1}},{key:"basePoints",get:function(){return Object(h.a)(this,T)[T]instanceof k?Object(h.a)(this,T)[T].points:Object(h.a)(this,T)[T]},set:function(e){Object(h.a)(this,T)[T]instanceof k?Object(h.a)(this,T)[T].points=e:(Object(h.a)(this,T)[T]=e,this.drawCurve())}}]),a}(v.a.Group),q=Object(f.a)("basePoints"),H=Object(f.a)("curve"),K=Object(f.a)("onCanvasClick"),Q=Object(f.a)("onChangeAddPointOnClick"),Y=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(o.a)(this,a);for(var c=arguments.length,n=new Array(c),i=0;i<c;i++)n[i]=arguments[i];return e=t.call.apply(t,[this].concat(n)),Object.defineProperty(Object(O.a)(e),q,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(e),H,{writable:!0,value:void 0}),e.state={shouldAddPointOnClick:!1},Object.defineProperty(Object(O.a)(e),K,{writable:!0,value:function(t){e.state.shouldAddPointOnClick&&Object(h.a)(Object(O.a)(e),q)[q]&&0===t.event.button&&(Object(h.a)(Object(O.a)(e),q)[q].points=[].concat(Object(b.a)(Object(h.a)(Object(O.a)(e),q)[q].points),[t.point]))}}),Object.defineProperty(Object(O.a)(e),Q,{writable:!0,value:function(t){e.setState({shouldAddPointOnClick:t.target.checked})}}),e.renderChildren=function(){return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h2",{children:"B\xe9zier Curves"}),Object(w.jsxs)("label",{children:[Object(w.jsx)("input",{type:"checkbox",checked:e.state.shouldAddPointOnClick,onChange:Object(h.a)(Object(O.a)(e),Q)[Q]}),"Add point on checked"]})]})},e}return Object(j.a)(a,[{key:"setup",value:function(){this.setupIsComplete||(Object(u.a)(Object(l.a)(a.prototype),"setup",this).call(this),this.scope.view.onClick=Object(h.a)(this,K)[K],Object(h.a)(this,q)[q]=new k([new this.scope.Point(200,200),new this.scope.Point(100,100),new this.scope.Point(300,100),new this.scope.Point(400,200)]),Object(h.a)(this,H)[H]=new X(Object(h.a)(this,q)[q],{plotBernsteinCurves:!0}))}}]),a}(y),Z=function e(t,a,c,n){var i=function(e){return isNaN(e)||Math.abs(e)===1/0?0:e};if(n[t]<=c&&c<n[t+a+1]){if(0===a)return n[t]<=c&&c<n[t+1]?1:0;var r=(c-n[t])/(n[t+a]-n[t]),b=(n[t+a+1]-c)/(n[t+a+1]-n[t+1]),o=e(t,a-1,c,n),j=e(t+1,a-1,c,n),O=i(r)*o+i(b)*j;return i(O)}return 0},$=function(e,t,a,c){return c.reduce((function(c,n,i){return c.add(n.clone().multiply(Z(i,t,e,a)))}),new v.a.Point(0,0))},ee=Object(f.a)("degree"),te=Object(f.a)("u_i"),ae=Object(f.a)("basePoints"),ce=Object(f.a)("curvePath"),ne=Object(f.a)("drawPlot"),ie=Object(f.a)("drawCurve"),re=Object(f.a)("drawCurvesToOrigin"),be=Object(f.a)("drawGuidancePoints"),oe=Object(f.a)("drawGuidanceLines"),je=Object(f.a)("onPointWasRemoved"),Oe=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e,c,n){var i;if(Object(o.a)(this,a),i=t.call(this),Object.defineProperty(Object(O.a)(i),ee,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(i),te,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(i),ae,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(i),ce,{writable:!0,value:new v.a.Path}),Object.defineProperty(Object(O.a)(i),ne,{writable:!0,value:function(){var e=Object(h.a)(Object(O.a)(i),te)[te].map((function(e,t){return function(e){return Z(t,Object(h.a)(Object(O.a)(i),ee)[ee],e,Object(h.a)(Object(O.a)(i),te)[te])}})),t=function(t){return e.reduce((function(e,a){return e+a(t)}),0)},a=new D(Object(h.a)(Object(O.a)(i),te)[te][0],Object(h.a)(Object(O.a)(i),te)[te][Object(h.a)(Object(O.a)(i),te)[te].length-1],.05,[t,function(e){return Math.abs(1-t(e))<=.001?1:0}].concat(Object(b.a)(e)));a.scale(60),a.scale(1,-1),a.translate(new v.a.Point(1e3,100)),i.addChild(a)}}),Object.defineProperty(Object(O.a)(i),ie,{writable:!0,value:function(){i.removeChildren(),Object(h.a)(Object(O.a)(i),ne)[ne](),Object(h.a)(Object(O.a)(i),be)[be](),Object(h.a)(Object(O.a)(i),re)[re](),Object(h.a)(Object(O.a)(i),ce)[ce].strokeColor=new v.a.Color("black"),Object(h.a)(Object(O.a)(i),ce)[ce].removeSegments();var e=Math.min.apply(Math,Object(b.a)(i.usableUValues)),t=Math.max.apply(Math,Object(b.a)(i.usableUValues));Array(100).fill(1).map((function(a,c,n){return e+(t-e)*c/n.length})).map((function(e){return $(e,Object(h.a)(Object(O.a)(i),ee)[ee],Object(h.a)(Object(O.a)(i),te)[te],Object(h.a)(Object(O.a)(i),ae)[ae].points)})).forEach((function(e){return Object(h.a)(Object(O.a)(i),ce)[ce].add(e)})),i.addChild(Object(h.a)(Object(O.a)(i),ce)[ce])}}),Object.defineProperty(Object(O.a)(i),re,{writable:!0,value:function(){[i.u_i.slice(0,Object(h.a)(Object(O.a)(i),ee)[ee]+1),Object(b.a)(i.u_i.slice(i.u_i.length-i.degree-1,i.u_i.length))].forEach((function(e){var t=new v.a.Path;t.strokeColor=new v.a.Color("rgba(0, 0, 0, 0.3)");var a=Math.min.apply(Math,Object(b.a)(e)),c=Math.max.apply(Math,Object(b.a)(e));Array(100).fill(1).map((function(e,t,n){return a+(c-a)*t/n.length})).map((function(e){return $(e,Object(h.a)(Object(O.a)(i),ee)[ee],Object(h.a)(Object(O.a)(i),te)[te],Object(h.a)(Object(O.a)(i),ae)[ae].points)})).forEach((function(e){return t.add(e)})),i.addChild(t)}))}}),Object.defineProperty(Object(O.a)(i),be,{writable:!0,value:function(){var e=Object(h.a)(Object(O.a)(i),te)[te].map((function(e){return $(e,Object(h.a)(Object(O.a)(i),ee)[ee],Object(h.a)(Object(O.a)(i),te)[te],Object(h.a)(Object(O.a)(i),ae)[ae].points)}));i.addChildren(e.map((function(e,t){var a=new v.a.Group,c=new v.a.Path.Circle(e,3);c.fillColor=new v.a.Color("green");var n=new v.a.PointText(e);return n.content="u".concat(t,"; t = ").concat(Object(h.a)(Object(O.a)(i),te)[te][t]),a.addChild(c),a.addChild(n),a})))}}),Object.defineProperty(Object(O.a)(i),oe,{writable:!0,value:function(){var e=new v.a.Path;e.add(new v.a.Point(0,0)),e.strokeColor=new v.a.Color("rgba(0, 0, 0, 0.3)"),i.u_i.slice(0,i.degree).forEach((function(t){return e.add($(t,i.degree,i.u_i,Object(h.a)(Object(O.a)(i),ae)[ae].points))})),Object(h.a)(Object(O.a)(i),ae)[ae].points.forEach((function(t,a){e.add(t),e.add($(i.u_i[i.degree+a],i.degree,i.u_i,Object(h.a)(Object(O.a)(i),ae)[ae].points))})),e.closePath(),i.addChild(e)}}),Object.defineProperty(Object(O.a)(i),je,{writable:!0,value:function(e){Object(h.a)(Object(O.a)(i),te)[te]=i.u_i.filter((function(t,a){return a!==e})),i.redraw()}}),Object(h.a)(Object(O.a)(i),ee)[ee]=e,Object(h.a)(Object(O.a)(i),te)[te]=c,Object(h.a)(Object(O.a)(i),ae)[ae]=n,Object(h.a)(Object(O.a)(i),ae)[ae].length<e+1)throw new Error("too little points");if(Object(h.a)(Object(O.a)(i),te)[te].length!==Object(h.a)(Object(O.a)(i),ae)[ae].length+Object(h.a)(Object(O.a)(i),ee)[ee]+1)throw new Error("Wrong amount of u_i; expected ".concat(Object(h.a)(Object(O.a)(i),ae)[ae].length+Object(h.a)(Object(O.a)(i),ee)[ee]+1," but got ").concat(Object(h.a)(Object(O.a)(i),te)[te].length));return Object(h.a)(Object(O.a)(i),ae)[ae].addEventListener("update",Object(h.a)(Object(O.a)(i),ie)[ie]),Object(h.a)(Object(O.a)(i),ae)[ae].addEventListener("removePoint",(function(e){void 0!==e.index&&Object(h.a)(Object(O.a)(i),je)[je](e.index)})),Object(h.a)(Object(O.a)(i),ie)[ie](),i}return Object(j.a)(a,[{key:"usableUValues",get:function(){return Object(h.a)(this,te)[te].slice(Object(h.a)(this,ee)[ee],-Object(h.a)(this,ee)[ee])}},{key:"redraw",value:function(){Object(h.a)(this,ie)[ie]()}},{key:"u_i",get:function(){return Object(h.a)(this,te)[te]},set:function(e){Object(h.a)(this,te)[te]=e}},{key:"degree",get:function(){return Object(h.a)(this,ee)[ee]},set:function(e){Object(h.a)(this,ee)[ee]=e}},{key:"addPoint",value:function(e){Object(h.a)(this,te)[te]=[].concat(Object(b.a)(this.u_i),[Math.max.apply(Math,Object(b.a)(this.u_i))+1]),Object(h.a)(this,ae)[ae].points=[].concat(Object(b.a)(Object(h.a)(this,ae)[ae].points),[e])}}]),a}(v.a.Group),ue=function(e,t){return Array(e+t+1).fill(1).map((function(e,t){return t}))},le=(a(31),Object(f.a)("basePoints")),se=Object(f.a)("bSpline"),de=Object(f.a)("onCanvasClick"),he=Object(f.a)("onChangeAddPointOnClick"),fe=Object(f.a)("onChangeDegree"),pe=Object(f.a)("onChangeBaseVectorValue"),ve=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(o.a)(this,a);for(var c=arguments.length,n=new Array(c),i=0;i<c;i++)n[i]=arguments[i];return e=t.call.apply(t,[this].concat(n)),Object.defineProperty(Object(O.a)(e),le,{writable:!0,value:void 0}),Object.defineProperty(Object(O.a)(e),se,{writable:!0,value:void 0}),e.state={shouldAddPointOnClick:!1,degree:2,baseVector:ue(2,5)},Object.defineProperty(Object(O.a)(e),de,{writable:!0,value:function(t){var a;e.state.shouldAddPointOnClick&&0===t.event.button&&(null===(a=Object(h.a)(Object(O.a)(e),se)[se])||void 0===a||a.addPoint(t.point))}}),Object.defineProperty(Object(O.a)(e),he,{writable:!0,value:function(t){e.setState({shouldAddPointOnClick:t.target.checked})}}),Object.defineProperty(Object(O.a)(e),fe,{writable:!0,value:function(t){var a=Math.max(1,parseInt(t.target.value));if(Object(h.a)(Object(O.a)(e),se)[se]&&Object(h.a)(Object(O.a)(e),le)[le]){Object(h.a)(Object(O.a)(e),se)[se].degree=a;var c=Object(h.a)(Object(O.a)(e),se)[se].u_i.length,n=Object(h.a)(Object(O.a)(e),le)[le].points.length+Object(h.a)(Object(O.a)(e),se)[se].degree+1;c<n&&(Object(h.a)(Object(O.a)(e),se)[se].u_i=Object(h.a)(Object(O.a)(e),se)[se].u_i.slice(0,n)),Object(h.a)(Object(O.a)(e),se)[se].redraw(),e.setState({degree:Object(h.a)(Object(O.a)(e),se)[se].degree,baseVector:Object(h.a)(Object(O.a)(e),se)[se].u_i})}}}),Object.defineProperty(Object(O.a)(e),pe,{writable:!0,value:function(t,a){var c=parseInt(a.target.value);if(Object(h.a)(Object(O.a)(e),se)[se]&&!Number.isNaN(c)){var n=Object(h.a)(Object(O.a)(e),se)[se].u_i.map((function(e,a){return a===t?c:e}));Object(h.a)(Object(O.a)(e),se)[se].u_i=n,Object(h.a)(Object(O.a)(e),se)[se].redraw(),e.setState({baseVector:n})}}}),e.renderChildren=function(){return Object(w.jsxs)("div",{className:"controls",children:[Object(w.jsx)("h2",{children:"B-Splines"}),Object(w.jsx)("p",{children:'Left-clicks create new points; right-clicks remove them. The graph to the right shows the "influence polynomials" with two exceptions: the large pink curve is the sum of all influences and the blue curve with (hopefully two) vertical lines shows where the sum is 1 (i.e. where the spline is defined).'}),Object(w.jsx)("div",{}),Object(w.jsxs)("label",{children:[Object(w.jsx)("input",{type:"checkbox",checked:e.state.shouldAddPointOnClick,onChange:Object(h.a)(Object(O.a)(e),he)[he]}),Object(w.jsx)("div",{children:"Add point on click inside canvas"})]}),Object(w.jsxs)("label",{children:[Object(w.jsx)("input",{type:"number",value:e.state.degree,onChange:Object(h.a)(Object(O.a)(e),fe)[fe]}),Object(w.jsx)("div",{children:"Degree of polynomials"})]}),Object(w.jsx)("div",{className:"filler"}),e.state.baseVector.map((function(t,a,c){return Object(w.jsxs)("label",{className:"base-vector-input",children:[Object(w.jsxs)("span",{children:["u",Object(w.jsx)("sub",{children:a})," =\xa0"]}),Object(w.jsx)("input",{type:"number",value:t,min:c[a-1],max:c[a+1],onChange:function(t){return Object(h.a)(Object(O.a)(e),pe)[pe](a,t)}})]},a)}))]})},e}return Object(j.a)(a,[{key:"setup",value:function(){var e=this;if(!this.setupIsComplete){Object(u.a)(Object(l.a)(a.prototype),"setup",this).call(this),this.scope.view.onClick=Object(h.a)(this,de)[de],Object(h.a)(this,le)[le]=new k([new this.scope.Point(100,100),new this.scope.Point(200,200),new this.scope.Point(300,100),new this.scope.Point(400,200),new this.scope.Point(500,100)]),Object(h.a)(this,le)[le].addEventListener("update",(function(){var t,a;e.setState({baseVector:null!==(t=null===(a=Object(h.a)(e,se)[se])||void 0===a?void 0:a.u_i)&&void 0!==t?t:e.state.baseVector})}));var t=ue(2,Object(h.a)(this,le)[le].length);Object(h.a)(this,se)[se]=new Oe(2,t,Object(h.a)(this,le)[le]),this.scope.project.activeLayer.addChild(Object(h.a)(this,se)[se])}}}]),a}(y),we=function(){return Object(w.jsxs)("div",{className:"App",children:[Object(w.jsx)(Y,{}),Object(w.jsx)(ve,{})]})},Pe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,33)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),c(e),n(e),i(e),r(e)}))};r.a.render(Object(w.jsx)(n.a.StrictMode,{children:Object(w.jsx)(we,{})}),document.getElementById("root")),Pe()}},[[32,1,2]]]);
//# sourceMappingURL=main.f295e4cc.chunk.js.map