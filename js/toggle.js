var toggle = {};
(
    function () {
        this.themes = ["theme1", "theme2", "theme3"];
        this.BODY = document.querySelector("body").classList;
        this.currentTheme = 0;
        /** Change current theme
        * @param e Event
        * @return undefined
        */
        this.toggleHandler = (e) => {
            this.BODY.remove(this.themes[this.currentTheme]);
            this.currentTheme = (this.currentTheme + 1) % this.themes.length;
            this.BODY.add(this.themes[this.currentTheme]);
        };
    }
).apply(toggle);

document.querySelector(".bar").addEventListener("click", toggle.toggleHandler);