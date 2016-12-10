export default function(el, binding, vnode, oldVnode) {
    if(el){
        el.autofocus = Boolean(binding.value);
    }
}
