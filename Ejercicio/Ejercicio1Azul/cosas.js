
function Select() {
    let open;
    let selected = [];
    return {
        view: ({ attrs }) => {
            let data = attrs.data;
            let name = attrs.name;

            return m("div", {
                style: "display:flex; flex-direction: row; margin: 2rem; background: red;"
            },
                m("div", {
                    style: "display: flex; flex-direction: column",
                }, [
                    m("div", {
                        onclick: () => open = !open,
                    }, name || "Seleccionar elemento"),

                    open
                    ? attrs.options.map(o => m("div", {
                        onmouseenter: (e) => {e.target.style = "background: lime; padding: 20px" },
                        onmouseleave: (e) => {e.target.style = "background: ''; padding: 20px" },
                        onclick: (e) => { selected.push(o); open = false },
                    }, o)) : null
                ]),
                m("div", { style: "display: flex; padding-left: 20px" }, selected.map(s => m("span", {
                    onclick: () => selected.splice(selected.findIndex((o) => o === s), 1),
                    style: "margin: 6px;"
                }, s))),
            )
        }
    }
}


export { Select }