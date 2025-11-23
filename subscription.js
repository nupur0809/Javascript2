// q6_subscriptions.js
// Manage subscribe/unsubscribe and dynamic event attachment/detachment
$(function () {
  const $topics = $('#topics');
  const $messages = $('#messages');

  // 1. Subscribe -> enable notifications (mark UI)
  $topics.on('click', '.subscribe', function () {
    const $topic = $(this).closest('.topic');
    $topic.addClass('subscribed');
    showMessage('Subscribed to ' + $topic.data('topic'));
  });

  // 2. Unsubscribe -> disable notifications
  $topics.on('click', '.unsubscribe', function () {
    const $topic = $(this).closest('.topic');
    $topic.removeClass('subscribed');
    showMessage('Unsubscribed from ' + $topic.data('topic'));
  });

  // 3. Dynamically add new subscription topics -> attach .on() click events
  $('#add-topic').on('click', function () {
    const name = $('#new-topic').val().trim();
    if (!name) return showMessage('Enter a topic name');
    const $new = $(`<div class="topic" data-topic="${name}">${name} <button class="subscribe">Subscribe</button> <button class="unsubscribe">Unsubscribe</button></div>`);
    $topics.append($new);
    $('#new-topic').val('');
    showMessage('Added topic ' + name);
    // events are delegated above, so new buttons work automatically
  });

  // 4. Remove specific subscription -> detach .off() event (we'll demo by removing subscribe button)
  // Example: when double-clicking a topic, remove its subscribe button action by removing the button
  $topics.on('dblclick', '.topic', function () {
    $(this).find('.subscribe').remove(); // detach subscribe option
    showMessage('Subscribe option removed for ' + $(this).data('topic'));
  });

  // 5. Show success message -> dynamically inserted into DOM
  function showMessage(msg) {
    const $m = $('<div class="message"></div>').text(msg);
    $messages.prepend($m);
    setTimeout(() => $m.fadeOut(600, () => $m.remove()), 2500);
  }
});
