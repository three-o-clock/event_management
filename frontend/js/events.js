async function loadEvents() {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();

    const list = document.getElementById("eventList");
    list.innerHTML = "";

    data.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event.event_name;
        list.appendChild(li);
    });
}

loadEvents();