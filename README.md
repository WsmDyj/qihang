# node-blog

## http 请求概述
 1. DNS 解析，建立TCP链接，发送http请求
 2. server接收到http请求，处理，并返回  =》 node
 3. 客户端接收到返回的数据，处理数据
## node 处理get请求
 1. get请求，即客户端向server端获取数据，如查询博客列表
 2. 通过 querystring 来传递数据，如a.html?a=100&b=200
 3. 浏览器直接访问，就发送get请求
## node 处理post请求
 1. post请求， 即客户端要向服务端传递数据
 2. 通过post data传递数据
 3. 浏览器无法直接演示，postman