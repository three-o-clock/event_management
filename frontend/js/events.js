async function loadEvents() {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();

    const list = document.getElementById("eventList");

    if (!list) return; // ✅ important check

    list.innerHTML = "";

    data.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event.event_name;
        list.appendChild(li);
    });
}

// Only call if event list exists
if (document.getElementById("eventList")) {
    loadEvents();
}

// Handle form submit
document.getElementById("eventForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;

    await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ event_name: name })
    });

    alert("Event Created!");

    // ✅ reload events after creation (optional)
    loadEvents();
});