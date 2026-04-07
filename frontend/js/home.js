function openPopup(type) {
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

function registerEvent() {
    // For now we use fixed values (we improve later)
    const data = {
        user_id: 1,
        event_id: 1
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert("Registered successfully!");
        console.log(result);
    })
    .catch(error => {
        console.log(error);
        alert("Error registering!");
    });
}
function goProfile() {
    alert("Profile page coming soon!");
}

function logout() {
    alert("Logged out!");
    window.location.href = "index.html";
}

// Close popup
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("closeBtn").onclick = function () {
        document.getElementById("popup").style.display = "none";
    };
});


// ✅ NEW: FETCH EVENTS FROM BACKEND (STEP 3.3)
fetch('http://localhost:3000/events')
.then(response => response.json())
.then(data => {
    const list = document.getElementById('eventsList');

    data.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.event_name;
        list.appendChild(li);
    });
})
.catch(error => console.log("Error fetching events:", error));