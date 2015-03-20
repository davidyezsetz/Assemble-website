(function($) {
  
  'use strict';

  /**
   * Show and Hide Jobs window
   */
  var jobsWindow     = $( '#jobs' );
  var jobsShow       = $( '#jobs__show' );
  var jobsShowFooter = $( '#jobs__show--footer' );
  var jobsHide       = $( '#jobs__hide' );
  var jobWrapper     = $( '#job_wrapper' );
  var jobMenuItem    = $( '.jobs__menu__item' );
  var jobItem        = $( '.job' );
  var jobHighlight   = $( '#jobs__highlight' );


  /**
   * Calculate vertical offset to hide jobs window
   */
  function calculateOffset() {

    var height = jobsWindow.height() + 120; // bottom margin
    jobsWindow.css({
      'margin-top': '-' + height + 'px',
      'display': 'block'
    });
  }

  $( window ).on( 'resize', calculateOffset );

  jobsShow.on( 'click', function(e) {

    e.preventDefault();
    jobsWindow.addClass( 'jobs--active' );
  });

  jobsShowFooter.on( 'click', function(e) {

    e.preventDefault();
    jobsWindow.addClass( 'jobs--active' );
    $('body').scrollTop(0);
  });

  jobsHide.on( 'click', function(e) {
    
    e.preventDefault();
    jobsWindow.removeClass( 'jobs--active' );
  });

  /**
   * Set a highlight for the acctive slider link
   */
  function setHighlight() {

    var activeJob = $( '.job__menu__item--active' );
    jobHighlight
      .width( activeJob.width() )
      .css( 'left', activeJob.position().left )
      .data( 'originalLeft', jobHighlight.position().left)
      .data( 'originalWidth', jobHighlight.width() );
  }

  jobMenuItem.hover(function() {

    var item = $(this);
    var offsetLeft = item.position().left;
    var newWidth = item.width();
    
    jobHighlight.css({
      left: offsetLeft,
      width: newWidth
    });
  }, function() {

    jobHighlight.css({
      left: jobHighlight.data( 'originalLeft' ),
      width: jobHighlight.data( 'originalWidth' )
    });
  });

  /**
   * Set up slider
   */
  var sliderCount = jobItem.length;
  var activeClass = 'job__menu__item--active';

  jobWrapper.css( 'width',  sliderCount * 100 + '%' );
  jobItem.css( 'width', 100 / sliderCount + '%' );
  $( '#jobs__menu__trigger-1' ).addClass( activeClass );

  jobMenuItem.on( 'click', function() {

    var id     = this.id.substring(20, this.id.length) - 1;
    var offset = 100 / sliderCount * id;

    // handle active classes
    jobMenuItem.removeClass( activeClass );
    $(this).addClass( activeClass );

    // handle sliding
    jobWrapper.css({
      'transform': 'translateX( -' + offset + '% )'
    });

    // set Highlight
    setHighlight();
  });

  // calculate offset initally
  $(document).on( 'ready', function() {
    calculateOffset();
    setHighlight();
  });

})(jQuery);
