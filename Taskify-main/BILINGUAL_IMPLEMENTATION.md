# 双语切换功能实现文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 文档版本 | 1.0 |
| 创建日期 | 2026年4月18日 |
| 适用项目 | Taskify |
| 功能类型 | 国际化/双语切换 (i18n) |

---

## 功能概述

为 Taskify 项目实现中英文双语切换功能，用户可通过导航栏的语言切换按钮在英文和中文之间自由切换，系统会记住用户的语言偏好。

---

## 实现方案

### 1. 架构设计

采用基于 Cookie 的轻量级国际化方案：
- **语言配置文件**：JSON 格式存储翻译文本
- **中间件**：处理语言切换逻辑
- **视图模板**：使用 EJS 模板语法动态渲染文本
- **Cookie 存储**：持久化用户语言偏好（30天）

### 2. 核心组件

#### 2.1 语言配置文件

**文件位置**：
- `src/locales/en.json` - 英文翻译
- `src/locales/zh.json` - 中文翻译

**文件结构**：
```json
{
  "nav": {
    "logo": "Taskify",
    "features": "Features",
    ...
  },
  "hero": {
    "title": "One app to replace them all",
    ...
  },
  "dashboard": {
    "title": "Dashboard",
    "overview": "Overview",
    ...
  }
}
```

**翻译覆盖范围**：
- 导航栏 (nav)
- 主页横幅 (hero)
- 功能介绍 (feature)
- 成就展示 (achievements)
- 页脚 (footer)
- 登录/注册 (signup)
- 仪表板 (dashboard)
- 语言切换按钮 (lang)

#### 2.2 语言中间件

**文件位置**：`src/middleware/language.js`

**核心逻辑**：
```javascript
const languageMiddleware = (req, res, next) => {
  // 优先级：URL参数 > Cookie > 默认英文
  let lang = req.query.lang || req.cookies?.lang || 'en';
  
  if (!['en', 'zh'].includes(lang)) {
    lang = 'en';
  }

  res.cookie('lang', lang, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.locals.lang = lang;
  res.locals.t = loadLocale(lang);
  
  next();
};
```

**功能特性**：
- 支持 URL 参数切换 (`?lang=zh`)
- 自动读取 Cookie 中的语言偏好
- 非法语言值自动回退到英文
- 将翻译对象注入到所有视图模板

#### 2.3 视图模板修改

**修改语法**：
```ejs
<!-- 修改前 -->
<span>Overview</span>

<!-- 修改后 -->
<span><%= t.dashboard.overview %></span>
```

**修改的文件**：
| 文件路径 | 修改内容 |
|----------|----------|
| `views/partials/nav.ejs` | 导航菜单项、登录/注册按钮 |
| `views/partials/hero.ejs` | 标题、邮箱输入框占位符、按钮 |
| `views/partials/feature.ejs` | 功能标题、描述、按钮文本 |
| `views/partials/achievements.ejs` | 标题、描述、统计数据标签 |
| `views/partials/footer.ejs` | 页脚标题、链接文本、版权信息 |
| `views/signup.ejs` | 表单标签、按钮文本 |
| `views/partials/dashboard/dashboard-sidebar.ejs` | 侧边栏菜单项 |
| `views/partials/dashboard/navbar-dashboard.ejs` | 搜索框、下拉菜单、语言切换按钮 |
| `views/partials/dashboard/dashboard-cards.ejs` | 项目卡片标题、时间筛选器 |

#### 2.4 样式文件修改

**新增语言切换按钮样式**：

| 文件路径 | 修改内容 |
|----------|----------|
| `static/styles/partials/nav.css` | `.language-switcher` 和 `.lang-btn` 样式 |
| `static/styles/partials/dashboard/navbar-dashboard.css` | Dashboard 导航栏语言切换按钮样式 |

**关键样式**：
```css
.language-switcher {
  display: flex;
  gap: 8px;
  align-items: center;
}

.lang-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap; /* 防止文字换行 */
}
```

---

## 语言切换流程

```
用户点击语言按钮
       ↓
URL 添加 ?lang=zh 或 ?lang=en 参数
       ↓
中间件读取 URL 参数
       ↓
更新 Cookie (lang=zh/en)
       ↓
加载对应语言 JSON 文件
       ↓
将翻译对象注入 res.locals.t
       ↓
页面重新渲染，显示对应语言文本
```

---

## 修改文件清单

### 配置文件
- `src/locales/en.json` - 新增 dashboard 翻译
- `src/locales/zh.json` - 新增 dashboard 翻译

### 中间件
- `src/middleware/language.js` - 语言处理中间件（已存在）
- `src/app.js` - 注册中间件（已存在）

### 视图文件
- `views/partials/nav.ejs`
- `views/partials/hero.ejs`
- `views/partials/feature.ejs`
- `views/partials/achievements.ejs`
- `views/partials/footer.ejs`
- `views/signup.ejs`
- `views/partials/dashboard/dashboard-sidebar.ejs`
- `views/partials/dashboard/navbar-dashboard.ejs`
- `views/partials/dashboard/dashboard-cards.ejs`

### 样式文件
- `static/styles/partials/nav.css`
- `static/styles/partials/dashboard/navbar-dashboard.css`

---

## 测试验证

### 测试场景

| 场景 | 预期结果 |
|------|----------|
| 首次访问主页 | 显示英文内容 |
| 点击"中文"按钮 | 页面切换为中文 |
| 刷新页面 | 保持中文显示 |
| 访问 Dashboard | 支持中英文切换 |
| 访问登录/注册页 | 支持中英文切换 |
| 手动输入 ?lang=zh | 切换为中文 |
| 手动输入 ?lang=invalid | 回退到英文 |

### 验证步骤

1. 启动服务器：`node src/app.js`
2. 访问 `http://localhost:3000`
3. 点击导航栏的"中文"按钮
4. 验证所有页面元素显示中文
5. 访问 `http://localhost:3000/dashboard`
6. 验证 Dashboard 页面支持双语切换
7. 清除浏览器 Cookie，刷新页面
8. 验证回退到英文显示

---

## 技术要点

### 1. 布局保护

**问题**：早期实现中，部分文件包含完整的 HTML 结构导致布局混乱。

**解决方案**：
- 确保 partial 文件只包含内容片段
- 移除 partial 文件中的 `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` 标签
- 保持正确的缩进和嵌套结构

### 2. 文字换行问题

**问题**：英文模式下中文按钮文字竖向显示。

**解决方案**：
```css
.lang-btn {
  white-space: nowrap; /* 防止文字换行 */
}
```

### 3. 语言偏好持久化

- 使用 Cookie 存储，有效期 30 天
- 优先级：URL 参数 > Cookie > 默认值
- 支持跨页面保持语言设置

---

## 参考标准

- WCAG 2.1 国际化指南
- Express.js 中间件模式
- EJS 模板语法规范
- Cookie 存储最佳实践

---

## 后续建议

1. 添加更多语言支持（如日语、韩语等）
2. 实现无刷新语言切换（AJAX）
3. 添加语言检测（基于浏览器设置）
4. 为翻译文件添加校验机制
5. 考虑使用专业的 i18n 库（如 i18next）
