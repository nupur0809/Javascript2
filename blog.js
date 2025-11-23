// q8_blog.js
// Add/prepend/remove posts and insert tags with before/after
$(function () {
  const $posts = $('#posts');

  // 1. Add New Post -> append
  $('#add-post').on('click', function () {
    const title = $('#title').val() || 'Untitled Post';
    const $p = $(`<article class="post">${escapeHtml(title)}</article>`);
    $posts.append($p);
  });

  // 2. Prepend Featured Post
  $('#prepend-featured').on('click', function () {
    const title = $('#title').val() || 'Featured Post';
    const $p = $(`<article class="post featured">${escapeHtml(title)}</article>`);
    $posts.prepend($p);
  });

  // 3. Remove Last Post
  $('#remove-last').on('click', function () {
    $posts.children().last().remove();
  });

  // 4. Add tags using before()/after()
  $('#add-post').on('click', function () {
    const tags = $('#tags').val();
    if (tags) {
      const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
      const $last = $posts.children().last();
      tagList.forEach(tag => {
        $last.after(`<div class="post-tag">#${escapeHtml(tag)}</div>`);
      });
    }
  });

  // 5. Highlight posts with specific keywords dynamically
  $('#posts').on('click', '.post', function () {
    const text = $(this).text().toLowerCase();
    if (text.includes('javascript') || text.includes('node')) {
      $(this).css('background', '#fffbcc');
      setTimeout(() => $(this).css('background', ''), 1500);
    }
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]);
  }
});
