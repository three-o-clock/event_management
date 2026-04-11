// ✅ CHECK LOGIN (protect page)
const userId = localStorage.getItem("user_id");

if (!userId) {
    alert("Please login first!");
    window.location.href = "login.html";
    throw new Error("Not logged in"); // stop execution
}


// ✅ GLOBAL VARIABLE
let selectedEventId = null;


// ✅ OPEN POPUP FUNCTION
function openPopup(type, eventId) {
    selectedEventId = eventId;

    const popup = document.getElementById("popup");
    popup.style.display = "flex";

    let title = "";
    let summary = "";
    let criteria = [];

    if (type === "technical") {
        title = "Technical Workshop";
        summary = "Learn web development basics and build real projects.";
        criteria = ["Age: 18+", "B.Tech background preferred"];
    }

    if (type === "hackathon") {
        title = "Hackathon";
        summary = "24-hour coding challenge to solve real-world problems.";
        criteria = ["Age: 18+", "Coding knowledge required"];
    }

    if (type === "coding") {
        title = "Coding Contest";
        summary = "Competitive programming contest with exciting prizes.";
        criteria = ["Open for all", "Basic programming required"];
    }

    document.getElementById("eventTitle").innerText = title;
    document.getElementById("eventSummary").innerText = summary;

    const list = document.getElementById("eventCriteria");
    list.innerHTML = "";

    criteria.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}


// ✅ REGISTER FUNCTION (DYNAMIC USER + EVENT)
function registerEvent() {

    if (!selectedEventId) {
        alert("Please select an event first!");
        return;
    }

    const data = {
        user_id: localStorage.getItem("user_id"),
        event_id: selectedEventId
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Registration failed");
        }
        return response.text();
    })
    .then(result => {
        alert("Registered successfully!");
        console.log(result);
    })
    .catch(error => {
        console.log(error);
        alert("Error registering!");
    });
}


// ✅ PROFILE + LOGOUT
function goProfile() {
    alert("Profile page coming soon!");
}

function logout() {
    localStorage.removeItem("user_id");
    alert("Logged out!");
    window.location.href = "login.html";
}


// ✅ CLOSE POPUP
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("closeBtn").onclick = function () {
        document.getElementById("popup").style.display = "none";
    };
});


// ✅ FETCH EVENTS FROM BACKEND
fetch('http://localhost:3000/events')
.then(response => response.json())
.then(data => {
    const list = document.getElementById('eventsList');

    list.innerHTML = "";

    data.forEach(event => {
        const li = document.createElement(
            'li');
        li.textContent = event.event_name;
        list.appendChild(li);
    });
})
.catch(error => console.log("Error fetching events:", error));