'use strict';

function Dog(dog) {
  this.name = dog.name;
  this.image_url = dog.image_url;
  this.hobbies = dog.hobbies;
}

Dog.prototype.render = function(container) {
  let $container = $(container);
  let $template = $container.find('.dog-template');

  let $dog = $template.clone();
  $dog.removeClass('dog-template');
  $dog.find('.dog-name').text(this.name);
  $dog.find('img.dog-image').attr('src', this.image_url);
  $container.append($dog);

  // $(container).append(`
  //   <div>
  //     <h2>${this.name}</h2>
  //     <img src="${this.image_url}" />
  //   </div>
  // `)
}

$('main section').hide();

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};
console.log('about to AJAX', ajaxSettings);
$.ajax('data.json', ajaxSettings)
  .then(function (data) {
    console.log(data);


    data.forEach(dog => {
      console.log(dog.name);

      let actualDog = new Dog(dog);
      actualDog.render('main section');
    })

    $('.spinner').slideUp(5000);
    $('main section').fadeIn(1000);
  });

  // $.get('data.json').then(...)
