# Accessibility Fixes - Screenshot Documentation

This document provides code comparison examples for accessibility fixes. Use these sections to capture screenshots for documentation purposes.

---

## 1. Main Landmark Fix

### File: `views/signup.ejs`

**Before:**
```html
<body>
  <section class="section signup-section">
    <div class="container signup-container">
```

**After:**
```html
<body>
  <main role="main">
    <section class="section signup-section" aria-labelledby="auth-heading">
      <h1 id="auth-heading" class="sr-only">Authentication</h1>
      <div class="container signup-container">
```

**Closing Tags - Before:**
```html
</div>
    </div>
  </section>
</body>
```

**Closing Tags - After:**
```html
</div>
      </div>
    </section>
  </main>
</body>
```

**Screenshot Area:** Lines 13-17 and Lines 53-56

---

## 2. Screen Reader Only Style

### File: `static/styles/signup.css`

**Added CSS Class:**
```css
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}
```

**Screenshot Area:** Lines 11-21

---

## 3. Image Alt Attributes

### File: `views/partials/nav.ejs`

**Before:**
```html
<img src="../static/images/logo.png" />
```

**After:**
```html
<img src="../static/images/logo.png" alt="Taskify logo" />
```

**Screenshot Area:** Line with logo image

---

### File: `views/partials/hero.ejs`

**Before:**
```html
<img src="../static/images/hero.png" />
```

**After:**
```html
<img src="../static/images/hero.png" alt="Laptop showing Taskify task management interface" />
```

**Screenshot Area:** Line with hero image

---

## 4. ARIA Roles in Navigation

### File: `views/partials/nav.ejs`

**Before:**
```html
<nav>
```

**After:**
```html
<nav role="navigation" aria-label="Main navigation">
```

**Screenshot Area:** Navigation opening tag

---

## 5. Form Labels Fix

### File: `views/partials/hero.ejs`

**Before:**
```html
<input type="email" placeholder="Enter your email" />
```

**After:**
```html
<label for="hero-email" class="sr-only">Email address</label>
<input type="email" id="hero-email" placeholder="Enter your email" aria-label="Email address" />
```

**Screenshot Area:** Email input field section

---

## Screenshot Checklist

| File Path | Lines | Description |
|-----------|-------|-------------|
| `views/signup.ejs` | 13-17 | Main landmark opening tags |
| `views/signup.ejs` | 53-56 | Main landmark closing tags |
| `static/styles/signup.css` | 11-21 | .sr-only CSS class |
| `views/partials/nav.ejs` | Logo line | Image alt attribute |
| `views/partials/hero.ejs` | Hero image line | Image alt attribute |
| `views/partials/nav.ejs` | Nav opening tag | ARIA role attribute |

---

## Notes for Screenshots

1. Use a clean code editor theme for better visibility
2. Ensure line numbers are visible
3. Highlight the changes using editor selection
4. Capture both "before" and "after" versions for comparison
5. Include file name and line numbers in screenshots when possible