// ==================== Eventos ====================
// window.addEventListener("resize", () => {
//     m(Header, { width: innerWidth });
// });

// web inspo https://www.behance.net/gallery/219477603/Moss-Web?tracking_source=curated_galleries_ui-ux

// ==================== Variables Globales ====================

// ==================== Componentes Base ====================
function Base() {
    return {
        view: function () {
            return m("", "content");
        },
    };
}

function promotionPanel() {
    let content = "Free shipping on orders over £100 - Limited Time Offer!";

    let styles = {
        panel: { display: "flex", alignItems: "center", backgroundColor: "#3d251a", color: "white", width: "100vw", height: "30px", overflow: "hidden", position: "relative", whiteSpace: "nowrap", },
        content: { display: "inline-block", position: "absolute", whiteSpace: "nowrap", animation: "rightToLeft 10s linear infinite", },
    };

    return {
        view: function () { return m("div", { style: styles.panel }, m("p", { style: styles.content }, content)); },
    };
}

function Header() {
    let styles = {
        header: { width: "100%", height: "100px", padding: "0px 5vw", display: "flex", alignItems: "center", },
        logo: { width: "25%", height: "auto" },
    };
    return {
        view: function () {
            return m("header", { style: { ...styles.header } }, [
                m("img", { src: "./assets/LogoConecta.png", style: { ...styles.logo }, }),
                m(Nav),
            ]);
        },
    };
}

function Nav() {
    let navStyle = { width: "75%", height: "100px", display: "flex", flexDirection: "row", alignItems: "center", };
    return {
        view: function () { m.redraw(); return m("nav", { style: { ...navStyle } }, window.innerWidth < 768 ? m(MobileNav) : m(DesktopNav)); },
    };
}

function MobileNav() { let mobileNavstyle = {}; return { view: function () { return m("div", "content nav mobile"); }, }; }

function DesktopNav() {
    let desktopNavstyle = {
        ul: { display: "flex", justifyContent: "center", alignItems: "center", height: "100px", listStyle: "none", gap: "30px", width: "80%", },
        route: { textTransform: "uppercase", textDecoration: "none", fontSize: "1rem", color: "black", },
    };

    function madeBreadcrums(e, breadCrumb) {
        let currentRoute = m.route.get();
        if (currentRoute == breadCrumb) { e.target.style.textDecoration = "underline"; e.target.style.fontSize = "1.25rem"; m.redraw(); }
    }
    return {
        view: function () {
            return m(
                "div",
                {
                    style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", },
                },
                m("ul", { style: { ...desktopNavstyle.ul } }, [
                    m( "li", m( m.route.Link, { href: "/Inicio", onclick: (e) => madeBreadcrums(e, "/Inicio"), style: { ...desktopNavstyle.route, ...(m.route.get() == "/Inicio" ? { textDecoration: "underline", fontSize: "1.25rem" } : ""), }, }, "Inicio" ) ),
                    m( "li", m( m.route.Link, { href: "/SobreNosotros", onclick: (e) => madeBreadcrums(e, "/SobreNosotros"), style: { ...desktopNavstyle.route }, }, "Sobre Nosotros" ) ),
                    m( "li", m( m.route.Link, { href: "/Contacto", onclick: (e) => madeBreadcrums(e, "/Contacto"), style: { ...desktopNavstyle.route }, }, "Contacto" ) ),
                ]),
                m("ul", { style: { ...desktopNavstyle.ul, width: "20%" } }, [
                    m( "li", m( m.route.Link, { href: "/Login", onclick: (e) => madeBreadcrums(e, "/Login"), style: { ...desktopNavstyle.route }, }, "LOGIN" ) ),
                    m("span", "|"),
                    m( "li", m( m.route.Link, { href: "/Bag", onclick: (e) => madeBreadcrums(e, "/Bag"), style: { ...desktopNavstyle.route }, }, "BAG" ) ),
                ])
            );
        },
    };
}

function Main() {
    return { view: function ({ children }) { return m( "main", { style: { padding: "0 5vw", width: "100%", minHeight: "80vh", backgroundColor: "#f1f1f1", }, }, [...children] ); }, };
}

function Footer() {
    return { view: function () { return m("footer", { style: { padding: "0 5vw" } }, "content footer"); }, };
}

function Post() {
    return { view: function ({ attrs }) { return attrs.id == 1 ? m(Post1) : "holaaa sin id"; }, };
}

function Post1() {
    return { view: function () { return "Holaaa Post1"; }, };
}

// ==================== Página Inicio ====================
function InicioPage() {
    return {
        oncreate: () => { window.scrollTo(0, 0); },
        view: function () {
            return m( "div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 5vw", }, },
                [
                    m(promotionPanel),
                    m(Header),
                    m(Main, [m(InfoBanner), m(BestProducts), m(CarrouselSpecials)]),
                    m(Footer),
                ]
            );
        },
    };
}

function InfoBanner() {
    let content = "descrubre todo lo que necesitas en un solo lugar";
    return {
        view: function () {
            return m( "div", { style: { display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", width: "100%", minHeight: "15vh", overflow: "hidden", }, },
                m( "span", { style: { fontSize: "2rem", width: "15%", textTransform: "uppercase", marginTop: "2vh", }, }, content ),
                m("div", { style: { border: "1px solid gray", width: "100%", margin: "2vh 0" }, })
            );
        },
    };
}

function BestProducts() {
    let products = [];
    return {
        oninit: function () {
            m.request({ method: "GET", url: "bestProducts.json", })
                .then((data) => { products = data; console.log(products); })
                .catch((error) => { console.log("Error en la petición de mejores productos: ", error); });
        },
        view: function () {
            return m(
                "div", { style: { width: "100%", minHeight: "550px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "2.5%", overflow: "hidden", }, },
                products.map((product) => {
                    return m( "div", { style: { width: "400px", height: "500px", margin: "15px", position: "relative", display: "flex", alignItems: "end", backgroundImage: products.length > 0 ? `url('./assets/bestProducts/${product.src}')` : "none", backgroundSize: "cover", backgroundPosition: "center", }, },
                        m( "div", { style: { backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "30px", padding: "10px", }, },
                            m( "span", { style: { fontSize: "18px", cursor: "pointer" } }, product.title ),
                            m( "div", { style: { cursor: "pointer" } }, m("span", { style: { fontSize: "18px" } }, "Shop now"), m("i.fa-solid.fa-cart-shopping", { style: { fontSize: "18px", marginLeft: "10px" }, }) )
                        )
                    );
                })
            );
        },
    };
}

function CarrouselSpecials() {
    let containerImg = null;
    let autoSlideInterval;
    let articles = [];
    let index = 0;

    function actualizarImagen() {
        if (containerImg && articles.length > 0) { containerImg.style.backgroundSize = "cover"; containerImg.style.backgroundPosition = "center"; containerImg.style.backgroundImage = `url('./assets/products/${articles[index].src}')`; }
    }

    function imgAnterior() { index = (index - 1 + articles.length) % articles.length; actualizarImagen(); }
    function imgSiguiente() { index = (index + 1) % articles.length; actualizarImagen(); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(imgSiguiente, 3000); }

    return {
        oninit: function () {
            m.request({ method: "GET", url: "articlesSpecials.json", })
                .then((data) => { articles = data; index = 0; m.redraw(); })
                .catch((error) => { console.log("Error en la petición de Artículos especiales: ", error); });
            autoSlideInterval = setInterval(imgSiguiente, 3000);
        },
        oncreate: function ({ dom }) { actualizarImagen(); },
        onremove: function () { clearInterval(autoSlideInterval); },
        view: function () {
            return m( "div", { style: { width: "100%", height: "600px", position: "relative", margin: "5vh 0", display: "flex", justifyContent: "center", }, },
                m( "div", { style: { height: "500px", width: "50%" }, },
                    m("div", { id: "containerImg", style: { backgroundImage: articles.length > 0 ? `url('./assets/products/${articles[index].src}')` : "none", backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "500px", position: "relative", padding: "10px", }, }),
                    m( "div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "30px", padding: "10px", backgroundColor: "#3d251a", color: "white", }, },
                        m( "span", { style: { fontSize: "18px", cursor: "pointer" } }, articles.length > 0 ? articles[index].title : "" ),
                        m( "div", { style: { cursor: "pointer" } }, m("span", { style: { fontSize: "18px" } }, "Shop now"), m("i.fa-solid.fa-cart-shopping", { style: { fontSize: "18px", marginLeft: "10px" }, }) )
                    ),
                    m("i.fa-solid.fa-arrow-left", {
                        style: { position: "absolute", left: "10%", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "50px", },
                        onclick: () => { clearInterval(autoSlideInterval); imgAnterior(); resetAutoSlide(); },
                    }),
                    m("i.fa-solid.fa-arrow-right", {
                        style: { position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "50px", },
                        onclick: () => { clearInterval(autoSlideInterval); imgSiguiente(); resetAutoSlide(); },
                    })
                )
            );
        },
    };
}

// ==================== Página Contacto ====================

// =================== Página Sobre Nosotros ====================

// ==================== Página Post ====================

// ==================== Páginas ====================

export { InicioPage, Post };
