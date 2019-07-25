// default 
new WOW().init();
AOS.init();

// Wrap every letter in a span
$('.ml2').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: true})
    .add({
      targets: '.ml2 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: function(el, i) {
        return 70*i;
      }
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    


function Loading_more_skills(e) {
    $(e).addClass('more_loadig');

    $.ajax({
        url: './ajax/helper.php',
        type : 'post',
        data : {
            query : ["GET_SKILLS_DATA", 2, "*"]
        },
    
        success : (d) => {

            $(e).parent().remove();
            
            d = JSON.parse(d);
    
            for (i in d) {
    
                $('.section--cards').html(
                    $('.section--cards').html()
                    +
                    `<div class="col s12 m6 lg4 xl4" data-aos="zoom-in">
                    <div class="--card">
                        <img src="${d[i]["ImageURL"]}" />
                        <div>
                            <p>${d[i]["Title"]}</p>
                            <span>
                            ${d[i]["Info"]}
                            </span>
                        </div>            
                    </div>
                </div>`
                )
    
            }
            $('.section--cards').html(
                $('.section--cards').html()
                +
            `<div class="col s12 m6 lg4 xl4 " >
            <div class="--card more_Skills" onclick="loading_skills(this)">
                    <p>Less</p>
                    <img class='' src="./Assets/Loading.gif" width="250" />
            
            </div>
        </div>`);
        },
        
    })

}

function loading_skills (){
    $.ajax({
        url: './ajax/helper.php',
        type : 'post',
        data : {
            query : ["GET_SKILLS_DATA", 0, 2]
        },
    
        success : (d) => {
            
            d = JSON.parse(d);
            $('.section--cards').html(''); // sure empty
    
            for (i in d) {
    
                $('.section--cards').html(
                    $('.section--cards').html()
                    +
                    `<div class="col s12 m6 lg4 xl4 " data-aos="zoom-in">
                    <div class="--card">
                        <img src="${d[i]["ImageURL"]}" />
                        <div>
                            <p>${d[i]["Title"]}</p>
                            <span>
                            ${d[i]["Info"]}
                            </span>
                        </div>            
                    </div>
                </div>`
                )
    
            }
            $('.section--cards').html(
                $('.section--cards').html()
                +
            `<div class="col s12 m6 lg4 xl4" data-aos="zoom-in">
            <div class="--card more_Skills" onclick="Loading_more_skills(this)">
                    <p >More</p>
                    <img class='' src="./Assets/Loading.gif" width="250" />
            
            </div>
        </div>`);
        },
        
    })
}



loading_skills();

