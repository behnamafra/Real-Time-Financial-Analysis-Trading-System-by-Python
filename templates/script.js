
// script.js

 // Create a WebSocket connection
 const socket = new WebSocket('ws://localhost:3000');
    const outputDiv = document.getElementById('output');
    const receivedData = [];

    socket.addEventListener('message', (event) => {
      const message = event.data;
      const parsedMessage = JSON.parse(event.data);
      receivedData.push(parsedMessage);

      const activeTabId = document.querySelector('.tab.selected').id;
      const activeChart = getChartByTabId(activeTabId);
      onRefresh(activeChart, receivedData);
    });

    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', receivedData);
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', receivedData);
    });

document.getElementById('tab1').addEventListener('click', function () {
    openTab('tab1', googlechart);
});

document.getElementById('tab2').addEventListener('click', function () {
    openTab('tab2', applechart);
});

document.getElementById('tab3').addEventListener('click', function () {
    openTab('tab3', amazonchart);
});

document.getElementById('tab4').addEventListener('click', function () {
    openTab('tab4', teslachart);
});

document.getElementById('tab5').addEventListener('click', function () {
    openTab('tab5', microsoftchart);
});

// Define initial data for the chart


// Initialize datasets with initial data
var datasets = receivedData.map(data => ({
  label: data.stock_symbol,
  data: [{ x: data.timestamp, y: data.closing_price }],
  borderColor: randomColor(),
  backgroundColor: 'rgba(0, 0, 0, 0)',
  fill: false
}));
  
// Define the chart options
// Define the chart options
var options = {
    type: 'line',
    data: {
        datasets: []
      },
    options: {
      maintainAspectRatio: false, // Allow the chart to adjust its size
      responsive: true,           // Make the chart responsive
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            duration: 60000,
            refresh: 1000,
            delay: 2000,
            onRefresh: onRefresh
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price (USD)'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'nearest',
          intersect: false
        }
      }
    }
  };

// Create the chart object
var googlechart = new Chart(document.getElementById('googlechart').getContext('2d'), options);
var applechart = new Chart(document.getElementById('applechart').getContext('2d'), options);
var amazonchart = new Chart(document.getElementById('amazonchart').getContext('2d'), options);
var teslachart = new Chart(document.getElementById('teslachart').getContext('2d'), options);
var microsoftchart = new Chart(document.getElementById('microsoftchart').getContext('2d'), options);

// Define the function to fetch new data
// Function to handle the received analyzed data
function onRefresh(chart, receivedData) {
  if (Array.isArray(receivedData)) {
    var analyzedData = receivedData;

    var filteredData = analyzedData.filter(data => chart.data.datasets.some(dataset => dataset.label === data.stock_symbol));

    filteredData.forEach(data => {
      var dataset = chart.data.datasets.find(dataset => dataset.label === data.stock_symbol);

      if (!dataset) {
        dataset = {
          label: data.stock_symbol,
          data: [],
          borderColor: randomColor(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false
        };

        chart.data.datasets.push(dataset);
      }

      dataset.data.push({
        x: data.timestamp,
        y: data.closing_price
      });
    });

    chart.update();
  }
}

// Function to switch tabs and update chart data
function openTab(tabId, chart) {
    // Hide all tab content
    
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    // Remove the 'selected' class from all tabs
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(tab => tab.classList.remove('selected'));

    // Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';

        // Add the 'selected' class to the selected tab
        selectedTab.classList.add('selected');

        // Update the chart with new data when switching tabs
        onRefresh(chart);

         // Change the background color of the selected tab button
        const selectedButton = document.getElementById(`button-${tabId}`);
        if (selectedButton) {
            selectedButton.style.backgroundColor = 'red';
        }
             
    }
}

function getChartByTabId(tabId) {
  switch (tabId) {
    case 'tab1':
      return googlechart;
    case 'tab2':
      return applechart;
    case 'tab3':
      return amazonchart;
    case 'tab4':
      return teslachart;
    case 'tab5':
      return microsoftchart;
    default:
      return null;
  }
}
  
// Define a function to generate a random color
function randomColor() {
    return 'rgb(' + [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
    ].join(',') + ')';
}

// Add this function to update the digital watch
function updateDigitalWatch() {
  const digitalWatch = document.getElementById('digitalWatch');
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  digitalWatch.innerText = timeString;
}

// Call the function to update the digital watch every second
setInterval(updateDigitalWatch, 1000);