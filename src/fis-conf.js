/** 配置产出 **/
//所有的文件产出到 static/ 目录下
fis.match('*', {
    release: '/static/$0'
});
//html文件放在static根目录下
fis.match('/views/(**)', {
    release:'/static/$1'
});
//解析下less
fis.match('/less/**.less',{
    parser: fis.plugin('less'),
    rExt: '.css'
});