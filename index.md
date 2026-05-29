---
layout: home
title: "首页"
---

## 你好，欢迎来到我的主页 👋

这里是我的 GitHub Pages 个人站点，由 Jekyll 驱动，通过 GitHub Actions 自动部署。

### 关于我

- 💻 热爱编程与技术
- 📚 持续学习中

### 最近的文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}
