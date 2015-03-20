/* disable mouse events during scroll */
$(function() {
  'use strict';

  var body = document.body;
  var timer;

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    
    timer = setTimeout(function(){
      body.classList.remove('disable-hover');
    },500);
  }, false);

  // javascript is too fast for the browser...who knew?!
  window.setTimeout( function() {
    $(body).removeClass('no-transitions');
  }, 300 );
});

/* scroll to hashmarks */
var scrollToAnchor = function( id ) {
  'use strict';

  // grab the element to scroll to based on the name
  var elem = $('a[name="'+ id +'"]');

  // if that didn't work, look for an element with our ID
  if ( typeof( elem.offset() ) === 'undefined' ) {
    elem = $('#'+id);
  }

  // if the destination element exists
  if ( typeof( elem.offset() ) !== 'undefined' ) {

    // do the scroll
    $('html, body').animate({
      scrollTop: elem.offset().top - 100
    }, 500 );

  }
};

// bind links
$( '.hash-link' ).on( 'click', function(e) {
  'use strict';

  e.preventDefault();
  var href = $(this).attr('href').replace('#', '');
  scrollToAnchor( href );
});


// load desktop only images
/* global Modernizr */
(function() {
  'use strict';
    
  if (!Modernizr.touch) {
    var images  = $('.portfolio__entry__hover');
    $.each(images, function() {

      var image = $(this);
      image.attr('srcset', image.data('src'));
    });
  }
})();

// Email ....
/*jshint unused: false*/
function openEmail(alias) {
  'use strict';

  var domain = 'interactive-pioneers.de';
  document.location.href = 'mailto:' + alias + '@' + domain;
}
