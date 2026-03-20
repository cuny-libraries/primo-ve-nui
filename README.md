# primo-ve-nui

Customization packages for CUNY's Primo VE New UI (NUI), plus a local development environment for previewing changes before they go live.

## How it works

This repository holds the CSS, JavaScript, HTML, and image files for every CUNY campus's Primo view, along with a shared **central package** that all campuses inherit. You edit files locally, preview them against the live Primo instance in your browser, then open a pull request. Once OLS merges it, GitHub Actions automatically builds the zip packages ready to upload to the Back Office.

```
Your machine                     GitHub                        Primo Back Office
────────────────                 ──────────────────────        ─────────────────
Edit files locally  →  Push branch & open PR  →  OLS merges  →  OLS uploads zip
Preview via Docker                                              (GitHub Actions
at localhost:8003                                               builds zips on merge)
```

---

## For campus librarians

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git installed — [GitHub's getting started guide](https://docs.github.com/en/get-started/getting-started-with-git) if you need a refresher
- A GitHub account with access to [github.com/cuny-libraries](https://github.com/cuny-libraries)
- Your 2-character campus code (e.g. `kb` for Kingsborough)

### One-time setup

```bash
git clone https://github.com/cuny-libraries/primo-ve-nui.git
cd primo-ve-nui
docker compose build
```

The last step downloads the development environment into Docker — it takes a few minutes the first time and doesn't need to be repeated unless OLS announces an update.

### Making changes

**1. Start from an up-to-date main branch**

```bash
git checkout main
git pull
```

**2. Create a branch for your work**

Include your campus code in the branch name:

```bash
git checkout -b kb/update-homepage
```

**3. Start the local preview server**

```bash
./run.sh kb
```

Replace `kb` with your 2-character campus code. This starts a local server that proxies your live Primo instance — so you'll see real search results with your local customizations applied.

**4. Open the preview in your browser**

```
http://localhost:8003/discovery/?vid=01CUNY_KB:CUNY_KB
```

Replace both instances of `KB` with your uppercase campus code.

**5. Edit your campus files**

Your files are in `primo-explore/custom/CUNY_KB/` (substitute your code):

```
primo-explore/custom/CUNY_KB/
├── css/
│   └── custom1.css       ← your custom styles
├── js/
│   └── custom.js         ← your custom JavaScript
├── html/
│   └── homepage/
│       └── homepage_en.html  ← your homepage HTML
└── img/                  ← logos, favicon, icons
```

Save a file and refresh your browser to see changes immediately. Stop the server with `Ctrl+C` when you're done.

> **Please limit your changes to your own campus folder.** You're welcome to look inside other campuses' folders for inspiration, but changes to them — or to `CENTRAL_PACKAGE` — belong to OLS. Any accidental changes will be caught during PR review anyway.

**6. Commit and push your changes**

```bash
git add primo-explore/custom/CUNY_KB/
git commit -m "Brief description of what you changed"
git push origin kb/update-homepage
```

**7. Open a pull request**

Go to [github.com/cuny-libraries/primo-ve-nui](https://github.com/cuny-libraries/primo-ve-nui) — GitHub will show a prompt to open a PR from your branch. Add a short description of what you changed and why, then submit it for review.

OLS will review your changes, ask questions if needed, and merge when ready. Once merged, your changes will be packaged and deployed to your live Primo view by OLS.

---

## For OLS Systems Librarians

### Running the dev server

```bash
./run.sh <campus>     # e.g. ./run.sh kb
./run.sh network      # CUNY_NETWORK view (proxies cuny-network.primo.exlibrisgroup.com)
./run.sh central      # CENTRAL_PACKAGE only (proxies through cuny-network)
```

Running with no argument lists all available views.

Preview URL: `http://localhost:8003/discovery/?vid=01CUNY_KB:CUNY_KB`

### Working on the central package

`CENTRAL_PACKAGE` is inherited by all 22 IZ views. Changes here affect everyone — test carefully.

```bash
./run.sh central
```

Preview against any campus by substituting their `vid`. Since the central package is inherited by all, any campus URL will reflect central package changes.

### Reviewing and merging PRs

- Check that changes are limited to the submitting campus's folder
- Use the GitHub preview to read through the diff before approving
- Merging to `main` triggers the **Create Packages** GitHub Actions workflow automatically

### Deploying to production

After merging a PR:

1. Go to the **Actions** tab in this repository
2. Open the latest **Create Packages** run
3. Download the `primo-ve-packages` artifact (a zip containing all 24 packages)
4. Extract it and upload the relevant `.zip` file(s) to the appropriate Back Office:
   - **IZ package**: `Alma > Discovery > Display Configuration > Configure Views > Manage Customization Package`
   - **Central package**: same path, in the **Network Zone** Back Office
5. Deploy in the Back Office

### If the dev environment itself needs updating

If `Dockerfile`, `package.json`, or anything in `gulp/` changes, campus librarians will need to rebuild their local Docker image:

```bash
docker compose build
```

Announce this to campus librarians when it happens — they won't know to rebuild otherwise.

---

## Package structure reference

| Folder | Description |
|---|---|
| `CENTRAL_PACKAGE/` | Inherited by all campuses. Managed by OLS. |
| `CUNY_NETWORK/` | The network-level Primo view. Managed by OLS. |
| `CUNY_XX/` | Campus-specific package. Managed by that campus (with OLS review). |

## Resources

- [Primo VE Customization documentation](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/020Primo_VE/Primo_VE_(English)/030Primo_VE_User_Interface/010Primo_VE_Customization_-_Best_Practices) — Ex Libris Knowledge Center
- [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) — the underlying development environment this repo is built on
- [Git handbook](https://docs.github.com/en/get-started/using-git/about-git) — GitHub
- [Atlassian Git tutorials](https://www.atlassian.com/git/tutorials) — good reference for branching and pull request workflows
