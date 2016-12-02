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


/** 配置环境**/
fis.media('prod')
    .match('*.{less,css}', {
        optimizer: fis.plugin('clean-css') // 压缩CSS
    })