
# 💼 Virtual CV Portfolio

A modern, responsive personal portfolio and CV website built with Next.js, TypeScript, and Tailwind CSS. Ideal for developers, designers, or job seekers who want a fast, customizable, and professional online presence.

🔗 **Live Demo**: [https://mabunda.vercel.app](https://mabunda.vercel.app)

---

## 🚀 Features

- ⚡ Blazing fast with Next.js
- 🧠 Type-safe with TypeScript
- 🎨 Styled using Tailwind CSS
- 🧾 Easily customize your resume, projects, and contact info
- 📱 Fully responsive layout

---

## 🛠 Stack

| Layer         | Tech                                |
|---------------|--------------------------------------|
| Framework     | [Next.js](https://nextjs.org)        |
| Language      | [TypeScript](https://www.typescriptlang.org) |
| Styling       | [Tailwind CSS](https://tailwindcss.com) |
| Hosting       | [Vercel](https://vercel.com)         |
| Icons (opt.)  | [Lucide Icons](https://lucide.dev)   |
| Fonts (opt.)  | [Google Fonts](https://fonts.google.com) |

---

## 📁 Folder Overview

```

virtual-cv-portfolio/
├── app/                  # Main app directory (Next.js)
│   ├── layout.tsx        # Global layout and metadata
│   └── page.tsx          # Main portfolio/CV page
├── components/           # Custom reusable UI components
├── public/               # Static assets (images, favicon)
├── styles/               # Tailwind/global CSS
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS setup
├── next.config.js        # Next.js config
└── package.json          # Project dependencies

````

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- npm (v9+) or pnpm
- Git

### 🔧 Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/virtual-cv-portfolio.git
cd virtual-cv-portfolio

# 2. Install dependencies
npm install
# or
pnpm install
````

### ▶️ Running in Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build & Preview

```bash
# Build for production
npm run build

# Start production preview
npm start
```

---

## 🌐 Deployment (Vercel)

You can deploy with Vercel in seconds:

```bash
npm install -g vercel
vercel
```

Or link your GitHub repo to Vercel via the dashboard for automatic CI/CD.

---

## 📦 Project Dependencies

These dependencies will be installed via `npm install`:

```json
{
  "dependencies": {
    "autoprefixer": "^10.4.x",
    "next": "^14.x",
    "postcss": "^8.4.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^3.4.x",
    "typescript": "^5.x"
  }
}
```

You may also include:

* `lucide-react` – (optional) if you use Lucide icons
* `clsx` or `classnames` – (optional) for conditional classes

---

## ✍️ Customization

1. **Update Personal Info**
   Edit `app/page.tsx` to update your name, summary, skills, projects, and contact details.

2. **Change Styles**
   Modify `tailwind.config.ts` or global CSS under `styles/`.

3. **Add Sections**
   You can add more sections like Education, Testimonials, etc., using components in the `components/` folder.

4. **SEO & Metadata**
   Customize metadata in `layout.tsx` for better social previews and SEO.


## 👤 Author

**Muhle Mabunda**
📍 South Africa
🔗 GitHub: [@Shakira2022](https://github.com/Shakira2022)
📫 Email: [muhleusurp@gmail.com](mailto:muhleusurp@gmail.com)

---

## 🙌 Acknowledgements

* [Vercel](https://vercel.com/)

