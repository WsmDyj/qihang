(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a903139"],{"2e48":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},t._l(t.lists,(function(e,n){return a("div",{key:n,staticClass:"follow"},[a("author-info",{attrs:{userInfo:e}},[a("div",{staticClass:"detail",attrs:{slot:"content"},slot:"content"},[t._v(t._s(e.job)+" @"+t._s(e.company||"添加公司"))])]),a("div",{staticClass:"follow-action"},[a("followAction",{attrs:{size:"small",author:e.nickname}})],1)],1)})),0)},r=[],c=a("9f12"),o=a("8b83"),s=a("c65a"),i=a("c03e"),u=a("9ab4"),l=a("60a3"),f=a("5dc5"),b=a("db18"),h=function(t){function e(){return Object(c["a"])(this,e),Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(i["a"])(e,t),e}(l["d"]);u["a"]([Object(l["c"])()],h.prototype,"lists",void 0),h=u["a"]([Object(l["a"])({components:{authorInfo:f["a"],followAction:b["a"]}})],h);var p=h,v=p,d=(a("55ef"),a("2877")),j=Object(d["a"])(v,n,r,!1,null,"56df75d6",null);e["a"]=j.exports},"3bd5":function(t,e,a){},"3ce3":function(t,e,a){},"4de4":function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").filter,c=a("1dde");n({target:"Array",proto:!0,forced:!c("filter")},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"55ef":function(t,e,a){"use strict";var n=a("3bd5"),r=a.n(n);r.a},"5dc5":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"author"},[a("router-link",{staticClass:"author-avatar",attrs:{target:"_blank",to:{path:"/author",query:{author:t.userInfo.nickname}}}},[a("el-avatar",{attrs:{size:t.size,src:t.userInfo.avatar}},[a("img",{attrs:{src:"https://img13.360buyimg.com/imagetools/jfs/t1/124873/15/1130/935/5eba4868Eb3438cb5/e5222b21249a212e.jpg"}})])],1),a("div",{staticClass:"author-info"},[a("router-link",{class:t.type?"author-name--"+t.type:"author-name",attrs:{target:"_blank",to:{path:"/author",query:{author:t.userInfo.nickname}}}},[t._v(" "+t._s(t.userInfo.nickname)+" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.type,expression:"type"}],staticClass:"author-job"},[t._v("@"+t._s(t.userInfo.company||"添加公司"))])]),a("div",{class:t.type?"author-content--"+t.type:"author-content"},[t._t("content")],2)],1)],1)},r=[],c=a("9f12"),o=a("8b83"),s=a("c65a"),i=a("c03e"),u=a("9ab4"),l=a("60a3"),f=function(t){function e(){return Object(c["a"])(this,e),Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(i["a"])(e,t),e}(l["d"]);u["a"]([Object(l["c"])({default:48})],f.prototype,"size",void 0),u["a"]([Object(l["c"])()],f.prototype,"type",void 0),u["a"]([Object(l["c"])()],f.prototype,"userInfo",void 0),f=u["a"]([l["a"]],f);var b=f,h=b,p=(a("6454"),a("2877")),v=Object(p["a"])(h,n,r,!1,null,"2f06c2f0",null);e["a"]=v.exports},6454:function(t,e,a){"use strict";var n=a("3ce3"),r=a.n(n);r.a},abc3:function(t,e,a){},c2c1:function(t,e,a){},db18:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-button",class:t.show?"following-button follow-button__"+t.size:"unfollow-button follow-button__"+t.size,on:{click:function(e){return e.stopPropagation(),t.follow(t.author)}}},[t._v(" "+t._s(t.show?"已关注":"关注")+" ")])},r=[],c=(a("4de4"),a("c975"),a("96cf"),a("89ba")),o=a("9f12"),s=a("53fe"),i=a("8b83"),u=a("c65a"),l=a("c03e"),f=a("9ab4"),b=a("60a3"),h=a("9dba"),p=a("df4f"),v=a("a988"),d=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(i["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.show=!1,t.lists=[],t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"watchAuthor",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e,a){var n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.follows.filter((function(t){n.lists.push(t.author)})),t.next=3,this.lists.indexOf(e);case 3:if(t.t0=t.sent,t.t1=-1,t.t0==t.t1){t.next=9;break}t.t2=!0,t.next=10;break;case 9:t.t2=!1;case 10:this.show=t.t2;case 11:case"end":return t.stop()}}),t,this)})));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"follow",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.token){t.next=11;break}if(this.show=!this.show,!this.show){t.next=7;break}return t.next=5,Object(v["a"])({username:e});case 5:t.next=9;break;case 7:return t.next=9,Object(v["c"])({username:e});case 9:t.next=12;break;case 11:h["a"].handleIslogin(!0);case 12:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"created",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"nickname",get:function(){return h["a"].nickname}},{key:"token",get:function(){return h["a"].token}},{key:"follows",get:function(){return p["a"].follows}}]),e}(b["d"]);f["a"]([Object(b["c"])()],d.prototype,"author",void 0),f["a"]([Object(b["c"])()],d.prototype,"size",void 0),f["a"]([Object(b["e"])("author",{immediate:!0,deep:!0})],d.prototype,"watchAuthor",null),d=f["a"]([b["a"]],d);var j=d,w=j,k=(a("f9ae"),a("2877")),y=Object(k["a"])(w,n,r,!1,null,"235193bc",null);e["a"]=y.exports},e148:function(t,e,a){"use strict";var n=a("abc3"),r=a.n(n);r.a},f2b4:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"nav"},[a("ul",{staticClass:"nav-list"},t._l(t.tabs,(function(e,n){return a("li",{key:n,staticClass:"nav-item",class:{splitLine:t.splitLine}},[a("span",{class:{active:t.current===e.label},on:{click:function(a){return t.handleClick(e)}}},[t._v(t._s(e.value))])])})),0)])},r=[],c=a("9f12"),o=a("53fe"),s=a("8b83"),i=a("c65a"),u=a("c03e"),l=a("9ab4"),f=a("60a3"),b=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(s["a"])(this,Object(i["a"])(e).apply(this,arguments)),t.current="0",t}return Object(u["a"])(e,t),Object(o["a"])(e,[{key:"handleClick",value:function(t){return this.current=t.label,t}}]),e}(f["d"]);l["a"]([Object(f["c"])()],b.prototype,"tabs",void 0),l["a"]([Object(f["c"])()],b.prototype,"splitLine",void 0),l["a"]([Object(f["b"])("click")],b.prototype,"handleClick",null),b=l["a"]([f["a"]],b);var h=b,p=h,v=(a("e148"),a("2877")),d=Object(v["a"])(p,n,r,!1,null,"247a9c10",null);e["a"]=d.exports},f9ae:function(t,e,a){"use strict";var n=a("c2c1"),r=a.n(n);r.a}}]);