
fetch('https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=100')
    .then(response => response.json())
    .then(data => {
        data.reverse(); // Reverse the data to get the correct date order
        const dates = data.map(item => item.candle_date_time_kst.substring(0, 10)); // Shorten the date format
        const prices = data.map(item => item.trade_price);

        var options = {
            series: [{
                name: 'Trade Price',
                data: prices
            }],
            chart: {
                type: 'line',
                toolbar: {
                    show: true
                }
            },
            xaxis: {
                categories: dates
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value.toLocaleString(); // Add commas to y-axis numbers
                    }
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    })
    .catch(error => console.log(error));
