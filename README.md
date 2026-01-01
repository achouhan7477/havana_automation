# 🎭 Playwright Automation – Casino Login Module

This repository contains a **production-grade automation framework** built using **Playwright**, focusing on the **Login module** of a real casino platform.

The project demonstrates **real-world QA/SDET practices**, including **API-first testing**, **UI validation**, **security checks**, and **CI/CD integration**.

---

## 🚀 Project Overview

- **Framework:** Playwright (Node.js)
- **Domain:** Casino / Authentication
- **Focus:** Login module (API + UI)
- **CI/CD:** GitHub Actions
- **Browsers:** Chromium (stable & CI-safe)

> ⚠️ Note:  
> Production casino platforms use **WAF / bot protection**, so **full UI login automation is intentionally avoided**.  
> Authentication correctness is validated via **API contract tests**.

---

## 🧱 Tech Stack

- **Playwright**
- **Node.js**
- **GitHub Actions (CI/CD)**
- **TypeScript**
- **REST APIs**

---

## 🧪 Testing Strategy (IMPORTANT)

### 🔵 1. API-First Approach (Core Authentication)

Login logic is validated primarily through **API tests**, covering:

- ✅ Valid login contract
- ❌ Invalid credentials
- 🔐 Security (SQL Injection, XSS)
- 📡 Headers & protocol validation
- 🚦 Behaviour & rate-limit checks

This ensures:
- Stable automation
- No dependency on UI or bot protection
- High confidence in backend logic

---

### 🟢 2. UI Testing (Safe Scope)

UI automation is **limited by design** to:

- Page load verification
- Login form element visibility
- Client-side validation behaviour
- Button state & error messages

❌ **What is intentionally skipped:**
- UI login success on production casino site  
  (blocked by WAF / bot-detection)

This is a **real industry practice**, not a limitation.

---

## 📂 Folder Structure

