var themes = ["dark", "light", "vintage", "summer"];
var currentTheme = 0;

function toggleTheme() {
    currentTheme = (currentTheme + 1) % themes.length;

    var rootStyles = document.documentElement.style;
    rootStyles.setProperty("--text-color", "var(--text-color-" + themes[currentTheme] + ")");
    rootStyles.setProperty("--background-color", "var(--background-color-" + themes[currentTheme] + ")");
    rootStyles.setProperty("--button-background-color", "var(--button-background-color-" + themes[currentTheme] + ")");
    rootStyles.setProperty("--button-text-color", "var(--button-text-color-" + themes[currentTheme] + ")");
    rootStyles.setProperty("--button-hover-background-color", "var(--button-hover-background-color-" + themes[currentTheme] + ")");
}