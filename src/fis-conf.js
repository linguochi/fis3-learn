/**
 * 全局配置
 */
// fis.set('project.files',['/less/**']); //筛选需要fis处理的文件
/** 配置产出 **/
//所有的文件产出到 static/ 目录下
fis.match('*', {
    release: '/static/$0'
});
//html文件放在static根目录下
fis.match('/views/(**)', {
    release: '/static/$1'
});
//解析下less
fis.match('/less/**.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
    /**
     * 使用postCss
     * 不推荐:https://www.npmjs.com/package/fis3-postprocessor-autoprefixer
     * 推荐使用:fis3-preprocessor-autoprefixer (虽然名字很怪异)
     * 浏览器配置参考: https://github.com/ai/browserslist#queries
     */
    preprocessor: fis.plugin("autoprefixer", {
        "browsers": ["last 2 versions"]
    })
});
fis.match('*.css', {
    useSprite: true
});

// /**
//  * 模块化开发
//  */
// //编译工具扩展：根据不同前端模块化框架，扩展声明依赖能力
// //seajs使用命令，模块化必须指令
//
// // 静态资源管理：解析静态资源映射表加载页面用到的组件及其组件的依赖
// fis.match('::packager', {
//     postpackager: fis.plugin('loader')
// });
// // 目录规范：设置某个文件夹下资源标记为依赖
// fis.match('**/use-seajs/**.js', {
//     isMod: true
// });
//
// fis.match('/demo/**sea.js', {
//     isMod: false
// });
//
// fis.hook('cmd', {
//     baseUrl: '/demo/use-seajs/sea-modules/',
//
//     paths: {
//         "jquery": "jquery/jquery/1.10.1/jquery.js",
//         "$": "jquery/jquery/1.10.1/jquery.js",
//         "jquery-easing": "jquery/easing/1.3.0/easing.js",
//         "store": "gallery/store/1.3.7/store",
//         "angularjs": "angular/angularjs/1.1.5/angular.js",
//         "underscore": "gallery/underscore/1.4.4/underscore.js",
//         "backbone": "gallery/backbone/1.0.0/backbone.js"
//     }
// });
/**
 * css雪碧图支持
 * 启用打包插件，必须匹配 ::package
 * 分配到 useSprite: true 的 CSS 文件才会被处理
 */
fis.match('::package', {
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15',
        htmlUseSprite: true // 内联样式使用css雪碧图
    })
});

/**
 * 打包
 * 默认插件fis3-packager-map
 */
//
// fis.match('/js/*.js',{
//    packTo:'/combine/pkg.js'
// });
//
//
// // 调整打包顺序
// fis.match('/js/b.js',{
//     packOrder: -10
// });
//更简洁的打包顺序
fis.match('*.js', {
    release: '/static/$0'
});
fis.match('::package', {
    packager: fis.plugin('map', {
        '/combine/pkg.js': [
            '/js/b.js',
            '/js/*.js'
        ]
    })
});
// //更粗暴的打包
// fis.match('::package', {
//     postpackager: fis.plugin('loader', {
//         allInOne: true
//     })
// });
/**
 * 本地发布
 */
fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: '../dist/'
    })
});

/** 配置环境**/
fis.media('prod')
    .match('*.{less,css}', {
        optimizer: fis.plugin('clean-css') // 压缩CSS
    })