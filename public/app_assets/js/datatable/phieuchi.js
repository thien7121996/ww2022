$(document).ready(function(){
    $(".phieudonchitiet .fa-minus").click(function(){
        $(this).addClass("hidden");
        $(this).prev(".fa-expand").removeClass("hidden");
            $(".phieudonchitiet").removeClass("heightclose");  
      
       
    });
    $(".phieudonchitiet .fa-expand").click(function(){

            $(this).addClass("hidden");
            $(this).next(".fa-minus").removeClass("hidden");
            $(".phieudonchitiet").addClass("heightclose");  
       
       
    });
})

