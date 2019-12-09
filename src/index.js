import { createElement,render,renderDom } from './element'
import diff from './diff'
import patch from './patch'
let virtualDom1 = createElement('ul',{class:'list'},[
    createElement('ul',{class:'item'},['a']),
    createElement('ul',{class:'item'},['b']),
    createElement('ul',{class:'item'},['c'])
])
let virtualDom2 = createElement('ul',{class:'list'},[
    createElement('ul',{class:'item'},['1']),
    createElement('ul',{class:'item'},['b']),
    createElement('ul',{class:'item'},['3'])
])
const el = render(virtualDom1)
renderDom(el,window.root)
// console.info(el)
// console.info(virtualDom)

// DOM diff 计算

const patches = diff(virtualDom1,virtualDom2)
patch(el,patches)
