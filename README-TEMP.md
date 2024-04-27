<link rel="stylesheet" href="src\styles\readme.css">

<div class="readme-main">
  <img width="150" alt="Mirage's logo" src="./public/logo-white.svg" />
  <img alt="User-interface preview" src="./github/preview.png" />
  <p class="description-container">A simple✨, lightweight🪶, and easy-to-use web client for the
  <a href="https://matrix.org">[Matrix] protocol</a>
  </p>
  <div>PUT HERE THE BADGES</div>
  <div class="divider"></div>
</div>

<br>
<br>

# Goals

<div class="goals">

<div>
  <img class="circle-check" alt="Circle check" src="public\icons\readme\check-list.svg">
  <span>📐 Simple & consistent UI: Maintain a clean interface that  is consistent in its design,
  and emphasizes simplicity.</span>
</div>

<div>
  <img class="circle-check" alt="Circle check" src="public\icons\readme\check-list.svg">
  <span>⚡ Feature-complete: Make all the features that the Matrix protocol has to offer, available to
  the user, whilst not polluting the UI or overwhelming the user. (Work in progress)</span>
</div>

<div>
  <img class="circle-check" alt="Circle check" src="public\icons\readme\check-list.svg">
  <span>⚡ Animations: The use of animations (where appropriate) provides deeper feedback to user
  engagement with the UI (Work in progress)</span>
</div>

<div>
  <img class="circle-check" alt="Circle check" src="public\icons\readme\check-list.svg">
  <span>✨ Themes & customization: Empower the user to customize the UI to their liking (including fonts and colors),
  enabling the creation of themes for a more personalized experience. (Work in progress)</span>
</div>

</div>

<br>
<div class="divider"></div>
<br>

# In Progress

<div class="circle-list-item">
  <div class="circle"></div>
  <span>Handling Cryptography for client</span>
</div>

<div class="circle-list-item">
  <div class="circle"></div>
  <span>Implement new Navigation section</span>
</div>

<br>
<div class="divider"></div>
<br>

# Building and Running

## Prerequisites

<div class="circle-list-item">
  <div class="circle-outline"></div>
  <a href="https://nodejs.org/en">Node.js</a>
</div>

<div class="circle-list-item">
  <div class="circle-outline"></div>
  <a href="https://yarnpkg.com/">Yarn (optional)</a>
</div>

<br>

## Building & running locally

<br>

### 1. Move to dev branch

```bash
git checkout dev
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy as dev in local

```bash
npm run dev
```

<br>
<div class="divider"></div>
<br>

# Contributing

<p>If you want to contribute to the project you can check the file <a href="Contributing.md">Contributing.md</a></p>

<br>
<div class="divider"></div>
<br>

# Technology Stack

<div class="technology-stack">
  <div class="technology-section">
    <h3>Programming language</h3>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://www.typescriptlang.org/">TypeScript</a>
    </div>
  </div>

  <div class="technology-section">
    <h3>User-interface</h3>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://reactjs.org/">React</a>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://tailwindcss.com/docs/">Tailwind CSS</a>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://react-icons.github.io/react-icons/">React icons</a>
      <span>|| UI Icon Pack<span>
    </div>
  </div>

  <div class="technology-section">
  <h3>Additional tooling & frameworks</h3>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://github.com/matrix-org/">Matrix JS SDK</a>
      <span>|| Matrix client library<span>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://vitejs.dev/">Vite.js</a>
      <span>|| Build tooling<span>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://github.com/boringdesigners/boring-avatars">Boring Avatars</a>
      <span>|| Avatar generator<span>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://day.js.org/">DayJS</a>
      <span>|| Date & time formatting library<span>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://github.com/pmndrs/zustand">Zustand</a>
      <span>|| React state-management library<span>
    </div>
    <div class="circle-list-item">
      <div class="circle-outline"></div>
      <a href="https://storybook.js.org/">Storybook.js</a>
       <span>||| Isolated component development environment<span>
    </div>
  </div>
</div>
