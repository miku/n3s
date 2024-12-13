# Development Notes

Development machine runs Debian 12, installed nodejs and npm via package manager,
currently v18.19.0.
```
$ nodejs --version && npm --version
v18.19.0
9.2.0
```

The [yarn](https://yarnpkg.com/corepack) package manager
wants corepack enable, and this is an extra install.

```
$ sudo npm install -g corepack
```

Corepack version 0.30.0.

```
$ corepack --version
0.30.0
```

Now let's try to enable corepack and [install yarn](https://yarnpkg.com/getting-started/install).

```
$ corepack enable
```

Once this is done, the `yarn` and `yarnpkg` binary are available on the path,
but are not actually installed yet. Looks like they are downloaded on the fly.

```
$ yarn
! Corepack is about to download https://registry.yarnpkg.com/yarn/-/yarn-1.22.22.tgz
? Do you want to continue? [Y/n]
```

There is some warning about a package manager field in package.json, which is
related to the previous example project using npm.

```
! The local project doesn't define a 'packageManager' field. Corepack will now
add one referencing
yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e.
! For more details about this field, consult the documentation at
https://nodejs.org/api/packages.html#packagemanager
```

Ok, yarn is installed.

```
$ yarn --version
1.22.22
```

Seemingly, `yarn init` requires yet another installation, now for yarkpkg?

```
$ yarn init --help
! Corepack is about to download https://repo.yarnpkg.com/4.5.2/packages/yarnpkg-cli/bin/yarn.js
? Do you want to continue? [Y/n]
```


## Scaffolding

The basic electron tutorial says `yarn init`, in the
[docs](https://www.electronjs.org/docs/latest/tutorial/quick-start), but there
are more elaborate scaffolding tools, via [yarn create](https://classic.yarnpkg.com/lang/en/docs/cli/create/).

> Creates new projects from any create-* starter kits.

This is a 2017 feature of yarn, popularized by things like create-react-app,
etc. Gosh, [create-react-app](https://github.com/facebook/create-react-app) has
103K stars on GH, I had no idea.

Sidenote: The overlap of tools like npm, npx, yarn, pnpm, bun, etc. is
confusing, cf.
[https://stackoverflow.com/a/59085518/89391](https://stackoverflow.com/a/59085518/89391);
here's a motivation for why yarn was developed and about architecture
[yarn](https://delftswa.gitbooks.io/desosa-2017/content/yarn/chapter.html). Oh
yes, the default yarn 1.22.22 is outdated, and it is recommended to use the
berry branch, [benefits](https://yarnpkg.com/migration/overview).

So, migration: [https://yarnpkg.com/migration/guide](https://yarnpkg.com/migration/guide).

Ok, let's try:

```
$ yarn set version stable
! Corepack is about to download https://repo.yarnpkg.com/4.5.3/packages/yarnpkg-cli/bin/yarn.js
? Do you want to continue? [Y/n]
```

Oh, wow, jumping 3 major versions.

```
$ yarn --version
4.5.3
```

Funnily, tutorials mention "yarn init -2" to use version "2", but we are now at
version "4", e.g.
[https://yarnpkg.com/getting-started/recipes](https://yarnpkg.com/getting-started/recipes).

Apart from that, there are a few electron helper projects:

* [https://www.reddit.com/r/electronjs/comments/1fb56bp/opinion_on_electronvite_projects/](https://www.reddit.com/r/electronjs/comments/1fb56bp/opinion_on_electronvite_projects/)

Always lots of love for all the parallel tools, like https://pnpm.io/.

So nodejs corepack is explicitly about package managers:

> Since v16.13, Node.js is shipping Corepack for managing package managers.
> This is an experimental feature, so you need to enable it by running: --
> [https://nodejs.org/api/corepack.html](https://nodejs.org/api/corepack.html)

Ran:

```
$ corepack enable pnpm
```

Oh nice, how package managers dislike each others fields in package.json

```
UsageError: This project is configured to use yarn because /home/tir/code/miku/X17/package.json has a "packageManager" field
    at Engine.findProjectSpec (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22379:21)
    at async Engine.executePackageManagerRequest (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22410:24)
    at async Object.runMain (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:23102:5) {
  clipanion: { type: 'usage' }
}
```

Ok, remove all files:

```
$ pnpm --version
9.15.0
```

Ok, so maybe I'll just alias `npm` to `pnpm` for easier typing. -- [https://www.reddit.com/r/node/comments/144xqd8/is_pnpm_really_leaves_up_to_its_hype_are_yarn_npm/](https://www.reddit.com/r/node/comments/144xqd8/is_pnpm_really_leaves_up_to_its_hype_are_yarn_npm/)

What would be good, would be a way to have quick production releases for the
application, for all platforms, dmg, AppImage, deb, etc.

2024, what's the state? [https://www.reddit.com/r/node/comments/1evtsen/what_is_now_the_state_of_package_managers/](https://www.reddit.com/r/node/comments/1evtsen/what_is_now_the_state_of_package_managers/)

> Pnpm. It deals with monorepos like a gentleman. Yarn is a disaster. Also
> pnpms caching will save you time and disks pace like crazy.

So, yarn, the lovechild, is abandoned?

> I personally haven't had any problem with Yarn 2 in ages

> Edit: Yarn 4

Ok, so we are going back to npm, plain vanilla. Done.

Next, app scaffolding.

Try another one:

* [https://scribe.rip/simform-engineering/building-cross-platform-desktop-apps-with-electron-vite-vue-3-and-electron-builder-724598092a92](https://scribe.rip/simform-engineering/building-cross-platform-desktop-apps-with-electron-vite-vue-3-and-electron-builder-724598092a92)


What is create-vite? A package: [https://www.npmjs.com/package/create-vite](https://www.npmjs.com/package/create-vite)

A generic scaffolder: [https://github.com/vitejs/vite/tree/main/packages/create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite).

We will need at least node 18+, or 20+.

> Vite requires Node.js version 18+, 20+. However, some templates require a
> higher Node.js version to work, please upgrade if your package manager warns
> about it.

So vite provides a few templates for vanilla, react, preact, lit, svelte,
solid, qwik, vue apps.

## Forge

Trying to be as vanilla in setup as possible.

* npm
* electron
* electronforge

> Electron Forge is an all-in-one solution that unifies this fractured
> ecosystem. With Forge, you can create a build pipeline that brings your app
> from development to distribution with minimal configuration.

> The key difference in philosophy between the two projects is that Electron
> Forge focuses on combining existing first-party tools into a single build
> pipeline, while Builder rewrites its own in-house logic for most build tasks.

JS ecosystem is fractured, all the way.

However, this looks really bad for the forge:

* [https://npmtrends.com/electron-builder-vs-electron-forge-vs-electron-packager](https://npmtrends.com/electron-builder-vs-electron-forge-vs-electron-packager)

A lot of personal prefs, totally ideosyncratic:

> I personally love the combo -> electron-vite + solid.js + tailwindcss & shadcn-ui !

But, yes:

> I would say another big thing to consider is electron builder vs electron forge.

> I built (https://github.com/Thavarshan/comet) using Electron Forge, Vite, Vue
> and Shadcn-Vue. Was the best developer experience ever and this was the first
> time I ever worked with Electron.


## Scaffolding

Trying to stay as vanilla as possible?

```
$ npm init electron-app@latest . -- --template=vite-typescript
```

Oh, we need a completely empty dir for that.

What is this? Running with npm and it still uses yarn?

After setup, the scaffold contains:

```
1945 directories, 13336 files
```

> We highly recommend using these templates when initializing your app to take advantage of modern front-end JavaScript tooling.

Electron builder recommends yarn, but why?

> Yarn is strongly recommended instead of npm.

Example app: "panda" -- "pen and ai"

```
$ npm init electron-app@latest panda -- --template=vite-typescript
$ cd panda
$ npm run make # to build binary dists
```

Built 419MB of artifacts.

Ok, so the live reload of the final app is nice. Basically can live code from there.

Also: there is marked, a markdown compiler. Would be enough to have an editor
and a preview window first.

* [https://codesandbox.io/p/sandbox/github/vuejs/v2.vuejs.org/tree/master/src/v2/examples/vue-20-markdown-editor?file=%2Findex.html&from-embed](https://codesandbox.io/p/sandbox/github/vuejs/v2.vuejs.org/tree/master/src/v2/examples/vue-20-markdown-editor?file=%2Findex.html&from-embed)


So we could: have a list of notes (maybe autodetected from a default folder).

```
$ npm start # dev server
```

Ok, so let's narrow it down:

* npm
* typescript, vite, electron-forge
* vue
* https://tailwindcss.com/

Marked: https://github.com/markedjs/marked

* highlighting for code blocks

> https://github.com/markedjs/marked-highlight

Or this?

* https://markdoc.dev/

Because markdown is kind of code, we could also use something like:

* https://codemirror.net/

![](static/coremirror.png)

* [https://scribe.rip/@rcwestlake/building-a-desktop-app-with-electron-codemirror-93b681237e60](https://scribe.rip/@rcwestlake/building-a-desktop-app-with-electron-codemirror-93b681237e60)

There is a full example:

* https://github.com/diversen/electron-markdown-editor

A general book on the topic of the second brain:

* https://www.google.com/search?client=firefox-b-e&q=Building+A+Second+Brain

Many MD editors have a split view:

* https://stackedit.io/app#
* https://github.com/benweet/stackedit

We want a simple sans serif, fixed width font edit area.

> cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in
> production, install it as a PostCSS plugin or use the Tailwind CLI:
> https://tailwindcss.com/docs/installation

Plugin and a CSS framework with a CLI, sure.

