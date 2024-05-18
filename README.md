# 国内 Github 解决方案

## Github 国内问题

国内网络访问 Github 速度过慢的原因有许多，但其中最直接的原因是其 CND 域名遭到 DNS 污染，导致我们无法连接使用 GitHub 的加速服务，因此访问速度缓慢或访问不了。

## 什么是 DNS 污染

DNS 污染，是指一些刻意或无意制造出来的数据包，把域名指向不正确的 IP 地址阻碍了网络访问。我们默认从目标网址的最近 CDN 节点获取内容，但当节点过远或 DNS 指向错误时，就会操成访问速度过慢或无法访问等问题。

## Github 解决方案

<p align="left">
  <img 
    style="width: 100%; margin: 0 auto;" 
    src="https://linpengteng.github.io/resource/dns-host/github.png" 
    alt="Remote Github Right DNS"
  >
</p>

**SwitchHosts** + **Remote Github Right DNS**

- [`SwitchHosts`](https://switchhosts.vercel.app/zh) - 开发人员必备的跨平台 hosts 管理工具 (支持 Remote Host)

- `Right DNS IP` - 借助于 **Github Actions** 定时更新 DNS IP (脚本: scripts/bin.mjs)
  - [https://dns-host.github.io/github/host.txt](https://dns-host.github.io/github/host.txt)
  - [~~https://dns-host.gitee.io/github/host.txt~~](https://dns-host.gitee.io/github/host.txt) (目前 gitee 已暂停 Pages 服务)
  - [https://gitee.com/dns-host/github/raw/gh-pages/host.txt](https://gitee.com/dns-host/github/raw/gh-pages/host.txt) (推荐)
