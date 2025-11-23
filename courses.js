// q7_courses.js
// Real-time filtering and matched text highlighting
$(function () {
  const $search = $('#search');
  const $courses = $('#courses .course');
  const $count = $('#count');

  function updateCount(n) { $count.text(n); }

  // 1. keyup -> filter real-time
  $search.on('keyup', function () {
    const term = $(this).val().trim();
    if (!term) {
      // 5. Clear -> reset list
      $courses.show().each(function () { $(this).html($(this).text()); });
      updateCount($courses.length);
      return;
    }

    const regex = new RegExp('(' + escapeRegExp(term) + ')', 'ig');
    let matches = 0;

    $courses.each(function () {
      const text = $(this).text();
      if (text.search(regex) !== -1) {
        // 2. Highlight matched text using .css() or replace HTML
        const highlighted = text.replace(regex, '<span class="match">$1</span>');
        $(this).html(highlighted).show();
        matches++;
      } else {
        // 3. Toggle visibility of non-matching courses
        $(this).hide();
      }
    });

    // 4. Show count dynamically
    updateCount(matches);
  });

  $('#clear').on('click', function () {
    $search.val('').keyup();
  });

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // initialize count
  updateCount($courses.length);
});
