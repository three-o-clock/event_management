const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");
console.log("Event ID from URL:", eventId);

let currentEvent = null;

const form = document.getElementById("registrationForm");

// 🔹 Load event
async function loadEvent() {
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();

    const event = events.find(e => Number(e.id) === Number(eventId));
    console.log("Found event:", event);
    if (!event) {
        alert("Event not found");
        return;
    }

    currentEvent = event;

    // Show event details
    document.getElementById("eventDetails").innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p><b>Date:</b> ${event.event_date}</p>
        <p><b>Time:</b> ${event.event_time}</p>
        <p><b>Venue:</b> ${event.venue}</p>
    `;

    // Show correct form
    if (event.participation_type === "solo") {
        document.getElementById("teamFields").style.display = "none";
    } else {
        document.getElementById("soloFields").style.display = "none";
    }
}

loadEvent();

// 🔹 Team members dynamic
const teamSizeInput = document.getElementById("teamSize");
const membersDiv = document.getElementById("teamMembers");

if (teamSizeInput) {
    teamSizeInput.addEventListener("input", () => {
        const size = parseInt(teamSizeInput.value);
        membersDiv.innerHTML = "";

        for (let i = 1; i <= size; i++) {
            const input = document.createElement("input");
            input.placeholder = `Member ${i} Name`;
            input.classList.add("member");
            membersDiv.appendChild(input);
        }
    });
}

// 🔹 Submit form
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentEvent) {
        alert("Event not loaded");
        return;
    }

    let data;

    if (currentEvent.participation_type === "solo") {
        data = {
            eventId,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };
    } else {
        const members = Array.from(document.querySelectorAll(".member"))
            .map(input => input.value);

        data = {
            eventId,
            teamName: document.getElementById("teamName").value,
            teamSize: document.getElementById("teamSize").value,
            leaderName: document.getElementById("leaderName").value,
            leaderEmail: document.getElementById("leaderEmail").value,
            members
        };
    }

    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert("Registered successfully!");
        window.location.href = "index.html";
    } else {
        alert("Registration failed");
    }
});
