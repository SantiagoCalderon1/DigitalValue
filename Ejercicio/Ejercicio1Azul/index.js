import { inicioPage, contactoPage, postPage } from "./components.js"

const routes = {
    "/Inicio": { view: () => m(inicioPage)  },
    "/Contacto": { view: () => m(contactoPage) },
    "/Post": { view: () => m(postPage) }
}

m.route(document.body, "/Inicio", routes)