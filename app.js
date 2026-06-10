// ── Name registry — avoids apostrophe injection in onclick strings ────────────
const _NAMES = [];
function _reg(name) {
  let i = _NAMES.indexOf(name);
  if (i === -1) { i = _NAMES.length; _NAMES.push(name); }
  return i;
}
function _artistClick(event, idx) { openArtistDetail(event, _NAMES[idx]); }
function _venueClick(event, idx)  { openVenueDetail(event,  _NAMES[idx]); }
function _venueSet(idx)           { setVenue(_NAMES[idx]); }
function _artistFilter(idx)       { setArtistFilter(_NAMES[idx]); }

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Date state ────────────────────────────────────────────────────────────────
const NOW         = new Date();
const NOW_MINUTES = NOW.getHours() * 60 + NOW.getMinutes();
let selectedDate  = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

function todayDate() { return new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()); }
function sameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function dateKey(d) { return d.getFullYear()*10000 + d.getMonth()*100 + d.getDate(); }

const GIG_DOWS = new Set(GIGS.map(g => g.d));
let viewMode    = 'list';
let activeVenue = '';
const showEarlierDays = new Set();

const isMobile = () => window.innerWidth < 768;

// ── Time parsing ──────────────────────────────────────────────────────────────
function parseTime(t) {
  if (!t) return 840;
  const m = t.match(/(\d+)(?::(\d+))?\s*(am|pm)/i);
  if (!m) return 0;
  let h = +m[1], min = +(m[2] || 0);
  const ap = (m[3] || '').toLowerCase();
  if (ap === 'pm' && h !== 12) h += 12;
  if (ap === 'am' && h === 12) h = 0;
  return h * 60 + min;
}

// ── Genre pills ───────────────────────────────────────────────────────────────
const PILL_MAP = {
  'Rock':'pill-rock','Classic Rock':'pill-rock','Soul':'pill-soul','R&B':'pill-rb','Pop':'pill-pop',
  'Acoustic':'pill-acoustic','Folk':'pill-folk','Celtic':'pill-celtic','Reggae':'pill-reggae',
  'Jazz':'pill-jazz','Covers':'pill-covers','Electronic':'pill-electronic',
  'Blues':'pill-blues','Funk':'pill-funk',
  'Country':'pill-country','Latin':'pill-latin','Hip-Hop':'pill-hiphop',
  'Tribute':'pill-tribute',
};
function pill(g) { return `<span class="pill ${PILL_MAP[g] || 'pill-default'}">${g}</span>`; }

// ── Week navigation ───────────────────────────────────────────────────────────
function getWeekDates() {
  const s = new Date(selectedDate);
  s.setDate(selectedDate.getDate() - selectedDate.getDay());
  return Array.from({length:7}, (_, i) => { const d = new Date(s); d.setDate(s.getDate() + i); return d; });
}

function goToDate(date) {
  selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  showEarlierDays.clear();
  removeDesktopPopovers();
  closeDatePicker();
  render();
}
function goToToday() { goToDate(todayDate()); }

// ── Filter state ──────────────────────────────────────────────────────────────
let _filterGenre = '';
let _filterType  = '';
let _filterVenue = '';

function filteredGigs() {
  const q  = document.getElementById('search').value.toLowerCase().trim();
  const fc = document.getElementById('filter-city').value;
  return GIGS.filter(g =>
    (!q  || g.a.toLowerCase().includes(q) || g.v.toLowerCase().includes(q)) &&
    (!activeVenue || g.v.trim() === activeVenue) &&
    (!fc || g.c === fc) &&
    (!_filterGenre || g.g === _filterGenre) &&
    (!_filterType  || g.t === _filterType) &&
    (!_filterVenue || g.v.trim() === _filterVenue)
  );
}

// ── Bottom sheet ──────────────────────────────────────────────────────────────
let _sheetOpen  = false;
let _touchStartY = 0;

function openSheet(html, label) {
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('bottom-sheet').setAttribute('aria-label', label || 'Details');
  document.getElementById('sheet-overlay').classList.add('visible');
  document.getElementById('bottom-sheet').classList.add('open');
  document.body.classList.add('sheet-open');
  _sheetOpen = true;
}
function closeSheet() {
  document.getElementById('sheet-overlay').classList.remove('visible');
  document.getElementById('bottom-sheet').classList.remove('open');
  document.body.classList.remove('sheet-open');
  _sheetOpen = false;
}

const _sheet = document.getElementById('bottom-sheet');
_sheet.addEventListener('touchstart', e => { _touchStartY = e.touches[0].clientY; }, {passive:true});
_sheet.addEventListener('touchmove',  e => {
  const dy = e.touches[0].clientY - _touchStartY;
  if (dy > 0) { _sheet.style.transform = `translateY(${dy}px)`; _sheet.style.transition = 'none'; }
}, {passive:true});
_sheet.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - _touchStartY;
  _sheet.style.transition = '';
  _sheet.style.transform  = '';
  if (dy > 80) closeSheet();
});
document.getElementById('sheet-overlay').addEventListener('click', closeSheet);

// ── Desktop popovers ──────────────────────────────────────────────────────────
function removeDesktopPopovers() {
  document.querySelectorAll('.popover,.artist-pop,.venue-pop').forEach(el => el.remove());
}

function positionPop(pop, event, popW) {
  const wrap     = document.getElementById('cal-wrap');
  const wrapRect = wrap.getBoundingClientRect();
  const trigRect = event.currentTarget.getBoundingClientRect();
  const topOff   = trigRect.top - wrapRect.top + wrap.scrollTop;
  const spaceR   = wrapRect.width - (trigRect.right - wrapRect.left);
  const spaceL   = trigRect.left  - wrapRect.left;
  if (spaceR >= popW + 20) {
    pop.style.left = (trigRect.right - wrapRect.left + 12) + 'px';
    pop.classList.add('right');
  } else if (spaceL >= popW + 20) {
    pop.style.left = (trigRect.left - wrapRect.left - popW - 12) + 'px';
    pop.classList.add('left');
  } else {
    const cx = trigRect.left - wrapRect.left + trigRect.width / 2;
    pop.style.left = Math.max(8, Math.min(cx - popW / 2, wrapRect.width - popW - 8)) + 'px';
    pop.style.top  = (topOff + trigRect.height + 6) + 'px';
  }
  if (!pop.style.top) pop.style.top = Math.max(4, topOff - 4) + 'px';
  requestAnimationFrame(() => pop.classList.add('visible'));
}

// ── Gig detail ────────────────────────────────────────────────────────────────
function openGigDetail(event, dow, idx) {
  event.stopPropagation();
  const gigs = filteredGigs().filter(g => g.d === dow).sort((a, b) => parseTime(a.tm) - parseTime(b.tm));
  const g = gigs[idx];
  if (!g) return;
  const days = getWeekDates();
  const d    = days.find(x => x.getDay() === dow) || days[0];

  if (isMobile()) {
    openSheet(`
      <div class="sheet-artist">${g.a}</div>
      <div class="sheet-row"><i class="ti ti-map-pin"></i><span><strong>${g.v}</strong> · ${g.c}</span></div>
      <div class="sheet-row"><i class="ti ti-clock"></i><span>${DAYS[dow]}, ${MONTHS[d.getMonth()]} ${d.getDate()} · ${g.tm}</span></div>
      <div class="sheet-row"><i class="ti ti-music"></i><span>${pill(g.g)} · ${g.t}</span></div>
      ${g.n ? `<div class="sheet-row"><i class="ti ti-info-circle"></i><span>${g.n}</span></div>` : ''}
      <div class="sheet-actions">
        <button class="sheet-btn-primary" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(g.a)}+Niagara+band','_blank')"><i class="ti ti-search"></i> Search ${g.a.split(' ')[0]} online</button>
        <button class="sheet-btn-secondary" onclick="closeSheet();_venueClick(event,${_reg(g.v)})"><i class="ti ti-building"></i> View ${g.v}</button>
        <button class="sheet-btn-secondary" onclick="closeSheet();_artistClick(event,${_reg(g.a)})"><i class="ti ti-user"></i> View ${g.a.split(' ')[0]}</button>
        <button class="sheet-btn-close" onclick="closeSheet()">Close</button>
      </div>`, g.a);
  } else {
    removeDesktopPopovers();
    const pop = document.createElement('div');
    pop.className = 'popover';
    pop.innerHTML = `
      <div class="pop-artist">${g.a}</div>
      <div class="pop-row"><i class="ti ti-map-pin"></i><span><strong>${g.v}</strong> · ${g.c}</span></div>
      <div class="pop-row"><i class="ti ti-clock"></i><span>${DAYS[dow]}, ${MONTHS[d.getMonth()]} ${d.getDate()} · ${g.tm}</span></div>
      <div class="pop-row"><i class="ti ti-music"></i><span>${pill(g.g)} · ${g.t}</span></div>
      ${g.n ? `<div class="pop-row"><i class="ti ti-info-circle"></i><span>${g.n}</span></div>` : ''}
      <div class="pop-actions">
        <button class="pop-btn-primary" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(g.a)}+Niagara+band','_blank')"><i class="ti ti-search"></i> Search ${g.a.split(' ')[0]} online</button>
        <button class="pop-btn-secondary" onclick="removeDesktopPopovers();_venueClick(event,${_reg(g.v)})"><i class="ti ti-building"></i> View ${g.v}</button>
        <button class="pop-btn-close" onclick="removeDesktopPopovers()">Close</button>
      </div>`;
    document.getElementById('cal-wrap').appendChild(pop);
    positionPop(pop, event, 290);
  }
}

// ── Artist detail ─────────────────────────────────────────────────────────────
function openArtistDetail(event, artistName) {
  if (event) event.stopPropagation();
  const p = (typeof ARTIST_PROFILES !== 'undefined' && ARTIST_PROFILES[artistName]) || {};
  const gigs = GIGS.filter(g => g.a === artistName);
  const initials = artistName.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

  const socials = (cls, size) => {
    const btns = [];
    if (p.fb)  btns.push(`<a class="${cls}" href="${p.fb}"  target="_blank" rel="noopener"><i class="ti ti-brand-facebook" style="font-size:${size}px"></i> Facebook</a>`);
    if (p.ig)  btns.push(`<a class="${cls}" href="${p.ig}"  target="_blank" rel="noopener"><i class="ti ti-brand-instagram" style="font-size:${size}px"></i> Instagram</a>`);
    if (p.yt)  btns.push(`<a class="${cls}" href="${p.yt}"  target="_blank" rel="noopener"><i class="ti ti-brand-youtube" style="font-size:${size}px"></i> YouTube</a>`);
    if (p.sp)  btns.push(`<a class="${cls}" href="${p.sp}"  target="_blank" rel="noopener"><i class="ti ti-brand-spotify" style="font-size:${size}px"></i> Spotify</a>`);
    if (p.web) btns.push(`<a class="${cls}" href="${p.web}" target="_blank" rel="noopener"><i class="ti ti-world" style="font-size:${size}px"></i> Website</a>`);
    btns.push(`<a class="${cls}" href="https://www.google.com/search?q=${encodeURIComponent(artistName + ' Niagara band')}" target="_blank" rel="noopener"><i class="ti ti-search" style="font-size:${size}px"></i> Search</a>`);
    return btns.join('');
  };

  if (isMobile()) {
    openSheet(`
      <div class="ap-header">
        <div class="ap-avatar">${initials}</div>
        <div><div class="ap-name">${artistName}</div><div class="ap-meta">${p.city || ''} ${p.genre ? '· ' + p.genre : ''}</div></div>
      </div>
      ${p.bio ? `<div class="ap-bio">${p.bio}</div>` : ''}
      <div class="ap-gig-count"><i class="ti ti-calendar" style="font-size:12px"></i> ${gigs.length} gig${gigs.length !== 1 ? 's' : ''} this week</div>
      <div class="ap-socials">${socials('ap-social-btn', 15)}</div>
      <div class="sheet-actions">
        <button class="sheet-btn-secondary" onclick="closeSheet();_artistFilter(${_reg(artistName)})"><i class="ti ti-list"></i> All gigs by ${artistName.split(' ')[0]}</button>
        <button class="sheet-btn-close" onclick="closeSheet()">Close</button>
      </div>`, artistName);
  } else {
    removeDesktopPopovers();
    const pop = document.createElement('div');
    pop.className = 'artist-pop';
    pop.innerHTML = `
      <div class="ap-header-d">
        <div class="ap-avatar-d">${initials}</div>
        <div><div class="ap-name-d">${artistName}</div><div class="ap-meta-d">${p.city || ''} ${p.genre ? '· ' + p.genre : ''}</div></div>
      </div>
      ${p.bio ? `<div class="ap-bio-d">${p.bio}</div>` : ''}
      <div class="ap-gig-d"><i class="ti ti-calendar" style="font-size:11px"></i> ${gigs.length} gig${gigs.length !== 1 ? 's' : ''} this week</div>
      <div class="ap-socials-d">${socials('ap-social-d', 13)}</div>
      <div class="ap-actions-d">
        <button class="ap-filter-d" onclick="removeDesktopPopovers();_artistFilter(${_reg(artistName)})"><i class="ti ti-list"></i> All gigs by ${artistName.split(' ')[0]}</button>
        <button class="ap-close-d" onclick="removeDesktopPopovers()">Close</button>
      </div>`;
    document.getElementById('cal-wrap').appendChild(pop);
    positionPop(pop, event, 300);
  }
}

// ── Venue detail ──────────────────────────────────────────────────────────────
function openVenueDetail(event, venueName) {
  if (event) event.stopPropagation();
  const v    = (typeof VENUE_PROFILES !== 'undefined' && VENUE_PROFILES[venueName]) || {};
  const gigs = GIGS.filter(g => g.v === venueName);

  const links = cls => {
    const l = [];
    if (v.web) l.push(`<a class="${cls}" href="${v.web}" target="_blank" rel="noopener"><i class="ti ti-world"></i> Website</a>`);
    if (v.fb)  l.push(`<a class="${cls}" href="${v.fb}"  target="_blank" rel="noopener"><i class="ti ti-brand-facebook"></i> Facebook</a>`);
    if (v.ig)  l.push(`<a class="${cls}" href="${v.ig}"  target="_blank" rel="noopener"><i class="ti ti-brand-instagram"></i> Instagram</a>`);
    return l.join('');
  };
  const mapsUrl = v.address
    ? 'https://www.google.com/maps/search/' + encodeURIComponent(v.address)
    : 'https://www.google.com/maps/search/' + encodeURIComponent(venueName + ' ' + (v.city || 'Niagara'));

  if (isMobile()) {
    openSheet(`
      <div class="vp-name">${venueName}</div>
      <div class="vp-meta">
        <i class="ti ti-map-pin" style="font-size:11px;color:var(--teal)"></i>
        <span>${v.city || ''}</span>
        ${v.type ? `<span class="vp-type-badge">${v.type}</span>` : ''}
      </div>
      ${v.notes ? `<div class="vp-notes">${v.notes}</div>` : ''}
      <div class="vp-gig-count"><i class="ti ti-music" style="font-size:12px"></i> ${gigs.length} gig${gigs.length !== 1 ? 's' : ''} this week</div>
      ${links('ap-social-btn') ? `<div class="ap-socials">${links('ap-social-btn')}</div>` : ''}
      <div class="sheet-actions">
        <button class="sheet-btn-primary" onclick="closeSheet();_venueSet(${_reg(venueName)})"><i class="ti ti-list"></i> All gigs at ${venueName}</button>
        <a class="sheet-btn-secondary" href="${mapsUrl}" target="_blank" rel="noopener" style="text-decoration:none;display:flex;align-items:center;gap:8px"><i class="ti ti-map"></i> Get directions</a>
        <button class="sheet-btn-close" onclick="closeSheet()">Close</button>
      </div>`, venueName);
  } else {
    removeDesktopPopovers();
    const pop = document.createElement('div');
    pop.className = 'venue-pop';
    pop.innerHTML = `
      <div style="margin-bottom:12px">
        <div class="vp-name" style="font-size:22px">${venueName}</div>
        <div class="vp-meta">
          <i class="ti ti-map-pin" style="font-size:11px;color:var(--teal)"></i>
          <span>${v.city || ''}</span>
          ${v.type ? `<span class="vp-type-badge">${v.type}</span>` : ''}
        </div>
      </div>
      ${v.notes ? `<div class="ap-bio-d">${v.notes}</div>` : ''}
      <div class="vp-gig-d"><i class="ti ti-music" style="font-size:11px"></i> ${gigs.length} gig${gigs.length !== 1 ? 's' : ''} this week</div>
      ${links('vp-link-d') ? `<div class="vp-links-d">${links('vp-link-d')}</div>` : ''}
      <div class="ap-actions-d">
        <button class="vp-filter-d" onclick="removeDesktopPopovers();_venueSet(${_reg(venueName)})"><i class="ti ti-list"></i> All gigs at ${venueName}</button>
        <a class="vp-dir-d" href="${mapsUrl}" target="_blank" rel="noopener"><i class="ti ti-map"></i> Get directions</a>
        <button class="vp-close-d" onclick="removeDesktopPopovers()">Close</button>
      </div>`;
    document.getElementById('cal-wrap').appendChild(pop);
    positionPop(pop, event, 300);
  }
}

// ── Filter sheet (mobile) ─────────────────────────────────────────────────────
function openFilterSheet() {
  const venues = [...new Set(GIGS.map(g => g.v.trim()))].sort();
  const vOpts  = venues.map(v => `<option value="${v}" ${_filterVenue === v ? 'selected' : ''}>${v}</option>`).join('');
  openSheet(`
    <div class="filter-sheet-title">FILTERS</div>
    <div class="filter-group"><span class="filter-group-label">Venue</span>
      <select id="fs-venue"><option value="">All venues</option>${vOpts}</select></div>
    <div class="filter-group"><span class="filter-group-label">Genre</span>
      <select id="fs-genre"><option value="">All genres</option>
        <option ${_filterGenre==='Acoustic'?'selected':''}>Acoustic</option>
        <option ${_filterGenre==='Blues'?'selected':''}>Blues</option>
        <option ${_filterGenre==='Celtic'?'selected':''}>Celtic</option>
        <option ${_filterGenre==='Classic Rock'?'selected':''}>Classic Rock</option>
        <option ${_filterGenre==='Country'?'selected':''}>Country</option>
        <option ${_filterGenre==='Covers'?'selected':''}>Covers</option>
        <option ${_filterGenre==='Electronic'?'selected':''}>Electronic</option>
        <option ${_filterGenre==='Folk'?'selected':''}>Folk</option>
        <option ${_filterGenre==='Funk'?'selected':''}>Funk</option>
        <option ${_filterGenre==='Hip-Hop'?'selected':''}>Hip-Hop</option>
        <option ${_filterGenre==='Jazz'?'selected':''}>Jazz</option>
        <option ${_filterGenre==='Latin'?'selected':''}>Latin</option>
        <option ${_filterGenre==='Pop'?'selected':''}>Pop</option>
        <option ${_filterGenre==='R&B'?'selected':''}>R&B</option>
        <option ${_filterGenre==='Reggae'?'selected':''}>Reggae</option>
        <option ${_filterGenre==='Rock'?'selected':''}>Rock</option>
        <option ${_filterGenre==='Soul'?'selected':''}>Soul</option>
        <option ${_filterGenre==='Tribute'?'selected':''}>Tribute</option>
      </select></div>
    <div class="filter-group"><span class="filter-group-label">Venue Type</span>
      <select id="fs-type"><option value="">All types</option>
        <option ${_filterType==='Arts Centre'?'selected':''}>Arts Centre</option>
        <option ${_filterType==='Bar / Pub'?'selected':''}>Bar / Pub</option>
        <option ${_filterType==='Brewery'?'selected':''}>Brewery</option>
        <option ${_filterType==='Cafe / Lounge'?'selected':''}>Cafe / Lounge</option>
        <option ${_filterType==='Concert Hall'?'selected':''}>Concert Hall</option>
        <option ${_filterType==='Distillery'?'selected':''}>Distillery</option>
        <option ${_filterType==='Festival Stage'?'selected':''}>Festival Stage</option>
        <option ${_filterType==='Legion'?'selected':''}>Legion</option>
        <option ${_filterType==='Outdoor / Patio'?'selected':''}>Outdoor / Patio</option>
        <option ${_filterType==='Restaurant'?'selected':''}>Restaurant</option>
        <option ${_filterType==='Resort / Event Centre'?'selected':''}>Resort / Event Centre</option>
        <option ${_filterType==='Winery'?'selected':''}>Winery</option>
        <option ${_filterType==='Yacht Club / Boat Club'?'selected':''}>Yacht Club / Boat Club</option>
      </select></div>
    <button class="filter-apply-btn" onclick="applyFilterSheet()">Apply Filters</button>
  `, 'Filters');
}

function applyFilterSheet() {
  _filterVenue = document.getElementById('fs-venue')?.value || '';
  _filterGenre = document.getElementById('fs-genre')?.value || '';
  _filterType  = document.getElementById('fs-type')?.value  || '';
  if (_filterVenue) activeVenue = _filterVenue;
  closeSheet();
  updateMoreCount();
  render();
}

// ── Filter helpers ────────────────────────────────────────────────────────────
function setVenue(v) {
  activeVenue  = v.trim();
  _filterVenue = activeVenue;
  updateMoreCount();
  removeDesktopPopovers();
  render();
}
function setArtistFilter(name) {
  document.getElementById('search').value = name;
  removeDesktopPopovers();
  render();
}
function updateMoreCount() {
  const n  = [_filterGenre, _filterType, activeVenue].filter(Boolean).length;
  const el = document.getElementById('more-count');
  el.style.display = n ? 'inline' : 'none';
  if (n) el.textContent = n;
  document.getElementById('more-btn').classList.toggle('active', n > 0);
}
function clearAll() {
  document.getElementById('search').value      = '';
  document.getElementById('filter-city').value = '';
  _filterGenre = ''; _filterType = ''; _filterVenue = ''; activeVenue = '';
  updateMoreCount();
  removeDesktopPopovers();
  render();
}
function toggleEarlier(dow) {
  showEarlierDays.has(dow) ? showEarlierDays.delete(dow) : showEarlierDays.add(dow);
  removeDesktopPopovers();
  render();
}

// ── Main render ───────────────────────────────────────────────────────────────
function render() {
  updateMoreCount();
  const days = getWeekDates();
  const s = days[0], e = days[6];
  const today2 = todayDate();
  const isCurrentWeek = days.some(d => sameDay(d, today2));
  document.getElementById('week-label').textContent = isCurrentWeek
    ? 'This week'
    : `${MONTHS[s.getMonth()]} ${s.getDate()} – ${MONTHS[e.getMonth()]} ${e.getDate()}`;

  const gigs = filteredGigs();
  document.getElementById('stat-gigs').textContent   = gigs.length;
  document.getElementById('stat-venues').textContent = new Set(gigs.map(g => g.v)).size;
  document.getElementById('stat-cities').textContent = new Set(gigs.map(g => g.c)).size;
  document.getElementById('results-count').textContent = `${gigs.length} gig${gigs.length !== 1 ? 's' : ''} found`;
  document.getElementById('venue-tag').innerHTML = activeVenue
    ? `<span class="venue-tag"><i class="ti ti-map-pin" style="font-size:10px"></i> ${activeVenue} <button onclick="setVenue('')" aria-label="Clear venue filter">×</button></span>`
    : '';

  const today = todayDate();
  const byDay = {};
  days.forEach(d => byDay[d.getDay()] = []);
  gigs.forEach(g => { if (g.d in byDay) byDay[g.d].push(g); });

  let html = '';
  days.forEach(d => {
    const dow = d.getDay();
    const all = (byDay[dow] || []).slice().sort((a, b) => parseTime(a.tm) - parseTime(b.tm));
    if (!all.length) return;

    const isToday = sameDay(d, today);
    const isPast  = d < today && !isToday;
    if (isPast && !showEarlierDays.has(dateKey(d))) return;

    let dayGigs = all, hiddenCount = 0;
    if (isToday && !showEarlierDays.has(dateKey(d))) {
      const cutoff  = NOW_MINUTES - 180;
      const visible = all.filter(g => parseTime(g.tm) >= cutoff);
      hiddenCount   = all.length - visible.length;
      if (hiddenCount > 0) dayGigs = visible;
    }

    const dk = dateKey(d);
    html += `<div class="day-block">
      <div class="day-header${isToday ? ' today' : ''}" role="heading" aria-level="2">
        <span class="day-name">${DAYS[dow]}</span>
        <span class="day-date">${MONTHS[d.getMonth()]} ${d.getDate()}</span>
        ${isToday ? '<span class="today-badge">TODAY</span>' : ''}
        <span class="day-count">${all.length} gig${all.length !== 1 ? 's' : ''}</span>
      </div>
      ${(hiddenCount > 0 || isPast) ? `<button class="show-earlier-btn" onclick="toggleEarlier(${dk})">
        <i class="ti ti-clock"></i> ${isPast ? 'Past day — tap to show' : hiddenCount + ' earlier gig' + (hiddenCount !== 1 ? 's' : '') + ' — show all'}
      </button>` : ''}`;

    if (viewMode === 'list') {
      dayGigs.forEach((g, i) => {
        html += `<div class="gig-row"
          onclick="openGigDetail(event,${dow},${i})"
          onkeydown="if(event.key==='Enter'||event.key===' ')openGigDetail(event,${dow},${i})"
          role="button" tabindex="0" aria-label="${g.a} at ${g.v}, ${g.tm}">
          <div class="gig-time">${g.tm}</div>
          <div class="gig-main">
            <button class="gig-artist-btn" onclick="event.stopPropagation();_artistClick(event,${_reg(g.a)})" aria-label="View ${g.a}">${g.a}</button>
            <div class="gig-sub">
              <button class="gig-venue-btn" onclick="event.stopPropagation();_venueClick(event,${_reg(g.v)})" aria-label="View ${g.v}">${g.v}</button>
              <span class="gig-sep"></span><span class="gig-city">${g.c}</span>
            </div>
          </div>
          <div class="gig-pill-wrap">${pill(g.g)}</div>
        </div>`;
      });
    } else {
      html += '<div class="card-grid">';
      dayGigs.forEach((g, i) => {
        html += `<div class="gig-card"
          onclick="openGigDetail(event,${dow},${i})"
          onkeydown="if(event.key==='Enter'||event.key===' ')openGigDetail(event,${dow},${i})"
          role="button" tabindex="0" aria-label="${g.a} at ${g.v}, ${g.tm}">
          <div class="card-time">${g.tm}</div>
          <button class="card-artist-btn" onclick="event.stopPropagation();_artistClick(event,${_reg(g.a)})" aria-label="View ${g.a}">${g.a}</button>
          <button class="card-venue-btn" onclick="event.stopPropagation();_venueClick(event,${_reg(g.v)})" aria-label="View ${g.v}"><i class="ti ti-map-pin" style="font-size:10px"></i> ${g.v}</button>
          <div class="card-pills">${pill(g.g)}</div>
        </div>`;
      });
      html += '</div>';
    }
    html += '</div>';
  });

  if (!html) {
    html = `<div class="empty-state">
      <div class="empty-title">NOTHING FOUND</div>
      <div class="empty-sub">Try clearing your filters.</div>
      <button class="empty-clear" onclick="clearAll()">Clear all filters</button>
    </div>`;
  }
  document.getElementById('calendar').innerHTML = html;
}

// ── Event listeners ───────────────────────────────────────────────────────────
document.getElementById('this-week').addEventListener('click', goToToday);
document.getElementById('search').addEventListener('input', () => { removeDesktopPopovers(); render(); });
document.getElementById('filter-city').addEventListener('change', () => { removeDesktopPopovers(); render(); });

document.getElementById('more-btn').addEventListener('click', () => {
  if (isMobile()) {
    openFilterSheet();
  } else {
    const panel = document.getElementById('desktop-filters');
    if (panel) { panel.remove(); return; }
    const venues = [...new Set(GIGS.map(g => g.v.trim()))].sort();
    const vOpts  = venues.map(v => `<option value="${v}" ${_filterVenue === v ? 'selected' : ''}>${v}</option>`).join('');
    const bar = document.querySelector('.filter-bar');
    const fRow = document.createElement('div');
    fRow.id = 'desktop-filters';
    fRow.style.cssText = 'padding:8px 24px 10px;display:flex;flex-wrap:wrap;gap:7px;background:var(--ink-2);border-bottom:1px solid rgba(255,255,255,.06)';
    fRow.innerHTML = `
      <select id="filter-venue" style="background:var(--ink-3);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:0 10px;font-size:12px;color:#fff;font-family:var(--fb);height:32px">
        <option value="">All venues</option>${vOpts}
      </select>
      <select id="filter-genre" style="background:var(--ink-3);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:0 10px;font-size:12px;color:#fff;font-family:var(--fb);height:32px">
        <option value="">All genres</option>
        <option ${_filterGenre==='Acoustic'?'selected':''}>Acoustic</option><option ${_filterGenre==='Blues'?'selected':''}>Blues</option>
        <option ${_filterGenre==='Celtic'?'selected':''}>Celtic</option><option ${_filterGenre==='Classic Rock'?'selected':''}>Classic Rock</option>
        <option ${_filterGenre==='Country'?'selected':''}>Country</option><option ${_filterGenre==='Covers'?'selected':''}>Covers</option>
        <option ${_filterGenre==='Electronic'?'selected':''}>Electronic</option><option ${_filterGenre==='Folk'?'selected':''}>Folk</option>
        <option ${_filterGenre==='Funk'?'selected':''}>Funk</option><option ${_filterGenre==='Hip-Hop'?'selected':''}>Hip-Hop</option>
        <option ${_filterGenre==='Jazz'?'selected':''}>Jazz</option><option ${_filterGenre==='Latin'?'selected':''}>Latin</option>
        <option ${_filterGenre==='Pop'?'selected':''}>Pop</option><option ${_filterGenre==='R&B'?'selected':''}>R&B</option>
        <option ${_filterGenre==='Reggae'?'selected':''}>Reggae</option><option ${_filterGenre==='Rock'?'selected':''}>Rock</option>
        <option ${_filterGenre==='Soul'?'selected':''}>Soul</option><option ${_filterGenre==='Tribute'?'selected':''}>Tribute</option>
      </select>
      <select id="filter-type" style="background:var(--ink-3);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:0 10px;font-size:12px;color:#fff;font-family:var(--fb);height:32px">
        <option value="">All types</option>
        <option ${_filterType==='Arts Centre'?'selected':''}>Arts Centre</option><option ${_filterType==='Bar / Pub'?'selected':''}>Bar / Pub</option>
        <option ${_filterType==='Brewery'?'selected':''}>Brewery</option><option ${_filterType==='Cafe / Lounge'?'selected':''}>Cafe / Lounge</option>
        <option ${_filterType==='Concert Hall'?'selected':''}>Concert Hall</option><option ${_filterType==='Distillery'?'selected':''}>Distillery</option>
        <option ${_filterType==='Festival Stage'?'selected':''}>Festival Stage</option><option ${_filterType==='Legion'?'selected':''}>Legion</option>
        <option ${_filterType==='Outdoor / Patio'?'selected':''}>Outdoor / Patio</option><option ${_filterType==='Restaurant'?'selected':''}>Restaurant</option>
        <option ${_filterType==='Resort / Event Centre'?'selected':''}>Resort / Event Centre</option>
        <option ${_filterType==='Winery'?'selected':''}>Winery</option><option ${_filterType==='Yacht Club / Boat Club'?'selected':''}>Yacht Club / Boat Club</option>
      </select>`;
    bar.insertAdjacentElement('afterend', fRow);
    fRow.querySelector('#filter-venue').addEventListener('change', function() { _filterVenue = this.value; activeVenue = this.value; updateMoreCount(); render(); });
    fRow.querySelector('#filter-genre').addEventListener('change', function() { _filterGenre = this.value; updateMoreCount(); render(); });
    fRow.querySelector('#filter-type').addEventListener('change',  function() { _filterType  = this.value; updateMoreCount(); render(); });
  }
});

document.getElementById('clear-btn').addEventListener('click', clearAll);
document.getElementById('btn-card').addEventListener('click', () => {
  viewMode = 'card';
  document.getElementById('btn-card').classList.add('active');
  document.getElementById('btn-list').classList.remove('active');
  removeDesktopPopovers(); render();
});
document.getElementById('btn-list').addEventListener('click', () => {
  viewMode = 'list';
  document.getElementById('btn-list').classList.add('active');
  document.getElementById('btn-card').classList.remove('active');
  removeDesktopPopovers(); render();
});
document.addEventListener('click', e => {
  document.querySelectorAll('.popover,.artist-pop,.venue-pop').forEach(p => {
    if (!p.contains(e.target)) { p.classList.remove('visible'); setTimeout(() => p.remove(), 200); }
  });
});

// ── Tab switching ─────────────────────────────────────────────────────────────
let _activeTab = 'calendar';
function switchTab(tab) {
  if (tab === _activeTab) { window.scrollTo({top: 0, behavior: 'smooth'}); return; }
  _activeTab = tab;
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + tab);
  if (view) { view.classList.add('active'); window.scrollTo({top: 0, behavior: 'auto'}); }
  document.querySelectorAll('.nav-link').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  const navBtn = document.getElementById('nav-' + tab);
  if (navBtn) { navBtn.classList.add('active'); navBtn.setAttribute('aria-selected', 'true'); }
  document.querySelectorAll('.bottom-tab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  const btab = document.getElementById('btab-' + tab);
  if (btab) { btab.classList.add('active'); btab.setAttribute('aria-selected', 'true'); }
  if (tab === 'artists') renderArtists();
  if (tab === 'venues')  renderVenues();
  if (tab === 'about')   renderAboutStats();
  removeDesktopPopovers();
  closeSheet();
}

// ── Artists tab ───────────────────────────────────────────────────────────────
const _openLetters = new Set();
function toggleLetter(letter) {
  const sec = document.getElementById('alpha-' + letter);
  if (!sec) return;
  if (_openLetters.has(letter)) { _openLetters.delete(letter); sec.classList.remove('open'); }
  else { _openLetters.add(letter); sec.classList.add('open'); }
}

function renderArtists() {
  const q = (document.getElementById('artist-search')?.value ?? '').toLowerCase().trim();
  const allNames = [...new Set(GIGS.map(g => g.a))].sort();
  const names    = q ? allNames.filter(n => n.toLowerCase().includes(q)) : allNames;
  const countEl  = document.getElementById('artists-count');
  if (countEl) countEl.textContent = names.length + ' artist' + (names.length !== 1 ? 's' : '');
  const grid = document.getElementById('artists-grid');
  if (!grid) return;
  if (!names.length) { grid.innerHTML = '<div style="padding:48px 16px;text-align:center;color:var(--mist);font-size:13px">No artists found</div>'; return; }

  const groups = {};
  names.forEach(name => {
    const letter = name.replace(/^(the |a |an )/i, '')[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(name);
  });
  const letters = Object.keys(groups).sort();
  if (q) letters.forEach(l => _openLetters.add(l));

  grid.innerHTML = letters.map(letter => {
    const isOpen = _openLetters.has(letter) || !!q;
    const artistRows = groups[letter].map(name => {
      const p       = (typeof ARTIST_PROFILES !== 'undefined' && ARTIST_PROFILES[name]) || {};
      const gigs    = GIGS.filter(g => g.a === name);
      const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
      const idx     = _reg(name);
      const socials = [];
      if (p.fb)  socials.push(`<a class="ar-social" href="${p.fb}"  target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="ti ti-brand-facebook"></i></a>`);
      if (p.ig)  socials.push(`<a class="ar-social" href="${p.ig}"  target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="ti ti-brand-instagram"></i></a>`);
      if (p.yt)  socials.push(`<a class="ar-social" href="${p.yt}"  target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="ti ti-brand-youtube"></i></a>`);
      if (p.sp)  socials.push(`<a class="ar-social" href="${p.sp}"  target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="ti ti-brand-spotify"></i></a>`);
      if (p.web) socials.push(`<a class="ar-social" href="${p.web}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="ti ti-world"></i></a>`);
      return `<div class="artist-row" onclick="_artistClick(event,${idx})" role="button" tabindex="0" aria-label="View ${name}">
        <div class="ar-initials">${initials}</div>
        <div class="ar-main">
          <div class="ar-name">${name}</div>
          <div class="ar-meta">${p.city || ''}${p.genre ? ' · ' + p.genre : ''}${gigs.length ? ' · ' + gigs.length + ' gig' + (gigs.length !== 1 ? 's' : '') : ''}</div>
        </div>
        <div class="ar-right">${socials.length ? '<div class="ar-socials">' + socials.join('') + '</div>' : ''}</div>
      </div>`;
    }).join('');

    return `<div class="alpha-section${isOpen ? ' open' : ''}" id="alpha-${letter}">
      <div class="alpha-header" onclick="toggleLetter(&quot;${letter}&quot;)" role="button" aria-expanded="${isOpen}">
        <span class="alpha-letter">${letter}</span>
        <span class="alpha-count">${groups[letter].length} artist${groups[letter].length !== 1 ? 's' : ''}</span>
        <i class="ti ti-chevron-down alpha-chevron"></i>
      </div>
      <div class="alpha-body">${artistRows}</div>
    </div>`;
  }).join('');
}

// ── Venues tab ────────────────────────────────────────────────────────────────
const _typeIcon = t => ({
  'Winery':'ti-building-community', 'Brewery':'ti-beer', 'Distillery':'ti-flask',
  'Legion':'ti-flag', 'Festival Stage':'ti-music', 'Concert Hall':'ti-building',
  'Resort / Event Centre':'ti-building-estate', 'Cafe / Lounge':'ti-coffee',
  'Yacht Club / Boat Club':'ti-sailboat', 'Arts Centre':'ti-palette',
  'Restaurant':'ti-tools-kitchen-2', 'Outdoor / Patio':'ti-trees', 'Bar / Pub':'ti-glass-full',
}[t] || 'ti-map-pin');

const _openVenueLetters = new Set();
function toggleVenueLetter(letter) {
  const sec = document.getElementById('valpha-' + letter);
  if (!sec) return;
  if (_openVenueLetters.has(letter)) { _openVenueLetters.delete(letter); sec.classList.remove('open'); }
  else { _openVenueLetters.add(letter); sec.classList.add('open'); }
}

function renderVenues() {
  const q    = (document.getElementById('venue-search')?.value ?? '').toLowerCase().trim();
  const city = document.getElementById('venue-filter-city')?.value ?? '';
  const type = document.getElementById('venue-filter-type')?.value ?? '';
  const allNames = [...new Set(GIGS.map(g => g.v.trim()))].sort();
  const names = allNames.filter(name => {
    const v  = (typeof VENUE_PROFILES !== 'undefined' && VENUE_PROFILES[name]) || {};
    const g0 = GIGS.find(g => g.v.trim() === name);
    const vCity = v.city || g0?.c || '';
    const vType = v.type || g0?.t || '';
    return (!q || name.toLowerCase().includes(q)) && (!city || vCity === city) && (!type || vType === type);
  });
  const countEl = document.getElementById('venues-count');
  if (countEl) countEl.textContent = names.length + ' venue' + (names.length !== 1 ? 's' : '');
  const list = document.getElementById('venues-list');
  if (!list) return;
  if (!names.length) { list.innerHTML = '<div style="padding:48px 16px;text-align:center;color:var(--mist);font-size:13px">No venues found</div>'; return; }

  const groups = {};
  names.forEach(name => {
    const letter = name.replace(/^(the |a |an )/i, '')[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(name);
  });
  const letters = Object.keys(groups).sort();
  if (q || city || type) letters.forEach(l => _openVenueLetters.add(l));

  list.innerHTML = letters.map(letter => {
    const isOpen = _openVenueLetters.has(letter) || q || city || type;
    const venueRows = groups[letter].map(name => {
      const v     = (typeof VENUE_PROFILES !== 'undefined' && VENUE_PROFILES[name]) || {};
      const gigs  = GIGS.filter(g => g.v.trim() === name);
      const g0    = gigs[0];
      const vCity = v.city || g0?.c || '';
      const vType = v.type || g0?.t || '';
      const idx   = _reg(name);
      return `<div class="venue-row" onclick="_venueClick(event,${idx})" role="button" tabindex="0" aria-label="View ${name}">
        <div class="vr-icon"><i class="ti ${_typeIcon(vType)}"></i></div>
        <div class="vr-main"><div class="vr-name">${name}</div><div class="vr-meta">${vCity}${vType ? ' · ' + vType : ''}</div></div>
        <div class="vr-count">${gigs.length} gig${gigs.length !== 1 ? 's' : ''}</div>
      </div>`;
    }).join('');

    return `<div class="alpha-section${isOpen ? ' open' : ''}" id="valpha-${letter}">
      <div class="alpha-header" onclick="toggleVenueLetter(&quot;${letter}&quot;)" role="button" aria-expanded="${isOpen}">
        <span class="alpha-letter">${letter}</span>
        <span class="alpha-count">${groups[letter].length} venue${groups[letter].length !== 1 ? 's' : ''}</span>
        <i class="ti ti-chevron-down alpha-chevron"></i>
      </div>
      <div class="alpha-body">${venueRows}</div>
    </div>`;
  }).join('');
}

// ── About stats ───────────────────────────────────────────────────────────────
function renderAboutStats() {
  const artists = new Set(GIGS.map(g => g.a)).size;
  const venues  = new Set(GIGS.map(g => g.v)).size;
  const gEl = document.getElementById('about-stat-gigs');
  const aEl = document.getElementById('about-stat-artists');
  const vEl = document.getElementById('about-stat-venues');
  if (gEl) gEl.textContent = GIGS.length;
  if (aEl) aEl.textContent = artists;
  if (vEl) vEl.textContent = venues;
}

// ── Date picker ───────────────────────────────────────────────────────────────
let _dpMonth = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
let _dpOpen  = false;

function openDatePicker() {
  _dpMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  renderDpGrid();
  document.getElementById('date-picker').classList.add('open');
  document.getElementById('date-pick-btn').classList.add('open');
  document.getElementById('date-pick-btn').setAttribute('aria-expanded', 'true');
  _dpOpen = true;
}
function closeDatePicker() {
  document.getElementById('date-picker').classList.remove('open');
  document.getElementById('date-pick-btn').classList.remove('open');
  document.getElementById('date-pick-btn').setAttribute('aria-expanded', 'false');
  _dpOpen = false;
}
function toggleDatePicker() { _dpOpen ? closeDatePicker() : openDatePicker(); }

function renderDpGrid() {
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('dp-month-label').textContent = monthNames[_dpMonth.getMonth()] + ' ' + _dpMonth.getFullYear();
  const today          = todayDate();
  const firstDay       = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth(), 1).getDay();
  const daysInMonth    = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth(), 0).getDate();
  let cells = '';

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth() - 1, daysInPrevMonth - i);
    cells += `<button class="dp-day other-month${GIG_DOWS.has(d.getDay()) ? ' has-gigs' : ''}" onclick="goToDate(new Date(${d.getFullYear()},${d.getMonth()},${d.getDate()}))">${daysInPrevMonth - i}</button>`;
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth(), i);
    const isToday    = sameDay(d, today);
    const isSelected = sameDay(d, selectedDate);
    const hasGigs    = GIG_DOWS.has(d.getDay());
    let cls = 'dp-day';
    if (isSelected) cls += ' selected';
    else if (isToday) cls += ' today';
    if (hasGigs) cls += ' has-gigs';
    cells += `<button class="${cls}" onclick="goToDate(new Date(${d.getFullYear()},${d.getMonth()},${d.getDate()}))">${i}</button>`;
  }
  const remaining = (7 - ((firstDay + daysInMonth) % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(_dpMonth.getFullYear(), _dpMonth.getMonth() + 1, i);
    cells += `<button class="dp-day other-month${GIG_DOWS.has(d.getDay()) ? ' has-gigs' : ''}" onclick="goToDate(new Date(${d.getFullYear()},${d.getMonth()},${d.getDate()}))">${i}</button>`;
  }
  document.getElementById('dp-grid').innerHTML = cells;
}

document.getElementById('date-pick-btn').addEventListener('click', e => { e.stopPropagation(); toggleDatePicker(); });
document.getElementById('dp-prev').addEventListener('click', e => { e.stopPropagation(); _dpMonth.setMonth(_dpMonth.getMonth() - 1); renderDpGrid(); });
document.getElementById('dp-next').addEventListener('click', e => { e.stopPropagation(); _dpMonth.setMonth(_dpMonth.getMonth() + 1); renderDpGrid(); });
document.addEventListener('click', e => {
  if (_dpOpen) {
    const picker = document.getElementById('date-picker');
    const btn    = document.getElementById('date-pick-btn');
    if (!picker.contains(e.target) && !btn.contains(e.target)) closeDatePicker();
  }
});

// ── Search clear buttons ──────────────────────────────────────────────────────
function wireSearchClear(inputId, clearId, onClear) {
  const inp = document.getElementById(inputId);
  const btn = document.getElementById(clearId);
  if (!inp || !btn) return;
  const update = () => btn.classList.toggle('visible', inp.value.length > 0);
  inp.addEventListener('input', update);
  btn.addEventListener('click', () => { inp.value = ''; btn.classList.remove('visible'); inp.focus(); onClear(); });
  update();
}

// ── Init ──────────────────────────────────────────────────────────────────────
render();
document.getElementById('artist-search')?.addEventListener('input', () => renderArtists());
document.getElementById('venue-search')?.addEventListener('input',  () => renderVenues());
wireSearchClear('search',        'search-clear',        () => { removeDesktopPopovers(); render(); });
wireSearchClear('artist-search', 'artist-search-clear', () => renderArtists());
wireSearchClear('venue-search',  'venue-search-clear',  () => renderVenues());
document.getElementById('venue-filter-city')?.addEventListener('change', () => renderVenues());
document.getElementById('venue-filter-type')?.addEventListener('change', () => renderVenues());
