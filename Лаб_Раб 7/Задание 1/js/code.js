jQuery(document).ready(function($){
  $(window).scroll(function(){
      if ($(this).scrollTop() > 50) {
          $('.back2top').show('slow');
      } else {
          $('.back2top').hide('slow');
      }
  });
      $('.back2top').click(function(){
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
      });
});

	$('#header').prepend('<div id="menu-icon"><span class="first"></span><span class="second"></span><span class="third"></span></div>');
	
	$("#menu-icon").on("click", function(){
    $("nav").slideToggle();
    $(this).toggleClass("active");
});

function toggleText() {
  var text = document.getElementById("demo");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}