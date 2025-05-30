# simpleCV

一个简单易用的在线简历生成器，让用户专注于简历内容的创作，无需担心样式问题。

## 在线体验

静态网站体验：[simpleCV](https://coder66y.github.io/simpleCV)

![演示图片](./src//assets//image/image.png)

## 功能特点

### 样式编辑区

- 更改简历颜色主题
- 自定义简历字体、边距、大小
- 支持中英文切换
- 实时预览效果

### 模块编辑区

- 灵活增加/修改/删除模块
- 支持自定义模块
- 模块拖拽排序
- 模块内容实时编辑

### 导出功能

- 导出为高清图片
- 支持打印功能
- 导出为PDF格式
- 导出/导入JSON配置，方便迁移和备份

## 技术栈

- 前端框架：React + TypeScript
- 构建工具：Umi
- 样式处理：Less
- 代码规范：ESLint + Prettier
- 版本控制：Git

## 本地开发

### 环境要求

- Node.js >= 14
- npm >= 6

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/coder66y/simpleCV.git
cd simpleCV
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

5. 部署到GitHub Pages

```bash
npm run deploy
```

## 项目结构

```
simpleCV/
├── src/                # 源代码目录
│   ├── components/     # 组件目录
│   ├── pages/         # 页面目录
│   ├── assets/        # 静态资源
│   └── utils/         # 工具函数
├── public/            # 公共资源
├── .vscode/          # VSCode配置
└── package.json      # 项目配置
```

## 开发指南

### 代码规范

- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循TypeScript类型规范
- 组件采用函数式组件

### 提交规范

- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

## 贡献指南

1. Fork 本仓库
2. 创建新的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 待办事项

- [ ] 增加后台服务
- [ ] 添加更多简历模板
- [ ] 支持更多导出格式
- [ ] 添加简历内容智能建议

## 作者

[coder66y](https://github.com/coder66y)

## 许可证

MIT License
