import { createElement,render,renderDom } from './element'
import diff from './diff'
let virtualDom = createElement('ul',{class:'list'},[
    createElement('ul',{class:'item'},['a']),
    createElement('ul',{class:'item'},['b']),
    createElement('ul',{class:'item'},['c'])
])

const el = render(virtualDom)
renderDom(el,window.root)
console.info(el)
console.info(virtualDom)

// DOM diff
