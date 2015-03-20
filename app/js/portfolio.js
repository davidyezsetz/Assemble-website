/* global picturefill */
( function($) {

  'use strict';
  
  var entry        = $( '.portfolio__entry' );
  var entryImage   = '.portfolio__entry__slider__image';
  var detail       = '.portfolio__entry__detail';
  var upperRow     = $( '#portfolio__row--upper' );
  var lowerRow     = $( '#portfolio__row--lower' );
  var stage        = $( '#portfolio__stage' );
  var stageWrapper = $( '#portfolio__stage .wrapper' );
  var activeClass  = 'portfolio__stage--active';
  var angle        = '-5.8deg';
  var stagePadding = 160;
  var slider       = '.portfolio__entry__slider';

  function open() {
    var height = stage.height() + stagePadding;
    upperRow.css( 'transform', 'translate3d( 0, -' + height / 2 + 'px, 0 ) skewY(' + angle + ') ' );
    lowerRow.css( 'transform', 'translate3d( 0, ' + height / 2 + 'px, 0 ) skewY(' + angle + ') ' );
  }

  entry.on( 'click', function() {
    // find content, clone it and push it in 
    var activeEntry = $(this).children( detail );
    var content = activeEntry.clone();
    var images  = content.find( entryImage );
    $.each(images, function() {
      var image = $(this);
      image.attr('src', '');
      image.attr('srcset', image.data('src'));
    });
    stageWrapper.empty().append( content );
    stage.addClass( activeClass );
    // call picturefill
    picturefill(images);
    stageWrapper.find( slider ).slick({
      autoplay: true,
      onInit: open
    });
    var offset = stage.offset().top - (stage.height() / 2);
    $('body').scrollTop( offset - 50 );

    var close        = $( '.portfolio__entry__close' );
    close.on( 'click', function() {

      stage.removeClass( activeClass );
      // finish first animation
      setTimeout( function() {

        upperRow.css( 'transform', 'skewY( ' + angle + ' )' );
        lowerRow.css( 'transform', 'skewY( ' + angle + ' )' );
      }, 70 );

      setTimeout( function() {
        stageWrapper.find( slider ).unslick();
      }, 250 );
    });
  });
})(jQuery);
