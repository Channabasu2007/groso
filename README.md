# GroceryFinder

[Live demo](https://groceryfinder.vercel.app/) • *Generate ingredients from any dish name or a YouTube recipe link — then create a step-by-step blog and (soon) let users order ingredients instantly.*

---

## 🚀 What is GroceryFinder

GroceryFinder is a web app that helps users extract the ingredients and a cooking guide for any dish.

Two input modes:
- **Dish name** — type a dish name (e.g. `butter chicken`) and GroceryFinder returns the ingredients and a short step-by-step blog to prepare it.  
- **YouTube link** — paste a recipe video link and GroceryFinder identifies the ingredients used in the video and generates the blog/steps.

**Goal**: Make it easy for anyone to find what they need to cook a dish — and in a future update connect GroceryFinder to quick-commerce services so users can order missing items instantly.

---

## ⭐ Key features

- Extract ingredient list from a dish name  
- Extract ingredient list from a YouTube recipe video URL  
- Auto-generate a blog-style recipe with ordered steps  
- Clean, minimal UI, mobile responsive  
- Future roadmap: quick-commerce integration  

---

## 🧩 Tech stack

- **Frontend & Backend:** Next.js  
- **Hosting:** Vercel  
- **AI / parsing:** Google Gemini 
  

---

## ⚙️ Local setup (for developers)

```bash
# clone
git clone https://github.com/<your-username>/groceryfinder.git
cd groceryfinder

# install
npm install

# env
# create a .env.local with keys the app needs, for example:
# NEXT_PUBLIC_API_BASE_URL=
# OPENAI_API_KEY=

# dev server
npm run dev
