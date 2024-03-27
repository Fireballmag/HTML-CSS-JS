function changer(){
        let ship = document.getElementById('ship');
        let ufo = document.getElementById('ufo');
        let asteroid = document.getElementById('asteroid');
        
        // ship.classList.add('spaceship_move');
        // ufo.classList.add('ufo_move');
        // asteroid.classList.add('asteroid_move');

        function first(){
                ufo.style = "left: 150px" ;
                ship.style = "left: 110px" ;
                asteroid.style = "left: 40px" ;
        }

        function second(){
                ufo.style = "left: 90px" ;
                ship.style = "left: 40px" ;
                asteroid.style = "left: 170px" ;
        }

        function third(){
                ufo.style = "left: 40px" ;
                ship.style = "left: 190px" ;
                asteroid.style = "left: 110px" ;
        }
             
        setTimeout(first, 500)
        setTimeout(second, 1000)
        setTimeout(third, 1500)
}

setInterval(changer, 1750)