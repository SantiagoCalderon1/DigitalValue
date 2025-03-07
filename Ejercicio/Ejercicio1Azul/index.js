import { inicio, contacto } from "./components.js"

const routes = {
    "/Inicio": { view: () => m(inicio) },
    "/Contacto": { view: () => m(contacto) }
}

m.route(document.body, "/Inicio", routes)