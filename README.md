# SightKey

一个用于钢琴识谱练习的轻量 PWA：屏幕显示单音符，点击键盘或连接 MIDI 键盘进行判定，记录正确率与反应时间。

## 开发

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

然后在浏览器打开：

```
http://localhost:5173
```

## 构建

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 5173
```

预览地址同样是：

```
http://localhost:5173
```

## 下载后快速打开（推荐）

1. 克隆或下载仓库到本地。
2. 进入项目目录，执行 `npm install`。
3. 执行 `npm run dev -- --host 0.0.0.0 --port 5173`。
4. 浏览器打开 `http://localhost:5173` 即可开始使用。

> 注：这是本地开发方式，不需要额外部署或服务器。

## 功能概览

- 高音/低音谱号切换
- 音域范围、升降号开关、题量设置
- 88 键可视化钢琴键盘（支持滚动）
- 正确/错误高亮反馈
- 本地保存最近一次成绩（localStorage）
- PWA 可离线使用

## MIDI 支持

浏览器支持 Web MIDI 时，可在设置中选择 “MIDI 键盘” 作为输入方式。建议使用桌面 Chrome 或 Edge。

> 如果不支持 Web MIDI，将自动降级为屏幕键盘输入。
