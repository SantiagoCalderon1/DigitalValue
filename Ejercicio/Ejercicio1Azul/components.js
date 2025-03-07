/*
sintaxis básica de mithirl
m("", {style: { }}, contenido aquí)
*/

// Variables Globales
let valueInputName = "";
let valueInputAge = 0;
let alturaHeader = "10vh";
let selectedPostIndex = null;
let edad = 0;

// Estilos Globales
const headerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: alturaHeader,
  width: "calc(100% - 20vw)",
  paddingLeft: "10vw",
  paddingRight: "10vw",
  backgroundColor: "#466874",
  position: "fixed",
  top: "0",
  zIndex: "10000",
  boxShadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.5)",
  fontSize: "1.20rem",
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  width: "calc(100% - 20vw)",
  backgroundColor: "#f7f7e2",
  marginTop: alturaHeader,
  paddingLeft: "20px",
  paddingRight: "20px",
};

const footerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "10vh",
  width: "calc(100% - 20vw)",
  paddingLeft: "10vw",
  paddingRight: "10vw",
  backgroundColor: "#466874",
  fontSize: "1rem",
};

const iconsStyle = { fontSize: "35px", color: "white", cursor: "pointer" };

const linkStyle = { color: "white", textDecoration: "none" };

const paragraphStyle = {
  fontSize: "14px",
  textAlign: "justify",
  borderRadius: "5px",
  margin: "0",
  height: "auto",
};

const inputStyle = {
  border: "1px solid black",
  width: "70%",
  padding: "7.5px 0",
  textAlign: "center",
  borderRadius: "5px",
  fontSize: "16px",
};

const cuestionarioStyle = {
  width: "50%",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
};

// Componentes base
function header() {
  return {
    view: function () {
      return m(
        "header", //padre header
        {
          style: headerStyle,
        },
        logoComponent(),
        navComponent()
      );
    },
  };
}

function main(content, styleAdditional = null) {
  console.log(styleAdditional);
  return {
    view: function () {
      return m(
        "div",
        {
          style: { ...mainStyle, ...styleAdditional },
        },
        ...content
      );
    },
  };
}

function footer() {
  return {
    view: function () {
      return m(
        "div",
        {
          style: footerStyle,
        },
        m(
          "p",
          { style: { color: "white", marginLeft: "20px", width: "50%" } },
          "Hecho por Santiago"
        ),
        m(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              width: "50%",
              marginRight: "20px",
              gap: "20px",
            },
          },
          route("/Contacto", "Contacto"),
          link("#", "Sobre Nosotros")
        )
      );
    },
  };
}

// Componentes hijos de header
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
    "div", // redes sociales
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
    /* m(
      "img", //logo instagram
      {
        src: "img/logo-instagram.png",
        alt: "Logo de Instagram",
        style: {
          height: "35px",
          width: "35px",
        },
      }
    ),
    m(
      "img", //logo facebook
      {
        src: "img/logo-facebook.png",
        alt: "Logo de facebook",
        style: {
          height: "40px",
          width: "40px",
        },
      }
    ) */
  );
}

// Componentes dinamicos
function link(href, content) {
  return m("a", { href: `${href}`, style: { ...linkStyle } }, `${content}`);
}

function route(href, content) {
  return m(
    m.route.Link,
    {
      href: `${href}`,
      style: linkStyle,
    },
    `${content}`
  );
}

// Componentes de Inicio
function textoComponent() {
  return m(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
        width: "100%",
        boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      },
    },
    m(
      "h1",
      { style: { textAlign: "left", marginLeft: "10px" } },
      "Título Principal"
    ),
    m(
      "p",
      { style: { ...paragraphStyle, padding: "10px" } },
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut"
    )
  );
}

function postsModelComponent() {
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
        additionalContent = notificarSelectedPostComponent(
          this.model.posts[selectedPostIndex].titulo
        );
      } else {
        additionalContent = notificarSelectedPostComponent();
      }

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
          },
        },
        m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Posts"),
        this.model.posts.map((post, index) =>
          postComponent(
            post,
            index,
            this.selectedPost.bind(this),
            selectedPostIndex
          )
        ),
        additionalContent
      );
    },
  };
}

function postComponent(
  { titulo, urlImg, altImg, descripcion },
  index,
  selectedPost,
  selectedPostIndex
) {
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
        boxShadow:
          selectedPostIndex == index
            ? "0px 10px 10px 0 rgba(0, 0, 0, 0.5)"
            : "",
      },
      onclick: () => {
        selectedPost(index);
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
    m(
      "div",
      { style: { width: "100%", height: "auto" } },
      m("img", {
        src: urlImg,
        alt: altImg,
        style: {
          width: "100%",
          height: "300px",
          objectFit: "cover",
        },
      })
    ),
    m(
      "div",
      {
        style: {
          height: "75px",
          overflow: "auto",
          width: "100%",
        },
      },
      m(
        "p",
        {
          style: {
            padding: "10px",
            border: "none",
          },
        },
        descripcion
      )
    )
  );
}

function notificarSelectedPostComponent(titleSelectedPost = "") {
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
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        margin: "30px 0",
      },
    },
    ...content
  );
}
function cuestionarioComponent() {
  return m(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: "20px",
        wrap: "wrap",
        boxShadow: "0px 10px 20px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        padding: "20px",
      },
    },
    m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Cuestionario"),
    m(
      "form",
      {
        onsubmit: (e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let nombre = formData.get("nombre");
          let fechaNacimiento = formData.get("fechaNacimiento");

          if (nombre && fechaNacimiento) {
            valueInputName = nombre;
            valueInputAge = calculateAge(fechaNacimiento);
            console.log("Formulario enviado:", valueInputName, valueInputAge);

          } else {
            alert("Por favor, complete todos los campos.");
          }
        },
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        },
      },
      inputName(),
      inputAge(),
      inputSubmit()
    ),
    m(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
      },
      showResultComponent()
    )
  );
}

function inputName() {
  return m("input", {
    type: "text",
    name: "nombre",
    placeholder: "Introduce tu nombre por favor",
    required: true,
    style: {
      padding: "8px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
  });
}

function inputAge() {
  return m(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    },
    m(
      "label",
      { style: { padding: "5px 0" } },
      "Introduce fecha de nacimiento:"
    ),
    m("input", {
      type: "date",
      name: "fechaNacimiento",
      required: true,
      max: new Date().toISOString().split("T")[0],
      style: {
        padding: "8px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      },
    })
  );
}

function inputSubmit(texto = "Enviar") {
  return m("input", {
    type: "submit",
    value: texto, 
    style: {
      padding: "8px 16px",
      backgroundColor: "#466874",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    onmouseover: (e) => {
      e.target.style.backgroundColor = "#049CB3";
    },
    onmouseout: (e) => {
      e.target.style.backgroundColor = "#466874";
    },
  });
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

function showResultComponent() {
  return m(
    "div",
    {
      style: {
        border: "1px solid black",
        borderRadius: "5px",
        width: "75%",
        height: "calc(100% - 10px)",
        fontSize: "16px",
      },
    },
    m(
      "p",
      { style: { paddingLeft: "10px" } },
      valueInputName
        ? `Tu nombre es ${valueInputName}`
        : "Aún no has ingresado un nombre."
    ),
    m(
      "p",
      { style: { paddingLeft: "10px" } },
      valueInputAge
        ? `Naciste el ${valueInputAge}.`
        : "Aún no has ingresado tu edad."
    )
  );
}

// Componentes de Contacto
function contactoComponent() {
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
}

// Paginas
function inicio() {
  let content = [];
  content.push(textoComponent());
  content.push(m(postsModelComponent()));
  content.push(cuestionarioComponent());
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
        m(main(content)),
        m(footer)
      ),
    ],
  };
}

function contacto() {
  let content = [];
  let styleAdditional = {
    height: "80vh",
  };
  content.push(contactoComponent());
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
        m(main(content, styleAdditional)),
        m(footer)
      ),
    ],
  };
}

function post() {
  let content = [];
  let styleAdditional = {
    height: "80vh",
  };
  content.push(contactoComponent());
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
        m(main(content, styleAdditional)),
        m(footer)
      ),
    ],
  };
}

export { inicio, contacto };
