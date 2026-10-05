# Halftime

*Football news, stats and shirts, served at the interval.*

A vintage-look football site: news, scores, match cards and a catalogue of classic kits,
styled like an old newspaper or match programme.

## What is in this folder

| Folder or file | What it is |
| --- | --- |
| `public/` | The website itself. Everything in here is what gets published. |
| `public/index.html` | The Front Page. Open this one to see the site. |
| `public/kits/` | The Kit Room (jersey catalogue). Placeholder page for now. |
| `public/matches/` | Match cards (stats view). Placeholder page for now. |
| `public/assets/css/halftime.css` | All the colours, fonts and layout, in one file. |
| `public/assets/fonts/` | The three typefaces, stored locally so the site works offline. |
| `public/assets/js/dateline.js` | Tiny script that writes today's date at the top of the page. |
| `public/404.html` | The "page not found" page Cloudflare shows for a wrong address. |
| `docs/HANDOFF.md` | The project brief: design system, plan and open decisions. |
| `docs/design-reference/` | The original design mock-ups. Reference only, not part of the site. |

There is no build step and nothing to install. The site is plain HTML and CSS.

## How to look at the site on Windows 11

1. Open GitHub in your browser and go to this repository.
2. Click the green **Code** button, then **Download ZIP**.
3. In **File Explorer**, open your **Downloads** folder, right-click the ZIP file
   and choose **Extract All…**, then **Extract**.
4. Open the extracted folder, then the **public** folder, and double-click **index.html**.
   It opens in your normal browser (Edge or Chrome). That is the Front Page.
5. To check the phone view, press **F12** in the browser, then press
   **Ctrl + Shift + M**. Pick an iPhone from the dropdown at the top.

The fonts download from Google Fonts, so the page looks right only while you are online.
Offline it falls back to Georgia and Courier New.

## The live site

The site is published with **GitHub Pages** at:

**https://sebastianpereirarueda-lab.github.io/Halftime/**

How it works: the `main` branch holds the source. Every time `main` changes,
a small robot (`.github/workflows/publish.yml`) copies the `public` folder to a
branch called `gh-pages`, and GitHub serves that branch as the website.
It takes about a minute. You never need to touch `gh-pages` yourself.

### Moving to Cloudflare Pages later (optional)

1. Sign in at dash.cloudflare.com and go to **Workers & Pages**, then **Create**, then **Pages**.
2. Choose **Connect to Git** and pick this repository.
3. Set **Production branch** to `main`, leave **Build command** empty, and set
   **Build output directory** to `public`.
4. Click **Save and Deploy**. Cloudflare then publishes every change to `main` on its own.

## Editing text

All the words on the Front Page live in `public/index.html`. Anything in **[square brackets]**
is placeholder text waiting for real content. Open the file in Notepad, change the
words between the tags, save, and refresh the browser.

Colours and fonts live at the top of `public/assets/css/halftime.css` under `:root`.
