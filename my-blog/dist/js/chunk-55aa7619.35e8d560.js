(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55aa7619"],{"0419":function(t,e,n){"use strict";var a=n("b948"),i=n.n(a);i.a},"4e1d":function(t,e,n){},"63a2":function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return c}));var a=n("b32d"),i=function(t){return Object(a["a"])({url:"api/question/list",method:"get",params:t})},s=function(t){return Object(a["a"])({url:"api/question/detail",method:"get",params:t})},r=function(t){return Object(a["a"])({url:"api/question/new",method:"post",data:t})},c=function(t){Object(a["a"])({url:"api/question/update",method:"post",data:t})}},"870a":function(t,e,n){"use strict";var a=n("4e1d"),i=n.n(a);i.a},"951b":function(t,e,n){},b948:function(t,e,n){},be7f:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("Header"),n("div",{staticClass:"main"},[n("div",{staticClass:"asside"}),n("div",{staticClass:"article"},[n("div",{staticClass:"article-container"},[n("div",{staticClass:"article-author"},[n("div",{staticClass:"author-box"},[n("author-info",{attrs:{userInfo:t.ask.author}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("span",{staticClass:"article-time"},[t._v(t._s(t.ask.createtime)+" ")]),n("span",{staticClass:"article-review"},[t._v("阅读 "+t._s(t.ask.reviews)+" ")]),n("router-link",{directives:[{name:"show",rawName:"v-show",value:t.nickname==t.ask.author.nickname,expression:"nickname == ask.author.nickname"}],attrs:{to:{path:"/ask",query:{askId:t.ask.question_id}}}},[n("span",{staticClass:"article-edit"},[t._v("编辑")])])],1)])],1)]),n("div",{staticClass:"article-title"},[t._v(t._s(t.ask.title))]),n("div",{staticClass:"ask-tag"},[n("i",{staticClass:"iconfont"},[t._v("")]),t._l(t.ask.articleTag,(function(e,a){return n("span",{key:a,staticClass:"article-tag"},[t._v(t._s(e))])}))],2),n("div",{directives:[{name:"highlight",rawName:"v-highlight"}],ref:"article"},[n("div",{staticClass:"article-content",domProps:{innerHTML:t._s(t.ask.content)}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.comments.length>0,expression:"comments.length > 0"}],staticClass:"article-comment"},[n("div",{staticClass:"comment-title"},[n("span",{on:{click:function(e){t.show=!t.show}}},[n("i",{staticClass:"el-icon-guide"}),t._v(" "+t._s(t.comments.length)+" 个回答 "),n("i",{class:t.show?"el-icon-caret-top":"el-icon-caret-bottom"})])]),n("el-collapse-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},t._l(t.comments,(function(e,a){return n("div",{key:a,staticClass:"comment-content"},[n("comment",{attrs:{show:t.visible,comment:e},on:{submit:t.getComment}})],1)})),0)])],1),n("div",{staticClass:"article-comment"},[t._m(0),n("div",{staticClass:"comment-content"},[n("commentForm",{on:{submit:t.submitComment}})],1)])]),n("div",{staticClass:"asside"},[n("achievement-card",{attrs:{title:"关于作者",userInfo:t.ask.author}})],1)])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment-title"},[n("i",{staticClass:"el-icon-edit"}),t._v(" 撰写答案 ")])}],s=(n("96cf"),n("89ba")),r=n("9f12"),c=n("53fe"),o=n("8b83"),u=n("c65a"),m=n("c03e"),l=n("9ab4"),d=n("60a3"),h=n("e725"),v=n("63a2"),p=n("9dba"),b=n("db91"),f=n("5dc5"),w=n("b428"),k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment"},[n("div",{staticClass:"comment-header"},[n("author-info",{attrs:{type:"comment",size:"medium",userInfo:t.comment.userInfo}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"comment-action",on:{click:t.Adopt}},[n("el-button",{attrs:{size:"mini",plain:t.visible,true:"",type:"warning"}},[t._v(t._s(1==!t.visible?"已采纳":"采纳"))])],1),n("i",{directives:[{name:"show",rawName:"v-show",value:!t.visible,expression:"!visible"}],staticClass:"iconfont"},[t._v("")])],1),n("div",{directives:[{name:"highlight",rawName:"v-highlight"}],ref:"article"},[n("div",{staticClass:"article-content",domProps:{innerHTML:t._s(t.comment.comment_conent)}})]),n("formBox",{attrs:{data:t.comment},on:{submit:t.handleSubmit}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.comment.replys.length>0,expression:"comment.replys.length > 0"}]},[n("reply",{attrs:{replys:t.comment.replys,comment_id:t.comment.comment_id},on:{createReply:t.handleTwoReply}})],1)],1)},_=[],y=n("595c"),j=n("585a"),O=n("af5c"),g=n("f278"),C=n("5f70"),x=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(o["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.visible=!1,t}return Object(m["a"])(e,t),Object(c["a"])(e,[{key:"Adopt",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=0,this.visible?(e=1,this.visible=!1):(e=0,this.visible=!0),t.next=4,Object(C["a"])({askId:this.$route.query.askId,comment_id:this.comment.comment_id,comment_status:e});case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleSubmit",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={article_id:this.$route.query.askId,comment_id:e.comment_id,reply_conent:e.value,reply_author:e.comment_author,reply_id:Object(O["a"])()},t.next=3,Object(g["b"])(n);case 3:this.$emit("submit");case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"handleTwoReply",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(g["b"])(e);case 2:this.$emit("submit");case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"created",value:function(){this.visible=1!=this.comment.comment_status}}]),e}(d["d"]);l["a"]([Object(d["c"])()],x.prototype,"comment",void 0),l["a"]([Object(d["c"])({default:!1})],x.prototype,"show",void 0),x=l["a"]([Object(d["a"])({components:{authorInfo:f["a"],formBox:y["a"],reply:j["a"]}})],x);var R=x,I=R,$=(n("ebd4"),n("2877")),q=Object($["a"])(I,k,_,!1,null,"d637f710",null),N=q.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form"},[n("div",{staticClass:"markdown"},[n("markdown-editor",{ref:"markdownEditor",attrs:{mode:"markdown",height:286},model:{value:t.markdown,callback:function(e){t.markdown=e},expression:"markdown"}})],1),n("div",{staticClass:"sumbit"},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.submit}},[t._v("提交答案")])],1)])},T=[],H=n("fd3f"),z=n("59ff"),A=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(o["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.markdown="",t}return Object(m["a"])(e,t),Object(c["a"])(e,[{key:"submit",value:function(){var t=Object(z["b"])(this.$refs.markdownEditor.getHtml());this.$emit("submit",t),this.markdown=""}}]),e}(d["d"]);A=l["a"]([Object(d["a"])({components:{MarkdownEditor:H["a"]}})],A);var M=A,B=M,F=(n("0419"),Object($["a"])(B,E,T,!1,null,"68775594",null)),J=F.exports,L=n("03e7"),P={question_id:"",author:{nickname:""},title:"",content:"",createtime:"",likeCount:0,comments:0,reviews:0,markdown:"",articleTag:[],status:0},S=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(o["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.ask=P,t.show=!0,t.comments=[],t}return Object(m["a"])(e,t),Object(c["a"])(e,[{key:"created",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.query.askId,t.next=3,Object(v["b"])({ask_id:e});case 3:return n=t.sent,a=n.data,a.createtime=Object(w["b"])(a.createtime),this.ask=a,this.getComment(),t.next=10,Object(C["e"])({article_id:e,type:"ask"});case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"getComment",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(g["c"])({article_id:this.$route.query.askId});case 2:e=t.sent,n=e.data,this.comments=n;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"submitComment",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={article_id:this.$route.query.askId,comment_conent:e,comment_id:Object(O["a"])()},t.next=3,Object(g["a"])(n);case 3:this.getComment();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"nickname",get:function(){return p["a"].nickname}},{key:"visible",get:function(){return this.nickname==this.ask.author.nickname}}]),e}(d["d"]);S=l["a"]([Object(d["a"])({components:{Header:h["a"],achievementCard:b["a"],authorInfo:f["a"],comment:N,commentForm:J,articleAction:L["a"]}})],S);var D=S,G=D,K=(n("870a"),Object($["a"])(G,a,i,!1,null,"a77a00c6",null));e["default"]=K.exports},ebd4:function(t,e,n){"use strict";var a=n("951b"),i=n.n(a);i.a}}]);