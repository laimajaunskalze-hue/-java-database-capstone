function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // 1. Pārbaudām, vai neesam sākumlapā
    if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // 2. Drošības pārbaude pierakstītiem lietotājiem
    if ((role === "admin" || role === "doctor" || role === "loggedPatient") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
    }

    let headerContent = `
        <div class="header-container">
            <div class="logo">
                <img src="/assets/images/logo/logo.png" alt="Clinic Logo" onclick="window.location.href='/'" style="cursor:pointer">
            </div>
            <nav class="nav-links">
    `;

    // 3. Dinamiskā satura ģenerēšana pēc lomas
    if (role === "admin") {
        headerContent += `
            <button id="addDocBtn" class="adminBtn">Add Doctor</button>
            <a href="#" id="logoutBtn">Logout</a>`;
    } else if (role === "doctor") {
        headerContent += `
            <a href="/templates/doctor/doctorDashboard.html">Home</a>
            <a href="#" id="logoutBtn">Logout</a>`;
    } else if (role === "loggedPatient") {
        headerContent += `
            <a href="/pages/patientDashboard.html">Home</a>
            <a href="/pages/patientAppointments.html">Appointments</a>
            <a href="#" id="logoutBtn">Logout</a>`;
    } else {
        // Noklusējuma skats parastam pacientam
        headerContent += `
            <button class="login-btn" onclick="openModal('login')">Login</button>
            <button class="signup-btn" onclick="openModal('signup')">Sign Up</button>`;
    }

    headerContent += `</nav></div>`;
    headerDiv.innerHTML = headerContent;

    // 4. Pievienojam klausītājus pogām
    attachHeaderListeners();
}

function attachHeaderListeners() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear(); // Notīra sesiju
            window.location.href = "/";
        });
    }

    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => {
            if (typeof openModal === "function") openModal('addDoctor');
        });
    }
}

// Inicializējam
renderHeader();