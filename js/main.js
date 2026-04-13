// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript is connected and running!");

  const cube = document.getElementById('cube');
  const navButtons = document.querySelectorAll('.nav-btn');

  // Fetch the external HTML files
  async function loadPage(pageUrl, containerId) {
    console.log(`Attempting to fetch: ${pageUrl}...`);
    try {
      const response = await fetch(pageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(containerId).innerHTML = html;
      console.log(`Success! Injected ${pageUrl} into ${containerId}`);
    } catch (error) {
      console.error(`FAILED to load ${pageUrl}:`, error);
      document.getElementById(containerId).innerHTML = `
        <div class="d-flex flex-column align-items-center justify-content-center h-100 p-5 text-center">
          <h3 class="text-danger fw-bold">Fetch Error</h3>
          <p class="text-dark">Could not load <b>${pageUrl}</b>.</p>
          <p class="text-muted small">You MUST open this file using VS Code's "Live Server" extension, not by double-clicking the HTML file.</p>
        </div>`;
    }
  }

  // Load the pages
  loadPage('pages/about.html', 'content-about');
  loadPage('pages/projects.html', 'content-projects');
  loadPage('pages/experience.html', 'content-experience');

  // Grab all the faces of the cube
  const faces = document.querySelectorAll('.face');

  // Handle Rotation
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const faceIndex = parseInt(e.target.getAttribute('data-face'));
      console.log(`Rotating cube to face ${faceIndex}`);

      const rotateAngle = faceIndex * -90;
      cube.style.transform = `translateZ(-50vw) rotateY(${rotateAngle}deg)`;

      // FIX: Remove 'active' from all faces, then add it ONLY to the new face
      faces.forEach(f => f.classList.remove('active'));
      faces[faceIndex].classList.add('active');

      // Automatically collapse the Bootstrap mobile menu if it is open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});