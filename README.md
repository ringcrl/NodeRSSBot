# NodeRSSBot
Another telegram RSSBot in Node.js

A RSSBot in telegram similar to [https://github.com/iovxw/rssbot/](https://github.com/iovxw/rssbot/). But this time in Node.js.

# Support version
RSS is parsered using [rss-parser](https://www.npmjs.com/package/rss-parser)

# Usage
The same as [https://github.com/iovxw/rssbot/](https://github.com/iovxw/rssbot/)

```
/rss       - show subscriptions，add raw to show the link
/sub       - subscribe a RSS: /sub http://example.com/feed.xml
/unsub     - unsubscribe a RSS: /unsub http://example.com/feed.xml
/unsubthis - reply a message from a RSS feed to unsubscribe it
```

# Depolyment
## Docker

1. Install Docker
1. clone this repository `git clone https://github.com/fengkx/NodeRSSBot.git`
1. Run `docker build .` then you will get a image id
1. Run`docker run --name rssbot -d -e RSSBOT_TOKEN=<YOUR_TGBOT_TOKEN>  <YOUR_IMAGE_ID>`

for example `docker run --name rssbot -d -e RSSBOT_TOKEN=123456:abcdef123456-U  fd54321bff2`

## PM2
1. Node.js and npm installed
1. clone this repository `git clone https://github.com/fengkx/NodeRSSBot.git`
1. Set the `RSSBOT_TOKEN` environment variable or set it in config/index.js
1. Install dependencies run `npm i` in the root directory of the repository
1. Run `pm2 start index.js`

# Setting
**All setting can be set by either environment variable or in `config/index.js`**


| setting            | env              | default/require  |
| ------------------ | ---------------- | ---------------- |
| token              | RSSBOT_TOKEN     | ***require*      |
| db_path            | RSSBOT_DB_PATH   | data/database.db |
| lang               | RSSBOT_lang      | zh-cn            |
| item_num           | RSSBOT_ITEM_NUM  | 5                |
| fetch_gap          | RSSBOT_FETCH_GAP | 5                |
| notify_error_count | NOTIFY_ERR_COUNT | 5                |

language can be setting in `zh-cn` or `en`

# i18n

translate the file in `i18n` in the another yaml and make a pull request (๑•̀ㅂ•́)و✧

---------------
# 中文文档

# NodeRSSBot
又是一个 telegram RSS Bot 不过这次用的是 Node.js

模仿[https://github.com/iovxw/rssbot/](https://github.com/iovxw/rssbot/) 做的一个RSSBot，用[telegraf](https://www.npmjs.com/package/telegraf)    
首先感谢 iovxw 的 RSSBot 一直用的很好       
做这个东西只是为了，配置起来更方便一些不用安装Rust的工具链和编译

# 支持的版本
RSS 解析用的是 [rss-parser](https://www.npmjs.com/package/rss-parser)，它支持的就支持

# Usage
基本与 [https://github.com/iovxw/rssbot/](https://github.com/iovxw/rssbot/)一致
暂时不支持`export`

```
/rss       - 显示订阅列表，加 `raw`显示链接
/sub       - 订阅 RSS: /sub http://example.com/feed.xml
/unsub     - 退订 RSS: /unsub http://example.com/feed.xml
/unsubthis - 回复一个 RSS 发来的消息退订该 RSS
```

# 部署
## Docker

1. 安装 Docker
1. 克隆仓库 `git clone https://github.com/fengkx/NodeRSSBot.git`
1. 构建 docker image `docker build .` then you will get a image id
1. 运行 `docker run --name rssbot -d -e RSSBOT_TOKEN=<YOUR_TGBOT_TOKEN>  <YOUR_IMAGE_ID>`

例如 `docker run --name rssbot -d -e RSSBOT_TOKEN=123456:abcdef123456-U  fd54321bff2`

## PM2

1. 首先要有 Node.js 和 npm 或 yarn
1. 克隆仓库 `git clone https://github.com/fengkx/NodeRSSBot.git`
1. 设置 `RSSBOT_TOKEN` 环境变量，或者直接在 `config/index.js` 中修改
1. 安装依赖 在仓库根目录运行`npm i`
1. 推荐用 `pm2` 守护进程 `pm2 start index.js` 如果没有安装`pm2` 就先安装 `npm i -g pm2`

# TODO
1. export 命令
1. 代理 

# 配置项
**所有配置项都可以用环境变量或者直接在 `config/index.js`中修改**


| setting            | env              | default/require  |
| ------------------ | ---------------- | ---------------- |
| token              | RSSBOT_TOKEN     | ***require*      |
| db_path            | RSSBOT_DB_PATH   | data/database.db |
| lang               | RSSBOT_lang      | zh-cn            |
| item_num           | RSSBOT_ITEM_NUM  | 5                |
| fetch_gap          | RSSBOT_FETCH_GAP | 5                |
| notify_error_count | NOTIFY_ERR_COUNT | 5                |

语言可以设置为 `zh-cn` or `en`

# i18n
在 `i18n`目录翻译yaml文件然后来个 ·pr· (๑•̀ㅂ•́)و✧
