# Development Log

One entry per work session. Keep each entry short. The "In my own words" section matters most: write it yourself, without copying.

## Entry template

```
## YYYY-MM-DD: <what got done>
**Built:**
**Files touched:**
**Concepts learned:**
**Problems hit and how I fixed them:**
**In my own words:** (explain it as if to an interviewer)
**Interview question I could be asked:** + my answer
```

---

## Aug 2026: Frontend prototype
**Built:** React + Vite app with two screens: Home (welcome, Mr. Combs coach card, four practice cards, progress bar) and Practice session (selected mode, coach prompt, Start Speaking button, session progress, back button).
**Files touched:** `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/src/main.jsx`
**Concepts learned:** React components, JSX, the `useState` hook, conditional rendering (showing a screen based on state), responsive CSS with media queries.
**Problems hit and how I fixed them:**
**In my own words:**
**Interview question I could be asked:** "How does your app switch between screens without a router?"
My answer:

---

## 2026-10-02: Planning + Supabase setup
**Built:** Locked the MVP scope, user journey, database schema, and tech stack. Created the Supabase project, enabled email login, and turned off email confirmation for development.
**Concepts learned:** Publishable vs secret API keys, what an auth token is, why secrets never go in frontend code.
**In my own words:**
**Interview question I could be asked:** "Why can't the secret key be in your React code?"
My answer:
