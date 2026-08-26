async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Could not load ${file}`);
        }

        element.innerHTML = await response.text();

    } catch (error) {
        console.error(error);
    }
}


loadComponent("navbar", "/components/navigation_bar.html");
loadComponent("footer", "/components/footer.html");
loadComponent("social-dock", "/components/social_dock.html");