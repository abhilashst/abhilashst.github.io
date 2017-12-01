function calculateEMI() {
	
	var monthlyInstallment = $("#la_value").html();
var numberOfMonths = $("#nm_value").html();
var rateOfInterest = $("#roi_value").html();

var frequency = Math.floor(numberOfMonths/3); // Quarterly
var accumulateMonthlyAmount = parseInt(monthlyInstallment) * ((Math.pow(rateOfInterest / 400 + 1, frequency) - 1) / (1-(Math.pow(rateOfInterest / 400 + 1,(-1/3)))));
var finalInterestGain = accumulateMonthlyAmount - monthlyInstallment * numberOfMonths;

var depositedAmount = monthlyInstallment * numberOfMonths;
$("#tbl_de").html( depositedAmount.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
$("#tbl_full").html(accumulateMonthlyAmount.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
$("#tbl_int").html(finalInterestGain.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		
		var chart = new Highcharts.Chart({
				 
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
						    renderTo: 'container'

						},
						tooltip: {
							//pointFormat: '{series.name}: <b>{point.value}%</b>'
						},
	title:{
    text:''
},
	credits: {
    enabled: false
  },
						plotOptions: {
							pie: {
								allowPointSelect: true,
								showInLegend:true,
								cursor: 'pointer',
								dataLabels: {
								    enabled: false,
									color: '#000000',
									connectorColor: '#000000',
									format: '<b>{point.name}</b>: {point.percentage:.1f} %'
								}
							}
						},
						series: [{
							type: 'pie',
							name: 'Amount',
							data: [
								['Principal',   eval(depositedAmount.toFixed(0))],
								['Interest',     eval(finalInterestGain.toFixed(0))]
							]
						}]
					});		
	 			
}

function setUpHandlers() {
	
  var laSlider = new Slider("#la");
  var nmSlider = new Slider("#nm");
  var roiSlider = new Slider("#roi");

  laSlider.on("slide", function(data) {
    $("#la_value").html(data);
    calculateEMI();
  });

  nmSlider.on("slide", function(data) {
    $("#nm_value").html(data);
    calculateEMI();
  });

  roiSlider.on("slide", function(data) {
    $("#roi_value").html(data);
    calculateEMI();
  });

  calculateEMI();
}

function defer(method) {
  if (window.jQuery && window.$ && typeof window.Slider === "function") {
    method();
  } else {
    setTimeout(function() {
      defer(method);
    }, 50);
  }
}

defer(setUpHandlers);
