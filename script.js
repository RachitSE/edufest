document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chart.js
    var ctx = document.getElementById('prediction-chart').getContext('2d');
    var predictionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Labels for x-axis (days)
            datasets: [{
                label: 'Predicted Heart Rate',
                data: [], // Predicted heart rates
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'heart-rate-y-axis'
            },
            {
                label: 'Predicted SPO2 Level',
                data: [], // Predicted SPO2 levels
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'spo2-y-axis'
            }]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'heart-rate-y-axis',
                        position: 'left',
                        scaleLabel: {
                            display: true,
                            labelString: 'Heart Rate'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 200
                        }
                    },
                    {
                        id: 'spo2-y-axis',
                        position: 'right',
                        scaleLabel: {
                            display: true,
                            labelString: 'SPO2 Level (%)'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                ],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }]
            }
        }
    });

    // Handle form submission
    document.getElementById('data-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var heartRate = parseInt(document.getElementById('heart-rate').value);
        var spo2 = parseInt(document.getElementById('spo2').value);
        var mood = document.getElementById('mood').value;

        // Generate predicted data for heart rate and SPO2
        var predictedHeartRates = generatePredictions(heartRate, mood);
        var predictedSpo2 = generateSpo2Predictions(spo2, mood);

        // Update chart data
        updateChart(predictedHeartRates, predictedSpo2);
    });

    // Generate predicted data for heart rate based on mood
    function generatePredictions(initialValue, mood) {
        var min, max;
        switch (mood) {
            case 'happy':
                min = initialValue - 10;
                max = initialValue + 10;
                break;
            case 'sad':
                min = initialValue - 20;
                max = initialValue;
                break;
            case 'surprised':
                min = initialValue;
                max = initialValue + 20;
                break;
            case 'angry':
                min = initialValue + 10;
                max = initialValue + 30;
                break;
            default:
                min = initialValue - 20;
                max = initialValue + 20;
        }

        var predictedData = [];
        predictedData.push(initialValue);
        for (var i = 1; i < 30; i++) {
            predictedData.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return predictedData;
    }

    // Generate predicted data for SPO2 based on mood
    function generateSpo2Predictions(initialValue, mood) {
        var min, max;
        switch (mood) {
            case 'happy':
                min = 90;
                max = 100;
                break;
            case 'sad':
                min = 85;
                max = 95;
                break;
            case 'surprised':
                min = 88;
                max = 98;
                break;
            case 'angry':
                min = 85;
                max = 95;
                break;
            default:
                min = 88;
                max = 98;
        }

        var predictedData = [];
        predictedData.push(initialValue);
        for (var i = 1; i < 30; i++) {
            var newValue = Math.floor(Math.random() * (max - min + 1)) + min;
            if (newValue > 100) {
                newValue = 100;
            } else if (newValue < 0) {
                newValue = 0;
            }
            predictedData.push(newValue);
        }
        return predictedData;
    }

    // Update chart data
    function updateChart(predictedHeartRates, predictedSpo2) {
        var labels = [];
        for (var i = 0; i < 30; i++) {
            labels.push(`Day ${i + 1}`);
        }
        predictionChart.data.labels = labels;
        predictionChart.data.datasets[0].data = predictedHeartRates;
        predictionChart.data.datasets[1].data = predictedSpo2;
        predictionChart.update();
    }
});
