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

// js/include.js
document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll('[data-include]');

    includes.forEach(el => {
        const file = el.getAttribute('data-include');
        if (file.endsWith("include/nav.html"))
        {
            console.error("Cannot include the NAV bar using this system");
            el.innerHTML = "<!-- NAV include failed -->";
            return
        }

        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch ${file}`);
                return res.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => {
                console.error("Include error:", err);
                el.innerHTML = "<!-- include failed -->";
            });
    });

});


