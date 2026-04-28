# LinkBox 🔗

一个美观实用的网址收藏管理应用，支持分类整理、搜索、导入导出等功能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)

## ✨ 特性

- 🔖 **网址收藏** - 轻松保存和整理网址
- 📁 **分类管理** - 自定义分类，磁贴式网格布局
- 🔍 **快速搜索** - 实时搜索书签
- 📥 **导入导出** - 支持 JSON 格式导入导出
- ✅ **有效性检测** - 自动检测链接是否有效
- 👥 **多用户支持** - 支持多个用户
- 📱 **响应式设计** - 完美适配桌面和移动端

## 🛠️ 技术栈

- **前端**: React + TypeScript + TailwindCSS + Vite
- **后端**: FastAPI + SQLite
- **部署**: Docker Compose

## 🚀 快速开始

### 前置要求

- Docker
- Docker Compose

### 安装运行

```bash
# 克隆项目
git clone https://github.com/yangzhen72/linkbox.git
cd linkbox

# 启动服务
docker-compose up -d
```

访问 http://localhost:8080

### 默认账号

- 用户名: `admin`
- 密码: `admin123`

## 📁 项目结构

```
linkbox/
├── frontend/          # 前端代码
│   ├── src/
│   │   ├── components/  # 组件
│   │   ├── pages/       # 页面
│   │   └── api.ts       # API 调用
│   └── Dockerfile
├── backend/           # 后端代码
│   ├── app/
│   │   ├── main.py      # 主程序
│   │   ├── models.py    # 数据模型
│   │   ├── schemas.py   # Pydantic 模型
│   │   └── database.py  # 数据库
│   └── Dockerfile
├── docker-compose.yml # Docker 配置
└── DEPLOY.md          # 部署文档
```

## 📝 License

MIT License