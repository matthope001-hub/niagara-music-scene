# Niagara Music Scene

A free, public-facing live music calendar for the Niagara Region of Ontario, Canada. Every confirmed gig from Grimsby to Fort Erie — wineries, bars, legions, breweries, and festival stages.

**Live site:** https://[your-username].github.io/niagara-music-scene

---

## What this is

A single-page website that shows the week's live music listings across the Niagara Region. Visitors can search by artist or venue, filter by city, genre, and venue type, and click any gig for details. No login required. No backend. No database.

It is designed to replace the manually-typed Facebook post with something searchable, linkable, and always current.

---

## File structure

```
niagara-music-scene/
├── index.html          ← The entire website (HTML, CSS, and JavaScript)
├── data/
│   └── gigs.js         ← This week's gig listings — edit this file each week
└── README.md           ← This file
```

---

## How to update the weekly gig listings

Open `data/gigs.js` in any text editor (or directly on GitHub.com).

Each gig is one line that looks like this:

```js
{ a:"Artist Name", v:"Venue Name", c:"City", t:"Venue Type", g:"Genre", d:5, tm:"8pm", n:"Any notes" },
```

**Field guide:**

| Field | What it is | Example |
|-------|-----------|---------|
| `a` | Artist / Band name | `"Foreshakin'"` |
| `v` | Venue name | `"My Cousin Vinny's"` |
| `c` | City | `"Niagara Falls"` |
| `t` | Venue type | `"Bar / Pub"` |
| `g` | Genre | `"Classic Rock"` |
| `d` | Day of week (0=Sun, 1=Mon … 6=Sat) | `4` for Thursday |
| `tm` | Start time | `"7:30pm"` or `"11am"` |
| `n` | Notes (optional) | `"Tickets required"` |

**Valid venue types:**
Bar / Pub · Brewery · Concert Hall · Distillery · Festival Stage · Legion · Resort / Event Centre · Winery

**Valid genres:**
Acoustic · Blues · Celtic · Classic Rock · Country · Covers · Folk · Jazz · Latin · Rock · Soul · Tribute

### To add a gig
Copy any existing line, paste it at the end of the list (before the closing `];`), and update the fields.

### To remove a gig
Delete the line.

### To edit a gig
Change the field values directly.

### To change the week
Update `BASE_DATE` near the top of the `<script>` section in `index.html`:
```js
const BASE_DATE = new Date(2026, 5, 11); // June 11 2026 — month is 0-indexed (5 = June)
```

---

## How to deploy to GitHub Pages

1. Create a free account at [github.com](https://github.com)
2. Create a new **public** repository called `niagara-music-scene`
3. Upload these files (drag and drop works on GitHub.com)
4. Go to **Settings → Pages**
5. Under "Source", select **Deploy from a branch**
6. Select **main** branch and **/ (root)** folder
7. Click Save — your site will be live at `https://[username].github.io/niagara-music-scene` within a minute or two

### Updating the site
- Edit `data/gigs.js` directly on GitHub.com (click the file → pencil icon → edit → commit)
- Changes go live automatically within 30–60 seconds
- No technical knowledge required for weekly updates

---

## Customisation

### Change the week's base date
In `index.html`, find this line near the bottom and update it:
```js
const BASE_DATE = new Date(2026, 5, 4); // Year, Month (0-indexed), Day
```

### Add your contact email
In `index.html`, find the footer section and update:
```html
<a href="mailto:hello@niagaramusicscene.ca">Email us</a>
```

### Add or remove cities from the filter
In `index.html`, find the `<select id="filter-city">` element and add or remove `<option>` lines.

---

## Built with

- Plain HTML, CSS, and JavaScript — no frameworks, no build tools
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) + [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- [Tabler Icons](https://tabler.io/icons)
- Hosted free on [GitHub Pages](https://pages.github.com)

---

## Niagara Region coverage

St. Catharines · Niagara Falls · Niagara-on-the-Lake · St. Davids · Virgil · Welland · Grimsby · Fort Erie · Port Colborne · Thorold

---

*Niagara Music Scene — connecting the region's live music community.*
