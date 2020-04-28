
$(document).mouseup(function (e)
                    {
  var container = $(".left_navtab, .right_menuarea"); // YOUR CONTAINER SELECTOR

  if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
  {
    //container.hide();
	$('body').removeClass('addrightcls'); 
	$('body').removeClass('right_part'); 
  }
})

$('.footer_boxslider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow:7,
  slidesToScroll:7,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow:5,
        slidesToScroll:1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow:3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});


		jQuery(document).ready(function(){
			//Accordion Nav
			jQuery('.mainNav').navAccordion({
				expandButtonText: '<i class="fa fa-plus"></i>',  //Text inside of buttons can be HTML
				collapseButtonText: '<i class="fa fa-minus"></i>'
			}, 
			function(){
				console.log('Callback')
			});
			
		});

    $(".menubtn").click(function(){
		$("body").toggleClass("addrightcls");	
    });

    $(".rightmenubtn").click(function(){
		$("body").toggleClass("right_part");	
    });

    $(".click_td").click(function(){
		$(".click_td").toggleClass("hide_trarea");	
    });

    $(".footer_downarrow").click(function(){
		$("body").toggleClass("hide_footer");	
    });



 $(window).load(function(){        
   $('#myModal030').modal('show');
    }); 


