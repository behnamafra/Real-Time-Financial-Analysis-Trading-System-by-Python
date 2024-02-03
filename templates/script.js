// script.js

// Move the googleData array declaration outside the WebSocket event listeners
const googleData = [];
const receivedData = [];
const amazonData = [];
const microsoftData = [];
const teslaData = [];
const appleData = [];


const amazonClosingPrice = [];
const microsoftClosingPrice = [];
const teslaClosingPrice = [];
const appleClosingPrice = [];
const googleClosingPrice = [];

let googClosingPrice = [];
let awsClosingPrice = [];
let msftClosingPrice = [];
let tslClosingPrice = [];
let aplClosingPrice = [];

// Create a WebSocket connection
const socket = new WebSocket('ws://localhost:3000');



socket.addEventListener('message', (event) => {
  const parsedMessage = JSON.parse(event.data);
// set time
const today = new Date();
let h = today.getHours();
let m = today.getMinutes();
let s = today.getSeconds();
m = checkTime(m);
s = checkTime(s);
time =  h + ":" + m + ":" + s;

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


  // Log parsedMessage to check its contents
  console.log('Received time:', time);
  // Check if parsedMessage[0] has the stock_symbol property
  if (parsedMessage[0] && parsedMessage[0].hasOwnProperty('stock_symbol') && parsedMessage[0].hasOwnProperty('moving_average')) {
      const ma_apple = document.getElementById('ma-apple');
      const ma_apple_To_display = parsedMessage[1].moving_average;
      const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
      setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
      const ma_microsoft = document.getElementById('ma-microsoft');
      const ma_microsoft_To_display = parsedMessage[4].moving_average;
      const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
      setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
      const ma_google = document.getElementById('ma-google');
      const ma_google_To_display = parsedMessage[2].moving_average;
      const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
      setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
      const ma_amazon = document.getElementById('ma-amazone');
      const ma_amazon_To_display = parsedMessage[3].moving_average;
      const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
      setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
      const ma_tesla = document.getElementById('ma-tesla');
      const ma_tesla_To_display = parsedMessage[0].moving_average;
      const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
      setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);


  
}
  if (parsedMessage[0] && parsedMessage[0].hasOwnProperty('stock_symbol') && parsedMessage[0].hasOwnProperty('closing_price')) {
    if (parsedMessage[0].stock_symbol == 'AMZN') {
      amazonData.push(parsedMessage[0]);
      amazonClosingPrice.push({
        data: parsedMessage[0].closing_price,
        time: time
      });
      const displaySpan = document.getElementById('lbl_amazon_signal');
      const signalToDisplay = parsedMessage[0].signal;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      const closing_price = document.getElementById('close-price-amazone');
      const closingPriceToDisplay = parsedMessage[0].closing_price;
      const interval_closingPrice_Id = setInterval(updateDisplay(closingPriceToDisplay,closing_price), 1000);
      setTimeout(() => clearInterval(interval_closingPrice_Id), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'MSFT') {
      microsoftData.push(parsedMessage[0]);
      microsoftClosingPrice.push({
        data: parsedMessage[0].closing_price,
        time: time
      });
      const displaySpan = document.getElementById('lbl_microsoft_signal');
      const signalToDisplay = parsedMessage[0].signal;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      const closing_price = document.getElementById('close-price-microsoft');
      const closingPriceToDisplay = parsedMessage[0].closing_price;
      const interval_closingPrice_Id = setInterval(updateDisplay(closingPriceToDisplay,closing_price), 1000);
      setTimeout(() => clearInterval(interval_closingPrice_Id), 10000);
      //updateMicrosoftChart();
    }
    if (parsedMessage[0].stock_symbol == 'GOOGL') {
      googleData.push(parsedMessage[0]);
      googleClosingPrice.push({
        data: parsedMessage[0].closing_price,
        time: time
      });
      localStorage.setItem('googleClosingPrice', JSON.stringify(googleClosingPrice));
      const displaySpan = document.getElementById('lbl_google_signal');
      const signalToDisplay = parsedMessage[0].signal;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      const closing_price = document.getElementById('close-price-google');
      const closingPriceToDisplay = parsedMessage[0].closing_price;
      const interval_closingPrice_Id = setInterval(updateDisplay(closingPriceToDisplay,closing_price), 1000);
      setTimeout(() => clearInterval(interval_closingPrice_Id), 10000);
      //updateGoogleChart();
    }
    if (parsedMessage[0].stock_symbol == 'TSLA') {
      teslaData.push(parsedMessage[0]);
      teslaClosingPrice.push({
        data: parsedMessage[0].closing_price,
        time: time
      });
      const displaySpan = document.getElementById('lbl_tesla_signal');
      const signalToDisplay = parsedMessage[0].signal;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      const closing_price = document.getElementById('close-price-tesla');
      const closingPriceToDisplay = parsedMessage[0].closing_price;
      const interval_closingPrice_Id = setInterval(updateDisplay(closingPriceToDisplay,closing_price), 1000);
      setTimeout(() => clearInterval(interval_closingPrice_Id), 10000);
      //updateTeslaChart();
    }
    if (parsedMessage[0].stock_symbol == 'AAPL') {
      appleData.push(parsedMessage[0]);
      appleClosingPrice.push({
        data: parsedMessage[0].closing_price,
        time: time
      });
      const displaySpan = document.getElementById('lbl_apple_signal');
      signalToDisplay = parsedMessage[0].signal;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      const closing_price = document.getElementById('close-price-apple');
      const closingPriceToDisplay = parsedMessage[0].closing_price;
      const interval_closingPrice_Id = setInterval(updateDisplay(closingPriceToDisplay,closing_price), 1000);
      setTimeout(() => clearInterval(interval_closingPrice_Id), 10000);
      //updateAppleChart();
    }
  
  }if (parsedMessage[0] && parsedMessage[0].hasOwnProperty('stock_symbol') && parsedMessage[0].hasOwnProperty('ema')){
    if (parsedMessage[0].stock_symbol == 'AMZN') {
      const moving_average = document.getElementById('ema-amazone');
      const ma_ToDisplay = parsedMessage[0].ema;
      const interval_ma_Id = setInterval(updateDisplay(ma_ToDisplay,moving_average), 1000);
      setTimeout(() => clearInterval(interval_ma_Id), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'MSFT') {
      const displaySpan = document.getElementById('ema-microsoft');
      const signalToDisplay = parsedMessage[0].ema;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'GOOGL') {
      const displaySpan = document.getElementById('ema-google');
      const signalToDisplay = parsedMessage[0].ema;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'TSLA') {
      const displaySpan = document.getElementById('ema-tesla');
      const signalToDisplay = parsedMessage[0].ema;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'AAPL') {
      const displaySpan = document.getElementById('ema-apple');
      const signalToDisplay = parsedMessage[0].ema;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }

  }if (parsedMessage[0] && parsedMessage[0].hasOwnProperty('stock_symbol') && parsedMessage[0].hasOwnProperty('rsi')){
    if (parsedMessage[0].stock_symbol == 'AMZN') {
      const moving_average = document.getElementById('rsi-amazone');
      const ma_ToDisplay = parsedMessage[0].rsi;
      const interval_ma_Id = setInterval(updateDisplay(ma_ToDisplay,moving_average), 1000);
      setTimeout(() => clearInterval(interval_ma_Id), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'MSFT') {
      const displaySpan = document.getElementById('rsi-microsoft');
      const signalToDisplay = parsedMessage[0].rsi;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'GOOGL') {
      const displaySpan = document.getElementById('rsi-google');
      const signalToDisplay = parsedMessage[0].rsi;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'TSLA') {
      const displaySpan = document.getElementById('rsi-tesla');
      const signalToDisplay = parsedMessage[0].rsi;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
    if (parsedMessage[0].stock_symbol == 'AAPL') {
      const displaySpan = document.getElementById('rsi-apple');
      const signalToDisplay = parsedMessage[0].rsi;
      const intervalId = setInterval(updateDisplay(signalToDisplay,displaySpan), 1000);
      setTimeout(() => clearInterval(intervalId), 10000);
      //updateAmazonChart();
    }
  } 
  else {
    console.warn('parsedMessage[0] does not have the stock_symbol property:', parsedMessage[0]);
  }
  receivedData.push({
    data: parsedMessage,
    time: time
  });
  function updateDisplay(signal,lable) {
    if (signal=='Buy')
      lable.style.color = 'green';
      lable.style.fontSize = '30px';
      lable.textContent = `${signal}`;
    if (signal=='Sell')
      lable.style.color = 'red';
      lable.style.fontSize = '30px';
      lable.textContent = `${signal}`;
    if (signal=='Hold')
      lable.style.color = 'white';
      lable.style.fontSize = '30px';
      lable.textContent = `${signal}`;
  }
});
 // Handle connection open
 socket.addEventListener('open', (event) => {
   console.log('WebSocket connection opened:', googleClosingPrice.length);
   // Create the chart object after the WebSocket connection is opened
 });

 // Handle connection close
 socket.addEventListener('close', (event) => {
   console.log('WebSocket connection closed:', googleClosingPrice.length);
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

let googleIndex = 0;
let appleIndex = 0;
let awsIndex = 0;
let msftIndex = 0;
let tslaIndex = 0;
let index = 5;

const show_google_chart = document.getElementById('googlechart').getContext('2d');
const show_amazon_chart = document.getElementById('amazonchart').getContext('2d');
const show_tesla_chart = document.getElementById('teslachart').getContext('2d');
const show_apple_chart = document.getElementById('applechart').getContext('2d');
const show_microsoft_chart = document.getElementById('microsoftchart').getContext('2d');


//localStorage.setItem('googleClosingPrice', JSON.stringify(googleClosingPrice));





const googChart = new Chart(show_google_chart, {
    type: 'line', // You can change the chart type if needed
    data: {
        labels: [],
        datasets: [{
            label: 'Closing Price',
            data: [],
            borderColor: 'blue',
            fill: false
        }]
    },
    options: {} // Add any Chart.js options here
});
const aplChart = new Chart(show_apple_chart, {
  type: 'line', // You can change the chart type if needed
  data: {
      labels: [],
      datasets: [{
          label: 'Closing Price',
          data: [],
          borderColor: 'blue',
          fill: false
      }]
  },
  options: {} // Add any Chart.js options here
});
const awsChart = new Chart(show_amazon_chart, {
  type: 'line', // You can change the chart type if needed
  data: {
      labels: [],
      datasets: [{
          label: 'Closing Price',
          data: [],
          borderColor: 'blue',
          fill: false
      }]
  },
  options: {} // Add any Chart.js options here
});
const tslaChart = new Chart(show_tesla_chart, {
  type: 'line', // You can change the chart type if needed
  data: {
      labels: [],
      datasets: [{
          label: 'Closing Price',
          data: [],
          borderColor: 'blue',
          fill: false
      }]
  },
  options: {} // Add any Chart.js options here
});
const msftChart = new Chart(show_microsoft_chart, {
  type: 'line', // You can change the chart type if needed
  data: {
      labels: [],
      datasets: [{
          label: 'Closing Price',
          data: [],
          borderColor: 'blue',
          fill: false
      }]
  },
  options: {} // Add any Chart.js options here
});

googClosingPrice = JSON.parse(localStorage.getItem('googleClosingPrice')) || [];
  for (let i = 0; i < googClosingPrice.length; i++) {
    googChart.data.labels.push(googClosingPrice[i].time);
    googChart.data.datasets[0].data.push(googClosingPrice[i].data);
}
googChart.update();
function pushDataToGoogleChart(){
  
}


function updateGoogleChart() {
    if (googleIndex < googleClosingPrice.length) {
      googChart.data.labels.push(googleClosingPrice[googleIndex].time);
      googChart.data.datasets[0].data.push(googleClosingPrice[googleIndex].data);
      googChart.update();
        googleIndex++;
        if (googleClosingPrice.length >= 50){
          googChart.data.labels.splice(0, 1);
          googChart.data.datasets[0].data.splice(0, 1);
          googChart.update();
        }
    }
}
function updateAppleChart() {
  if (appleIndex < appleClosingPrice.length) {
    aplChart.data.labels.push(appleClosingPrice[appleIndex].time);
    aplChart.data.datasets[0].data.push(appleClosingPrice[appleIndex].data);
    aplChart.update();
      appleIndex++;
      if (appleClosingPrice.length >= 50){
        aplChart.data.labels.splice(0, 1);
        aplChart.data.datasets[0].data.splice(0, 1);
        aplChart.update();
      }
  }
}
function updateTeslaChart() {
  if (tslaIndex < teslaClosingPrice.length) {
    tslaChart.data.labels.push(teslaClosingPrice[tslaIndex].time);
    tslaChart.data.datasets[0].data.push(teslaClosingPrice[tslaIndex].data);
    tslaChart.update();
      tslaIndex++;
      if (teslaClosingPrice.length >= 50){
        tslaChart.data.labels.splice(0, 1);
        tslaChart.data.datasets[0].data.splice(0, 1);
        tslaChart.update();
      }
  }
}
function updateAmazonChart() {
  if (awsIndex < amazonClosingPrice.length) {
    awsChart.data.labels.push(amazonClosingPrice[awsIndex].time);
    awsChart.data.datasets[0].data.push(amazonClosingPrice[awsIndex].data);
    awsChart.update();
      awsIndex++;
      if (amazonClosingPrice.length >= 50){
        awsChart.data.labels.splice(0, 1);
        awsChart.data.datasets[0].data.splice(0, 1);
        awsChart.update();
      }
  }
}
function updateMicrosoftChart() {
  if (msftIndex < microsoftClosingPrice.length) {
    msftChart.data.labels.push(microsoftClosingPrice[msftIndex].time);
    msftChart.data.datasets[0].data.push(microsoftClosingPrice[msftIndex].data);
    msftChart.update();
      msftIndex++;
      if (microsoftClosingPrice.length >= 50){
        msftChart.data.labels.splice(0, 1);
        msftChart.data.datasets[0].data.splice(0, 1);
        msftChart.update();
      }
  }
}
setInterval(updateGoogleChart, 2000);
setInterval(updateAppleChart, 2000);
setInterval(updateTeslaChart, 2000);
setInterval(updateAmazonChart, 2000); 
setInterval(updateMicrosoftChart, 2000); // Update every 2 seconds

document.getElementById('btn-showGoogle').addEventListener('click', () => {
    //pushDataToGoogleChart()
    updateGoogleChart(); // Start updating with Amazon data
});
document.getElementById('btn-showApple').addEventListener('click', () => {
    updateAppleChart(); // Start updating with Google data
});
document.getElementById('btn-showTesla').addEventListener('click', () => {
    updateTeslaChart(); // Start updating with Google data
});
document.getElementById('btn-showMicrosoft').addEventListener('click', () => {
    updateAmazonChart(); // Start updating with Google data
});
document.getElementById('btn-showAmazon').addEventListener('click', () => {
  updateMicrosoftChart(); // Start updating with Google data
});


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
        

         // Change the background color of the selected tab button
        const selectedButton = document.getElementById(`button-${tabId}`);
        if (selectedButton) {
            selectedButton.style.backgroundColor = 'red';
        }
             
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