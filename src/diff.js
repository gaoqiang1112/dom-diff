// 同级 深度优先 对比
// 规则
// 1 节点类型相同时 去看一下属性是否相同 产生一个属性的补丁包 {type:'ATTRS',attrs:{class:'list-group'}}
// 2 节点类型不相同 直接采用替换模式 {type:'REPLACE',newNode:newNode}
// 3 新的dom节点不存在 {type:'REMOVE',index:xxxxx}
// 4 文本的变化 {type:'TEXT',text:1}

import {ATTRS,TEXT,REMOVE,REPLACE} from './types'

function diff(oldTree,newTree) {
    let patches = {} // 大补丁包

    let index = 0
    // 递归树 比较后的结果放到补丁包中
    walk(oldTree,newTree,index,patches)

    return patches
}

function diffAttr(oldAttrs,newAttrs) {
    let patch = {}
    // 先比对 老节点属性的值 和新节点属性的值 是否相同 把不同的存起来
    for(let key in oldAttrs){
        if(oldAttrs[key] !== newAttrs[key]){ // 这里如果老节点有的属性 新节点没有 那么 存进去的值 就是undefined
            patch[key] = newAttrs[key]
        }
    }
    // 再对比 新节点里的属性 老节点是不是都有  没有就是新添加的  那么  就把 增删改3种情况都对比了
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key]
        }
    }
    return patch
}

let Index = 0
function diffChildren(oldChildren,newChildren,index,patches) {
    // 比较老的第一个 和新的第一个
    oldChildren.forEach((child,idx) => {
        walk(child,newChildren[idx],++Index,patches)
    })
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

function walk(oldNode,newNode,index,patches) {
    let currentPatch = [] // 小补丁包
    if(!newNode){ // 节点被删除了
        currentPatch.push({type:REMOVE,index})
    }else if(isString(oldNode) && isString(newNode)){ // 判断节点 是不是 字符串 如果是字符串 就不用节点对比了
        if(oldNode !== newNode){ // 判断文本是否一致
            currentPatch.push({type:TEXT,text:newNode})
        }
    } else if(oldNode.type === newNode.type){     // 节点类型一样类型 是不是一样
        // 比较属性是否有更改
      let attrs = diffAttr(oldNode.props,newNode.props);
      // 判断比较属性后得到的对象是否有东西
      if(Object.keys(attrs).length>0){
        currentPatch.push({type:ATTRS,attrs})
      }
      // 如果有儿子节点 遍历儿子
      diffChildren(oldNode.children,newNode.children,index,patches)
    }else{ // 不满足上面所有情况 就是节点被替换了
        currentPatch.push({type:REPLACE,newNode})
    }
    if(currentPatch.length>0){
        patches[index] = currentPatch
        console.info(patches)
    }
}
export default diff
