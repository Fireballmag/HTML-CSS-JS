function changer(){

        var elements = document.querySelectorAll('.pr')
        
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = i+1;
        }
}