<template>
  <div class="books">
  <div class="book" v-for="(book, index) in books" :key="index">
    <div class="book-img">
      <el-image fit="fill" style="width:100px;height:140px" :src="book.imgUrl">
      </el-image>
    </div>
    <div class="book-content">
      <div class="book-name">{{book.name}}</div>
      <div class="book-introduction">{{book.introduction}}</div>
      <div class="book-rate">
        <span class="rate-label">推荐指数</span>
        <el-rate v-model= book.rate disabled text-color="#ff9900" score-template="{value}" />
      </div>
      <div :style="{'background': book.readUrl ? '#5dcaad':'#c8c9cc'}" @click="checkBook(book.readUrl)" class="share-check">{{book.readUrl ? '免费试读' : '暂无资源'}}</div>
    </div>
  </div>
  <div class="divider">
    <span class="divider-split"></span>
    <span class="divider-content">书贵于精，不贵于多</span>
    <span class="divider-split"></span>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  private books:any = [
    {rate: 5, name: 'ES6标准入门（第2版）', introduction: '《ES6标准入门（第2版）》为中级难度，适合对JavaScript语言或ES5已经有所了解的读者，用来提高水平，了解这门语言的最新发展；也可当作参考手册，查寻ES6/ES7新增的语法点。',readUrl: 'https://read.douban.com/reader/ebook/35652061/', imgUrl: 'https://img3.doubanio.com/view/ark_article_cover/retina/public/35652061.jpg?v=0'},
    {rate: 5, name: '深入浅出Node.js', introduction: '由首章Node 介绍为索引，涉及Node 的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer 的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node 构建产品需要的注意事项',readUrl:'https://read.douban.com/reader/ebook/12053349/', imgUrl: 'https://img1.doubanio.com/view/ark_article_cover/retina/public/12053349.jpg?v=0'},
    {rate: 5, name: 'JavaScript语言精粹', introduction: '作者从语法、对象、函数、继承、数组、正则表达式、方法、样式和优美的特性这9个方面来呈现这门语言真正的精华部分，通过它们完全可以构建出优雅高效的代码。',readUrl: 'https://read.douban.com/reader/ebook/35648149/', imgUrl: 'https://img1.doubanio.com/view/ark_article_cover/retina/public/35648149.jpg?v=0'},
    {rate: 5, name: '你不知道的JavaScript（上卷）', introduction: '“你不知道的JavaScript”系列就是要让不求甚解的JavaScript开发者迎难而上，深入语言内部，弄清楚JavaScript每一个零部件的用途。本书介绍了该系列的两个主题：“作用域和闭包”以及“this和对象原型”。',readUrl:'https://read.douban.com/reader/ebook/12051836/', imgUrl: 'https://img9.doubanio.com/view/ark_article_cover/retina/public/12051836.jpg?v=0'},
    {rate: 4, name: '你不知道的JavaScript（中卷）', introduction: '“本套书直面当前JavaScript开发人员不求甚解的大趋势，深入理解语言内部的机制，全面介绍了JavaScript中常被人误解和忽视的重要知识点', readUrl:'https://read.douban.com/reader/ebook/52186338/', imgUrl: 'https://img9.doubanio.com/view/ark_article_cover/retina/public/12051836.jpg?v=0'},
    {rate: 4, name: '你不知道的JavaScript（下卷）', introduction: 'JavaScript这门语言简单易用，很容易上手，但其语言机制复杂微妙，即使是经验丰富的JavaScript开发人员，如果没有认真学习的话也无法真正理解。本套书直面当前JavaScript开发人员不求甚解的大趋势，深入理解语言内部的机制，全面介绍了JavaScript中常被人误解和忽视的重要知识点。', readUrl:'https://read.douban.com/reader/ebook/52186484/', imgUrl: 'https://img9.doubanio.com/view/ark_article_cover/retina/public/52186484.jpg?v=0'},
    {rate: 5, name: 'Web性能权威指南', introduction: '本书目标是涵盖Web 开发者技术体系中应该掌握的所有网络及性能优化知识,适合所有Web 应用及站点开发人员阅读，包括但不限于前端、后端、运维、大数据分析、UI/UX、存储、视频、实时消息，以及性能工程师。', readUrl:'https://read.douban.com/reader/ebook/12055070/', imgUrl: 'https://img3.doubanio.com/view/ark_article_cover/retina/public/12055070.jpg?v=0'},
    {rate: 5, name: 'JavaScript设计模式与开发实践', introduction: '针对JavaScript语言特性全面介绍了更适合JavaScript程序员的了16个常用的设计模式，讲解了JavaScript面向对象和函数式编程方面的基础知识，介绍了面向对象的设计原则及其在设计模式中的体现，还分享了面向对象编程技巧和日常开发中的代码重构。',readUrl:'https://github.com/mynane/PDF/blob/master/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5.pdf', imgUrl: 'https://img9.doubanio.com/view/subject/l/public/s28065006.jpg'},
    {rate: 5, name: '学习JavaScript数据结构与算法', introduction: '本书首先介绍了JavaScript语言的基础知识，接下来讨论了数组、栈、队列、链表、集合、字典、散列表、树、图等数据结构，之后探讨了各种排序和搜索算法，包括冒泡排序、选择排序、插入排序、归并排序、快速排序、顺序搜索、二分搜索，还介绍了动态规划和贪心算法等常用的高级算法及相关知识。', imgUrl: 'https://img9.doubanio.com/view/subject/l/public/s28314494.jpg'},
    {rate: 5, name: 'JavaScript高级程序设计（第3版）', introduction: '本书是JavaScript 超级畅销书的最新版。ECMAScript 5 和HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript 增添了很多适应未来发展的新特性。', imgUrl: 'https://img3.doubanio.com/view/subject/l/public/s8958650.jpg'},
    {rate: 5, name: 'CSS世界', introduction: '本书从前端开发人员的需求出发，以“流”为线索，从结构、内容到美化装饰等方面，全面且深入地讲解前端开发人员必须了解和掌握的大量的CSS知识点。同时，作者结合多年的从业经验，通过大量的实战案例，详尽解析CSS的相关知识与常见问题。', imgUrl: 'https://img1.doubanio.com/view/subject/l/public/s29651678.jpg'},
    {rate: 5, name: '高性能网站建设进阶指南', introduction: '性能是任何一个网站成功的关键，然而，如今日益丰富的内容和大量使用Ajax的Web应用程序已迫使浏览器达到其处理能力的极限。Steve Souders是Google Web性能布道者和前Yahoo！首席性能工程师，他在本书中提供了宝贵的技术来帮助你优化网站性能。', imgUrl: 'https://img1.doubanio.com/view/subject/l/public/s4231089.jpg'},
    {rate: 4, name: 'JavaScript权威指南', introduction: '全面介绍了JavaScript语言的核心，以及Web浏览器中实现的遗留和标准的DOM。它运用了一些复杂的例子，说明如何处理验证表单数据、使用cookie、创建可移植的DHTML动画等常见任务。', imgUrl: 'https://img3.doubanio.com/view/subject/l/public/s5860151.jpg'},
    {rate: 4, name: 'HTTP权威指南', introduction: '本书是为所有希望理解HTTP以及Web底层结构的人编写的。软硬件工程师也可以将本书作为HTTP及相关web技术的条理清楚的参考书使用。系统架构师和网络管理员可以通过本书更好地了解如何设计、实现并管理复杂的网络架构。性能工程师和分析人员可以从高速缓存和性能优化的相关章节中获益。市场营销和咨询专家可以通过概念的介绍更好地理解web技术的前景。', imgUrl: 'https://img1.doubanio.com/view/subject/l/public/s11329547.jpg'},
    {rate: 4, name: 'JavaScript DOM编程艺术 （第2版）', introduction: '本书在简洁明快地讲述JavaScript和DOM的基本知识之后，通过几个实例演示了专业水准的网页开发技术，透彻阐述了平稳退化等一批至关重要的 JavaScript编程原则和最佳实践，并全面探讨了HTML5以及jQuery等JavaScript库。', imgUrl: 'https://img3.doubanio.com/view/subject/l/public/s4677623.jpg'},
    {rate: 4, name: '数学之美 （第二版）', introduction: '几年前，“数学之美”系列文章原刊载于谷歌黑板报，获得上百万次点击，得到读者高度评价。读者说，读了“数学之美”，才发现大学时学的数学知识，比如马尔可夫链、矩阵计算，甚至余弦函数原来都如此亲切，并且栩栩如生，才发现自然语言和信息处理这么有趣。', imgUrl: 'https://img1.doubanio.com/view/subject/l/public/s29961188.jpg'},
  ]
  private checkBook(url: string) {
    if (!url) {
      return
    }
    window.open(url,'_blank') 
  }
}
</script>

<style lang="scss" scoped>
.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.book {
  display: flex;
  padding: 20px 15px;
  width: 476px;
  background: #fff;
  border-radius: 2px;
  @include hoverState();
  margin-bottom: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 1024px) { 
    width: 100%;
  }
  .book-img {
    width: 100px;
    height: 140px;
    flex-shrink: 0;
    box-shadow: 3px 4px 12px 0 rgba(0,0,0,.2);
    overflow: hidden;
    background-color: #ccc;
    margin-right: 20px;
  }
  .book-content {
    cursor: default;
    .book-name {
      font-weight: 600;
      font-size: 16px;
    }
    .book-introduction {
      margin: 15px 0;
      font-size: 12px;
      line-height: 16px;
      @include twoLines($clamp: 3)
    }
    .book-rate {
      display: flex;
      font-size: 1rem;
      align-items: center;
      .rate-label {
        padding-right: 10px;
        color: $fontcolor;
      }
    }
    .share-check {
      position: absolute;
      cursor: pointer;
      right: 15px;
      bottom: 20px;
      margin-top: 10px;
      box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.1);
      border-radius: 3px;
      color: #fff;
      width: 100px;
      height: 25px;
      font-size: 13px;
      line-height: 25px;
      color: #fff;
      text-align: center;
    }
  }
}
.divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px 0;
  font-size: 1.083333rem;
  color: $navcolor;
  &-split {
    flex: 1;
    display: inline-block;
    height: 1px;
    background-color: $navcolor;
    opacity: .5;
    margin: 0 2rem;
  }
}
</style>
