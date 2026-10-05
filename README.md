# Sovue Playground

当前版本：扩建的工业深空主馆、0/1 数字流、海洋与水下环境、细化的无限城。独立于 Personal Home / Blog / Vault 的自制作品空间馆。

2026-09-12 细化：主馆扩展为多翼、多层轨道建筑群；数字无界改为 29,060 个二进制字符组成的三维流束；汪洋增加真实场景反射、多尺度波浪、岛礁、海床、弯曲海藻和带尾鳍的鱼群；无限城扩展到 570 个房间单元，并补充瓦片、格栅、门轨、榻榻米边框、灯笼骨架与楼梯栏杆。

## 运行

在本目录运行 `npm run dev`，打开 http://127.0.0.1:4180 。服务仅监听本机。

`dist/` 是完整静态网站，浏览器依赖已保存在 `dist/vendor/`，不依赖运行时 CDN、远程字体或素材。不要用 file:// 直接打开 ES 模块；使用 HTTP 预览。未来可将 dist 内容部署到 GitHub Pages，资源路径兼容子目录；本轮尚未发布。

## GitHub Pages 准备

目标公开仓库为 `xuejiehsuej/playground`，站点为 `https://xuejiehsuej.github.io/playground/`。将本项目作为独立仓库根目录，保留 `.github/workflows/pages.yml`、`package.json`、`tests/` 和完整 `dist/`（含 `vendor/`）。本项目 `dist/` 是网站源文件，必须提交；`node_modules/` 不上传。Settings → Pages → Source 选择 GitHub Actions，推送 main 或手动运行工作流后发布。已准备工作流，远端部署尚未验证。

## 操作

- 鼠标拖动：自由环顾，允许越过极点上下翻转。
- Shift + 拖动 / 右键拖动：平移。滚轮：靠近、远离。
- W A S D：前后左右；R / F：升降；Q / E：滚转。
- Home 或底部 ⌖：恢复当前空间。右上地图可直接跳转任何空间。
- 手机单指拖动环顾，双指拖动平移、捏合缩放；＋ / − 也可推进。
- 每个空间底部提供三个观察位置；无限城另有空间重排。
- 画质循环 BAL / HI / LOW；暂停只停止环境自动动效，仍可探索。
- 系统减少动态效果设置默认暂停环境动效，并省去镜头转场。隐藏标签页暂停渲染。
- 开发时加 `?debug=1` 显示帧率、帧耗时和绘制次数。普通页面不显示调试信息。

## 添加自己的作品

编辑 `dist/catalog.js` 的 `WORKS`，例如：

```js
{ title: '我的手表结构实验', category: 'mechanical', space: 'hub',
  description: '旋转、拆分和观察机芯。', url: './works/watch/index.html' }
```

作品网页可以放在 `dist/works/`，也可以填完整 HTTPS 地址。可用分类见 `CATEGORIES`。作品索引自动显示新条目，支持分类和搜索。目前作品数组为空，没有虚构展品。

环境实现分别位于 `dist/worlds/industrial.js`、`binary.js`、`pelagic.js`、`castle.js`；`kit.js` 提供实例化建模和材质工具。增加环境需要在 `worlds.js` 注册场景工厂及观察位置，在 `catalog.js` 增加元数据。现有模型均由代码生成，没有复制游戏模型或游戏素材；无限城借鉴的是交错建筑与无固定地平线的空间构想。

## 验证与范围

- `npm test`：目录路由、未知地址回退、未来作品过滤。
- `npm run check`：模块语法。
- `tools/visual-audit.mjs` 与 `tools/acceptance.mjs`：本机 Playwright / Edge 的视觉与交互检查；脚本使用本机已安装的 Playwright 路径，换电脑需调整依赖路径。
- `docs/qa/`：测试生成的截图和验收记录。

当前是可探索的首版程序化空间，不含用户尚未制作的具体作品，也不含后台编辑、上传或账号系统。镜头是自由观察模式，不做角色碰撞；移动端验证为浏览器模拟，尚未完成真实手机 GPU 性能测试。

Three.js 0.180.0 使用 MIT 许可证，见 dist/vendor/LICENSE-three.txt。
本地附带 Three.js 的 RoundedBoxGeometry、RoomEnvironment、BufferGeometryUtils、Water。Water 增加了供场景切换清理离屏缓冲区使用的生命周期引用。
