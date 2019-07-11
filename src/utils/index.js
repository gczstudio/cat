export function debounce(fn,wait){
  var timer = null;
  return function(){
    if(timer != null)   clearInterval(timer);
    timer = setTimeout(function(){
      fn()
    },wait)
  }

}

