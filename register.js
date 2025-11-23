// q10_register.js
// Client-side validation with jQuery, simple uniqueness simulation
$(function () {
  const $form = $('#reg-form');
  const $name = $('#name');
  const $email = $('#email');
  const $password = $('#password');
  const $status = $('#status');

  // helper: reset field styles
  function clearInvalid() {
    $form.find('input').removeClass('invalid');
    $status.text('').removeClass('success');
  }

  // 1-3 Validate on submit
  $form.on('submit', function (e) {
    e.preventDefault();
    clearInvalid();
    let valid = true;

    if (!$name.val().trim()) {
      $name.addClass('invalid');
      valid = false;
    }

    const emailVal = $email.val().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      $email.addClass('invalid');
      valid = false;
    }

    if (($password.val() || '').length < 8) {
      $password.addClass('invalid');
      valid = false;
    }

    if (valid) {
      $status.text('Registration successful!').addClass('success');
    } else {
      $status.text('Please fix highlighted fields.');
    }
  });

  // 2. Check Email uniqueness -> simulated async check
  $('#check-unique').on('click', function () {
    $email.removeClass('invalid');
    const emailVal = $email.val().trim();
    if (!emailVal) {
      $email.addClass('invalid');
      $status.text('Enter an email first.');
      return;
    }
    // simulate async uniqueness check with setTimeout
    $status.text('Checking email uniqueness...');
    setTimeout(function () {
      // simulate uniqueness: emails containing "taken" are considered already used
      if (emailVal.indexOf('taken') !== -1) {
        $email.addClass('invalid');
        $status.text('Email is already taken.');
      } else {
        $status.text('Email is available.').addClass('success');
      }
    }, 800);
  });

  // 5. Highlight invalid fields dynamically while typing
  $form.on('input', 'input', function () {
    $(this).removeClass('invalid');
    $status.text('');
  });
});
