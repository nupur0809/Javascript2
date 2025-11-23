// q4_banners.js
// Controls to show/hide/slide/fade banners and auto-rotate
$(function () {
  const $banners = $('#banners .banner');

  // 1. Hide specific banners (hide all for demo)
  $('#hide').on('click', function () {
    $banners.hide();
  });

  // 2. Show hidden banners
  $('#show').on('click', function () {
    $banners.show();
  });

  // 3. Slide Up/Down toggle
  $('#slide-toggle').on('click', function () {
    $banners.slideToggle();
  });

  // 4. Fade In/Fade Out
  $('#fade-toggle').on('click', function () {
    $banners.fadeToggle();
  });

  // 5. Auto-rotate through banners every 5 seconds using fadeIn/fadeOut
  let idx = 0;
  function rotate() {
    $banners.stop(true, true).fadeOut(300);
    const $current = $banners.eq(idx);
    $current.fadeIn(400);
    idx = (idx + 1) % $banners.length;
  }
  // initialize: hide all then show first
  $banners.hide();
  $banners.eq(0).show();
  // start rotation
  const rot = setInterval(rotate, 5000);

  // optional: stop rotation when hovering banner area
  $('#banners').hover(() => clearInterval(rot), () => setInterval(rotate, 5000));
});
