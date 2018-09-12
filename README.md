# 大道 HTML5 模板
## 克隆自官方的WEBPACK模板
https://github.com/vuejs-templates/webpack

## 官方文档

- [模板使用文档](http://vuejs-templates.github.io/webpack)
- [VUE文档](http://vuejs.org/guide/)

## 使用方法

这是大道金服HTML5移动端页面的默认模板，推荐使用npm3或者更新的版本执行以下的操作。


新机器需要先初始化大道CNPM环境

```bash
npm install -g cnpm
cnpm  config  set  registry  http://10.1.108.96:7001/
```

``` bash
$ npm install -g vue-cli --registry=https://registry.npm.taobao.org
#这里用了Z盘来存放模板，是因为gitlab在调用init的时候没办法得到SSH授权导致不能生成项目
$ vue init Z:/信息科技部/前端模板/ddjf-html5 my-project  
$ cd my-project
$ cnpm install
$ cnpm run dev
```

开发环境默认监听8080接口，如果端口已经被占用代码会默认使用其他的空闲端口。

## 还包含了啥

- `npm run dev`: 运行开发环境

- `npm run build`: 构建产品版本

- `npm run unit`: 运行基于JEST的单元测试[JEST](https://jestjs.io/docs/zh-Hans/using-matchers)

- `npm run e2e`: 使用Nightwatch进行E2E测试 [Nightwatch](http://nightwatchjs.org/).


## 在道模板

* [VUEX](https://vuex.vuejs.org/zh/guide/)  
* [DDUI](http://10.1.108.137/liangcanlun/ddui) 在道内部UI库 
* [DDCORE]() 在道内部的核心模块，包含了框架层的fitler, 逻辑处理, util工具库（<i>筹建中</i>）

## HTML5模板开发规范

designing ...