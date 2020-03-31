'use strict';

console.log('Calling document.ready');

$(document).ready(function() {
  console.log('Document is ready!');

  // DOM stuff goes in here
  $('li').each(function () {
    console.log(this);
    let $this = $(this);
    console.log($this.text(), this.textContent)
  });

  $('li').css({ color: "orange"}).on('mouseover', function() {
    console.log('hover', this);
  }).css({ padding: '5px' });

  // document.getElement().addEventListener(click, ...)
  $('button').on('click', function() {
    $('ul').toggleClass('on');
    $('ul').show();
  })

  $('ul').on('click', 'li', function() {
    $(this).slideUp(400);
  }).find('li:first-child').css({ fontWeight: 'bold' })

});


// Same as $(document).ready(fn)
$(function() {
  console.log('Document is also ready');
});
