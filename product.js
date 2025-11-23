// q2_products.js
// jQuery logic for product interactions
$(function () {
  const $list = $('#product-list');

  // 1. Click on a product -> highlight background
  $list.on('click', '.product', function (e) {
    // prevent when clicking favorite button
    if ($(e.target).hasClass('fav')) return;
    $('.product').removeClass('highlight');
    $(this).addClass('highlight');
  });

  // 2. Hover -> show additional details
  $list.on('mouseenter', '.product', function () {
    $(this).find('.details').show();
  }).on('mouseleave', '.product', function () {
    $(this).find('.details').hide();
  });

  // 3. Clicking "Favorite" icon -> toggle selected class
  $list.on('click', '.fav', function (e) {
    e.stopPropagation(); // avoid triggering product click
    $(this).toggleClass('favorite');
    $(this).text($(this).hasClass('favorite') ? '♥ Favorited' : '♡ Favorite');
  });

  // 4. Apply different styles to discounted products using attribute selector
  // highlight items with data-discount > 0
  $list.find('.product[data-discount]').each(function () {
    const disc = parseInt($(this).attr('data-discount'), 10);
    if (disc > 0) $(this).addClass('discount');
  });

  // 5. Show an alert if a product is out of stock (data-stock === "0")
  $list.on('click', '.product', function () {
    const stock = $(this).data('stock');
    if (stock === 0) {
      alert('Product "' + $(this).find('.title').text() + '" is out of stock.');
      $(this).addClass('out');
    }
  });
});
