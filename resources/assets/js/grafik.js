var grafik = {
    init:function(){
        
        if ($('#grafikTransaksiUser').length) {
            $('#grafikTransaksiUser').empty();
    
            ajax.getData('grafik-trx-institusi','post', null, function(data){
                var total = 0;
                var dataLabel = [];
                var dataGraph = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraph.push(data.data[key])
                    total = total + data.data[key];
                })
                $('#legendTotalTrx').html(total);
                $('#grafikTransaksiUser').append('<canvas id="chart-transaksi-user" width="400" height="400"></canvas>');
    
                new Chart(document.getElementById('chart-transaksi-user'),{
                    type: 'bar',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraph,
                            backgroundColor: '#CBCBCB',
                            borderColor: '#CBCBCB',
                            hoverBackgroundColor: '#0472B9',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                    }
                })
            })
    
             $('#grafikTransaksiUser').show();
        }

        if ($('#grafikStatusTrxUser').length) {
            $('#grafikStatusTrxUser').empty();
    
            ajax.getData('grafik-status-trx-institusi','post', null, function(data){
                var totalSuccess = 0;
                var totalGagal = 0;
                var dataLabel = [];
                var dataGraphPaid = [];
                var dataGraphExpired = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraphPaid.push(data.data[key]['paid'])
                    dataGraphExpired.push(data.data[key]['expired'])

                    totalSuccess = totalSuccess + data.data[key]['paid'];
                    totalGagal = totalGagal + data.data[key]['expired'];
                })
                $('#legendTotalSuccess').html(totalSuccess);
                $('#legendTotalGagal').html(totalGagal);
                $('#grafikStatusTrxUser').append('<canvas id="chart-status-transaksi-user" width="400" height="400"></canvas>');
    
                new Chart(document.getElementById('chart-status-transaksi-user'),{
                    type: 'line',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraphPaid,
                            fill: false,
                            backgroundColor: '#0472B9',
                            borderColor: '#0472B9',
                        },{
                            label: '',
                            data: dataGraphExpired,
                            fill: false,
                            backgroundColor: '#EB5757',
                            borderColor: '#EB5757',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                        elements: {
                            point:{
                                radius: 0
                            }
                        },
                    }
                })
            })
    
             $('#grafikStatusTrxUser').show();
        }

        if ($('#grafikPemasukanUser').length) {
            $('#grafikPemasukanUser').empty();
    
            ajax.getData('grafik-income-institusi','post', null, function(data){
                var total = 0;
                var dataLabel = [];
                var dataGraph = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraph.push(data.data[key])

                    total = total + data.data[key];
                })
                var rupiah = '';
                var angkarev = total.toString().split('').reverse().join('');
                for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
                $('#legendTotalIncome').html(rupiah.split('',rupiah.length-1).reverse().join(''));
                $('#grafikPemasukanUser').append('<canvas id="chart-pemasukan-user" width="400" height="400"></canvas>');
    
                new Chart(document.getElementById('chart-pemasukan-user'),{
                    type: 'bar',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraph,
                            backgroundColor: '#CBCBCB',
                            borderColor: '#CBCBCB',
                            hoverBackgroundColor: '#0472B9',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                    }
                })
            })
    
            $('#grafikPemasukanUser').show();
        }

        $("#dropdownMenuTransaksiUser a").click(function() {
            var selected = $(this).text();
        
            $('#dropdownMenuTransaksiUserValue').text(selected);
            $('#grafikTransaksiUser').hide();
            $('#grafikTransaksiUser').empty();
            var period = encodeURIComponent(window.btoa(selected));
            ajax.getData('grafik-trx-institusi','post', {period:period}, function(data){
                var total = 0;
                var dataLabel = [];
                var dataGraph = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraph.push(data.data[key])
                    total = total + data.data[key];
                })
                $('#legendTotalTrx').html(total);
                $('#grafikTransaksiUser').append('<canvas id="chart-transaksi-user" width="400" height="400"></canvas>');
        
                new Chart(document.getElementById('chart-transaksi-user'),{
                    type: 'bar',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraph,
                            backgroundColor: '#CBCBCB',
                            borderColor: '#CBCBCB',
                            hoverBackgroundColor: '#0472B9',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                    }
                })
            })
        
             $('#grafikTransaksiUser').show();
        });
        $("#dropdownMenuStatusTransaksiUser a").click(function() {
            var selected = $(this).text();
        
            $('#dropdownMenuStatusTransaksiUserValue').text(selected);
            $('#grafikStatusTrxUser').hide();
            $('#grafikStatusTrxUser').empty();
            var period = encodeURIComponent(window.btoa(selected));
            ajax.getData('grafik-status-trx-institusi','post', {period:period}, function(data){
                var totalSuccess = 0;
                var totalGagal = 0;
                var dataLabel = [];
                var dataGraphPaid = [];
                var dataGraphExpired = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraphPaid.push(data.data[key]['paid'])
                    dataGraphExpired.push(data.data[key]['expired'])
        
                    totalSuccess = totalSuccess + data.data[key]['paid'];
                    totalGagal = totalGagal + data.data[key]['expired'];
                })
                $('#legendTotalSuccess').html(totalSuccess);
                $('#legendTotalGagal').html(totalGagal);
                $('#grafikStatusTrxUser').append('<canvas id="chart-status-transaksi-user" width="400" height="400"></canvas>');
        
                new Chart(document.getElementById('chart-status-transaksi-user'),{
                    type: 'line',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraphPaid,
                            fill: false,
                            backgroundColor: '#0472B9',
                            borderColor: '#0472B9',
                        },{
                            label: '',
                            data: dataGraphExpired,
                            fill: false,
                            backgroundColor: '#EB5757',
                            borderColor: '#EB5757',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                        elements: {
                            point:{
                                radius: 0
                            }
                        },
                    }
                })
            })
        
            $('#grafikStatusTrxUser').show();
        });
        $("#dropdownMenuPemasukanUser a").click(function() {
            var selected = $(this).text();
        
            $('#dropdownMenuPemasukanUserValue').text(selected);
            $('#grafikPemasukanUser').hide();
            $('#grafikPemasukanUser').empty();
            var period = encodeURIComponent(window.btoa(selected));
            ajax.getData('grafik-income-institusi','post', {period:period}, function(data){
                var total = 0;
                var dataLabel = [];
                var dataGraph = [];
                
                Object.keys(data.data).forEach((key, index) => {
                    dataLabel.push(key)
                    dataGraph.push(data.data[key])
        
                    total = total + data.data[key];
                })
                var rupiah = '';
                var angkarev = total.toString().split('').reverse().join('');
                for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
                $('#legendTotalIncome').html(rupiah.split('',rupiah.length-1).reverse().join(''));
                $('#grafikPemasukanUser').append('<canvas id="chart-pemasukan-user" width="400" height="400"></canvas>');
        
                new Chart(document.getElementById('chart-pemasukan-user'),{
                    type: 'bar',
                    data: {
                        labels: dataLabel,
                        datasets: [{
                            label: '',
                            data: dataGraph,
                            backgroundColor: '#CBCBCB',
                            borderColor: '#CBCBCB',
                            hoverBackgroundColor: '#0472B9',
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        responsive: true,
                        legend: {
                            position : 'bottom',
                            labels: {
                                boxWidth: 10,
                                usePointStyle: true,
                            },
                            display: false
                        },
                    }
                })
            })
        
            $('#grafikPemasukanUser').show();
        });
    },
    randomColor:function(){

      var length = 6;
      var chars = '0123456789ABCDEF';
      var hex = '#';
      while(length--) hex += chars[(Math.random() * 16) | 0];
      return hex;
    },
}

// Chart dashboard admin
if($('#dashboard_admin').length) {
    Highcharts.chart('chart-pengajuan-upgrade-account', {
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2017'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: [{
            name: '',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500,
                    maxHeight: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

    Highcharts.chart('chart-income', {
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2017'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: [{
            name: '',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500,
                    maxHeight: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

    Highcharts.chart('chart-register-baru', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

    Highcharts.chart('chart-transaksi', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

    Highcharts.chart('chart-transaksi-institusi', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

    Highcharts.chart('chart-income-institusi', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });
}

// Chart dashboard user
// if($('#dashboard_user').length) {
//     new Chart(document.getElementById('chart-transaksi-user'),{
//         type: 'bar',
//         data: {
//             labels: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6'],
//             datasets: [{
//                 label: '',
//                 data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB'
//                 ],
//                 borderWidth: 1,
//                 hoverBackgroundColor: [
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9'
//                 ],
//             }]
//         },
//         options: {
//             scales: {
//                 xAxes: [{
//                     gridLines: {
//                         color: "rgba(0, 0, 0, 0)",
//                     },
//                     ticks: {
//                         display: false
//                     }
//                 }],
//                 yAxes: [{
//                     gridLines: {
//                         color: "rgba(0, 0, 0, 0)",
//                     },
//                     ticks: {
//                         display: false
//                     }
//                 }],
//             },
//             responsive: true,
//             legend: {
//                 position : 'bottom',
//                 labels: {
//                     boxWidth: 10,
//                     usePointStyle: true,
//                 }
//             },
//         }
//     })
// }
