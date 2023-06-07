//          Copyright Martin Prätzlich 2023 - 2023.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE_1_0.txt or copy at
//          https://www.boost.org/LICENSE_1_0.txt)


var themes = ["dark", "light", "vintage", "summer"]
var currentTheme = 0

function toggleTheme() {
    currentTheme = (currentTheme + 1) % themes.length

    var rootStyles = document.documentElement.style
    rootStyles.setProperty("--text-color", "var(--text-color-" + themes[currentTheme] + ")")
    rootStyles.setProperty("--background-color", "var(--background-color-" + themes[currentTheme] + ")")
    rootStyles.setProperty("--button-background-color", "var(--button-background-color-" + themes[currentTheme] + ")")
    rootStyles.setProperty("--button-text-color", "var(--button-text-color-" + themes[currentTheme] + ")")
    rootStyles.setProperty("--button-hover-background-color", "var(--button-hover-background-color-" + themes[currentTheme] + ")")
}

document.getElementById('entry-form').addEventListener('submit', async function (event) {
    event.preventDefault()

    var slug = document.getElementById('slug').value
    var url = document.getElementById('url').value
    var authToken = document.getElementById('auth-token').value

    await fetch('/entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken // Authentifizierungstoken als Bearer-Token hinzufügen
            },
            body: JSON.stringify({
                slug: slug,
                url: url
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => {
            console.error('Error:', error)
        })
})

function toggleInstructions() {
    let instructions = document.getElementById("instructions")
    instructions.style.display = instructions.style.display === "none" ? "block" : "none"
}

function showAndUpdateEntries() {
    fetch('/entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Einträge in die Liste einfügen
            var entriesList = document.getElementById('entries-list')
            entriesList.innerHTML = '' // Vorhandene Einträge löschen

            data.forEach(entry => {
                var listItem = document.createElement('li')
                listItem.textContent = entry.slug + ': ' + entry.url
                entriesList.appendChild(listItem)
            })
        })
        .catch(error => {
            console.error('Error:', error)
        })
}