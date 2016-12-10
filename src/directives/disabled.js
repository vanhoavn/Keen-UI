export default function(el, binding, vnode, oldVnode) {
    if(el){
        el.disabled = Boolean(binding.value);
    }
}
