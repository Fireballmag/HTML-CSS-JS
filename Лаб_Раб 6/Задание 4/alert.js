function changer(){

        let a = Number(document.querySelectorAll('textarea')[0].value)
        let b = Number(document.querySelectorAll('textarea')[1].value)
        document.querySelectorAll('span#sum')[0].innerHTML = a + b;

}