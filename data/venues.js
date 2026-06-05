// =============================================================================
// Niagara Music Scene — Venue Profiles
// =============================================================================
//
// HOW TO ADD OR UPDATE A VENUE:
//
//   1. Find the venue alphabetically (or add it in the right place)
//   2. Update the fields — leave any field as "" to hide it
//   3. Save the file
//
// IMPORTANT: The key (venue name in quotes) must match EXACTLY how it appears
//            in gigs.js — same spelling, same capitalisation, punctuation.
//
// FIELDS:
//   city     = city within Niagara Region
//   type     = Bar / Pub | Brewery | Winery | Legion | Distillery |
//               Concert Hall | Festival Stage | Resort / Event Centre |
//               Café / Lounge | Yacht Club / Boat Club
//   address  = street address (used for Google Maps link)
//   web      = venue website URL
//   fb       = Facebook page URL
//   ig       = Instagram URL
//   notes    = one line about the venue's music program
//
// =============================================================================

const VENUE_PROFILES = {

  // ── A ───────────────────────────────────────────────────────────────────────

  "Americana Resort Patio": {
    city:    "Niagara Falls",
    type:    "Resort / Event Centre",
    address: "8444 Lundy's Lane, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Tourist resort patio — seasonal acoustic bookings."
  },

  // ── B ───────────────────────────────────────────────────────────────────────

  "Bank Art House": {
    city:    "Niagara Falls",
    type:    "Concert Hall",
    address: "4601 Queen St, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Ticketed events. Intimate arts venue in a heritage building."
  },

  "Barrelhead": {
    city:    "Niagara-on-the-Lake",
    type:    "Winery",
    address: "1696 Niagara Stone Rd, Niagara-on-the-Lake, ON L0S 1J0",
    web:     "https://pillitteri.com/barrelhead",
    fb:      "",
    ig:      "",
    notes:   "Wine and pizza bar at Pillitteri Estates Winery. Live music Thursday through Sunday. Patio and indoor seating."
  },

  "Bella Terra Vineyard": {
    city:    "Niagara-on-the-Lake",
    type:    "Winery",
    address: "1186 Line 3, Niagara-on-the-Lake, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Winery duo sets. Acoustic and folk. Sunday mornings."
  },

  "Big Texas": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "5779 Victoria Ave, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Late-night live music on weekends. Cover charge applies."
  },

  "Borderline Bar": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Open mic nights. Acoustic-friendly room."
  },

  "Bridgewater Brewery": {
    city:    "Port Colborne",
    type:    "Brewery",
    address: "Port Colborne, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Friday live music. Blues and acoustic focus. Home venue for Gravely James."
  },

  "Buck's Basement": {
    city:    "St. Catharines",
    type:    "Bar / Pub",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Sunday afternoon sessions. Casual, community feel."
  },

  // ── C ───────────────────────────────────────────────────────────────────────

  "Camp Cataract": {
    city:    "Niagara Falls",
    type:    "Concert Hall",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Ticketed events. Independent and alternative music focus."
  },

  "Cat's Caboose": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "5765 Victoria Ave, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and classic rock. Friday and Saturday live music."
  },

  "Chip & Charlie's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Variety of genres."
  },

  "Chippawa Legion": {
    city:    "Niagara Falls",
    type:    "Legion",
    address: "Chippawa, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country and classic rock. Community crowd. Friday and Saturday bookings."
  },

  "Coco's Mexican Bar": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Late-night bookings."
  },

  "Cool Hand Luke's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Late-night rock and classic rock. Weekend bookings."
  },

  "Coronation Park": {
    city:    "Grimsby",
    type:    "Festival Stage",
    address: "Grimsby, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Outdoor community events. Jazz and big band format."
  },

  "Crystal Chandelier": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country, rock, and soul. Friday and Saturday evenings."
  },

  // ── D ───────────────────────────────────────────────────────────────────────

  "Doc McGilligan's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "6400 Lundy's Lane, Niagara Falls, ON L2G 1T6",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Victorian-inspired Irish pub on Lundy's Lane. Rock and blues. Thursday through Saturday live music."
  },

  "Donnelly's Pub": {
    city:    "Thorold",
    type:    "Bar / Pub",
    address: "54 Front St S, Thorold, ON L2V 1X1",
    web:     "",
    fb:      "https://www.facebook.com/donnellyspub",
    ig:      "",
    notes:   "Family-owned pub in Thorold. Saturday afternoon blues on the patio. Open mic Wednesdays."
  },

  "Dublin Stout Pub": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Celtic, folk, and acoustic. Weekend live music."
  },

  // ── E ───────────────────────────────────────────────────────────────────────

  "Eastchester Social": {
    city:    "Grimsby",
    type:    "Bar / Pub",
    address: "Grimsby, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Grimsby's main live music venue. Indie, country, acoustic."
  },

  "Eh Amigos": {
    city:    "Port Colborne",
    type:    "Bar / Pub",
    address: "Port Colborne, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Acoustic and folk. Tuesday and weekend slots."
  },

  // ── F ───────────────────────────────────────────────────────────────────────

  "Fallsview Casino Backyard BBQ": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "6380 Fallsview Blvd, Niagara Falls, ON L2G 7X5",
    web:     "https://fallsviewcasinoresort.com",
    fb:      "",
    ig:      "",
    notes:   "Outdoor patio stage at Fallsview Casino Resort. Afternoon and evening rock bookings."
  },

  "Flower & Wine Festival": {
    city:    "St. Catharines",
    type:    "Festival Stage",
    address: "Montebello Park, St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Annual spring festival. Multi-act outdoor stages. Free entry."
  },

  "Forty Creek Public House": {
    city:    "Grimsby",
    type:    "Bar / Pub",
    address: "Grimsby, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Occasional live music. Acoustic and folk friendly."
  },

  // ── G ───────────────────────────────────────────────────────────────────────

  "Grand Central": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Late-night rock. Friday and Saturday from 10pm."
  },

  "Greater Niagara Boat Club": {
    city:    "St. Catharines",
    type:    "Yacht Club / Boat Club",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Waterfront venue. Thursday evening bookings. Soul and covers."
  },

  "Golden Brothers": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Rock and classic rock."
  },

  // ── H ───────────────────────────────────────────────────────────────────────

  "Hard Rock Cafe": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "5701 Falls Ave, Niagara Falls, ON",
    web:     "https://www.hardrock.com/cafes/niagara-falls",
    fb:      "",
    ig:      "",
    notes:   "Tourist landmark on Falls Ave. Afternoon and early evening slots. Rock and covers."
  },

  "Helliwell Hall": {
    city:    "Niagara Falls",
    type:    "Concert Hall",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Rock and alternative."
  },

  // ── I ───────────────────────────────────────────────────────────────────────

  "Iggy's Pub": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Sunday afternoon sessions. Jimmy's Juke Joint residency."
  },

  "Irish Harp": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "4946 Clifton Hill, Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Celtic, blues, jazz, and acoustic. Sunday Jazz Series with Jim Gay. Busy every night of the week."
  },

  // ── J ───────────────────────────────────────────────────────────────────────

  "Jordan House": {
    city:    "Jordan",
    type:    "Bar / Pub",
    address: "3845 Main St, Jordan, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Historic wine country pub. Soul and covers. Weekend bookings."
  },

  "Judge & Jester": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Thursday and weekend live music. Josh Coulter residency Thursdays."
  },

  // ── K ───────────────────────────────────────────────────────────────────────

  "Kelsey's Niagara Falls": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Chain restaurant with occasional live music. Evening acoustic slots."
  },

  "Kilt & Clover": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Celtic, acoustic, and rock. Friday and Saturday evening bookings."
  },

  // ── L ───────────────────────────────────────────────────────────────────────

  "Lazy Lizard": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Sunday afternoon live music."
  },

  "Lock Wood Fired Pizza": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Casual restaurant with acoustic evening bookings."
  },

  "Lucky Penny": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and classic rock. Saturday evening bookings."
  },

  "Lucky's Fallsview Casino": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "6380 Fallsview Blvd, Niagara Falls, ON L2G 7X5",
    web:     "https://fallsviewcasinoresort.com",
    fb:      "",
    ig:      "",
    notes:   "Casino bar stage at Fallsview. Thursday through Saturday live music. Rock and covers."
  },

  // ── M ───────────────────────────────────────────────────────────────────────

  "Mahtay Café": {
    city:    "St. Catharines",
    type:    "Café / Lounge",
    address: "241 St Paul St, St. Catharines, ON L2R 3M7",
    web:     "https://mahtay.com",
    fb:      "",
    ig:      "",
    notes:   "All-ages arts café in downtown St. Catharines. Folk, indie, acoustic. Open mic Friday nights."
  },

  "Manhattan's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music."
  },

  "Merchant Ale House": {
    city:    "St. Catharines",
    type:    "Bar / Pub",
    address: "98 St Paul St, St. Catharines, ON L2R 3M2",
    web:     "https://merchantalehouse.com",
    fb:      "https://www.facebook.com/themerchantalehouse",
    ig:      "",
    notes:   "St. Catharines first brewpub since 1999. House-brewed beers. Blues, rock, and soul. Sunday sessions."
  },

  "MT Bellies": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Acoustic and folk. Thursday evening bookings."
  },

  "My Cousin Vinny's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Classic rock and covers. Foreshakin' residency three nights a week — Thursday, Saturday, Monday."
  },

  // ── N ───────────────────────────────────────────────────────────────────────

  "Newark Brewery": {
    city:    "Beamsville",
    type:    "Brewery",
    address: "Beamsville, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Wine country brewery. Weekend live music. Rock and country."
  },

  "Niagara Falls Brewing Co.": {
    city:    "Niagara Falls",
    type:    "Brewery",
    address: "4915 Clifton Hill, Niagara Falls, ON",
    web:     "https://niagarafallsbrewery.com",
    fb:      "",
    ig:      "",
    notes:   "Clifton Hill brewery. Acoustic and folk. Multiple slots weekly including Kyle McDonnell afternoons."
  },

  "Niagara Falls Legion": {
    city:    "Niagara Falls",
    type:    "Legion",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country, rock, and covers. Community crowd. Weekend bookings."
  },

  // ── O ───────────────────────────────────────────────────────────────────────

  "Oast Brewhouse": {
    city:    "Virgil",
    type:    "Brewery",
    address: "2956 Hwy 55, Virgil, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "NOTL area brewery. Folk, country, and acoustic. Weekend bookings."
  },

  "Olde Angel Inn": {
    city:    "Niagara-on-the-Lake",
    type:    "Bar / Pub",
    address: "224 Regent St, Niagara-on-the-Lake, ON",
    web:     "https://angel-inn.com",
    fb:      "",
    ig:      "",
    notes:   "Historic NOTL pub. Celtic, folk, and acoustic. Friday and Saturday evenings."
  },

  "Olee's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Rock and covers."
  },

  // ── P ───────────────────────────────────────────────────────────────────────

  "Parker's Pub": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Friday and Saturday live music. Rock and covers."
  },

  "Pitcher's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Open jam nights. Friday late-night bookings."
  },

  "Port Colborne Legion": {
    city:    "Port Colborne",
    type:    "Legion",
    address: "Port Colborne, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country and classic rock. Sunday afternoon bookings."
  },

  "Port Dalhousie Yacht Club": {
    city:    "St. Catharines",
    type:    "Yacht Club / Boat Club",
    address: "Port Dalhousie, St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Waterfront membership venue. Saturday evening bookings. Rock and covers."
  },

  "Puddy's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Open mic Tuesdays. Weekend live music. Rock and covers."
  },

  // ── R ───────────────────────────────────────────────────────────────────────

  "Redstone Winery": {
    city:    "Beamsville",
    type:    "Winery",
    address: "4245 King St, Beamsville, ON",
    web:     "https://redstonewinery.ca",
    fb:      "",
    ig:      "",
    notes:   "Upscale Lincoln winery. Jazz, soul, and acoustic. Saturday afternoon concert format."
  },

  "Reeb House": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and blues. Thursday and weekend bookings."
  },

  "Regency Athletic Resort": {
    city:    "St. Catharines",
    type:    "Resort / Event Centre",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Recurring Saturday afternoon format with Blue Etc. Blues, soul, and jazz. 200 capacity."
  },

  "Ridgeway Legion": {
    city:    "Fort Erie",
    type:    "Legion",
    address: "Ridgeway, Fort Erie, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country and classic rock. Thursday and Sunday bookings. Sugar Creek Thursday regular."
  },

  "Romby's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Weekend live music. Rock and covers."
  },

  // ── S ───────────────────────────────────────────────────────────────────────

  "Sessions on the River": {
    city:    "Fort Erie",
    type:    "Festival Stage",
    address: "Fort Erie, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Outdoor riverside ticketed events. Tribute and rock acts. Summer season."
  },

  "Silversmith Brewery": {
    city:    "Virgil",
    type:    "Brewery",
    address: "1523 Niagara Stone Rd, Virgil, ON L0S 1T0",
    web:     "https://silversmithbrewing.com",
    fb:      "",
    ig:      "",
    notes:   "Award-winning craft brewery in a converted 1894 church in Virgil, NOTL. Acoustic and folk. Thursday evening bookings."
  },

  "Someplace Else": {
    city:    "St. Catharines",
    type:    "Bar / Pub",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Saturday afternoon live music."
  },

  "Spirit in Niagara Distillery": {
    city:    "Niagara-on-the-Lake",
    type:    "Distillery",
    address: "Niagara-on-the-Lake, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Intimate tasting room. Jazz, blues, and acoustic. Thursday and Friday evenings. Quiet venue — no loud backline."
  },

  "Splash Bar": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Soul and R&B. Friday and Saturday late-night bookings."
  },

  "Steel & Clover Public House": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Friday and Saturday evening bookings."
  },

  "Super Mario's": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Soul, covers, and rock. Sunday afternoon and Friday evening bookings."
  },

  // ── T ───────────────────────────────────────────────────────────────────────

  "Tailgates Bar & Grill": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Saturday afternoon bookings. Rock and covers."
  },

  "Taps Brewhouse": {
    city:    "Niagara Falls",
    type:    "Brewery",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and classic rock. Friday and Saturday bookings."
  },

  "Teddy's Sports Bar": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and country. Thursday through Saturday live music."
  },

  "The Hub": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Sunday open mic with Tumbleweed. Saturday rock bookings."
  },

  "The Plaice": {
    city:    "Fort Erie",
    type:    "Bar / Pub",
    address: "Fort Erie, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and classic rock. Saturday evening bookings."
  },

  "The Warehouse": {
    city:    "St. Catharines",
    type:    "Concert Hall",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "One of the largest rooms in the region. 400 capacity. Indie, rock, punk. Ticketed events."
  },

  "13th Street Winery": {
    city:    "St. Catharines",
    type:    "Winery",
    address: "1776 4th Ave, St. Catharines, ON L2R 6P9",
    web:     "https://13thstreetwinery.com",
    fb:      "",
    ig:      "",
    notes:   "Award-winning winery on Fourth Avenue, St. Catharines. Jazz, acoustic, folk, blues. Thursday through Sunday. The Mandevilles Sunday residency."
  },

  "Thorold Legion": {
    city:    "Thorold",
    type:    "Legion",
    address: "Thorold, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Country and classic rock. Saturday evening bookings."
  },

  "Trailsides Bar & Grill": {
    city:    "St. Catharines",
    type:    "Bar / Pub",
    address: "St. Catharines, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Sunday afternoon live music. Rock and covers."
  },

  "Trappers Sports Bar": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Rock and classic rock. Friday and Saturday evening bookings."
  },

  // ── U ───────────────────────────────────────────────────────────────────────

  "Utopia Lounge": {
    city:    "Niagara Falls",
    type:    "Café / Lounge",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Friday and Saturday evening bookings. Variety of genres."
  },

  // ── W ───────────────────────────────────────────────────────────────────────

  "Welland Concerts on the Canal": {
    city:    "Welland",
    type:    "Festival Stage",
    address: "Welland, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Outdoor free concert series along the Welland Canal. Friday evenings. Multi-act bills."
  },

  "Welland Legion": {
    city:    "Welland",
    type:    "Legion",
    address: "Welland, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Classic rock and country. Saturday evening bookings."
  },

  "West Niagara Ag Centre": {
    city:    "Grimsby",
    type:    "Resort / Event Centre",
    address: "Grimsby, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Large community events hall. Grimsby's biggest ticketed show venue."
  },

  "Whiskey Dawgz": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Late-night Friday and Saturday bookings. Rock and country."
  },

  "Whiskey & Walleye": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "Niagara Falls, ON",
    web:     "",
    fb:      "",
    ig:      "",
    notes:   "Evening live music. Acoustic and rock."
  },

  "Wildflower Social": {
    city:    "Niagara Falls",
    type:    "Bar / Pub",
    address: "6361 Fallsview Blvd, Niagara Falls, ON L2G 3V9",
    web:     "https://wildflowerniagara.com",
    fb:      "",
    ig:      "https://www.instagram.com/wildflowerniagara",
    notes:   "Inside Hilton Niagara Falls lobby. Elevated cocktails and live music every evening. One of the busiest live music venues in the region."
  },

};

// =============================================================================
// TEMPLATE — copy this block to add a new venue
// =============================================================================
//
//  "Venue Name": {
//    city:    "City",
//    type:    "Bar / Pub",
//    address: "Street address, City, ON",
//    web:     "https://www.venuewebsite.com",
//    fb:      "https://www.facebook.com/...",
//    ig:      "https://www.instagram.com/...",
//    notes:   "One line about music nights and what they book."
//  },
//
// =============================================================================
