
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






function CarrouselSpecials() {
    let container = null;
    let autoSlideInterval;
    let articles = [];
    let index = 0;

    function actualizarImagen() {
        if (container && articles.length > 0) {
            container.style.backgroundSize = "cover";
            container.style.backgroundPosition = "center";
            container.style.backgroundImage = `url('./assets/products/${articles[index].src}')`;
        }
    }

    function imgAnterior() {
        index = (index - 1 + articles.length) % articles.length;
        actualizarImagen();
    }

    function imgSiguiente() {
        index = (index + 1) % articles.length;
        actualizarImagen();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(imgSiguiente, 3000);
    }

    return {
        oninit: function () {
            m.request({
                method: "GET",
                url: "articlesSpecials.json"
            }).then((data) => {
                articles = data;
                index = 0;
                m.redraw();
            }).catch((error) => {
                console.log("Error en la petición de Artículos especiales: ", error);
            });
            autoSlideInterval = setInterval(imgSiguiente, 3000);
        },
        oncreate: function ({ dom }) {
            container = dom;
            actualizarImagen();
        },
        onremove: function () {
            clearInterval(autoSlideInterval);
        },
        view: function () {
            return m(
                "div", {
                id: "container",
                style: {
                    backgroundImage: articles.length > 0 ? `url('./assets/products/${articles[index].src}')` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "500px",
                    position: "relative"
                }
            },
                m("i.fa-solid.fa-arrow-left", {
                    style: {
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "50px"
                        
                    },
                    onclick: () => {
                        clearInterval(autoSlideInterval);
                        imgAnterior();
                        resetAutoSlide();
                    }
                }),
                m("i.fa-solid.fa-arrow-right", {
                    style: {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "50px"
                    },
                    onclick: () => {
                        clearInterval(autoSlideInterval);
                        imgSiguiente();
                        resetAutoSlide();
                    }
                })
            )
        }
    }
}