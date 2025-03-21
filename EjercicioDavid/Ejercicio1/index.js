import { InicioPage, Post } from './components.js'

const routes = {
    '/Inicio': { view: () => m(InicioPage)},
    '/Post/:id': { view: ({attrs}) => m(Post, attrs)}
    /* 
    '': { view: () => m(moduleName)},
    '': { view: () => m(moduleName)}, 
    */
}

m.route(document.body, '/Inicio', routes)