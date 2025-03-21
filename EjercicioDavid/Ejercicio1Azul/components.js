/*
sintaxis básica de mithirl
m("", {style: { }}, contenido aquí)
*/

// ==================== Variables Globales ====================
const alturaHeader = "10vh";
let selectedPostIndex = null;
let breadCrumb = "";
let selectedPost = null;

// ==================== Estilos Globales ====================
const headerStyle = { display: "flex", flexDirection: "row", alignItems: "center", height: alturaHeader, width: "calc(100% - 20vw)", paddingLeft: "10vw", paddingRight: "10vw", backgroundColor: "#466874", position: "fixed", top: "0", zIndex: "99999", boxShadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.5)", fontSize: "1.20rem", };

const mainStyle = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "50px", width: "calc(100% - 20vw)", backgroundColor: "#f7f7e2", marginTop: alturaHeader, paddingLeft: "20px", paddingRight: "20px", };

const footerStyle = { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "10vh", width: "calc(100% - 20vw)", paddingLeft: "10vw", paddingRight: "10vw", backgroundColor: "#466874", fontSize: "1rem", };

const iconsStyle = { fontSize: "35px", color: "white", cursor: "pointer" };

const linkStyle = { color: "white", textDecoration: "none", padding: "5px" };

const paragraphStyle = { fontSize: "14px", textAlign: "justify", borderRadius: "5px", margin: "0", height: "auto", };

const inputStyle = { width: "75%", padding: "8px", textAlign: "center", borderRadius: "5px", fontSize: "16px", border: "1px solid #ccc", marginBottom: "10px", };

const cuestionarioStyle = { width: "50%", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", };

// ==================== Componentes base ====================
function header() {
  //let width = window.innerWidth;
  //window.addEventListener("resize", () => { width = window.innerWidth; m.redraw(); });
  return { view: function () { m.redraw(); return window.innerWidth < 768 ? m(HeaderBurger) : m(HeaderNormal); }, };
}

function main() {
  return {
    view: function ({ attrs, children }) {
      return m( "div", { style: { ...attrs.mainStyle }, }, ...children );
    },
  };
}

function footer() {
  return {
    view: function () {
      return m(
        "div", { style: footerStyle, },
        m( "p", { style: { color: "white", marginLeft: "20px", width: "50%" } }, "Hecho por Santiago" ),
        m( "div", { style: { display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center", width: "50%", marginRight: "20px", gap: "20px", }, }, route("/Contacto", "Contacto"), link("#", "Sobre Nosotros") )
      );
    },
  };
}

// ==================== Componentes hijos de HEADER ====================
function HeaderBurger() {
  return {
    view: () => {
      return m("header", { style: headerStyle }, logoSection(), m(NavBurger));
    },
  };
}

function NavBurger() {
  let styleLi = { listStyle: "none", display: "flex", alignItems: "center", justifyContent: " center", width: "30%", borderBottom: "1px solid white", textAlign: "center", };

  const AnimatedMenu = {
    oncreate: ({ dom }) => {
      dom.style.transform = "translateX(150%)";
      dom.style.zIndex = "500";
      requestAnimationFrame(() => {
        dom.style.transition = "transform 0.75s ease-out";
        dom.style.transform = "translateX(0)";
      });
    },
    onbeforeremove: ({ dom }) => {
      return new Promise((resolve) => {
        dom.style.transition = "transform 0.5s ease-in";
        dom.style.transform = "translateX(150%)";
        setTimeout(resolve, 500);
      });
    },
    view: () =>
      m(
        "ul",
        {
          style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px", listStyle: "none", background: "#466874", position: "fixed", top: alturaHeader, width: "120%", margin: "0", paddingTop:"50px", border: "1px solid white", right: "-66px", zIndex: "1000", },
        },
        m("li", { style: { ...styleLi } }, route("/Inicio", "Inicio")),
        m("li", { style: { ...styleLi } }, link("#", "Pagina2")),
        m("li", { style: { ...styleLi } }, socialMedia())
      ),
  };

  let show = false;

  return {
    view: () => {
      return m(
        "nav",
        {
          style: { display: "flex", alignItems: "center", justifyContent: "end", height: alturaHeader, width: "100%", position: "static", zIndex: "2000", },
        },
        m("i.fa-solid.fa-bars", {
          onclick: () => {
            show = !show;
            m.redraw();
          },
          style: { color: "white", fontSize: "30px", cursor: "pointer" },
        }),
        show && m(AnimatedMenu)
      );
    },
  };
}

function HeaderNormal() {
  return {
    view: () => {
      return m("header", { style: headerStyle }, logoSection(), navNormal());
    },
  };
}

function navNormal() {
  return m(
    "nav",
    {
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: alturaHeader, width: "100%", },
    },
    m(
      "ul",
      {
        style: { display: "flex", flexDirection: "row", alignItems: "center", gap: "30px", listStyle: "none", },
      },
      m("li", route("/Inicio", "Inicio")),
      m("li", link("#", "Pagina2"))
    ),
    socialMedia()
  );
}

function logoSection() {
  return m(
    "div",
    {
      style: { width: "15%", height: alturaHeader, },
    },
    m("img", {
      src: "img/perro.png",
      alt: "Imagen de un logo",
      style: { height: "100%", width: alturaHeader, },
    })
  );
}

function socialMedia() {
  return m(
    "div",
    {
      style: { display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", height: alturaHeader, width: "150px", },
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

// ==================== Fin Componentes hijos de header ====================

// ==================== Componentes dinamicos ====================
function link(href, content) {
  let breadCrumbAUX = breadCrumb == content;
  return m( "a", { onclick: () => { breadCrumb = content; }, href: `${href}`, style: { ...linkStyle, fontWeight: breadCrumbAUX ? "bold" : "normal", textDecoration: breadCrumbAUX ? "underline" : "none", }, }, `${content}` );
}

function route(href, content) {
  let breadCrumbAUX = breadCrumb == content;

  return m(
    m.route.Link,
    {
      onclick: () => {
        breadCrumb = content;
      },
      href: `${href}`, //   /Users/Rome/1
      style: { ...linkStyle, fontWeight: breadCrumbAUX ? "bold" : "normal", textDecoration: breadCrumbAUX ? "underline" : "none", },
    },
    `${content}`
  );
}
// ==================== Fin Componentes dinamicos ====================

// ==================== Contenido INICIO ====================

function TextoComponent() {
  return {
    view: () => {
      return m(
        "div",
        {
          style: { display: "flex", flexDirection: "column", marginTop: "30px", width: "100%", boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)", borderRadius: "5px", },
        },
        m( "h1", { style: { textAlign: "left", marginLeft: "10px" } }, "Título Principal" ),
        m( "p", { style: { ...paragraphStyle, padding: "10px" } }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut" )
      );
    },
  };
}



function PostsModelComponent() {
  return {
    model: {
      posts: [
        {
          titulo: "titulo 1",
          urlImg: "img/img-1.jpg",
          altImg: "Imagen de un paisaje",
          descripcion: "Esto es un texto de prueba de un texto corto",
        },
        {
          titulo: "titulo 2",
          urlImg: "img/img-2.jpg",
          altImg: "Imagen de un paisaje",
          descripcion:
            "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba, Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba, Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba,  ",
        },
        {
          titulo: "titulo 3",
          urlImg: "img/img-3.jpg",
          altImg: "Imagen de un paisaje",
          descripcion: "Esto es un texto de prueba de un texto corto",
        },
        {
          titulo: "titulo 4",
          urlImg: "img/img-4.jpg",
          altImg: "Imagen de un paisaje",
          descripcion:
            "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba",
        },
        {
          titulo: "titulo 5",
          urlImg: "img/img-2.jpg",
          altImg: "Imagen de un paisaje",
          descripcion: "Esto es un texto de prueba de un texto corto",
        },
        {
          titulo: "titulo 6",
          urlImg: "img/img-6.jpg",
          altImg: "Imagen de un paisaje",
          descripcion:
            "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba",
        },
      ],
    },
    selectedPost: function (index) {
      selectedPostIndex = index;
    },
    view: function () {
      let additionalContent = null;
      if (selectedPostIndex != null) {
        additionalContent = NotificarSelectedPostElement(
          this.model.posts[selectedPostIndex].titulo
        );
      } else {
        additionalContent = NotificarSelectedPostElement();
      }

      let width = window.innerWidth;

      window.addEventListener("resize", () => {
        width = window.innerWidth;
        m.redraw();
      });

      return m(
        "div",
        {
          style: { display: "flex", justifyContent: width < 768 ? "center" : "space-between", flexWrap: "wrap", gap: "10px", boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)", borderRadius: "10px", padding: "10px", },
        },
        m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Posts"),
        this.model.posts.map((post, index) => postElement( post, index, this.selectedPost.bind(this), selectedPostIndex))
        ,additionalContent
      );
    },
  };
}

function postElement({titulo, urlImg, altImg, descripcion}, index, selectedPost, selectedPostIndex) {
  return m(
    "div",
    {
      style: { display: "flex", alignItems: "center", flexDirection: "column", minWidth: "350px", maxWidth: "350px", height: "100%", flexGrow: "1", border: "1px solid black", borderRadius: "5px", overflow: "hidden", margin: "0", padding: "0", cursor: "pointer", boxShadow: selectedPostIndex == index ? "0px 10px 10px 0 rgba(0, 0, 0, 0.5)" : "", },
      onclick: () => {
        selectedPost(index);
      },
    },
    m(
      "h3",
      {
        style: { textAlign: "left", width: "100%", borderBottom: "1px solid black", margin: "0", padding: "10px", marginLeft: "10px", },
      },
      titulo
    ),
    m( "div", { style: { width: "100%", height: "auto" } }, m("img", { src: urlImg, alt: altImg, style: { width: "100%", height: "300px", objectFit: "cover", }, }) ),
    m( "div", { style: { height: "75px", overflow: "auto", width: "100%", }, },
      m( "p", { style: { padding: "10px", border: "none", }, }, descripcion )
    )
  );
}

function NotificarSelectedPostElement(titleSelectedPost = "") {
  let content = [];
  if (titleSelectedPost != "") {
    content.push(
      m(
        "h2",
        { style: { width: "100%", textAlign: "center" } },
        "Tarjeta Seleccionada: "
      )
    );
    content.push(
      m(
        "h2",
        { style: { width: "100%", textAlign: "center" } },
        titleSelectedPost
      )
    );
  } else {
    content.push(
      m(
        "h2",
        { style: { width: "100%", textAlign: "center" } },
        "Ninguna tarjeta seleccionada"
      )
    );
  }
  return m(
    "div",
    {
      style: { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "auto", margin: "30px 0", },
    },
    ...content
  );
}
// ==================== Fin Contenido INICIO ====================

// ==================== Inicio cuestionario ====================
let formData = {
  valueInputName: null,
  valueInputAge: null,
};

let inputNameValue = false;
let inputAgeValue = false;

function CuestionarioComponent() {
  
  return {
    view: function () {
      function manageForm(e) {
        e.preventDefault();
        console.log("Formulario prevenido.");
        let formDataAUX = new FormData(e.target);
        formData.valueInputName = formDataAUX.get("nombre");
        formData.valueInputAge = calculateAge(
          formDataAUX.get("fechaNacimiento")
        );
        m.redraw();
      }
      return m(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginBottom: "20px",
            borderRadius: "5px",
            width: "100%",
            padding: "20px",
          },
        },
        m(
          "h2",
          { style: { width: "100%", marginLeft: "10px" } },
          "Cuestionario"
        ),
        m(
          "div",
          {
            style: { display: "flex", justifyContent: "space-between", flexDirection: "row", boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)", borderRadius: "5px", width: "95%", padding: "20px", },
          },
          m(
            "form",
            {
              onsubmit: (e) => manageForm(e),
              style: {
                ...cuestionarioStyle,
                alignItems: "start",
              },
            },
            [
              inputName(),
              inputAge(),
              m( "div", { style: { display: "flex", justifyContent: "center", alignItems: "center", width: "75%", }, }, m(inputSubmit) ),
            ]
          ),
          m(
            "div",
            {
              style: {
                ...cuestionarioStyle,
                alignItems: "end",
              },
            },
            m(ShowResultComponent)
          )
        )
      );
    },
  };
}

function inputName() {
  return m("input", {
    type: "text",
    name: "nombre",
    placeholder: "Introduce tu nombre*",
    style: { ...inputStyle },
    onchange: (e) => {
      inputNameValue = e.target.value != "" ? true : false;
    },
  });
}

function inputAge() {
  return m(
    "div",
    { style: { display: "flex", flexDirection: "column", width: "100%" } },
    m(
      "label",
      { style: { width: "100%", padding: "5px 0" } },
      "Introduce tu fecha de nacimiento*:"
    ),
    m("input", {
      type: "date",
      name: "fechaNacimiento",
      required: true,
      max: new Date().toISOString().split("T")[0],
      style: { ...inputStyle },
      onchange: (e) => {
        inputAgeValue = e.target.value != "" ? true : false;
      },
    })
  );
}

function inputSubmit() {
  let buttonColor = "#466874";
  return {
    view: () =>
      m(
        "button",
        {
          //disabled: !(inputNameValue && inputAgeValue),
          type: "submit",
          style: {
            ...inputStyle,
            backgroundColor: !(inputNameValue && inputAgeValue)
              ? "lightgray"
              : buttonColor,
            color: "white",
            cursor: "pointer",
            pointerEvents: !(inputNameValue && inputAgeValue) ? "none" : "",
          },
          onmouseenter: function () {
            buttonColor = "#049CB3";
          },
          onmouseleave: function () {
            buttonColor = "#466874";
          },
        },
        "Enviar"
      ),
  };
}

function calculateAge(fechaNacimiento) {
  const today = new Date();
  const birthDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

function ShowResultComponent() {
  return {
    view: () => {
      return m(
        "div",
        {
          style: {
            border: "1px solid black",
            borderRadius: "5px",
            width: "75%",
            height: "calc(100% - 10px)",
            fontSize: "16px",
            padding: "10px",
          },
        },
        m(
          "p",
          { style: { paddingLeft: "10px" } },
          formData.valueInputName != null
            ? `Tu nombre es ${formData.valueInputName}`
            : "Aún no has ingresado un nombre."
        ),
        m(
          "p",
          { style: { paddingLeft: "10px" } },
          formData.valueInputAge != null
            ? `Tu edad es ${formData.valueInputAge} años.`
            : "Aún no has ingresado tu fecha de nacimiento."
        )
      );
    },
  };
}
// ==================== Fin cuestionario ====================

// ==================== CONTACTO ====================
function ContactoComponent() {
  return {
    view: () => {
      return m(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          },
        },
        m("h2", { style: {} }, "Esta es la pagina de contacto")
      );
    },
  };
}

// ==================== FIN CONTACTO ====================

// ==================== POST ====================
function PostsModelComponentV2() {
  return {
    model: {
      posts: [
        {
          titulo: "titulo 1",
          urlImg: "img/img-1.jpg",
          altImg: "Imagen de un paisaje",
          descripcion: "Esto es un texto de prueba de un texto corto",
        },
        {
          titulo: "titulo 2",
          urlImg: "img/img-2.jpg",
          altImg: "Imagen de un paisaje",
          descripcion:
            "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba.",
        },
        {
          titulo: "titulo 3",
          urlImg: "img/img-3.jpg",
          altImg: "Imagen de un paisaje",
          descripcion: "Esto es un texto de prueba de un texto corto",
        },
      ],
    },
    openPage: function (post) {
      selectedPost = post;

      m.route.set("/Post");
    },
    view: function () {
      return m(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "50px",
          },
        },
        m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Posts"),
        this.model.posts.map((post) =>
          postElementV2(post, this.openPage.bind(this))
        )
      );
    },
  };
}

function postElementV2({ titulo, urlImg, altImg, descripcion }, openPage) {
  return m(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "350px",
        maxWidth: "350px",
        height: "100%",
        flexGrow: "1",
        border: "1px solid black",
        borderRadius: "5px",
        overflow: "hidden",
        margin: "0",
        padding: "0",
        cursor: "pointer",
        boxShadow: "0px 10px 10px 0 rgba(0, 0, 0, 0.5)",
      },
      onclick: () => {
        if (openPage != null) {
          openPage({ titulo, descripcion });
        }
      },
    },
    m(
      "h3",
      {
        style: {
          textAlign: "left",
          width: "100%",
          borderBottom: "1px solid black",
          margin: "0",
          padding: "10px",
          marginLeft: "10px",
        },
      },
      titulo
    ),
    urlImg
      ? m(
          "div",
          { style: { width: "100%", height: "auto" } },
          m("img", {
            src: urlImg,
            alt: altImg,
            style: { width: "100%", height: "300px", objectFit: "cover" },
          })
        )
      : null,
    m(
      "div",
      { style: { height: "75px", overflow: "auto", width: "100%" } },
      m("p", { style: { padding: "10px", border: "none" } }, descripcion)
    )
  );
}

function PostComponent() {
  return {
    view: function () {
      if (!selectedPost) {
        return m("div", "No hay post seleccionado.");
      }
      return m(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          },
        },
        postElementV2(selectedPost)
      );
    },
  };
}
// ==================== FIN POST ====================

// ==================== PAGINAS ====================
function inicioPage() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
      //viewPort = window.
    },
    view: () => [
      m(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            fontSize: "14px",
          },
        },
        m(header),
        m(main, { mainStyle }, [
          m(TextoComponent),
          m(PostsModelComponent),
          m(CuestionarioComponent),
          m(PostsModelComponentV2),
        ]),
        m(footer)
      ),
    ],
  };
}

function contactoPage() {
  let styleAdditional = {
    height: "80vh",
  };
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => [
      m(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            fontSize: "14px",
          },
        },
        m(header),
        m(main, { mainStyle: { ...mainStyle, ...styleAdditional } }, [
          m(ContactoComponent),
        ]),
        m(footer)
      ),
    ],
  };
}

function postPage() {
  let styleAdditional = {
    height: "80vh",
  };
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => [
      m(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            fontSize: "14px",
          },
        },
        m(header),
        m(main, { mainStyle: { ...mainStyle, ...styleAdditional } }, [
          m(PostComponent),
        ]),
        m(footer)
      ),
    ],
  };
}

export { inicioPage, contactoPage, postPage };
