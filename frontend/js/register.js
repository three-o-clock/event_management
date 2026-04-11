const form = document.getElementById("registrationForm");
form.style.display = "none";

const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");

let currentEvent = null;

async function loadEvent() {
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();


    const event = events.find(e => Number(e.id) === Number(eventId));
    
    document.getElementById("eventDetails").innerHTML = `
    <h2>${event.name}</h2>
    <p>${event.description}</p>
    <p><b>Date:</b> ${event.event_date}</p>
    <p><b>Time:</b> ${event.event_time}</p>
    <p><b>Venue:</b> ${event.venue}</p>
`;
    form.style.display = "block";
    currentEvent = event;
    console.log("currentEvent set:", currentEvent);

    if (!event) {
        alert("Event not found");
        return;
    }

    // 🔥 THIS IS WHERE YOUR LOGIC GOES
    if (event.participation_type === "solo") {
        document.getElementById("teamFields").style.display = "none";
    } else {
        document.getElementById("soloFields").style.display = "none";
    }
}

loadEvent();

const teamSizeInput = document.getElementById("teamSize");
const membersDiv = document.getElementById("teamMembers");

teamSizeInput.addEventListener("input", () => {
    const size = parseInt(teamSizeInput.value);
    membersDiv.innerHTML = "";

    for (let i = 1; i <= size; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Member ${i} Name`;
        input.classList.add("member");
        membersDiv.appendChild(input);
    }
});

document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentEvent) {
        alert("Event not loaded yet. Please wait.");
        return;
    }

    let data;

    if (currentEvent.participation_type === "solo") {
        data = {
            eventId: eventId,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };
    } else {
        const members = Array.from(document.querySelectorAll(".member"))
            .map(input => input.value);

        data = {
            eventId: eventId,
            teamName: document.getElementById("teamName").value,
            teamSize: document.getElementById("teamSize").value,
            leaderName: document.getElementById("leaderName").value,
            leaderEmail: document.getElementById("leaderEmail").value,
            members: members
        };
    }

    await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("Registered successfully!");
});

