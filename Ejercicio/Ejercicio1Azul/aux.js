function header() {
  let width = window.innerWidth;

  // Escucha cambios de tamaño en la ventana
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    m.redraw(); // Fuerza la actualización
  });

  return {
    view: function () {
      return width < 768 ? m(HeaderBurger) : m(HeaderNormal);
    },
  };
}

// ==================== Componentes hijos de HEADER ====================
function NavBurger() {
  let show = false;

  return {
    view: () =>
      m(
        "nav",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: alturaHeader,
            width: "100%",
            position: "relative",
          },
        },
        m("i.fa-solid.fa-bars", {
          onclick: () => {
            show = !show;
            m.redraw();
          },
          style: { color: "white", fontSize: "30px", cursor: "pointer" },
        }),
        show &&
          m(
            "ul",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
                listStyle: "none",
                background: "rgba(0, 0, 0, 0.8)",
                position: "absolute",
                top: "100%",
                right: "0",
                padding: "20px",
                borderRadius: "10px",
              },
            },
            m("li", m(m.route.Link, { href: "/Inicio" }, "Inicio")),
            m("li", link("#", "Pagina2")),
            socialMediaComponent()
          )
      ),
  };
}

function HeaderBurger() {
  return {
    view: () =>
      m("header", { style: headerStyle }, m(logoComponent), m(NavBurger)),
  };
}

function HeaderNormal() {
  return {
    view: () =>
      m("header", { style: headerStyle }, m(logoComponent), m(navComponent)),
  };
}

function logoComponent() {
  return m(
    "div",
    {
      style: {
        width: "15%",
        height: alturaHeader,
      },
    },
    m("img", {
      src: "img/perro.png",
      alt: "Imagen de un logo",
      style: {
        height: "100%",
        width: alturaHeader,
      },
    })
  );
}

function navComponent() {
  return m(
    "nav",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: alturaHeader,
        width: "100%",
      },
    },
    m(
      "ul",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
          listStyle: "none",
        },
      },
      m("li", route("/Inicio", "Inicio")),
      m("li", link("#", "Pagina2"))
    ),
    socialMediaComponent()
  );
}

function socialMediaComponent() {
  return m(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: alturaHeader,
        width: "150px",
      },
    },
    m("i.fa-brands.fa-instagram", {
      style: iconsStyle,
      onclick: () => {
        window.open("https://www.instagram.com/", "_blank");
      },
    }),
    m("i.fa-brands.fa-facebook", {
      style: iconsStyle,
      onclick: () => {
        window.open("https://www.facebook.com/", "_blank");
      },
    })
  );
}

// ==================== Componentes dinámicos ====================
function link(href, content) {
  let breadCrumbAUX = breadCrumb == content;
  return m(
    "a",
    {
      onclick: () => {
        breadCrumb = content;
      },
      href: `${href}`,
      style: {
        ...linkStyle,
        fontWeight: breadCrumbAUX ? "bold" : "normal",
        textDecoration: breadCrumbAUX ? "underline" : "none",
      },
    },
    `${content}`
  );
}

function route(href, content) {
  let breadCrumbAUX = breadCrumb == content;

  return m(
    m.route.Link,
    {
      onclick: () => {
        breadCrumb = content;
      },
      href: `${href}`,
      style: {
        ...linkStyle,
        fontWeight: breadCrumbAUX ? "bold" : "normal",
        textDecoration: breadCrumbAUX ? "underline" : "none",
      },
    },
    `${content}`
  );
}
