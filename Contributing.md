# For Developers

> If you are a developer and are thinking about contributing to the project, read this guide.

### We currently use

![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/react?style=flat-square&color=blueviolet)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/matrix-js-sdk?style=flat-square&color=blueviolet)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/dev/tailwindcss?style=flat-square&color=blueviolet)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/dev/typescript?style=flat-square&color=blueviolet)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/dev/vite?style=flat-square&color=blueviolet)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/zustand?style=flat-square&color=blueviolet)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/boring-avatars?style=flat-square&color=blueviolet)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/dev/eslint?style=flat-square&color=blueviolet)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/yurixander/mirage/dev/prettier?style=flat-square&color=blueviolet)

## Get started

#### 1. Move to dev branch

```bash
git checkout master
```

#### 2. Install dependencies and run in local

```bash
npm install
```

```bash
npm run dev
```

With yarn:

```bash
yarn
```

```bash
yarn dev
```

### (Important) Before writing code

#### UI Writing

- The use of custom `TailwindCSS` variables is only for extremely special cases.
- If the created component is not a smart component, add it to the [`storybook`](#storybook) to view it.
- It should always be separated with a white line between labels. As shown in the following code, a space between `element-1` and `element-2`

```html
<div class="container">
  <div class="element-1" />

  <div class="element-2" />
</div>
```

#### Code Writing

- You must also separate with white lines in case a variable or action breaks into 2 lines or more. `adminAndModerators` is a variable whose action is divided into 2 lines, therefore it is separated from the variables above with a white line

```typescript
const users = [users...]
const timestamp = Date.now()

const adminAndModerators = process.filter(user => user.isAdmin || user.isModerator)
```

- The `hooks`: New `hooks` are only created if they are to be reused in multiple places or if the **complexity level** of a `hook` is very large.
- The use of `context` (in this case with `zustand`) is dedicated to special cases only.
- Subscription to `matrix events` is done using the created hook `useEventListener`, for example:

```typescript
useEventListener(RoomMemberEvent.Typing, (_event, member) => {})
```

## Quick Start Guide

### Storybook

<a name="storybook"></a>

When the components are not intelligent, we use a `storybook` to preview these components.

To write a preview of a component, create a new file in the path `src/stories` with the name `yourComponent.stories.tsx` of example.

✨ To facilitate the process we have a `template` with which you can quickly create a code for a `storybook`.

![Template storybook use gif](public\gif\storytemp.gif)

🔍To see the previews created in the storybook you must do:

```bash
yarn storybook
```

Or its equivalent in `npm`.

### Create Pull Request

#### In the description you must specify the following

- Title of what you did.
- List of things you did
- Photo (optional)

#### 📄 We have a pull request template here [`pull_request_template`](.github\pull_request_template.md)

### Pull Request Commit style

In the way of writing PR Commit we use `English` and `commitlint` for the style. For example:

feat: Implement `useDebounced` hook

For more information on the use of commitlint [`see here`](https://commitlint.js.org/)
