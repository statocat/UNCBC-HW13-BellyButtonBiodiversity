// var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();

// var topCities = sortedCities.slice(0,5);

// cityNames = topCities.map(city => city.City);

// popGrowths = topCities.map(city => city.Increase_from_2016);
// var trace = [{
//     x: cityNames,
//     y: popGrowths,
//     type: "bar"
//   }];

// var layout = {
//     title: 'Fastest Growing Cities',
//     xaxis: {title: 'City'},
//     yaxis: {title: 'Population Growth in 2016'}
// };

// Plotly.newPlot('bar-plot',trace,layout);

var bigCities = cityGrowths.sort((a,b) => b.population - a.population).slice(0,7);
var bigCityNames = bigCities.map(city => city.City);
var bigCityPops = bigCities.map(city => city.population);

console.log([bigCityNames, bigCityPops]);

var trace = [{x: bigCityNames, y: bigCityPops, type: 'bar'}];
var layout = [{
    title: 'Biggest Cities',
    xaxis: {title: 'City'},
    yaxis: {title: 'Population'}
}];

Plotly.newPlot('bar-plot', trace, layout);