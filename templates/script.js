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
  console.log('Received time:', parsedMessage);
  // Check if parsedMessage[0] has the stock_symbol property
  if (parsedMessage[1] && parsedMessage[1]==("GOOGL")) {
    googleData.push(parsedMessage[2]);
    googleClosingPrice.push({
      data: parsedMessage[2],
      time: time
    });
      localStorage.setItem('googleClosingPrice', JSON.stringify(googleClosingPrice));
      const ma_apple = document.getElementById('ma-google');
      const ma_apple_To_display = parsedMessage[3];
      const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
      setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
      const ma_microsoft = document.getElementById('ema-google');
      const ma_microsoft_To_display = parsedMessage[4];
      const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
      setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
      const ma_google = document.getElementById('rsi-google');
      const ma_google_To_display = parsedMessage[5];
      const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
      setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
      const ma_amazon = document.getElementById('close-price-google');
      const ma_amazon_To_display = parsedMessage[2];
      const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
      setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
      const ma_tesla = document.getElementById('lbl_google_signal');
      const ma_tesla_To_display = parsedMessage[6];
      const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
      setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);
}if (parsedMessage[1] && parsedMessage[1]==("AAPL")) {
  appleData.push(parsedMessage[2]);
      appleClosingPrice.push({
        data: parsedMessage[2],
        time: time
      });
  localStorage.setItem('appleClosingPrice', JSON.stringify(appleClosingPrice));
  const ma_apple = document.getElementById('ma-apple');
  const ma_apple_To_display = parsedMessage[3];
  const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
  setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
  const ma_microsoft = document.getElementById('ema-apple');
  const ma_microsoft_To_display = parsedMessage[4];
  const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
  setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
  const ma_google = document.getElementById('rsi-apple');
  const ma_google_To_display = parsedMessage[5];
  const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
  setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
  const ma_amazon = document.getElementById('close-price-apple');
  const ma_amazon_To_display = parsedMessage[2];
  const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
  setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
  const ma_tesla = document.getElementById('lbl_apple_signal');
  const ma_tesla_To_display = parsedMessage[6];
  const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
  setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);
}if (parsedMessage[1] && parsedMessage[1]==("MSFT")) {
  microsoftData.push(parsedMessage[2]);
  microsoftClosingPrice.push({
    data: parsedMessage[2],
    time: time
  });
  localStorage.setItem('microsoftClosingPrice', JSON.stringify(microsoftClosingPrice));
  const ma_apple = document.getElementById('ma-microsoft');
  const ma_apple_To_display = parsedMessage[3];
  const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
  setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
  const ma_microsoft = document.getElementById('ema-microsoft');
  const ma_microsoft_To_display = parsedMessage[4];
  const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
  setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
  const ma_google = document.getElementById('rsi-microsoft');
  const ma_google_To_display = parsedMessage[5];
  const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
  setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
  const ma_amazon = document.getElementById('close-price-microsoft');
  const ma_amazon_To_display = parsedMessage[2];
  const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
  setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
  const ma_tesla = document.getElementById('lbl_microsoft_signal');
  const ma_tesla_To_display = parsedMessage[6];
  const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
  setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);
}if (parsedMessage[1] && parsedMessage[1]==("TSLA")) {
  teslaData.push(parsedMessage[2]);
      teslaClosingPrice.push({
        data: parsedMessage[2],
        time: time
      });
  localStorage.setItem('teslaClosingPrice', JSON.stringify(teslaClosingPrice));
  const ma_apple = document.getElementById('ma-tesla');
  const ma_apple_To_display = parsedMessage[3];
  const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
  setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
  const ma_microsoft = document.getElementById('ema-tesla');
  const ma_microsoft_To_display = parsedMessage[4];
  const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
  setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
  const ma_google = document.getElementById('rsi-tesla');
  const ma_google_To_display = parsedMessage[5];
  const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
  setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
  const ma_amazon = document.getElementById('close-price-tesla');
  const ma_amazon_To_display = parsedMessage[2];
  const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
  setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
  const ma_tesla = document.getElementById('lbl_tesla_signal');
  const ma_tesla_To_display = parsedMessage[6];
  const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
  setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);
}if (parsedMessage[1] && parsedMessage[1]==("AMZN")) {

  amazonData.push(parsedMessage[2]);
      amazonClosingPrice.push({
        data: parsedMessage[2],
        time: time
      });
      localStorage.setItem('amazonClosingPrice', JSON.stringify(amazonClosingPrice));
      //updateAmazonChart();
  const ma_apple = document.getElementById('ma-amazone');
  const ma_apple_To_display = parsedMessage[3];
  const interval_apple_ma_Id = setInterval(updateDisplay(ma_apple_To_display,ma_apple), 1000);
  setTimeout(() => clearInterval(interval_apple_ma_Id), 10000);
  const ma_microsoft = document.getElementById('ema-amazone');
  const ma_microsoft_To_display = parsedMessage[4];
  const interval_microsoft_ma_Id = setInterval(updateDisplay(ma_microsoft_To_display,ma_microsoft), 1000);
  setTimeout(() => clearInterval(interval_microsoft_ma_Id), 10000);
  const ma_google = document.getElementById('rsi-amazone');
  const ma_google_To_display = parsedMessage[5];
  const interval_google_ma_Id = setInterval(updateDisplay(ma_google_To_display,ma_google), 1000);
  setTimeout(() => clearInterval(interval_google_ma_Id), 10000);
  const ma_amazon = document.getElementById('close-price-amazone');
  const ma_amazon_To_display = parsedMessage[2];
  const interval_amazon_ma_Id = setInterval(updateDisplay(ma_amazon_To_display,ma_amazon), 1000);
  setTimeout(() => clearInterval(interval_amazon_ma_Id), 10000);
  const ma_tesla = document.getElementById('lbl_amazon_signal');
  const ma_tesla_To_display = parsedMessage[6];
  const interval_tesla_ma_Id = setInterval(updateDisplay(ma_tesla_To_display,ma_tesla), 1000);
  setTimeout(() => clearInterval(interval_tesla_ma_Id), 10000);
}
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

awsClosingPrice = JSON.parse(localStorage.getItem('amazonClosingPrice')) || [];
  for (let i = 0; i < awsClosingPrice.length; i++) {
    awsChart.data.labels.push(awsClosingPrice[i].time);
    awsChart.data.datasets[0].data.push(awsClosingPrice[i].data);
}
awsChart.update();

tslClosingPrice = JSON.parse(localStorage.getItem('teslaClosingPrice')) || [];
  for (let i = 0; i < tslClosingPrice.length; i++) {
    tslaChart.data.labels.push(tslClosingPrice[i].time);
    tslaChart.data.datasets[0].data.push(tslClosingPrice[i].data);
}
tslaChart.update();

aplClosingPrice = JSON.parse(localStorage.getItem('appleClosingPrice')) || [];
  for (let i = 0; i < aplClosingPrice.length; i++) {
    aplChart.data.labels.push(aplClosingPrice[i].time);
    aplChart.data.datasets[0].data.push(aplClosingPrice[i].data);
}
aplChart.update();

msftClosingPrice = JSON.parse(localStorage.getItem('microsoftClosingPrice')) || [];
  for (let i = 0; i < msftClosingPrice.length; i++) {
    msftChart.data.labels.push(msftClosingPrice[i].time);
    msftChart.data.datasets[0].data.push(msftClosingPrice[i].data);
}
msftChart.update();



function updateGoogleChart() {
    if (googleIndex < googleClosingPrice.length) {
      googChart.data.labels.push(googleClosingPrice[googleIndex].time);
      googChart.data.datasets[0].data.push(googleClosingPrice[googleIndex].data);
      googChart.update();
        googleIndex++;
        if (googleClosingPrice.length >= 30){
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
      if (appleClosingPrice.length >= 30){
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
      if (teslaClosingPrice.length >= 30){
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
      if (amazonClosingPrice.length >= 30){
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
      if (microsoftClosingPrice.length >= 30){
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