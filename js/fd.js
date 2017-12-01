function calculateEMI() {
	
var P = $("#la_value").html();
var n = $("#nm_value").html();
var r = $("#roi_value").html();
var t = Math.floor(n/12); // Quarterly

var temp =(r/100);
	var A= P*(1+temp*t);
        I=A-P;


$("#tbl_de").html( P.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
$("#tbl_full").html(A.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
$("#tbl_int").html(I.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		
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
