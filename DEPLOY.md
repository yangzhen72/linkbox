# LinkBox 一键部署

## 快速启动

```bash
cd /opt/data/plans/linkbox
docker-compose up --build
```

访问 http://localhost

## 停止服务

```bash
docker-compose down
```

## 重新构建

```bash
docker-compose up --build --force-recreate
```