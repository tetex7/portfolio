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

/*document.addEventListener("DOMContentLoaded", () => {
    const navList = document.getElementById("nav-list");

    // Static links
    const staticLinks = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about.html" }
    ];

    staticLinks.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.title;
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Project links from JSON
    fetch("/projects/projects.json")
        .then(res => res.json())
        .then(projects => {
            projects.forEach(proj => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `/projects/${proj.slug}/index.html`;
                a.textContent = proj.title;
                li.appendChild(a);
                navList.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Nav load failed:", err);
        });
});*/

document.addEventListener("DOMContentLoaded", () => {
    // Load nav.html snippet
    fetch('include/nav.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('nav-placeholder').innerHTML = html;

            // After nav is loaded, populate projects dynamically
            const navList = document.getElementById("nav-list");

            // Add static links
            const staticLinks = [
                { title: "Home", href: "index.html" },
                { title: "About", href: "about.html" }
            ];

            staticLinks.forEach(link => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = link.href;
                a.textContent = link.title;
                li.appendChild(a);
                navList.appendChild(li);
            });

            // Add dynamic project links
            fetch('projects/projects.json')
                .then(res => res.json())
                .then(projects => {
                    projects.forEach(proj => {
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        a.href = `projects/${proj.slug}/index.html`;
                        a.textContent = proj.title;
                        li.appendChild(a);
                        navList.appendChild(li);
                    });
                })
                .catch(err => {
                    console.error("Failed to load projects.json", err);
                });

        })
        .catch(err => {
            console.error("Failed to load nav.html", err);
        });
});

