/*
** *号是表示必须要执行一遍
** npm 需安装nodejs 测试电脑是否安装成功 敲击 node -v 测试即可
** npm intalll -g bower 第三方js管理插件 bower -v 测试即可
** npm install -g anywhere 是模拟一个服务容器的环境
** 
** grunt-cli 是配置grunt的必备安装,为了便于多个项目都可使用,请全局安装 -g
** grunt    是执行grunt命令的必装的插件，否则dos无法识别grunt
** grunt-contrib-copy 拷贝目标目录文件，放置选定目录内
** grunt-contrib-less 编译less转换成css文件
** grunt-contrib-uglify 将目标目录文件的js压缩
** grunt-contrib-watch grunt 监听指定文档改变
** grunt-contrib-concat 合并js内容
** grunt-contrib-clean 清楚指定文件夹(包括子目录文档)或删除某个目标文档
** load-grunt-tasks 自动帮grunt加载tasks任务引用程序
** time-grunt 显示grunt任务耗时

** .bowerrc 指定第三方js库安装目录
*/

npm install grunt-cli -g    //有且执行一次即可
npm install
npm install -D <plugin name> 

npm install anywhere -g

bower install -D <js plugin>  (如 bower install -D jquery)
