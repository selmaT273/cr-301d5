'use strict';

const templateId = '#neighborhood-template';
let templateHTML = $(templateId).html();

let neighborhoodObject = {
  name: 'NewBo',
  city: 'Cedar Rapids',
  population: '150k',
  founded: '2020',
  body: '<h1>Hi NewBo!</h1>'
};
let html = Mustache.render(templateHTML, neighborhoodObject);

console.log(html);

$('#neighborhoods').append(html);



function Neighborhood(data) {
  for(let key in data) {
    console.log(key);
    this[key] = data[key];
    //instead of this.name = data.name
  }
}

Neighborhood.prototype.toHtml = function() {
  let templateHTML = $(templateId).html();
  let html = Mustache.render(templateHTML, this);
  return html;
}

neighborhoodDataSet.forEach(neighborhoodData => {
  let neighborhood = new Neighborhood(neighborhoodData);

  console.log(neighborhood);
  $('#neighborhoods').append(neighborhood.toHtml());
})


// Identify the mustache template.
// Why? The actual JS shouldn't have any 'knowledge' or 'insight' into the page structure at all.
// We call this "separation of concerns"
// let templateId = '#neighborhood-template';

// let neighborhoods = [];

// // REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
// function Neighborhood(rawDataObject) {
//   for (let key in rawDataObject) {
//     this[key] = rawDataObject[key];
//   }
// }

// // Demo Part 1: Build it all with jQuery
// // Make sure and talk through each of these steps that needs to happen
// Neighborhood.prototype.toHtml = function () {
//   let container = $(`<div></div>`).clone();
//   container.append(`<h2>${this.name}</h2><p>Part of: ${this.city}</p>`);
//   return container;
// };


// Demo Part 2: Use jQuery to clone
// Neighborhood.prototype.toHtml = function() {
//   let container = $('.template').clone();
//   container.removeClass('template');
//   container.find('.name').text(this.name);
//   container.find('.city').text(`Part of: ${this.city}`);
//   container.find('.population').text(`Current population: ${this.population}`);
//   container.find('.founded').text(`Founded On: ${this.founded}`);
//   container.find('.body').html(this.body);
//   return container;
// };

// Demo Part 3: Mustache
// Neighborhood.prototype.toHtml = function () {
//   // 1. Get the template from the HTML document
//   let template = $(templateId).html();
//   // 2. Use Mustache to "render" new html by merging the template with the data
//   let html = Mustache.render(template, this);
//   // 3. Do not forget to return the HTML from this method
//   return html
// };

// neighborhoodDataSet.forEach(neighborhoodObject => {
//   neighborhoods.push(new Neighborhood(neighborhoodObject));
// });

// neighborhoods.forEach(ourNewNeighborhoodObject => {
//   $('#neighborhoods').append(ourNewNeighborhoodObject.toHtml());
// });
