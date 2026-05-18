# Legal Compliance: Cookie Banner & Privacy Policy 实现文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 文档版本 | 1.0 |
| 创建日期 | 2026年4月18日 |
| 适用项目 | Taskify |
| 功能类型 | 法律合规 (Legal Compliance) |

---

## 功能概述

为 Taskify 项目实现符合 GDPR 等隐私法规要求的 Cookie 同意横幅和专用隐私政策页面，确保用户在访问网站时能够了解并控制其个人数据的使用。

---

## 实现方案

### 1. Cookie Banner（Cookie 同意横幅）

#### 1.1 组件文件

**文件位置**：`views/partials/cookie-banner.ejs`

**功能特性**：
- 固定在页面底部的横幅
- 包含 Cookie 使用提示信息
- "接受"和"拒绝"两个操作按钮
- "了解更多"链接指向隐私政策页面
- 使用 `role="dialog"` 和 `aria-label` 提供无障碍访问支持

#### 1.2 样式文件

**文件位置**：`static/styles/partials/cookie-banner.css`

**设计特点**：
- 固定定位在页面底部 (`position: fixed; bottom: 0`)
- 白色背景，顶部蓝色边框
- 响应式设计，移动端自动调整布局
- 高 z-index (9999) 确保在所有内容之上

#### 1.3 Cookie 存储逻辑

```javascript
// 检查是否已有 Cookie 同意记录
var cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));

// 用户点击接受
document.cookie = 'cookie_consent=accepted; max-age=31536000; path=/';

// 用户点击拒绝
document.cookie = 'cookie_consent=declined; max-age=31536000; path=/';
```

**Cookie 有效期**：31536000 秒（365天）

### 2. Privacy Policy（隐私政策页面）

#### 2.1 页面文件

**文件位置**：`views/privacy-policy.ejs`

**页面结构**：
- 使用 `<main role="main">` 作为主内容区域
- 包含 10 个章节的完整隐私政策内容
- 支持中英文双语切换
- 底部提供"返回首页"按钮

#### 2.2 样式文件

**文件位置**：`static/styles/privacy-policy.css`

**设计特点**：
- 最大宽度 800px 的居中布局
- 白色卡片式内容区域
- 清晰的章节标题分隔线
- 响应式设计适配移动端

#### 2.3 隐私政策章节

| 章节 | 内容 |
|------|------|
| 1. 简介 | 隐私政策目的和承诺 |
| 2. Cookie | Cookie 使用说明（必要、功能、分析） |
| 3. 数据收集 | 收集的个人信息类型 |
| 4. 数据使用 | 数据使用目的 |
| 5. 数据共享 | 第三方数据共享政策 |
| 6. 数据安全 | 安全保护措施 |
| 7. 用户权利 | GDPR 规定的用户权利 |
| 8. Cookie 管理 | 如何管理 Cookie 偏好 |
| 9. 政策变更 | 政策更新通知机制 |
| 10. 联系我们 | 联系方式 |

---

## 修改文件清单

### 新增文件

| 文件路径 | 描述 |
|----------|------|
| `views/partials/cookie-banner.ejs` | Cookie 横幅组件 |
| `static/styles/partials/cookie-banner.css` | Cookie 横幅样式 |
| `views/privacy-policy.ejs` | 隐私政策页面 |
| `static/styles/privacy-policy.css` | 隐私政策页面样式 |

### 修改文件

| 文件路径 | 修改内容 |
|----------|----------|
| `views/index.ejs` | 引入 Cookie 横幅组件和样式 |
| `views/signup.ejs` | 引入 Cookie 横幅组件和样式 |
| `views/dashboard/dashboard.ejs` | 引入 Cookie 横幅组件和样式 |
| `views/partials/footer.ejs` | 隐私链接指向 `/privacy-policy` |
| `src/app.js` | 添加 `/privacy-policy` 路由 |
| `src/locales/en.json` | 添加 `cookie_banner` 和 `privacy_policy` 翻译 |
| `src/locales/zh.json` | 添加 `cookie_banner` 和 `privacy_policy` 翻译 |

---

## 双语支持

### Cookie Banner 翻译

| 键 | 英文 | 中文 |
|----|------|------|
| `cookie_banner.message` | We use cookies to enhance your experience... | 我们使用 Cookie 来提升您的体验... |
| `cookie_banner.learn_more` | Learn more | 了解更多 |
| `cookie_banner.accept` | Accept | 接受 |
| `cookie_banner.decline` | Decline | 拒绝 |

### Privacy Policy 翻译

| 键 | 英文 | 中文 |
|----|------|------|
| `privacy_policy.title` | Privacy Policy | 隐私政策 |
| `privacy_policy.cookies_title` | Cookies | Cookie |
| `privacy_policy.data_collection_title` | Data Collection | 数据收集 |
| `privacy_policy.your_rights_title` | Your Rights | 您的权利 |
| `privacy_policy.back_to_home` | Back to Home | 返回首页 |

---

## 用户流程

```
用户首次访问网站
       ↓
显示 Cookie 横幅
       ↓
用户点击"接受"或"拒绝"
       ↓
存储 cookie_consent Cookie（365天）
       ↓
横幅隐藏
       ↓
用户可随时访问页脚"隐私"链接查看隐私政策
```

---

## 测试验证

### 测试场景

| 场景 | 预期结果 |
|------|----------|
| 首次访问网站 | 显示 Cookie 横幅 |
| 点击"接受" | 横幅消失，存储 accepted Cookie |
| 点击"拒绝" | 横幅消失，存储 declined Cookie |
| 刷新页面（已有 Cookie） | 横幅不显示 |
| 点击"了解更多" | 跳转到 /privacy-policy 页面 |
| 点击页脚"隐私"链接 | 跳转到 /privacy-policy 页面 |
| 隐私政策页面切换语言 | 内容正确翻译 |
| 删除 Cookie 后刷新 | 横幅重新显示 |

### 验证步骤

1. 启动服务器：`node src/app.js`
2. 打开浏览器无痕模式
3. 访问 `http://localhost:3000`
4. 验证 Cookie 横幅显示在页面底部
5. 点击"了解更多"验证跳转到隐私政策页面
6. 点击"接受"验证横幅消失
7. 刷新页面验证横幅不再显示
8. 点击页脚"隐私"链接验证跳转到隐私政策页面
9. 切换语言验证隐私政策内容正确翻译

---

## 合规性说明

### GDPR 合规要点

| 要求 | 实现方式 |
|------|----------|
| 明确同意 | 提供"接受"和"拒绝"按钮 |
| 信息透明 | 横幅说明 Cookie 使用目的 |
| 随时撤回 | 用户可清除 Cookie 重新选择 |
| 隐私政策 | 提供详细的隐私政策页面 |
| 数据权利 | 列出用户的数据权利 |

### Cookie 类型说明

| 类型 | 说明 | 是否必需 |
|------|------|----------|
| 必要 Cookie | 网站正常运行所必需 | 是 |
| 功能 Cookie | 语言偏好等个性化设置 | 否 |
| 分析 Cookie | 匿名使用数据统计 | 否 |

---

## 技术要点

### 1. Cookie 存储

- 使用原生 JavaScript 操作 Cookie
- 设置 `path=/` 确保全站可用
- 设置 `max-age=31536000`（365天）有效期

### 2. 无障碍访问

- Cookie 横幅使用 `role="dialog"` 语义
- 添加 `aria-label="Cookie consent"` 描述
- 隐私政策页面使用 `<main role="main">` 地标

### 3. 响应式设计

- 移动端横幅内容垂直排列
- 按钮在移动端自动调整宽度
- 隐私政策页面在小屏幕上调整字号和间距

---

## 参考标准

- GDPR（通用数据保护条例）
- ePrivacy Directive（电子隐私指令）
- WCAG 2.1 无障碍指南
- Cookie 存储最佳实践

---

## 后续建议

1. 添加详细的 Cookie 分类管理界面
2. 实现 Cookie 偏好撤回功能
3. 添加 Cookie 使用统计报告
4. 定期更新隐私政策内容
5. 添加数据导出和删除功能
