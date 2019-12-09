// 同级 深度优先 对比
// 规则
// 1 当节点类型相同时，去看一下属性是否相同 产生一个属性的补丁包 {type:'ATTRS',attrs:{class:'list-group'}}
// 2 新的dom节点不存在 {type:'REMOVE',index:xxxxx}
// 3 节点类型不相同 直接采用替换模式 {type:'REPLACE',newNode:newNode}
//
function diff() {
    let patches = {}


    return patches
}

export default diff
