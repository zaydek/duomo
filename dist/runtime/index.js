"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sorcery = {
    init() {
        const media = "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)");
        if (media) {
            if (media.matches) {
                document.body.setAttribute("data-theme", "dark");
            }
            media.addEventListener("change", () => {
                Sorcery.toggleDarkMode();
            });
        }
        document.addEventListener("keydown", e => {
            if (!e.ctrlKey && e.key.toLowerCase() === "d") {
                Sorcery.toggleDarkMode();
            }
            else if (e.ctrlKey && e.key.toLowerCase() === "d") {
                Sorcery.toggleDebugMode();
            }
        });
    },
    toggleDebugMode() {
        const mode = document.body.hasAttribute("data-debug");
        if (!mode) {
            document.body.setAttribute("data-debug", "true");
        }
        else {
            document.body.removeAttribute("data-debug");
        }
        return !mode;
    },
    toggleDarkMode() {
        const mode = document.body.hasAttribute("data-theme");
        if (!mode) {
            document.body.setAttribute("data-theme", "dark");
        }
        else {
            document.body.removeAttribute("data-theme");
        }
        return !mode;
    },
};
exports.default = Sorcery;
//# sourceMappingURL=index.js.map