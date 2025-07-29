/*
 * Copyright (C) 2025  Tetex7
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Creates and appends a navigation button to a list.
 * @param {HTMLElement} navList - The navigation list element to append to.
 * @param {string} title - The text for the button.
 * @param {string} href - The URL the button links to.
 * @param {string} desc - Optional description.
 * @return {void}
 */
function makeNavButton(navList, title, href, desc)
{
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = title;

    if (desc)
    {
        a.title = desc; // this creates a native tooltip on hover
    }

    li.appendChild(a);
    navList.appendChild(li);
}

/**
 * @typedef {{title:string, slug:string, description:string, enable:boolean}} project_t
 * @typedef {{title:string, href:string, desc:string}} staticLinks_t
 */

document.addEventListener("DOMContentLoaded", () => {
    // Load nav.html snippet
    fetch('include/nav.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('nav-placeholder').innerHTML = html;

            // After nav is loaded, populate projects dynamically
            const navList = document.getElementById("nav-list");


            /** @type staticLinks_t[] */
            // Add static links
            const staticLinks = [
                { title: "Home", href: "index.html", desc: "The main home page" },
                { title: "About", href: "about.html", desc: "The About Me page" }
            ];

            staticLinks.forEach(link => {
                makeNavButton(navList, link.title, link.href, link.desc);
            });

            // Add dynamic project links
            fetch('projects.json')
                .then(res => res.json())
                .then(projects => {
                    projects.forEach( /** @param {project_t} proj */ proj => {
                        if (proj.enable === true)
                        {
                            makeNavButton(navList, proj.title, `${proj.slug}.html`, proj.description);
                        }
                    });
                })
                .catch(err => {
                    makeNavButton(navList, "Failed to load projects.json", "#", "Failed to load projects.json");
                    console.error("Failed to load projects.json", err);
                });

        })
        .catch(err => {
            console.error("Failed to load nav.html", err);
        });
});

