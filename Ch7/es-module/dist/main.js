app.on('#', _ => app.run('#Home'));
app.on('//', route => {
    const menus = document.querySelectorAll('.navbar-nav li');
    for (let i = 0; i < menus.length; ++i)
        menus[i].classList.remove('active');
    const item = document.querySelector(`[href='${route}']`);
    item && item.parentElement.classList.add('active');
});
const view = () => app.createElement("div", null,
    app.createElement("nav", { className: "navbar navbar-default" },
        app.createElement("div", { className: "container" },
            app.createElement("div", { className: "navbar-header" },
                app.createElement("button", { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                    app.createElement("span", { className: "sr-only" }, "Toggle navigation"),
                    app.createElement("span", { className: "icon-bar" }),
                    app.createElement("span", { className: "icon-bar" }),
                    app.createElement("span", { className: "icon-bar" })),
                app.createElement("a", { className: "navbar-brand", href: "/" }, "Project Name")),
            app.createElement("div", { id: "navbar", className: "navbar-collapse collapse" },
                app.createElement("ul", { className: "nav navbar-nav" },
                    app.createElement("li", { className: "active" },
                        app.createElement("a", { href: "#Home" }, "Home")),
                    app.createElement("li", null,
                        app.createElement("a", { href: "#About" }, "About")),
                    app.createElement("li", null,
                        app.createElement("a", { href: "#Contact" }, "Contact")))))),
    app.createElement("div", { className: "container", id: "my-app" }));
app.render(document.getElementById('main'), view());
//# sourceMappingURL=main.js.map