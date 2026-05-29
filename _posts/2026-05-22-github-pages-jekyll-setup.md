---
layout: post
title: "GitHub Pages + Jekyll + Actions：搭建全自动个人网站"
date: 2026-05-22
category: DevOps
tags: [Jekyll, GitHub Actions, CI/CD, GitHub Pages]
---

## 为什么选这个方案？

搭个人网站方法很多：WordPress、Hexo、Hugo……我选 Jekyll + GitHub Pages 的原因很简单：

1. **零成本托管**：GitHub Pages 免费
2. **版本控制**：网站源码就是 Git 仓库
3. **自动化部署**：GitHub Actions 自动编译推送
4. **纯静态**：速度快，无安全漏洞

## 项目结构

```
my-github-page/
├── .github/workflows/deploy.yml  ← 自动部署配置
├── _config.yml                   ← Jekyll 配置
├── _data/profile.yml             ← 个人信息数据
├── _layouts/                     ← 页面布局模板
├── _includes/                    ← 页头/页脚组件
├── _posts/                       ← 博客文章
├── assets/                       ← CSS/JS/图片
└── index.html                    ← 首页
```

## GitHub Actions 工作流

核心流程只有三步：

1. **检出代码**（actions/checkout）
2. **编译 Jekyll**（jekyll build）
3. **推送到 gh-pages 分支**（peaceiris/actions-gh-pages）

每次 push 到 main 分支就自动触发，编译产物自动出现在 `gh-pages` 分支上，GitHub Pages 自动更新。

## 部署配置要点

- main 分支：放**源代码**（Jekyll 模板、Markdown 文章）
- gh-pages 分支：放**编译产物**（纯 HTML/CSS/JS）
- GitHub Pages 设置：Source 选 `gh-pages` 分支

这样以后写新文章只需要在 `_posts/` 放一个 `.md` 文件，push 上去就自动部署，完全不需要手动操作。
