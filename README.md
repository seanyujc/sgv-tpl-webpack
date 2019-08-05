## 项目说明文档

此项目是一个项目脚手架生成的。  
如果你想创建一个新的项目，正确的打开方式是：

### I. 安装

```sh
npm i -g sgv-cli
```

### II. 初始化一个项目

```sh
sgv init [project name]
```

### III. 安装项目依赖包

```
cd [project name] && npm i
```

如果报错试试下列命令

```
npm i -g rimraf mkdirp ncp cross-env && npm i
```

### IV. 启动开发环境开始开发

```
npm run dev
```

# 项目架构概要

项目主要目录说明

```
[project name]
+--build              # 开发环境及打包程序
+--dist               # 打包后的代码
+--dll                # 预先分离出来的依赖库
+--src
| +--app              # 项目程序
| | +--components     # 组件
| | +--config         # 程序配置
| | +--core
| | | +--domain       # 领域模型
| | | +--services     # 服务
| | | `--store        # vuex 主目录、出口
| | +--pages          # 页面
| | `--styles         # 样式及图片
| +--assets           # 静态资源
| `--lib              # 自行修改管理的第三方库
`--typings            # 自定义类型定义文件
```

项目主要文件的说明

```
[project name]
+--build
| `--config
|   `--index.js             # 开发环境和打包环境配置
`--src
  `--app
    +--config
    | `--api.config.ts      # 接口调用配置
    +--core
    | +--constants.ts       # 常量定义
    | `--filter.ts          # vue 全局过滤器
    `--index.router.ts      # vue-router 路由配置
```

一个需求的实现核心在页面模块，我们通过页面来划分不同的需求，通过页面关联组件来拆分出页面之间共通的部分。组件看上去和页面很像，其实页面是一个特殊的组件，只是曾经高一点。事实上，我们这里有三层组件。

```
app
`--page
  `--component
```

在制作页面样式时，除了 app 的样式写在“src\app\styles\common.scss”公共样式文件中，其它的都写在各自的.vue 文件中。对于样式文件中引用的图片资源文件统一放在“src\app\styles\images”目录下。  
关于 vuex 我们有统一的出口和模块化拆分。对应不同的组件层级也分为三类，除了最上层 app 组件 vuex 设置放在“src\app\core\store”目录外，页面和组件都放在各自的目录下，使用各自的名称空间注册到 vuex 中。

```
[project name]
+--components
| `--[component name]
|   `--store.ts       # 组件的 vuex 配置
+--core
| `--stroe
|   `--main.store.ts  # app 的 vuex 配置
`--pages
  `--[page name]
    `--store.ts       # 页面的 vuex 配置
```

# 项目开发工具

你可以执行一行命令来添加或移除页面、组件、服务及服务中的方法。

## 页面

执行一行命令来添加或移除一个页的相关代码和文件。

### 添加一页面

```sh
sgv build --page [page name]
```

### 移除一个页面

```sh
sgv remove --page [page name]
```

涉及到的代码和文件修改如下：

```
[project name]
`--src
  +--app
  | `--pages
  |   +--[page name]          # 新建或删除文件夹
  |   | +--[page name].ts     # 新建或删除文件
  |   | `--[page name].vue    # 新建或删除文件
  |   `--factory.page.ts      # 修改文件
  `--index.router.ts          # 修改文件
```

## 组件

执行一行命令来添加或移除一个组件的相关代码和文件。

### 添加一个组件

```sh
sgv build -c [component name]
```

### 删除一个组件

```sh
sgv remove -c [component name]
```

涉及到的代码和文件修改如下：

```
[project name]
`--src
  `--app
    `--components
      +--[component name]          # 新建或删除文件夹
      | +--[component name].ts     # 新建或删除文件
      | `--[component name].vue    # 新建或删除文件
      `--factory.comp.ts      # 修改文件
```

## 服务

执行一行命令来添加或移除一个服务的相关代码和文件。

### 添加一个服务

```sh
sgv build --service [service name]
```

### 删除一个服务

```sh
sgv remove --service [service name]
```

涉及到的代码和文件修改如下：

```
[project name]
`--src
  `--app
    `--core
      +--services
      | `--[service name].vue    # 新建或删除文件
      `--factory.serv.ts         # 修改文件
```

## 服务中的方法

执行一行命令在指定的服务中添加一个方法的相关代码和文件。默认增加以 post 方式提交的逻辑。删除需要手动。

### 添加服务中的一个方法

```sh
sgv build --service [service name] --method [method name]
```

涉及文件修改如下：

```
[project name]
`--src
  `--app
    +--config
    | `--api.conf.ts             # 修改文件
    `--core
      `--services
        `--[service name].serv.ts    # 修改文件
```

添加的代码如下：  
在 api.conf.ts 文档中 post 配置对象内增加一行

```
[method name]: "apiHost:/[method name]",
```

在 [service name].ts 文档上部接口中增加一行

```
[method name](arg: string): Promise<any>;
```

在 [service name].ts 文档中部类中增加代码块

```
public [method name](arg: string): Promise<any> {
  return this.proxyHttp.post("[method name]", {arg});
}
```

## 帮助

以上命令可以通过如下命令查看简介

```sh
sgv --help
```

以上变量命名规范为驼峰。

## 项目配置

### 服务配置

同步加载配置文件（config/site.config.js）获取  
项目配置包括：远端接口服务器地址、本地地址、远程服务协议、发布路径等。

### 接口配置

接口调用时才会合成调用路径，接口路径会由四部分构成，协议+服务器地址+微服务名+接口路径，前面两部分放在上面提到的“config/site.config.js”文件中，后面两部分放在“src/app/config/api.conf.ts”中。
