import { app } from "./components.js"

/* function Layout() {
    return {
        view: ({children}) => [
            m("header"),
            m("main"),
            children,
            m("aside")
        ]
    }
} */

const routes = {
    "/Inicio": { view: () =>  m(app)},
/*     "/ejemplo": { view: () => m(Layout, Header)}
 */}

m.route(document.body, "/Inicio", routes)