# IELTS Academic Writing — Practice Platform

A self-contained web app for practising **IELTS Academic Writing Task 1 & Task 2**,
designed to feel like the real computer-delivered exam (CD-IELTS): split screen,
countdown timer, live word count, draft auto-saving and completion tracking — all
stored locally in the browser. No backend.

> Interface help/navigation is in Spanish; **all exam content, rubrics and
> exercises are in English** for IELTS authenticity.

## Features

- **Free practice**
  - Task 1: **30 exercises** — 6 bar charts, 6 line graphs, 4 pie charts, 4 tables,
    4 process diagrams, 3 maps (before/after), 3 mixed/combination charts. Every
    visual renders from real, complete data.
  - Task 2: **40 essay prompts** — 10 opinion, 8 discussion, 7 advantages/disadvantages,
    8 problem & solution, 7 two-part. Each labelled with its type.
  - Band 8–9 **model answer** for every exercise (hidden by default — write first,
    then compare).
- **Structure Mode (band-9 templates)** — 15 Task 1 + 15 Task 2 guided skeletons
  with labelled boxes (Introduction / Overview / Body / Conclusion), sentence
  frames and connectors. **3-level fading scaffolding** per template:
  1. *Con guías* — labels + sentence frames + connectors
  2. *Solo etiquetas* — labels only (recall from memory)
  3. *En blanco* — blank sheet, with a **"Show the mould"** self-check
- **Baby-steps progression** — a single "Siguiente paso" micro-action, box-by-box
  practice, a progress ladder, per-structure mastery bars, a practice streak, and
  self-tagged difficulty (items you mark *"me costó"* get prioritised).
- **Exam tools** — countdown timer (20 min Task 1 / 40 min Task 2 / 60 min Full
  Test) that turns amber in the last 5 min and red in the last minute without
  blocking writing; live CD-IELTS-style word counter with a study target indicator;
  spellcheck disabled to mirror the exam.
- **Persistence** — drafts, word counts, time spent, completion, criteria checklists
  and difficulty are auto-saved to `localStorage`. Export everything to `.txt` or `.json`.
- **Full Test** — Task 1 + Task 2 back to back under one 60-minute clock.

## Tech stack

- React 18 (single-page) + Vite
- Tailwind CSS
- Recharts for data charts; inline SVG for process diagrams and maps (data-driven
  renderers, not hand-drawn one-offs)
- `localStorage` for all state

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Deploy to Netlify

The repo includes `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Connect the repo in Netlify (or drag-and-drop the `dist/` folder). The SPA
redirect rule is already configured.

## Project structure

```
src/
  data/            content (generated chart datasets, essay prompts, authored
                   maps/mixed charts, skeletons, templates, phrase banks)
  components/      Timer, WordCounter, charts/ (Bar, Line, Pie, Table, Process,
                   Map, Mixed), ModelAnswer, PhraseBank, CriteriaChecklist, …
  views/           Dashboard, PracticeList, PracticeView, StructureList,
                   StructureView, FullTest
  state/           store (localStorage), selectors (progress / next-step engine)
  lib/             word count, rubric builders, export helpers
```
