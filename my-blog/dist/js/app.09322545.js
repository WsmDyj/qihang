(function(e){function t(t){for(var r,a,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);h&&h(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==c[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b2014":"b2d8331e","chunk-32e5d812":"7e7e1f77","chunk-06e7c23a":"fdad70b7","chunk-6523c5d2":"a05ae1e1","chunk-e44f958c":"1ccb5d64","chunk-19757ddc":"bf391324","chunk-2687bef2":"7436a1fe","chunk-1d7beba0":"b338f4a9","chunk-f28a94c8":"f8481cc5","chunk-487f3676":"db8131d9","chunk-55aa7619":"35e8d560","chunk-5d747124":"c9b55da0","chunk-3ebf228e":"9eb1f3d3","chunk-40557fcc":"89013754","chunk-411993c0":"baed0d0d","chunk-2ef0bedc":"e812e5bc","chunk-5627bbe6":"61d9a0d7","chunk-716f0ad3":"eb56eb6b","chunk-754b4fea":"1d756188"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-32e5d812":1,"chunk-06e7c23a":1,"chunk-6523c5d2":1,"chunk-e44f958c":1,"chunk-19757ddc":1,"chunk-2687bef2":1,"chunk-1d7beba0":1,"chunk-f28a94c8":1,"chunk-487f3676":1,"chunk-55aa7619":1,"chunk-5d747124":1,"chunk-3ebf228e":1,"chunk-40557fcc":1,"chunk-411993c0":1,"chunk-2ef0bedc":1,"chunk-5627bbe6":1,"chunk-716f0ad3":1,"chunk-754b4fea":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0b2014":"31d6cfe0","chunk-32e5d812":"ce468fca","chunk-06e7c23a":"5ebde33d","chunk-6523c5d2":"9a7aa3e5","chunk-e44f958c":"627d4a28","chunk-19757ddc":"a7e4c41a","chunk-2687bef2":"b28dfc1e","chunk-1d7beba0":"834e9b0f","chunk-f28a94c8":"a2515877","chunk-487f3676":"62a27e6f","chunk-55aa7619":"daa6892e","chunk-5d747124":"a0af7aad","chunk-3ebf228e":"19047547","chunk-40557fcc":"8fbc117d","chunk-411993c0":"b4467cb9","chunk-2ef0bedc":"4442e6dd","chunk-5627bbe6":"c56d5c61","chunk-716f0ad3":"6f09fea1","chunk-754b4fea":"3e1fc11d"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===c)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],h.parentNode.removeChild(h),n(o)},h.href=c;var d=document.getElementsByTagName("head")[0];d.appendChild(h)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}c[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var h=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0613":function(e,t,n){"use strict";var r=n("2b0e"),a=n("2f62");r["default"].use(a["a"]),t["a"]=new a["a"].Store({})},"0db2":function(e,t,n){"use strict";var r=n("c218"),a=n.n(r);a.a},"493c":function(e,t,n){},"5f70":function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return s}));var r=n("b32d"),a=function(e){return Object(r["a"])({url:"api/actions/like",method:"post",data:e})},c=function(e){return Object(r["a"])({url:"api/actions/adopt",method:"post",data:e})},o=function(e){return Object(r["a"])({url:"api/actions/review",method:"post",data:e})},u=function(e){return Object(r["a"])({url:"api/actions/removelike",method:"post",data:e})},i=function(e){return Object(r["a"])({url:"api/actions/getLikelists",method:"get",params:e})},s=function(){return Object(r["a"])({url:"api/share/list",method:"get"})}},"7eb1":function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));n("99af"),n("4160"),n("159b"),n("96cf");var r=n("89ba"),a=n("9f12"),c=n("53fe"),o=n("8b83"),u=n("c65a"),i=n("c03e"),s=n("9ab4"),l=n("6fc5"),f=n("0613"),h=n("5f70"),d=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(o["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.likeArticles=[],e.likeArticlId=[],e}return Object(i["a"])(t,e),Object(c["a"])(t,[{key:"SET_ARTICLE",value:function(e){this.likeArticles=[],this.likeArticles=this.likeArticles.concat(e)}},{key:"SET_LIKEID",value:function(e){var t=this;this.likeArticlId=[],e.forEach((function(e){t.likeArticlId.push(e.article_id)}))}},{key:"getLikeLists",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(h["d"])();case 2:t=e.sent,n=t.data,n.forEach((function(e){Object.assign(e,{islike:!0})})),this.SET_ARTICLE(n),this.SET_LIKEID(n);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),t}(l["d"]);s["a"]([l["c"]],d.prototype,"SET_ARTICLE",null),s["a"]([l["c"]],d.prototype,"SET_LIKEID",null),s["a"]([l["a"]],d.prototype,"getLikeLists",null),d=s["a"]([Object(l["b"])({dynamic:!0,store:f["a"],name:"article"})],d);var p=Object(l["e"])(d)},"83a3":function(e,t,n){"use strict";var r=n("493c"),a=n.n(r);a.a},"9bf2c":function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="9bf2c"},"9dba":function(e,t,n){"use strict";n("498a"),n("96cf");var r=n("89ba"),a=n("9f12"),c=n("53fe"),o=n("8b83"),u=n("c65a"),i=n("c03e"),s=n("9ab4"),l=n("6fc5"),f=n("ea9b"),h=n("a78e"),d=n.n(h),p="authorization",b=function(){return d.a.get(p)},m=function(e){return d.a.set(p,e)},k=function(){return d.a.remove(p)},v=n("0613");n.d(t,"a",(function(){return O}));var g=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(o["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.islogin=!1,e.token=b()||"",e.autograph="",e.avatar="",e.company="",e.job="",e.nickname="",e.username="",e}return Object(i["a"])(t,e),Object(c["a"])(t,[{key:"SET_TOKEN",value:function(e){this.token=e}},{key:"SET_Login",value:function(e){this.islogin=e}},{key:"SET_AUTOGRAPH",value:function(e){this.autograph=e}},{key:"SET_AVATAR",value:function(e){this.avatar=e}},{key:"SET_COMPANY",value:function(e){this.company=e}},{key:"SET_JOB",value:function(e){this.job=e}},{key:"SET_NICKNAME",value:function(e){this.nickname=e}},{key:"SET_USERNAME",value:function(e){this.username=e}},{key:"Login",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.username,r=t.password,n=n.trim(),e.prev=2,e.next=5,Object(f["d"])({username:n,password:r});case 5:a=e.sent,c=a.data,m(c.accessToken),this.SET_TOKEN(c.accessToken),this.SET_Login(!1),e.next=15;break;case 12:return e.prev=12,e.t0=e["catch"](2),e.abrupt("return",e.t0);case 15:case"end":return e.stop()}}),e,this,[[2,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"oauthLogin",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(f["b"])({code:t});case 2:return n=e.sent,r=n.data,m(r.accessToken),this.SET_TOKEN(r.accessToken),this.SET_Login(!1),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"Register",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(f["e"])(t);case 3:return n=e.sent,r=n.data,m(r.accessToken),this.SET_TOKEN(r.accessToken),this.SET_Login(!1),e.abrupt("return",r);case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ResetToken",value:function(){k(),this.SET_TOKEN("")}},{key:"handleIslogin",value:function(e){this.SET_Login(e)}},{key:"GetUserInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,c,o,u,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(f["a"])();case 2:if(t=e.sent,n=t.data,n){e.next=6;break}throw Error("Verification failed, please Login again.");case 6:r=n.autograph,a=n.avatar,c=n.company,o=n.job,u=n.nickname,i=n.username,this.SET_AUTOGRAPH(r),this.SET_AVATAR(a),this.SET_COMPANY(c),this.SET_JOB(o),this.SET_NICKNAME(u),this.SET_USERNAME(i);case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),t}(l["d"]);s["a"]([l["c"]],g.prototype,"SET_TOKEN",null),s["a"]([l["c"]],g.prototype,"SET_Login",null),s["a"]([l["c"]],g.prototype,"SET_AUTOGRAPH",null),s["a"]([l["c"]],g.prototype,"SET_AVATAR",null),s["a"]([l["c"]],g.prototype,"SET_COMPANY",null),s["a"]([l["c"]],g.prototype,"SET_JOB",null),s["a"]([l["c"]],g.prototype,"SET_NICKNAME",null),s["a"]([l["c"]],g.prototype,"SET_USERNAME",null),s["a"]([l["a"]],g.prototype,"Login",null),s["a"]([l["a"]],g.prototype,"oauthLogin",null),s["a"]([l["a"]],g.prototype,"Register",null),s["a"]([l["a"]],g.prototype,"ResetToken",null),s["a"]([l["a"]],g.prototype,"handleIslogin",null),s["a"]([l["a"]],g.prototype,"GetUserInfo",null),g=s["a"]([Object(l["b"])({dynamic:!0,store:v["a"],name:"user"})],g);var O=Object(l["e"])(g)},a988:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return o}));var r=n("b32d"),a=function(e){return Object(r["a"])({url:"api/follow/following",method:"post",data:e})},c=function(e){return Object(r["a"])({url:"api/follow/unfollow",method:"post",data:e})},o=function(e){return Object(r["a"])({url:"api/follow/list",method:"get",params:e})}},b20f:function(e,t,n){},b32d:function(e,t,n){"use strict";n("d3b7");var r=n("bc3a"),a=n.n(r),c=n("5c96"),o=n("9dba"),u=a.a.create({baseURL:"http://localhost:8000",withCredentials:!0});u.interceptors.request.use((function(e){return o["a"].token&&(e.headers["authorization"]=o["a"].token),e}),(function(e){return Promise.reject(e)})),u.interceptors.response.use((function(e){var t=e.data;return 0===t.errno?Promise.resolve(t):(50014!==t.code&&500!==t.status||c["MessageBox"].confirm("您登录以过期，请重新登录","登录过期",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then((function(){o["a"].ResetToken(),o["a"].handleIslogin(!0)})),Object(c["Message"])({message:t.data.message||"Error",type:"error",duration:5e3}),Promise.reject(t))}),(function(e){return Object(c["Message"])({message:e.message||"Error",type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=u},b428:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));n("a15b"),n("0d03"),n("d3b7"),n("e25e"),n("ac1f"),n("25f0"),n("1276");function r(e){for(var t=(e+"").split(""),n=0;n<13;n++)t[n]||(t[n]="0");e=1*t.join("");var r=6e4,a=60*r,c=24*a,o=30*c,u=(new Date).getTime(),i=u-e;if(i<0)return"不久前";var s=i/o,l=i/(7*c),f=i/c,h=i/a,d=i/r,p=function(e){return e<10?"0"+e:e};return s>4?function(){var t=new Date(e);return t.getFullYear()+"年"+p(t.getMonth()+1)+"月"+p(t.getDate())+"日"}():s>=1?parseInt(s.toString())+"月前":l>=1?parseInt(l.toString())+"周前":f>=1?parseInt(f.toString())+"天前":h>=1?parseInt(h.toString())+"小时前":d>=1?parseInt(d.toString())+"分钟前":"刚刚"}function a(e){var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1<10?"0"+t.getMonth()+1:t.getMonth()+1,a=t.getDate()<10?"0"+t.getDate():t.getDate();return n+"年"+r+"月"+a+" "}},c218:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("4160"),n("159b"),n("e623"),n("e379"),n("5dc8"),n("37e1");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view"),n("el-tooltip",{attrs:{placement:"top",content:"返回顶部"}},[n("back-to-top")],1),n("LiveMessage")],1)},c=[],o=n("9f12"),u=n("8b83"),i=n("c65a"),s=n("c03e"),l=n("9ab4"),f=n("60a3"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.transitionName}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"back-to-ceiling",on:{click:e.backToTop}},[n("i",{staticClass:"el-icon-caret-top",staticStyle:{"font-size":"20px"}})])])},d=[],p=n("53fe"),b=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(i["a"])(t).apply(this,arguments)),e.visible=!1,e.isMoving=!1,e}return Object(s["a"])(t,e),Object(p["a"])(t,[{key:"mounted",value:function(){window.addEventListener("scroll",this.handleScroll,!0)}},{key:"beforeDestroy",value:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)}},{key:"handleScroll",value:function(){this.visible=window.pageYOffset>this.visibilityHeight}},{key:"backToTop",value:function(){var e=this;if(!this.isMoving){var t=window.pageYOffset,n=0;this.isMoving=!0;var r=setInterval((function(){var a=Math.floor(e.easeInOutQuad(10*n,t,-t,500));a<=e.backPosition?(window.scrollTo(0,e.backPosition),clearInterval(r),e.isMoving=!1):window.scrollTo(0,a),n++}),16.7)}}},{key:"easeInOutQuad",value:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}}]),t}(f["d"]);l["a"]([Object(f["c"])({default:100})],b.prototype,"visibilityHeight",void 0),l["a"]([Object(f["c"])({default:"fade"})],b.prototype,"transitionName",void 0),l["a"]([Object(f["c"])({default:0})],b.prototype,"backPosition",void 0),b=l["a"]([Object(f["a"])({name:"BackToTop"})],b);var m=b,k=m,v=(n("83a3"),n("2877")),g=Object(v["a"])(k,h,d,!1,null,"4e945016",null),O=g.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"message"},[n("div",{staticClass:"live-message",on:{click:function(t){e.dialogVisible=!0}}},[n("i",{staticClass:"iconfont"},[e._v("")])]),n("div",{staticClass:"dialog"},[n("el-dialog",{attrs:{visible:e.dialogVisible,width:"600px",title:"意见反馈"},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"反馈渠道",prop:"resource"}},[n("el-radio-group",{model:{value:e.ruleForm.resource,callback:function(t){e.$set(e.ruleForm,"resource",t)},expression:"ruleForm.resource"}},[n("el-radio",{attrs:{label:"交流分享"}}),n("el-radio",{attrs:{label:"产品建议"}}),n("el-radio",{attrs:{label:"网站Bug"}}),n("el-radio",{attrs:{label:"其他"}})],1)],1),n("el-form-item",{attrs:{label:"意见内容",prop:"content"}},[n("el-input",{staticStyle:{width:"80%"},attrs:{autosize:{minRows:3,maxRows:5},type:"textarea",placeholder:"请输入内容"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1),n("el-form-item",{attrs:{label:"联系方式",prop:"phone"}},[n("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"请输入真实联系方式（邮箱、QQ)"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"medium"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)])},j=[],w=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(i["a"])(t).apply(this,arguments)),e.dialogVisible=!1,e.ruleForm={resource:"交流分享",content:"",phone:""},e}return Object(s["a"])(t,e),t}(f["d"]);w=l["a"]([Object(f["a"])({name:"message"})],w);var T=w,E=T,S=(n("0db2"),Object(v["a"])(E,y,j,!1,null,"316d1aac",null)),_=S.exports,A=function(e){function t(){return Object(o["a"])(this,t),Object(u["a"])(this,Object(i["a"])(t).apply(this,arguments))}return Object(s["a"])(t,e),t}(f["d"]);A=l["a"]([Object(f["a"])({components:{BackToTop:O,LiveMessage:_}})],A);var x=A,L=x,P=Object(v["a"])(L,a,c,!1,null,null,null),R=P.exports,I=(n("d3b7"),n("8c4f"));r["default"].use(I["a"]);var M=[{path:"/",name:"home",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-2687bef2"),n.e("chunk-1d7beba0")]).then(n.bind(null,"7abe"))},meta:{title:"起航"}},{path:"/author",name:"author",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-5627bbe6"),n.e("chunk-754b4fea")]).then(n.bind(null,"82c6"))},meta:{title:"个人主页 - 起航"}},{path:"/article",name:"article",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-487f3676"),n.e("chunk-2ef0bedc")]).then(n.bind(null,"230c"))},meta:{title:"文章页 - 起航"}},{path:"/questions",name:"questions",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-411993c0")]).then(n.bind(null,"bb44"))},meta:{title:"问答 - 起航"}},{path:"/checkAsk",name:"checkAsk",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-32e5d812"),n.e("chunk-487f3676"),n.e("chunk-55aa7619")]).then(n.bind(null,"be7f"))},meta:{title:"问答 - 起航"}},{path:"/ask",name:"ask",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-32e5d812"),n.e("chunk-5d747124")]).then(n.bind(null,"b7dc"))},meta:{title:"提问 - 起航"}},{path:"/users",name:"users",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-19757ddc")]).then(n.bind(null,"4468"))},meta:{title:"用户 - 起航"}},{path:"/hot",name:"hot",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-2687bef2"),n.e("chunk-f28a94c8")]).then(n.bind(null,"2a9a"))},meta:{title:"视频 - 起航"}},{path:"/share",name:"share",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-3ebf228e")]).then(n.bind(null,"1044"))},meta:{title:"分享 - 起航"}},{path:"/search",name:"search",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-5627bbe6"),n.e("chunk-716f0ad3")]).then(n.bind(null,"efe3"))},meta:{title:"搜索 - 起航"}},{path:"/settings",name:"settings",component:function(){return Promise.all([n.e("chunk-e44f958c"),n.e("chunk-40557fcc")]).then(n.bind(null,"61c2"))},meta:{title:"个人资料 - 起航"}},{path:"/markdown",name:"markdown",component:function(){return Promise.all([n.e("chunk-32e5d812"),n.e("chunk-06e7c23a")]).then(n.bind(null,"816e9"))},meta:{title:"写文章"}},{path:"/oauth",name:"oauth",component:function(){return n.e("chunk-2d0b2014").then(n.bind(null,"21ed"))}},{path:"/redirect",name:"redirect",component:function(){return n.e("chunk-6523c5d2").then(n.bind(null,"ef3c"))}}],N=new I["a"]({mode:"history",routes:M}),C=N,F=n("0613"),D=(n("96cf"),n("89ba")),U=n("323e"),B=n.n(U),K=(n("a5d8"),n("9dba")),V=n("7eb1"),Y=n("df4f");B.a.configure({showSpinner:!1}),C.beforeEach(function(){var e=Object(D["a"])(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(B.a.start(),!K["a"].token){e.next=8;break}return e.next=4,K["a"].GetUserInfo();case 4:return e.next=6,V["a"].getLikeLists();case 6:return e.next=8,Y["a"].getFollows();case 8:r(),B.a.done();case 10:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),C.afterEach((function(e){B.a.done(),e.meta.title&&(document.title=e.meta.title)}));var $=n("5c96"),q=n("1487"),z=n.n(q),G=(n("2c43"),n("b0c0"),n("ddb0"),n("9bf2c"));G.keys().forEach((function(e){var t=G(e),n=t.default||t;r["default"].component(n.name,n)}));n("450d"),n("0fae"),n("f5df1"),n("b20f");var H=n("b428");r["default"].config.productionTip=!1,r["default"].use($),r["default"].directive("highlight",(function(e){var t=e.querySelectorAll("pre code");t.forEach((function(e){z.a.highlightBlock(e)}))})),r["default"].prototype.formatDate=H["a"],new r["default"]({router:C,store:F["a"],render:function(e){return e(R)}}).$mount("#app")},df4f:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));n("99af"),n("96cf");var r=n("89ba"),a=n("9f12"),c=n("53fe"),o=n("8b83"),u=n("c65a"),i=n("c03e"),s=n("9ab4"),l=n("6fc5"),f=n("0613"),h=n("a988"),d=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(o["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.follows=[],e}return Object(i["a"])(t,e),Object(c["a"])(t,[{key:"SET_FOLLOWS",value:function(e){this.follows=[],this.follows=this.follows.concat(e)}},{key:"getFollows",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(h["b"])();case 2:t=e.sent,n=t.data,this.SET_FOLLOWS(n[0].data);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),t}(l["d"]);s["a"]([l["c"]],d.prototype,"SET_FOLLOWS",null),s["a"]([l["a"]],d.prototype,"getFollows",null),d=s["a"]([Object(l["b"])({dynamic:!0,store:f["a"],name:"follows"})],d);var p=Object(l["e"])(d)},ea9b:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return u})),n.d(t,"f",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"g",(function(){return l}));var r=n("b32d"),a=function(e){return Object(r["a"])({url:"api/user/login",method:"post",data:e})},c=function(e){return Object(r["a"])({url:"api/user/getuserList",method:"get",params:e})},o=function(e){return Object(r["a"])({url:"api/user/oauth",method:"get",params:e})},u=function(e){return Object(r["a"])({url:"api/user/register",method:"post",data:e})},i=function(e){return Object(r["a"])({url:"api/user/sendSmsCodeToUser",method:"post",data:e})},s=function(e){return Object(r["a"])({url:"api/user/getInfo",method:"get",params:e})},l=function(e){return Object(r["a"])({url:"api/user/updateUser",method:"post",data:e})}}});