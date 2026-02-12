function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-logo">
                <img src="./assets/images/logo/logo.png" alt="Clinic Logo" />
                <p>© 2026 Clinic Management System. All Rights Reserved.</p>
            </div>
            <div class="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
            </div>
            <div class="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
            </div>
            <div class="footer-column">
                <h4>Legals</h4>
                <a href="#">Terms</a>
                <a href="#">Privacy Policy</a>
            </div>
        </footer>
    `;
}

// Izsaucam funkciju, lai tā ielādētos
renderFooter();