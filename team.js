// q5_team.js
// Team directory interactions using parent/children/find/next/siblings
$(function () {
  // 1. Click a manager -> highlight all direct reports
  $('.department').on('click', '.mgr', function () {
    const $members = $(this).siblings('.member').addBack().siblings(); // not needed; simpler:
    // direct reports are members inside the same .members container excluding manager
    const $reports = $(this).closest('.members').children('.member').not('.mgr');
    $('.member').removeClass('selected');
    $reports.addClass('selected');
  });

  // 2. Hover on employee -> show contact info using .next() or .find()
  $('.members').on('mouseenter', '.member', function () {
    $(this).find('.contact').show();
  }).on('mouseleave', '.member', function () {
    $(this).find('.contact').hide();
  });

  // 3. Click on a department -> change background of all members in that department using .children()
  $('.dept-title').on('click', function () {
    const $dept = $(this).closest('.department');
    $dept.find('.member').css('background', '#f0f8ff');
    setTimeout(() => $dept.find('.member').css('background', ''), 1200);
  });

  // 4. Select a random employee -> highlight sibling employees
  $('#random-emp').on('click', function () {
    const $all = $('.members .member').not('.mgr');
    const idx = Math.floor(Math.random() * $all.length);
    const $sel = $all.eq(idx);
    $sel.addClass('selected');
    // highlight siblings
    $sel.siblings('.member').addClass('selected');
    setTimeout(() => $('.member').removeClass('selected'), 1500);
  });

  // 5. Collapse/expand team using .parent() and .find()
  $('#toggle-team').on('click', function () {
    $('.department').each(function () {
      $(this).children('.members').slideToggle();
    });
  });
});
