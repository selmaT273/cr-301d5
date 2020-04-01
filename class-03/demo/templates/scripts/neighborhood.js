'use strict';

const templateId = '#neighborhood-template';
// document.getElementById(templateId).innerHTML
const templateHtml = $(templateId).html();
// console.log(templateHtml);

let neighborhoodObject = {
  name: 'NewBo',
  city: 'Cedar Rapids',
  population: '150k',
  founded: '2020',
  body: '<h1>NewBo!</h1><p>Is good</p>'
};
let html = Mustache.render(templateHtml, neighborhoodObject);

console.log(html);

$('#neighborhoods').append(html);

function Neighborhood(data) {
  // this.name = data.name;
  // this.city = data.city;

  for(let key in data) {
    // console.log(key);
    this[key] = data[key];
  }

  // Not sure why this doesn't work?
  // this.random = () => Math.random();
}

// Not sure why this doesn't work?
Neighborhood.prototype.random = function() {
   return Math.random();
}

Neighborhood.prototype.toHtml = function() {
  let html = Mustache.render(templateHtml, this);
  return html;
}

neighborhoodDataSet.forEach(neighborhoodData => {
  let neighborhood = new Neighborhood(neighborhoodData);

  console.log(neighborhood);

  $('#neighborhoods').append(neighborhood.toHtml());
})

// $.ajax('./data/neighbors.json', { method: 'get', dataType: 'application/json' })
//   .then(function (data) {
//     data.forEach(neighborhoodData => {
//       let neighborhood = new Neighborhood(neighborhoodData);

//       console.log(neighborhood);

//       $('#neighborhoods').append(neighborhood.toHtml());
//     })

//   })
