function d(id){
    return document.getElementById(id);
}
function dc(c, i = 0){
    return document.getElementsByClassName(c)[i];
}
function dcn(o, i = 0){
    return o.childNodes[i];
}
function da(o, e, f){
    o.addEventListener(e, f);
}
function  re(o, e, f){
    o.removeEventListener(e, f);
}
function er(m){
    console.log(m);
}
