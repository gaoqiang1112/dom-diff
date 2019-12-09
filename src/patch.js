import {ATTRS,TEXT,REMOVE,REPLACE} from './types'
import {Element,render,setAttr} from './element'
let allPatches; // 所有补丁
let index = 0; // 默认打补丁的index
function patch(node,patches) {
    allPatches = patches
    // 给某个元素 打补丁
    walk(node)
}
function doPatch(node,patches) {
    patches.forEach( patch => {
        switch (patch.type) {
            case ATTRS:
                for(let key in patch.attrs){
                    let value = patch.attrs[key]
                    if(value){
                        setAttr(node,key,value)
                    }else{
                        node.removeAttribute(key)
                    }
                }
                break
            case TEXT:
                node.textContent = patch.text // 文本替换
                break
            case REPLACE:
                let newNode = patch.newNode instanceof Element ? render(patch.newNode):document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode,node)
                break
            case REMOVE:
                node.parentNode.removeChild(node)
                break
            default:
                break
        }
    })
}
function walk(node) {
    let currentPatch = allPatches[index++]
    let childNodes = node.childNodes
    childNodes.forEach(child => walk(child)) // 先递归 去到所有的补丁 然后 从下向上打

    if(currentPatch){
        doPatch(node,currentPatch)
    }
}
export default patch
