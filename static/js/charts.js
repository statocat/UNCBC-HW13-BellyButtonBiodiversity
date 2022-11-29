function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // Deliverable 1: Bar Chart.
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = result.otu_ids;
    console.log(otuIDs);

    var otuLabels = result.otu_labels;
    console.log(otuLabels);

    var sampleValues = result.sample_values;
    console.log(sampleValues);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIDs.slice(0,10).reverse();


    // 8. Create the trace for the bar chart. 
    var barTrace = {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks.map(i => `OTU ${i}`),
      text: otuLabels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h',
      marker: {color: sampleValues}
    }
    var barData = [barTrace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      yaxis:{ticktext: yticks}
    };
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bar', barData, barLayout )

    // Deliverable 2: Bubble Chart.
    // 1. Create the trace for the bubble chart.
    var bubbleTrace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker:{size:sampleValues, color:otuIDs, colorscale: 'sunset'}
    };

    var bubbleData = [bubbleTrace];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title:'Bacteria Cultures per Sample',
      xaxis:{title:'OTU ID'},
      hovermode:'closest'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData,bubbleLayout); 

    // Deliverable 3: Gauge Chart.

    // 1. Create variable that filters metadata array for object with matching ID
    var metadata = data.metadata;

    // 2. Create variable that holds first sample in array created in step 1.
    var filteredMetadata = metadata.filter(i => i.id == sample);
    var gaugeResult = filteredMetadata[0];

    // 3. Create variable that converts washing frequency to a floating point number.
    washFreq = parseFloat(gaugeResult.wfreq);

    // 4. Create the trace for the gauge chart.
    gaugeTrace={
      value: washFreq,
      type: 'indicator',
      mode: 'gauge+number',
      title: {text: 'Belly Button Washing Frequency'},
      gauge: {
        axis: {range:[null, 10]},
        bar: {color:'black'},
        steps: [
          {range: [0,2], color:'#fef0d9'},
          {range: [2,4], color:'#fdcc8a'},
          {range: [4,6], color:'#fc8d59'},
          {range: [6,8], color:'#e34a33'},
          {range: [8,10], color:'#b30000'}
          ]
      }

    };

    gaugeData = [gaugeTrace];

    // 5. Create the layout for the gauge chart.
    gaugeLayout= {};
    // 6. Use plotly to plot the data with the layout. 
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  });
}