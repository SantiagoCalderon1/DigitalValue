/*
sintaxis básica de mithirl
m("", {style: { }}, contenido aquí)
*/

// Variables Globales
let valueInputName = "";
let valueInputAge = 0;
let alturaHeader = "10vh";

const posts = [
  {
    "titulo": "titulo 1",
    "urlImg": "img/img-1.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto corto"
  }, {
    "titulo": "titulo 2",
    "urlImg": "img/img-2.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba"
  }, {
    "titulo": "titulo 3",
    "urlImg": "img/img-3.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto corto"
  }, {
    "titulo": "titulo 4",
    "urlImg": "img/img-4.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba"
  }, {
    "titulo": "titulo 5",
    "urlImg": "img/img-2.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto corto"
  }, {
    "titulo": "titulo 6",
    "urlImg": "img/img-6.jpg",
    "altImg": "Imagen de un paisaje",
    "descripcion": "Esto es un texto de prueba de un texto un poco más largo de lo normal, pero es solo prueba"
  },
]

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
}

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  width: "calc(100% - 20vw)",
  backgroundColor: "#f7f7e2",
  marginTop: alturaHeader,
  paddingLeft: "20px",
  paddingRight: "20px",
}

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
}

const iconsStyle = { fontSize: "35px", color: "white", cursor: "pointer" }

const linkStyle = { color: "white", textDecoration: "none" }

const paragraphStyle = {
  fontSize: "14px",
  textAlign: "justify",
  border: "1px solid black",
  borderRadius: "5px",
  margin: "0",
}

const inputStyle = {
  border: "1px solid black",
  width: "70%",
  padding: "7.5px 0",
  textAlign: "center",
  borderRadius: "5px",
  fontSize: "16px"
}

const cuestionarioStyle = {
  width: "50%",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px"
}


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
      )
    }
  }
}

function logoComponent() {
  return m(
    "img",
    {
      src: "img/perro.png",
      alt: "Imagen de un logo",
      style: {
        height: "100px",
        width: "100px",
      },
    }
  )
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
      m("li", link("Inicio", "#")),
      m("li", link("Sobre Nosotros", "#"))
    ),
    socialMediaComponent()
  )
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
      style: iconsStyle
    }),
    m("i.fa-brands.fa-facebook", {
      style: iconsStyle
    }),
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
  )
}

function link(texto, url) {
  return m(
    "a",
    { href: `${url}`, style: linkStyle },
    `${texto}`
  );
}

function main() {
  return {
    view: function () {
      return m(
        "div",
        {
          style: mainStyle,
        },
        textoComponent(),
        postsComponent(),
        cuestionarioComponent()
      );
    },
  };
}

function textoComponent() {
  return m(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
        width: "100%",
      },
    },
    m(
      "h1",
      { style: { textAlign: "left", marginLeft: "10px" } },
      "Título Principal."
    ),
    m(
      "p",
      { style: { ...paragraphStyle, padding: "10px" } },
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut"
    )
  );
}

function postsComponent() {
  return m("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px"
    }
  }, m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Post"),
    posts.map((post) => {
      return postComponent(post.titulo, post.urlImg, post.altImg, post.descripcion)
    }));
}

function postComponent(titulo, urlImg, altImg, descripcion) {
  return m(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "350px",
        maxWidth: "350px",
        flexGrow: "1",
        height: "auto",
        border: "1px solid black",
        borderRadius: "5px",
        overflow: "hidden",
        margin: "0",
        padding: "0",
      }
    },
    m("h3", {
      style: {
        textAlign: "left",
        width: "100%",
        borderBottom: "1px solid black",
        margin: "0",
        padding: "10px",
        marginLeft: "10px",
      }
    }, titulo),
    m("img", {
      src: urlImg,
      alt: altImg,
      style: {
        width: "100%",
        height: "300px",
      }
    }),
    m("p", {
      style: { ...paragraphStyle, padding: "10px", border: "none" }
    }, descripcion)
  );
}

function cuestionarioComponent() {
  return m("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "20px",
      wrap: "wrap"
    }
  }, m("h2", { style: { width: "100%", marginLeft: "10px" } }, "Cuestionario"),
    m("form", {
      onsubmit: (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        valueInputName = formData.get("nombre");
        valueInputAge = formData.get("edad");
        console.log(`Nombre: ${valueInputName}\nEdad: ${valueInputAge}`);
      },
      style: {
        ...cuestionarioStyle,
        alignItems: "start",
      }
    },
      inputName(),
      inputAge(),
      inputSubmit(),
    ),
    m("div", {
      style: {
        ...cuestionarioStyle,
        alignItems: "end",
      }
    }, showResult())
  );
}

function inputName() {
  return m("input", {
    type: "text",
    name: "nombre",
    placeholder: "Introduce tu nombre por favor.",
    required: true,
    //oninput: (event) => { valueInputName = event.target.value; },
    style: inputStyle
  })
}

function inputAge() {
  return m("input", {
    type: "number",
    name: "edad",
    min: "1",
    max: "100",
    required: true,
    value: "0",
    //oninput: (event) => { valueInputAge = event.target.value; },
    style: inputStyle
  })
}

function inputSubmit(texto = "Enviar") {
  return m("input", {
    type: "submit",
    value: texto,
    style: {
      ...inputStyle,
      backgroundColor: "#466874",
      color: "white"
    },
    onmouseover: (e) => {
      e.target.style.backgroundColor = "#049CB3";
    },
    onmouseout: (e) => {
      e.target.style.backgroundColor = "#466874";
    }
  })
}

function showResult() {
  return m("div", {
    style: {
      border: "1px solid black",
      borderRadius: "5px",
      width: "75%",
      height: "calc(100% - 10px)",
      fontSize: "16px"
    }
  },
    m("p", { style: { paddingLeft: "10px" } },
      valueInputName ? `Tu nombre es ${valueInputName}` : "Aún no has ingresado un nombre."
    ),
    m("p", { style: { paddingLeft: "10px" } },
      valueInputAge ? `Tienes ${valueInputAge} años.` : "Aún no has ingresado tu edad."
    )
  )
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
          link("Contacto", "#"),
          link("Sobre Nosotros", "#")
        )
      );
    },
  };
}

function app() {
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
        m(main),
        m(footer)
      ),
    ],
  };
}

export { app };

/* m.mount(document.body, App); */
