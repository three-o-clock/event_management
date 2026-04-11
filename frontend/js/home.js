let selectedEventId = null;

// 🔹 OPEN POPUP
function openPopup(event) {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";

    selectedEventId = event.id;

    console.log("Selected Event ID:", selectedEventId); // debug

    document.getElementById("eventTitle").innerText = event.name;
    document.getElementById("eventSummary").innerText = event.description || "No description";

    const list = document.getElementById("eventCriteria");
    list.innerHTML = "";

    const criteria = [
        `Type: ${event.type}`,
        `Participation: ${event.participation_type}`,
        `Team Size: ${event.team_size}`,
        `Venue: ${event.venue}`,
        `Date: ${event.event_date}`,
        `Time: ${event.event_time}`,
        `Eligibility: ${event.eligibility}`
    ];

    criteria.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });

    // ✅ IMPORTANT: attach here
    document.getElementById("registerBtn").onclick = () => {
        console.log("Redirecting with ID:", selectedEventId);
        window.location.href = `register.html?eventId=${selectedEventId}`;
    };
}

function registerEvent() {
    console.log("Redirecting with ID:", selectedEventId);
    window.location.href = `register.html?eventId=${selectedEventId}`;
}

document.getElementById("closeBtn").onclick = function () {
    document.getElementById("popup").style.display = "none";
};

// 🔹 LOAD EVENTS
async function loadEvents() {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();

    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    data.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
    <h3>${event.name}</h3>
    <p><b>Time:</b> ${event.event_time || "N/A"}</p>
    <p><b>Date:</b> ${event.event_date || "N/A"}</p>
    <button>View</button>
`;

        card.querySelector("button").addEventListener("click", () => {
            openPopup(event);
        });

        container.appendChild(card);
        console.log("EVENT DATA:", data);
    });
}


window.onload = loadEvents;