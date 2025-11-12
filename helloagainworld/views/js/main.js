// js/main.js

function fakeApi(data, delay = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

// ---------------- Temple Info ----------------
function fetchTempleDetails() {
  const templeData = {
    name: "Sri Lakshmi Narayana Temple",
    location: "Bangalore, Karnataka",
    established: "1890",
    about:
      "A historic temple dedicated to Goddess Lakshmi and Lord Narayana, known for its spiritual energy and peaceful ambiance.",
    image: "images/temple_main.jpg",
  };

  fakeApi(templeData).then((data) => {
    document.getElementById("temple-details").innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-4">
          <img src="${data.image}" alt="Temple" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
          <strong>Temple Name:</strong> ${data.name}<br>
          <strong>Location:</strong> ${data.location}<br>
          <strong>Established:</strong> ${data.established}<br>
          <p class="mt-2">${data.about}</p>
        </div>
      </div>
    `;
  });
}

// ---------------- Events ----------------
function fetchEvents() {
  const events = [
    {
      id: 1,
      name: "Lakshmi Pooja",
      date: "2025-12-01",
      description: "Special puja for wealth and prosperity.",
      image: "images/event1.jpg",
    },
    {
      id: 2,
      name: "Satyanarayana Vrata",
      date: "2025-12-10",
      description: "A sacred ritual for harmony and success.",
      image: "images/event2.jpg",
    },
    {
      id: 3,
      name: "Deepotsava",
      date: "2025-12-20",
      description: "Festival of lights and devotion.",
      image: "images/event3.jpg",
    },
  ];

  fakeApi(events).then((data) => {
    const container = document.getElementById("events-list");
    container.innerHTML = data
      .map(
        (e) => `
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <img src="${e.image}" class="card-img-top" alt="${e.name}">
          <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <p><strong>Date:</strong> ${e.date}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  });
}

// ---------------- Sevas ----------------
function fetchSevas() {
  const sevas = [
    {
      id: 1,
      name: "Archana",
      cost: 100,
      details: "Personal offering to the deity.",
      image: "images/archana.jpg",
    },
    {
      id: 2,
      name: "Abhishekam",
      cost: 250,
      details: "Holy bath for the deity.",
      image: "images/abhishekam.jpg",
    },
    {
      id: 3,
      name: "Sahasranama Pooja",
      cost: 500,
      details: "Chanting of 1000 names of the deity.",
      image: "images/sahasranama.jpg",
    },
  ];

  fakeApi(sevas).then((data) => {
    const container = document.getElementById("seva-list");
    container.innerHTML = data
      .map(
        (s) => `
      <div class="col-md-4">
        <div class="card border-success shadow-sm h-100">
          <img src="${s.image}" class="card-img-top" alt="${s.name}">
          <div class="card-body">
            <h5 class="card-title">${s.name}</h5>
            <p class="card-text">${s.details}</p>
            <p><strong>Cost:</strong> ₹${s.cost}</p>
            <button class="btn btn-success btn-sm" onclick="bookSeva(${s.id}, '${s.name}', '${s.image}')">Book Seva</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  });
}

// ---------------- Booking with LocalStorage ----------------
function bookSeva(id, name, image) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push({
    id,
    name,
    date: new Date().toISOString().split("T")[0],
    image,
  });
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert(`✅ ${name} booked successfully!`);
}

function fetchUserBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const container = document.getElementById("booking-list");

  if (bookings.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">No bookings yet. Go to Sevas page to book one.</p>`;
    return;
  }

  container.innerHTML = bookings
    .map(
      (b) => `
    <div class="col-md-4">
      <div class="card border-info shadow-sm h-100">
        <img src="${b.image}" class="card-img-top" alt="${b.name}">
        <div class="card-body">
          <h5 class="card-title">${b.name}</h5>
          <p><strong>Date:</strong> ${b.date}</p>
          <button class="btn btn-danger btn-sm" onclick="cancelBooking(${b.id})">Cancel</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function cancelBooking(id) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.filter((b) => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  fetchUserBookings();
}

// ---------------- Gallery ----------------
function loadGallery() {
  const images = [
    "gallery1.jpg",
    "gallery2.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
  ];
  const container = document.getElementById("gallery-list");
  container.innerHTML = images
    .map(
      (img) => `
    <div class="col-md-3 col-6">
      <div class="card shadow-sm">
        <img src="images/${img}" class="card-img-top" alt="Gallery Image">
      </div>
    </div>
  `
    )
    .join("");
}

// ---------------- Daily Quote ----------------
function showDailyQuote() {
  const quotes = [
    "“Om Namo Narayanaya” – Chant this and feel divine peace.",
    "“Serve humanity as service to God.”",
    "“Faith moves mountains; devotion moves hearts.”",
    "“The light of the lamp dispels darkness; the light of wisdom dispels ignorance.”",
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("daily-quote").innerText = quote;
}

// ---------------- Notifications ----------------
function toggleNotifications() {
  const panel = document.getElementById("notifPanel");
  if (panel) panel.classList.toggle("open");
}

function fetchNotifications() {
  const notifications = [
    { msg: "New event: Karthika Deepotsava on Nov 25, 2025." },
    { msg: "Your Abhishekam seva is scheduled for tomorrow at 7:00 AM." },
    { msg: "Temple will be closed on 14th Nov for maintenance." },
    { msg: "Prasadam distribution daily from 12:30 PM to 1:00 PM." },
  ];

  fakeApi(notifications).then((data) => {
    const notifList = document.getElementById("notifList");
    if (!notifList) return;
    notifList.innerHTML = data
      .map(
        (n) => `
      <div class="notif-item">🔔 ${n.msg}</div>
    `
      )
      .join("");
  });
}
