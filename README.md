# iBlog-Admin
基于 Node.js 的个人博客后台系统, 为 [iBlog](https://github.com/sunsetroads/iBlog) 提供后台服务。

非常感谢 [eshengsky](https://github.com/eshengsky)，此项目中大部分实现来自 [iBlog2](https://github.com/eshengsky/iBlog2)


### 背景
工作以来一直在做 iOS 客户端开发，个人觉得客户端开发有必要学习一门服务器语言，因此学习了 Node.js，由于之前没有接触过服务器开发，这里在 Github 找了个完成度较高又相对简单的项目 [iBlog2](https://github.com/eshengsky/iBlog2) 来学习。

[iBlog2](https://github.com/eshengsky/iBlog2) 是一个完整的博客项目，包含了博客前台和后台管理系统，所有页面通过 Pug 模版生成。

此项目中后台管理系统仍用 Pug 模版生成。但博客前台使用 Vue 重新开发了一个，然后在 [iBlog2](https://github.com/eshengsky/iBlog2) 的基础上添加了一些 Api 供它访问。


### 配置
* 根据实际情况修改 /config.json 系统配置文件，修改后需要重启服务器。
* 后台管理员账号信息在 /config/account.json 中配置，修改后需要重启服务器。

### 安装
```
npm install
```

### 运行
```
node bin/www
```

打开浏览器，访问后台 http://localhost/admin 博客前台 http://localhost

