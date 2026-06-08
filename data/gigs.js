// ─────────────────────────────────────────────────────────────────────────────
// Niagara Music Scene — Gig Data
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO UPDATE:
//   Each gig entry has these fields:
//     a  = Artist / Band name
//     v  = Venue name (must match exactly for the venue filter to work)
//     c  = City
//     t  = Venue type  (Bar / Pub | Winery | Brewery | Legion | Distillery |
//                       Festival Stage | Resort / Event Centre | Concert Hall)
//     g  = Genre       (Acoustic | Blues | Celtic | Classic Rock | Country |
//                       Covers | Folk | Jazz | Latin | Rock | Soul | Tribute)
//     d  = Day of week  (0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat)
//     tm = Start time   (e.g. "7pm" or "8:30pm" — always use am/pm format)
//     n  = Notes        (optional — shown in the detail popover)
//
// TO ADD A GIG:  copy any line below, paste at the end, update the fields.
// TO REMOVE:     delete the line.
// TO EDIT:       change the field values directly.
//
// Week of: June 4–10, 2026
// ─────────────────────────────────────────────────────────────────────────────

const GIGS = [

  // ── THURSDAY Jun 4 (d:4) ────────────────────────────────────────────────
  { a:"Foreshakin'",                    v:"My Cousin Vinny's",            c:"Niagara Falls",       t:"Bar / Pub",             g:"Classic Rock", d:4, tm:"6:30pm", n:"Weekly residency — Thu, Sat & Mon" },
  { a:"Kyle McDonnell",                 v:"Niagara Falls Brewing Co.",     c:"Niagara Falls",       t:"Brewery",               g:"Acoustic",     d:4, tm:"3pm",    n:"Also at Kelsey's same evening" },
  { a:"Kyle McDonnell",                 v:"Kelsey's Niagara Falls",        c:"Niagara Falls",       t:"Bar / Pub",             g:"Acoustic",     d:4, tm:"9:30pm", n:"Two gigs today" },
  { a:"Figure Four",                    v:"Fallsview Casino BBQ",          c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:4, tm:"5pm",    n:"" },
  { a:"Ed Pizzo",                       v:"Spirit in Niagara Distillery",  c:"Niagara-on-the-Lake", t:"Distillery",            g:"Acoustic",     d:4, tm:"6:30pm", n:"Intimate tasting room" },
  { a:"Sean McDonnell & Taylor Barber", v:"Silversmith Brewery",           c:"Virgil",              t:"Brewery",               g:"Acoustic",     d:4, tm:"7pm",    n:"Duo format" },
  { a:"Latin Trio",                     v:"13th Street Winery",            c:"St. Catharines",      t:"Winery",                g:"Latin",        d:4, tm:"5pm",    n:"" },
  { a:"Rhythm & Bass",                  v:"Greater Niagara Boat Club",     c:"St. Catharines",      t:"Resort / Event Centre", g:"Soul",         d:4, tm:"6pm",    n:"" },
  { a:"Josh Edwards",                   v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Acoustic",     d:4, tm:"7:30pm", n:"" },
  { a:"Sugar Creek",                    v:"Ridgeway Legion",               c:"Fort Erie",           t:"Legion",                g:"Country",      d:4, tm:"4pm",    n:"Regular Thursday slot" },
  { a:"Craig McNair",                   v:"MT Bellies",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Acoustic",     d:4, tm:"6pm",    n:"" },

  // ── FRIDAY Jun 5 (d:5) ──────────────────────────────────────────────────
  { a:"Figure Four",                    v:"Cat's Caboose",                 c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:5, tm:"9pm",    n:"" },
  { a:"Chris Madronich",                v:"Bridgewater Brewery",           c:"Port Colborne",       t:"Brewery",               g:"Blues",        d:5, tm:"7pm",    n:"Also performs as Gravely James — 3× NMA winner" },
  { a:"Ryan Thomas",                    v:"Kilt & Clover",                 c:"Niagara Falls",       t:"Bar / Pub",             g:"Acoustic",     d:5, tm:"9:30pm", n:"" },
  { a:"Jay Diem Band",                  v:"Grand Central",                 c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:5, tm:"10pm",   n:"" },
  { a:"Patsy & the Muscle",             v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:5, tm:"8:30pm", n:"" },
  { a:"Dragan on sax",                  v:"Spirit in Niagara Distillery",  c:"Niagara-on-the-Lake", t:"Distillery",            g:"Jazz",         d:5, tm:"6:30pm", n:"" },
  { a:"Mike Lynch",                     v:"13th Street Winery",            c:"St. Catharines",      t:"Winery",                g:"Acoustic",     d:5, tm:"5pm",    n:"" },
  { a:"Troy Harmer & the Persuaders",   v:"Splash Bar",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Soul",         d:5, tm:"9:30pm", n:"" },
  { a:"Don Sexsmith",                   v:"Teddy's Sports Bar",            c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:5, tm:"8pm",    n:"" },
  { a:"LMT Connection",                 v:"Welland Concerts on the Canal", c:"Welland",             t:"Festival Stage",        g:"Rock",         d:5, tm:"7pm",    n:"w/ The Mandevilles & Phil Davis" },
  { a:"Full Mulletti",                  v:"Trappers Sports Bar",           c:"Niagara Falls",       t:"Bar / Pub",             g:"Classic Rock", d:5, tm:"8pm",    n:"" },
  { a:"Brad & Miles Boland",            v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Acoustic",     d:5, tm:"4:15pm", n:"Montebello Park — free entry" },
  { a:"Kanbora Latin Duo",              v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Latin",        d:5, tm:"6:30pm", n:"Montebello Park — free entry" },
  { a:"Luis Franco",                    v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Latin",        d:5, tm:"8pm",    n:"Montebello Park — free entry" },

  // ── SATURDAY Jun 6 (d:6) ────────────────────────────────────────────────
  { a:"Sugar Heat Band",                v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Soul",         d:6, tm:"2:30pm", n:"Montebello Park — free entry" },
  { a:"Manhattan Jazz Band",            v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Jazz",         d:6, tm:"4:30pm", n:"Montebello Park — free entry" },
  { a:"Hard Rock Hooligans",            v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Rock",         d:6, tm:"6:30pm", n:"Montebello Park — free entry" },
  { a:"The Outlander Band",             v:"Flower & Wine Festival",        c:"St. Catharines",      t:"Festival Stage",        g:"Country",      d:6, tm:"7:30pm", n:"Montebello Park — free entry" },
  { a:"Foreshakin'",                    v:"My Cousin Vinny's",             c:"Niagara Falls",       t:"Bar / Pub",             g:"Classic Rock", d:6, tm:"6:30pm", n:"Saturday residency" },
  { a:"Jay Diem Band",                  v:"Trappers Sports Bar",           c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:6, tm:"8pm",    n:"" },
  { a:"Jay Diem",                       v:"Wildflower Social",             c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:6, tm:"5pm",    n:"" },
  { a:"Blue Etc",                       v:"Regency Athletic Resort",       c:"St. Catharines",      t:"Resort / Event Centre", g:"Blues",        d:6, tm:"2:30pm", n:"Recurring Saturday format" },
  { a:"Brant Parker Band",              v:"Donnelly's Pub",                c:"St. Catharines",      t:"Bar / Pub",             g:"Rock",         d:6, tm:"2:30pm", n:"w/ guest Morgan Davis" },
  { a:"LMT Connection",                 v:"Lucky's Fallsview Casino",      c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:6, tm:"9pm",    n:"" },
  { a:"Full Mulletti",                  v:"Lucky Penny",                   c:"Niagara Falls",       t:"Bar / Pub",             g:"Classic Rock", d:6, tm:"6pm",    n:"" },
  { a:"Front Paige & Dane Blues Duo",   v:"13th Street Winery",            c:"St. Catharines",      t:"Winery",                g:"Blues",        d:6, tm:"1pm",    n:"" },
  { a:"The O'Deadleys",                 v:"Kilt & Clover",                 c:"Niagara Falls",       t:"Bar / Pub",             g:"Celtic",       d:6, tm:"9:30pm", n:"" },
  { a:"I'll Scarlett",                  v:"The Warehouse",                 c:"St. Catharines",      t:"Concert Hall",          g:"Rock",         d:6, tm:"7pm",    n:"Tickets required" },
  { a:"Stonewall",                      v:"Welland Legion",                c:"Welland",             t:"Legion",                g:"Classic Rock", d:6, tm:"7pm",    n:"" },
  { a:"Tommy Davies",                   v:"Thorold Legion",                c:"Thorold",             t:"Legion",                g:"Country",      d:6, tm:"7pm",    n:"" },
  { a:"Strictly Sabbath",               v:"Sessions on the River",         c:"Fort Erie",           t:"Festival Stage",        g:"Tribute",      d:6, tm:"7pm",    n:"Black Sabbath tribute — tickets required" },
  { a:"Feverish Lemons",                v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:6, tm:"8:30pm", n:"" },
  { a:"Cash-Crow",                      v:"Crystal Chandelier",            c:"Niagara Falls",       t:"Bar / Pub",             g:"Country",      d:6, tm:"7pm",    n:"" },

  // ── SUNDAY Jun 7 (d:0) ──────────────────────────────────────────────────
  { a:"The Mandevilles",                v:"13th Street Winery",            c:"St. Catharines",      t:"Winery",                g:"Folk",         d:0, tm:"1pm",    n:"Recurring Sunday slot" },
  { a:"Taylor Barber & Kyle McDonnell", v:"Bella Terra Vineyard",          c:"Niagara-on-the-Lake", t:"Winery",                g:"Acoustic",     d:0, tm:"11am",   n:"Winery duo set" },
  { a:"Jay Diem",                       v:"Trailsides Bar & Grill",        c:"St. Catharines",      t:"Bar / Pub",             g:"Rock",         d:0, tm:"4pm",    n:"" },
  { a:"Feverish Lemons Trio",           v:"Merchant Ale House",            c:"St. Catharines",      t:"Bar / Pub",             g:"Rock",         d:0, tm:"2pm",    n:"" },
  { a:"Stonewall",                      v:"Ridgeway Legion",               c:"Fort Erie",           t:"Legion",                g:"Classic Rock", d:0, tm:"4pm",    n:"Played Welland Legion Saturday" },
  { a:"Saxophonist Jim Gay",            v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Jazz",         d:0, tm:"6:30pm", n:"Sunday Jazz Series" },
  { a:"On Tap",                         v:"Super Mario's",                 c:"Niagara Falls",       t:"Bar / Pub",             g:"Covers",       d:0, tm:"4pm",    n:"" },

  // ── MONDAY Jun 8 (d:1) ──────────────────────────────────────────────────
  { a:"Alfie Duo",                      v:"13th Street Winery",            c:"St. Catharines",      t:"Winery",                g:"Acoustic",     d:1, tm:"1pm",    n:"1pm–4pm" },
  { a:"Will Rowe",                      v:"Canalside Restaurant",          c:"Port Colborne",       t:"Bar / Pub",             g:"Acoustic",     d:1, tm:"7pm",    n:"" },
  { a:"Open Mic",                       v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Covers",       d:1, tm:"7:30pm", n:"7:30pm–10:30pm" },
  { a:"Jay Diem",                       v:"Hard Rock Cafe",                c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:1, tm:"4pm",    n:"" },
  { a:"Foreshakin'",                    v:"My Cousin Vinny's",             c:"Niagara Falls",       t:"Bar / Pub",             g:"Classic Rock", d:1, tm:"6:30pm", n:"6:30pm–9:30pm — Monday residency" },
  { a:"Open Mic w/ Deez Nuts",          v:"Pitcher's",                     c:"Niagara Falls",       t:"Bar / Pub",             g:"Covers",       d:1, tm:"6pm",    n:"6pm–9pm" },

  // ── TUESDAY Jun 9 (d:2) ─────────────────────────────────────────────────
  { a:"Open Mic w/ Mark Swayze",        v:"Borderline Bar",                c:"Niagara Falls",       t:"Bar / Pub",             g:"Covers",       d:2, tm:"8pm",    n:"8pm–11pm" },
  { a:"Zach Preston",                   v:"Eh Amigos",                     c:"Port Colborne",       t:"Bar / Pub",             g:"Acoustic",     d:2, tm:"5:30pm", n:"5:30pm–8:30pm" },
  { a:"Open Mic",                       v:"Puddy's",                       c:"Niagara Falls",       t:"Bar / Pub",             g:"Covers",       d:2, tm:"6pm",    n:"6pm–9pm" },
  { a:"Heavy Metal Jam",                v:"Westside Pizzeria",             c:"St. Catharines",      t:"Bar / Pub",             g:"Rock",         d:2, tm:"7pm",    n:"" },

  // ── WEDNESDAY Jun 10 (d:3) ──────────────────────────────────────────────
  { a:"Open Mic",                       v:"Donnelly's Pub",                c:"St. Catharines",      t:"Bar / Pub",             g:"Covers",       d:3, tm:"7pm",    n:"" },
  { a:"The Other Band",                 v:"Irish Harp",                    c:"Niagara Falls",       t:"Bar / Pub",             g:"Rock",         d:3, tm:"6:30pm", n:"6:30pm–9:30pm" },
  { a:"John Atlee",                     v:"Smithville Legion",             c:"Smithville",          t:"Legion",                g:"Country",      d:3, tm:"7pm",    n:"West Lincoln" },

];
