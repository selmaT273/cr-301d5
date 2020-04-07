/* This is gross:
ajax(url, (response) => {
  // 
  ajax(url2, (response2) => {
    // 
    ajax(url3, (response3) => {

    })
  })
})

// Promises are less gross!
ajax(url)
  .then(response => {
    return ajax(url2);
  })
  .then(response2 => {
    return ajax(url3);
  })
  .then(result => {
    console.log(result);
  });

// async/await is even cooler, but don't use it
async requestStuff() {
  let response = await ajax(url);
  let response2 = await ajax(url2);
  let result = await ajax(url3);
  return result;
}
*/

// Promise can either resolve or reject
function delay(numberOfMilliseconds, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, numberOfMilliseconds)
  });
}

delay(2000, () => console.log('I was delayed'))
  .then(() => {
    console.log('I came after the promise resolved');
    return delay(5000, () => console.log('more delayed'));
  })
  .then(() => {
    console.log('all promises executed');
  })
console.log('I was not delayed');

let results;
delay(5000, () => ['slow database result'])
  .then(data => {
    results = data;
  })
  .then(() => {
    console.log('we waited for ', results)
  })
console.log(results);

let turtleRace = () => Promise.race([
  delay(Math.random() * 5000, () => 'Turtle 1'),
  delay(Math.random() * 5000, () => 'Turtle 2'),
  delay(Math.random() * 5000, () => 'Turtle 3'),
  delay(Math.random() * 5000, () => 'Turtle 4'),
]).then(winner => console.log(winner))


turtleRace();
turtleRace();
turtleRace();
turtleRace();
turtleRace();
