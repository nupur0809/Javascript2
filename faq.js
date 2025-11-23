// q3_faq.js
// jQuery-based interactive FAQ behaviors
$(function () {
  const $faq = $('#faq');

  // 1. Click question -> toggle answer visibility
  $faq.on('click', '.question', function () {
    $(this).next('.answer').slideToggle();
  });

  // 2. Hover -> change question color (using class)
  $faq.on('mouseenter', '.question', function () {
    $(this).addClass('highlight');
  }).on('mouseleave', '.question', function () {
    $(this).removeClass('highlight');
  });

  // 3. Double-click question -> collapse all answers
  $faq.on('dblclick', '.question', function () {
    $faq.find('.answer').slideUp();
  });

  // 4. Focus on answer input -> highlight parent question
  $faq.on('focus', '.answer-input', function () {
    $(this).closest('.qa').find('.question').css('outline', '2px solid #8ad');
  });

  // 5. Blur from input -> reset background color
  $faq.on('blur', '.answer-input', function () {
    $(this).closest('.qa').find('.question').css('outline', '');
  });
});
