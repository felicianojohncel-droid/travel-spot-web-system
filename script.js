const spots = [
  {name:'El Nido',location:'Palawan',category:'Beach',image:'https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1000&q=90',description:'Turquoise lagoons, limestone cliffs, and white-sand beaches in El Nido.',budget:'₱3,500 – ₱6,000',activities:'Island hopping, snorkeling, kayaking',flight:4800},
  {name:'Kawasan Falls',location:'Badian, Cebu',category:'Waterfall',image:'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=90',description:'Blue waters and an exciting canyoneering adventure at the famous Kawasan Falls.',budget:'₱1,500 – ₱3,000',activities:'Canyoneering, swimming, trekking',flight:3200},
  {name:'Mt. Pulag',location:'Benguet',category:'Mountain',image:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=90',description:'Sea of clouds and golden sunrise for hikers and campers.',budget:'₱2,000 – ₱4,000',activities:'Hiking, camping, sightseeing',flight:3600},
  {name:'Intramuros',location:'Manila',category:'Historical',image:'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=90',description:'Explore old Manila inside the historic walled city.',budget:'₱800 – ₱1,500',activities:'Walking tour, sightseeing, food trip',flight:0},
  {name:'Baguio Botanical Garden',location:'Baguio City',category:'Park',image:'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=90',description:'Cool weather, flowers, greenery, and local culture.',budget:'₱1,000 – ₱2,500',activities:'Nature walk, photography, sightseeing',flight:3500},
  {name:'Nacpan Beach',location:'El Nido, Palawan',category:'Beach',image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=90',description:'Powdery sand and clear water for a peaceful beach day.',budget:'₱2,500 – ₱5,000',activities:'Swimming, sunset watching',flight:4800},
  {name:'Chocolate Hills',location:'Carmen, Bohol',category:'Mountain',image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=90',description:'A breathtaking landscape of hundreds of cone-shaped hills in Bohol.',budget:'₱1,500 – ₱3,500',activities:'Sightseeing, photography, countryside tour',flight:3000},
  {name:'Boracay White Beach',location:'Malay, Aklan',category:'Beach',image:'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=90',description:'World-famous white sand, clear water, and unforgettable sunsets.',budget:'₱4,000 – ₱8,000',activities:'Swimming, diving, sailing, sunset cruise',flight:4200},
  {name:'Mayon Volcano',location:'Albay, Bicol',category:'Mountain',image:'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=90',description:'See the perfectly shaped Mayon Volcano and explore Albay culture.',budget:'₱2,000 – ₱4,000',activities:'Sightseeing, ATV ride, photography',flight:3800},
  {name:'Puerto Princesa Underground River',location:'Palawan',category:'Waterfall',image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=90',description:'A UNESCO World Heritage site with a spectacular river cave system.',budget:'₱3,000 – ₱6,000',activities:'Boat tour, caving, wildlife watching',flight:4800},
  {name:'Rizal Park',location:'Manila',category:'Park',image:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=90',description:'A historic urban park and relaxing green space in the heart of Manila.',budget:'₱500 – ₱1,200',activities:'Walking, sightseeing, picnic, photography',flight:0},
  {name:'Vigan Heritage Village',location:'Vigan, Ilocos Sur',category:'Historical',image:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=90',description:'Walk along cobblestone streets surrounded by Spanish-era architecture.',budget:'₱1,500 – ₱3,000',activities:'Heritage walk, kalesa ride, food trip',flight:4200}
];

const $ = id => document.getElementById(id);
const money = value => `₱${Number(value).toLocaleString('en-PH')}`;
let authMode = 'login';
let activeCategory = 'All';
let selected = spots[0];

function toast(text){
  $('toast').textContent = text;
  $('toast').classList.add('show');
  setTimeout(() => $('toast').classList.remove('show'), 2800);
}

function setAuthMode(mode){
  authMode = mode;
  $('emailField').classList.toggle('hidden', mode === 'login');
  $('email').required = mode === 'register';
  $('authTitle').textContent = mode === 'login' ? 'Welcome back!' : 'Create your account';
  $('authText').textContent = mode === 'login' ? 'Mag-login muna para makapasok sa travel dashboard.' : 'Gumawa ng account gamit ang username at password.';
  $('authButton').textContent = mode === 'login' ? 'Log in' : 'Register';
  $('switchAuth').textContent = mode === 'login' ? 'Wala pang account? Register' : 'May account na? Log in';
  $('authMessage').textContent = '';
}

function showApp(){
  const user = JSON.parse(localStorage.getItem('lakbayUser') || 'null');
  if (!user) return;
  $('authView').classList.add('hidden');
  $('appView').classList.remove('hidden');
  $('welcome').textContent = `Hi, ${user.username}!`;
}

if (localStorage.getItem('lakbayUser')) showApp();

$('switchAuth').onclick = () => setAuthMode(authMode === 'login' ? 'register' : 'login');
$('authForm').onsubmit = event => {
  event.preventDefault();
  const username = $('username').value.trim();
  const password = $('password').value;
  const email = $('email').value.trim().toLowerCase();
  if (username.length < 3) return $('authMessage').textContent = 'Username must be at least 3 characters.';
  if (password.length < 6) return $('authMessage').textContent = 'Password must be at least 6 characters.';
  if (authMode === 'register') {
    localStorage.setItem('lakbayAccount', JSON.stringify({username, password, email}));
    $('authMessage').style.color = 'green';
    $('authMessage').textContent = 'Registered successfully. Mag-login na ngayon.';
    setAuthMode('login');
    $('username').value = username;
    $('password').value = '';
    return;
  }
  const account = JSON.parse(localStorage.getItem('lakbayAccount') || 'null');
  if (!account || account.username.toLowerCase() !== username.toLowerCase() || account.password !== password) {
    return $('authMessage').textContent = 'Mali ang username o password.';
  }
  localStorage.setItem('lakbayUser', JSON.stringify({username: account.username}));
  showApp();
};

$('logout').onclick = () => { localStorage.removeItem('lakbayUser'); location.reload(); };

$('categories').innerHTML = ['All','Beach','Waterfall','Mountain','Park','Historical'].map(category =>
  `<button class="category ${category === 'All' ? 'active' : ''}" data-category="${category}">${category}</button>`
).join('');

function renderSpots(){
  const query = $('search').value.trim().toLowerCase();
  const result = spots.filter(spot =>
    (activeCategory === 'All' || spot.category === activeCategory) &&
    `${spot.name} ${spot.location} ${spot.category}`.toLowerCase().includes(query)
  );

  $('spotGrid').innerHTML = result.length ? result.map(spot => `
    <article class="spot-card">
      <div class="spot-image" style="background-image:url('${spot.image}')">
        <span class="badge">${spot.category}</span>
        <button class="favorite" type="button" aria-label="Favorite">♡</button>
      </div>
      <div class="spot-body">
        <h3>${spot.name}</h3>
        <div class="location">📍 ${spot.location}</div>
        <p>${spot.description}</p>
        <div class="spot-footer">
          <span>Budget mula sa<strong>${spot.budget.split(' – ')[0]}</strong></span>
          <button class="details" type="button" data-name="${spot.name}">View details →</button>
        </div>
      </div>
    </article>
  `).join('') : '<p class="muted">Walang nahanap na destination.</p>';

  document.querySelectorAll('.details').forEach(button => {
    button.onclick = () => openDetails(spots.find(spot => spot.name === button.dataset.name));
  });
  document.querySelectorAll('.favorite').forEach(button => {
    button.onclick = () => {
      button.textContent = button.textContent === '♡' ? '♥' : '♡';
      button.style.color = button.textContent === '♥' ? '#e75c5c' : '';
    };
  });
}

function openDetails(spot){
  if (!spot) return;
  selected = spot;
  $('modalTitle').textContent = spot.name;
  $('modalLocation').textContent = `📍 ${spot.location} · ${spot.category}`;
  $('modalDescription').textContent = spot.description;
  $('modalInfo').innerHTML = `
    <div><b>Estimated budget</b>${spot.budget}</div>
    <div><b>Activities</b>${spot.activities}</div>
    <div><b>Flight estimate</b>${spot.flight ? money(spot.flight) : 'Land travel'}</div>
  `;
  let mapButton = $('googleMapsButton');
  if (!mapButton) {
    mapButton = document.createElement('a');
    mapButton.id = 'googleMapsButton';
    mapButton.className = 'primary full map-button';
    mapButton.target = '_blank';
    mapButton.rel = 'noopener';
    mapButton.textContent = 'Open in Google Maps ↗';
    $('modalInfo').after(mapButton);
  }
  mapButton.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name}, ${spot.location}, Philippines`)}`;
  $('spotModal').classList.remove('hidden');
}

$('closeModal').onclick = () => $('spotModal').classList.add('hidden');
$('spotModal').onclick = event => { if (event.target === $('spotModal')) $('spotModal').classList.add('hidden'); };
$('bookSpot').onclick = () => {
  $('destination').value = selected.name;
  updatePrice();
  $('spotModal').classList.add('hidden');
  $('planner').scrollIntoView({behavior:'smooth'});
};

document.querySelectorAll('.category').forEach(button => button.onclick = () => {
  document.querySelector('.category.active').classList.remove('active');
  button.classList.add('active');
  activeCategory = button.dataset.category;
  renderSpots();
});
$('search').oninput = renderSpots;
$('searchButton').onclick = () => { renderSpots(); $('spots').scrollIntoView({behavior:'smooth'}); };

$('destination').innerHTML = spots.map(spot => `<option value="${spot.name}">${spot.name} — ${spot.location}</option>`).join('');
function updatePrice(){
  const spot = spots.find(item => item.name === $('destination').value);
  if (!spot) return;
  let total = spot.flight || 0;
  total += ({MNL:0, CEB:500, DVO:900}[$('airport').value] || 0);
  total *= Number($('tripType').value);
  total *= Math.max(1, Number($('travelers').value));
  $('flightPrice').textContent = total ? money(total) : '₱0 (land travel)';
}
['destination','airport','tripType'].forEach(id => $(id).onchange = updatePrice);
$('travelers').oninput = updatePrice;
$('travelDate').min = new Date().toISOString().slice(0,10);
$('bookingForm').onsubmit = event => {
  event.preventDefault();
  const code = 'LPH-' + Math.random().toString(36).slice(2,8).toUpperCase();
  toast(`Booking saved: ${code}`);
};
updatePrice();
renderSpots();
