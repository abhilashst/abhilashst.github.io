function calculateEMI() {
	
var Princi = $("#la_value").html();
var n = $("#nm_value").html();
var r = $("#roi_value").html();
var t = Math.floor(n/12); // Quarterly

var temp =(r/100);
	var amount = Princi*(1+temp*t);
        var Interest= amount-Princi;
amount = parseFloat(amount).toFixed(0);
	Interest  = parseFloat(Interest).toFixed(0);

$("#tbl_de").html(Princi);
$("#tbl_full").html(amount);
$("#tbl_int").html(Interest);
		
		
	 			
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
