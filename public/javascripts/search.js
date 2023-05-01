document.addEventListener("DOMContentLoaded", function() {
    var search_input = document.querySelector('#search-input')
  
    search_input.addEventListener("keyup", function(e){
        var search_item = e.target.value.toLowerCase();
        var span_items = document.querySelectorAll(".table_body .name span")
        span_items.forEach(function(item){
            if(item.textContent.toLocaleLowerCase().indexOf(search_item) != -1){
                item.closest('li').style.display = 'block'
            }else{
                item.closest('li').style.display = 'none'
            }
        })
    })
  });
  