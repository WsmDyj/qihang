(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a0a53bc"],{"0220":function(t,e,n){"use strict";var a=n("8c56"),r=n.n(a);r.a},"10e3":function(t,e,n){"use strict";var a=n("6b0f"),r=n.n(a);r.a},4468:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("Header"),n("div",{staticClass:"main mg-top-80"},[n("div",{staticClass:"section"},t._l(t.users,(function(e,a){return n("div",{key:a,staticClass:"info-box"},[n("authorInfo",{attrs:{userInfo:e}},[n("div",{staticClass:"author-desc",attrs:{slot:"content"},slot:"content"},[n("div",{staticClass:"info-desc"},[t._v(t._s(e.job)+" @"+t._s(e.company||"添加公司"))]),n("div",{staticClass:"info-detail"},[t._v("获得 "+t._s(e.likes)+" 赞 · "+t._s(e.reviews)+" 阅读")])])]),t.nickname!==e.nickname?n("author-follow",{attrs:{author:e.nickname}}):t._e()],1)})),0)])],1)},r=[],s=(n("96cf"),n("89ba")),o=n("9f12"),c=n("53fe"),i=n("8b83"),u=n("c65a"),f=n("c03e"),l=n("9ab4"),h=n("60a3"),b=n("ea9b"),p=n("e725"),d=n("5dc5"),v=n("db18"),m=n("9dba"),k=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(i["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.users=[],t}return Object(f["a"])(e,t),Object(c["a"])(e,[{key:"created",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(b["c"])();case 2:e=t.sent,n=e.data,this.users=n;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"nickname",get:function(){return m["a"].nickname}}]),e}(h["d"]);k=l["a"]([Object(h["a"])({name:"home",components:{Header:p["a"],authorInfo:d["a"],authorFollow:v["a"]}})],k);var w=k,y=w,O=(n("10e3"),n("2877")),j=Object(O["a"])(y,a,r,!1,null,"b210f6e8",null);e["default"]=j.exports},"4de4":function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").filter,s=n("1dde");a({target:"Array",proto:!0,forced:!s("filter")},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"5dc5":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"author"},[n("router-link",{staticClass:"author-avatar",attrs:{target:"_blank",to:{path:"/author",query:{author:t.userInfo.nickname}}}},[n("el-avatar",{attrs:{size:t.size,src:t.userInfo.avatar}},[n("img",{attrs:{src:"https://img13.360buyimg.com/imagetools/jfs/t1/124873/15/1130/935/5eba4868Eb3438cb5/e5222b21249a212e.jpg"}})])],1),n("div",{staticClass:"author-info"},[n("router-link",{class:t.type?"author-name--"+t.type:"author-name",attrs:{target:"_blank",to:{path:"/author",query:{author:t.userInfo.nickname}}},domProps:{innerHTML:t._s(t.userInfo.nickname)}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.type,expression:"type"}],staticClass:"author-job"},[t._v("@"+t._s(t.userInfo.company||"添加公司"))])]),n("div",{class:t.type?"author-content--"+t.type:"author-content"},[t._t("content")],2)],1)],1)},r=[],s=n("9f12"),o=n("8b83"),c=n("c65a"),i=n("c03e"),u=n("9ab4"),f=n("60a3"),l=function(t){function e(){return Object(s["a"])(this,e),Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(i["a"])(e,t),e}(f["d"]);u["a"]([Object(f["c"])({default:48})],l.prototype,"size",void 0),u["a"]([Object(f["c"])()],l.prototype,"type",void 0),u["a"]([Object(f["c"])()],l.prototype,"userInfo",void 0),l=u["a"]([f["a"]],l);var h=l,b=h,p=(n("ae26"),n("2877")),d=Object(p["a"])(b,a,r,!1,null,"cff9007c",null);e["a"]=d.exports},"6b0f":function(t,e,n){},"8c56":function(t,e,n){},ae26:function(t,e,n){"use strict";var a=n("b393"),r=n.n(a);r.a},b393:function(t,e,n){},c975:function(t,e,n){"use strict";var a=n("23e7"),r=n("4d64").indexOf,s=n("b301"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,i=s("indexOf");a({target:"Array",proto:!0,forced:c||i},{indexOf:function(t){return c?o.apply(this,arguments)||0:r(this,t,arguments.length>1?arguments[1]:void 0)}})},db18:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"follow-button",class:t.show?"following-button":"unfollow-button ",on:{click:function(e){return e.stopPropagation(),t.follow(t.author)}}},[t._v(" "+t._s(t.show?"已关注":"关注")+" ")])},r=[],s=(n("4de4"),n("c975"),n("96cf"),n("89ba")),o=n("9f12"),c=n("53fe"),i=n("8b83"),u=n("c65a"),f=n("c03e"),l=n("9ab4"),h=n("60a3"),b=n("9dba"),p=n("df4f"),d=n("a988"),v=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(i["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.show=!1,t.lists=[],t}return Object(f["a"])(e,t),Object(c["a"])(e,[{key:"watchAuthor",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.follows.filter((function(t){a.lists.push(t.author)})),t.next=3,this.lists.indexOf(e);case 3:if(t.t0=t.sent,t.t1=-1,t.t0==t.t1){t.next=9;break}t.t2=!0,t.next=10;break;case 9:t.t2=!1;case 10:this.show=t.t2;case 11:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"follow",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.token){t.next=11;break}if(this.show=!this.show,!this.show){t.next=7;break}return t.next=5,Object(d["a"])({username:e});case 5:t.next=9;break;case 7:return t.next=9,Object(d["c"])({username:e});case 9:t.next=12;break;case 11:b["a"].handleIslogin(!0);case 12:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"created",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"nickname",get:function(){return b["a"].nickname}},{key:"token",get:function(){return b["a"].token}},{key:"follows",get:function(){return p["a"].follows}}]),e}(h["d"]);l["a"]([Object(h["c"])()],v.prototype,"author",void 0),l["a"]([Object(h["e"])("author",{immediate:!0,deep:!0})],v.prototype,"watchAuthor",null),v=l["a"]([h["a"]],v);var m=v,k=m,w=(n("0220"),n("2877")),y=Object(w["a"])(k,a,r,!1,null,"3f68d5e6",null);e["a"]=y.exports}}]);