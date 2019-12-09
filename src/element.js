class Element {
    constructor(type,props,children){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type,props,children) {
    return new Element(type,props,children)
}

function setAttr(node,key,value) {
    switch (key) {
        case "value":
            const nameList = ['INPUT','TEXTAREA']
            if(nameList.indexOf(node.tagName.toLocaleUpperCase())>-1){
                node.value = value
            }else {
                node.setAttribute(key,value)
            }
            break
        case "style":
            node.style.cssText = value
            break
        default :
            node.setAttribute(key,value)
            break
    }
}

function render(eleObj) {
    let el = document.createElement(eleObj.type)
    for(let key in eleObj.props){
        // 设置属性的方法
        setAttr(el,key,eleObj.props[key]);
    }
    eleObj.children.forEach((child) => {
        const childNode = (child instanceof Element)?render(child):document.createTextNode(child)
        el.appendChild(childNode)
    })
    return el
}

function renderDom(ele,target) {
    target.appendChild(ele)
}
export {createElement,render,renderDom,setAttr,Element}
