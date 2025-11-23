// q1_welcome.js
// Uses jQuery to manage greetings and interactions.
$(document).ready(function () {
  // 1. On page load -> personalized greeting based on time of day
  const hour = new Date().getHours();
  let greetingText = "Hello";
  if (hour < 12) greetingText = "Good Morning";
  else if (hour < 18) greetingText = "Good Afternoon";
  else greetingText = "Good Evening";

  $('#greeting').text(greetingText + " — Developer!");

  // 2. "Change Greeting" button -> motivational quote
  $('#change-greet').on('click', function () {
    const quotes = [
      "Dream big, start small.",
      "Refactor today for a simpler tomorrow.",
      "Fail fast, learn faster.",
      "Ship often, iterate always.",
      "Stay curious and kind."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    $('#greeting').text(quote);
  });

  // 3. Toggle visibility of welcome message
  $('#toggle-welcome').on('click', function () {
    $('#welcome-msg').toggle(); // simple toggle visibility
  });

  // 4. Show an alert when greeting is clicked
  $('#greeting').on('click', function () {
    alert('Greeting clicked: ' + $(this).text());
  });

  // Extra: show time in sub when clicking button
  $('#show-time').on('click', function () {
    $('#sub').text('Current time: ' + new Date().toLocaleTimeString());
  });
});
