console.log("LOGIN JS LOADED ");
function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Sending:", email, password); // 🔥 DEBUG

   fetch("http://127.0.0.1:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        console.log("Response status:", response.status); // 🔥 DEBUG

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }
        return response.json();
    })
    .then(data => {
        console.log("Login success:", data); // 🔥 DEBUG

        // ✅ store user_id
        localStorage.setItem("user_id", data.user_id);

        alert("Login successful!");

        // ✅ redirect
        window.location.href = "index.html";
    })
    .catch(error => {
        console.log("Login error:", error);
        alert(error.message);
    });
}