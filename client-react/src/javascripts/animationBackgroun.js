var i=0;

function move(){
  i++
 
  document.body.style.backgroundPosition= `${i+1}px ${i}px`
 
 
}
window.setInterval(move,80)
export default move