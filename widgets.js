// q9_widgets.js
// Demonstrate using two versions of jQuery simultaneously via window.jq1 and window.jq3

// 1. Version 1 handles carousel rotation (uses jq1)
(function ($) {
  // show first slide only
  const $slides = $('#widget1 .slides .slide');
  $slides.hide().first().show();
  let i = 0;
  setInterval(function () {
    $slides.eq(i).fadeOut(300, function () {
      i = (i + 1) % $slides.length;
      $slides.eq(i).fadeIn(300);
    });
  }, 3000);
})(window.jq1);

// 2. Version 2 handles modal popups (uses jq3)
(function ($) {
  $('#open-modal').on('click', function () {
    $('#modal').fadeIn(200);
  });
  $('#close-modal').on('click', function () {
    $('#modal').fadeOut(200);
  });

  // 3. Version 1 -> highlight active widget (we call back into jq1)
  window.jq1('#widget1').on('mouseenter', function () {
    window.jq3('#widget1').addClass('active');
  }).on('mouseleave', function () {
    window.jq3('#widget1').removeClass('active');
  });

  // 4. Version 2 -> tooltips on hover (implemented with jq3)
  $('#widget2').hover(function () {
    $(this).attr('title', 'Widget 2 controls notifications');
  }, function () {
    $(this).removeAttr('title');
  });

  // 5. jQuery.noConflict() used above to ensure both versions operate simultaneously.
})(window.jq3);
