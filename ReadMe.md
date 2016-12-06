### 安装
 1. 首先安装`NodeJS`
 2. 安装`fis3`
```shell
npm install -g fis3
```
 3. 查看是否安装成功:
```shell
fis3 -v
```
 4. 升级
```shell
npm update -g fis3
```

### 工作流
![workflow](http://oco8b7wkr.bkt.clouddn.com/workflow.png)

### 入门
[官方案例](https://github.com/fex-team/fis3/blob/dev/doc/demo/demo-simple.tar.gz)
在根目录下有一个`fis-conf.js`的配置文件，通常该文件所在的目录即是项目的根目录;
构建: 

``` shell
fis3 release -d ./output
```

### 内置服务器
打开内置服务器根目录

```shell 
fis3 server open 
```

### 全局配置
> [参考](http://fis.baidu.com/fis3/docs/api/config-props.html)

```js
var DEFAULT_SETTINGS = {
  project: {
    charset: 'utf8',    //字符编码，@param: string
    md5Length: 7,    //md5长度， @param: number
    md5Connector: '_',    //设置md5与文件的连接字符，@param: string
    files: ['**'],    //设置项目源码文件过滤器，@param:
    ignore: ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js']    //排除某些不处理的文件
  },    // project的属性也可以通过 fis.set('project.charset', 'utf8') 来设置，其它的类似
  component: {
    skipRoadmapCheck: true,  
    protocol: 'github',
    author: 'fis-components'
  },
  modules: {
    hook: 'components',
    packager: 'map'
  },
  options: {}
};
```

### 文件属性
| 属性     |  描述    | 示例    |
| :------------- | :------------- | :------------- |
| release     |  文件产出路径，该值可设为false，表示不产出    |  release:'/js/$0'   |
| packTo     | 分配文件合并到这个属性配置的文件中     |  packTo: '/js/package.js'   |
| parkOrder     | 控制合并时的顺序，值越小越在前面。配合 packTo 一起使用     | packOrder: -100    |
| query     | 文件资源定位路径之后的query，比如'/css.css?=t14504902700'     | query: '?=t' + fis.get('new date')   |
|      | 使用前先设置new date     | fis.set('new date', Date.now())；    |
| id     | 设定文件的资源id     | id: 'jquery',    |
|      | 使用     | var $ = require('jquery');|
| moduleId     | 指定文件资源的模块id,插件fis3-hook-module里define会用到    | moduleId: 'a'    |
|      | 编译前     | exports.a = 10    |
|      | 编译后     | define('a',function(require,exports,module){exports.a = 10}）    |
| url     | 指定文件的资源定位路径，以/开头,     | release: '/static/$0',url: '/static/new_project/$0'    |
| chaset     | 指定文本文件的输出编码,默认是 utf8     | charset: 'gbk'    |
| useHash     | 文件是否携带 md5 戳     | useHash: true    |
| useSprite     | 合并css雪碧图,[使用方法](https://github.com/fex-team/fis-spriter-csssprites)     | useSprite: true    |
| domain     | 给文件 URL 设置 domain 信息     | domain: 'http://cdn.baidu.com/'    |
| rExt     | 设置最终文件产出后的后缀     | rExt: '.sass'    |
| useMap     | 文件信息是否添加到 map.json     | useMap: true    |
| isMod     | 标示文件是否为组件化文件     | isMod:'true'    |
| extras     | 在[静态资源映射表][]中的附加数据，用于扩展[静态资源映射表][]表的功能     | extras:{ isPage: true }    |
|requires|  默认依赖的资源id表    | requires:[ 'static/lib/jquery.js' ]    |
| useSameNameRequire     | 开启同名依赖,模板会依赖同名css、js；js 会依赖同名 css，不需要显式引用     | useSameNameRequire: true    |
| isJsLike     | 指定对文件进行 js 相关语言能力处理，值类型：bool     |     |
| isCssLike     | 指定对文件进行 css 相关语言能力处理，值类型：bool     |     |
| isHtmlLike     | 指定对文件进行 html 相关语言能力处理，值类型：string     |     |

### 资源定位
>  把资源的相对路径在发布之后变换为绝对路径（部署路径）

 - 三个参数 domain   url  release
 - 最终路径:　domain+url
 - release 是在磁盘上的真实物理路径

### 配置方法
##### 对比CSS
```js
fis.match(selector,props); 
```
 - `selector`:选择器，语法参考 [glob](http://fis.baidu.com/fis3/docs/api/config-glob.html)
> `*` 匹配0或多个除了 / 以外的字符
`?` 匹配单个 **除了** ` / `以外的字符
`**` 匹配多个字符**包括**` /`
`{}` 可以让多个规则用` , `逗号分隔，起到或者的作用
`! `出现在规则的开头，表示取反。即匹配不命中后面规则的文件
条件分组 `$0` `$1` `$2`
`$0` 代表的是 match 到的整个字符串
`$1` `$2`代表相应的捕获分组

```js
fis.match('/a/(**.js)', {
	 release: '/b/$1' // $1 代表 (**.js) 匹配的内容
});
fis.match('/a/(**.js)', {
	 release: '/b/$0' // $0 代表 /a/(**.js) 匹配的内容
});

```

 - `props`: 配置的规则属性;具有`覆盖特性`，即对同一个文件应用相同的规则属性，后面应用的会覆盖前面的

### 配置环境
##### 对比CSS 媒体查询
```js
fis.media()
```
 - 默认参数为`dev`

### 属性检查
> 类似与谷歌开发人员工具的元素选择,直观地看到文件都应用哪些规则属性
``` shell
fis3 inspect --files app_editor2.js
```
-结果:
```shell
 ~ /less/styles.less
 -- release /static/less/styles.css `*`   (0th)
 -- parser [plugin `less`] `/less/**.less`   (1th)
 -- rExt .css `/less/**.less`   (1th)
 -- optimizer [plugin `clean-css`] `*.{less,css}`   (3th)
```
其中 `0th` , `1th` 表示的是`fis-conf.js`里面的第几个`match`匹配规则


### 文件指纹 useHash
 - 参考：https://github.com/fouber/blog/issues/5
```js
fis.match('*.{png,css,js}',{
    useHash:true//对匹配文件进行MD5戳配置
});
```

### 资源压缩
 - 规则属性中的“插件属性optimizer”来完成
```js
 optimizer:fis.plugin('png-compressor');
```
 - 常用的插件属性有`uglify-js`、`clean-css`、`png- compressor`等等。以上列出的都是fis3内置的插件，无需安装。

三不要:
```js
fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});
```

### 打包
> 默认插件: `fis3-packager-map` 

[fis3-packager-map](https://github.com/fex-team/fis3-packager-map)


### 文件监听
```shell
fis3 release -w
```
- 浏览器自动刷新
```shell
fis3 release -wL 
```

### 模块化开化

### 发布

[张云龙的前端工程日记](https://github.com/fouber/blog/labels/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B)