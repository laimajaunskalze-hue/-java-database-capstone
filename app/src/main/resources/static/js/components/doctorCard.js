export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    // Ārsta informācijas sekcija
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.innerHTML = `<strong>Specialty:</strong> ${doctor.specialization}`;

    const email = document.createElement("p");
    email.innerHTML = `<strong>Email:</strong> ${doctor.email}`;

    const availability = document.createElement("p");
    availability.innerHTML = `<strong>Available:</strong> ${doctor.availability.join(", ")}`;

    infoDiv.append(name, specialization, email, availability);

    // Darbību pogas atkarībā no lomas
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("delete-btn");
        removeBtn.onclick = () => {
            if(confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
                // Šeit vēlāk būs API izsaukums
                console.log("Delete doctor ID:", doctor.id);
            }
        };
        actionsDiv.appendChild(removeBtn);
    } else if (role === "patient") {
        const bookBtn = document.createElement("button");
        bookBtn.textContent = "Book Now";
        bookBtn.onclick = () => alert("Please login first.");
        actionsDiv.appendChild(bookBtn);
    } else if (role === "loggedPatient") {
        const bookBtn = document.createElement("button");
        bookBtn.textContent = "Book Appointment";
        bookBtn.onclick = (e) => {
             // Šeit vēlāk būs Booking Overlay loģika
             console.log("Booking for doctor:", doctor.id);
        };
        actionsDiv.appendChild(bookBtn);
    }

    card.append(infoDiv, actionsDiv);
    return card;
}