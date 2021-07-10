function d(id){
    return document.getElementById(id);
}
function dc(c, i = 0){
    return document.getElementsByClassName(c)[i];
}
function dn(n, i=0){
    return document.getElementsByName(n)[i];
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
function animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        let progress = timing(timeFraction)
        draw(progress);
        if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
}
