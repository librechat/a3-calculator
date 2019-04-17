toggle_alert = function(scope, flag, text){
	var alert = angular.element(document.getElementById('arrangealert'));	
	if(!flag) {
		scope.warning_msg = text;
		console.log("warning: "+scope.warning_msg);
		alert.fadeIn();
	}
	else {
		scope.warning_msg = "";
		alert.fadeOut();
	}
}
clear_selection = function(prefix, index){
	var select = angular.element(document.getElementById(prefix+'-select-'+index));
	select.prop('selectedIndex', 0);
}
loading_slots = function(prefix, index, loading){
	var slots = document.getElementsByName(prefix+'-data-'+index);
	var opacity = (loading)? 0.5: 1;
	for(var i=0; i<slots.length; i++){
		var slot = angular.element(slots[i]);
		slot.fadeTo('normal', opacity);
	}
}
loading_screen = function(activate){
	var loading = angular.element(document.getElementById('loading'));
	if(activate) {
		loading.modal('show');
		loading.data('bs.modal').options.backdrop = 'static';
	}
	else loading.modal('hide');
}

module.exports = {
	toggle_alert,
	clear_selection,
	loading_slots,
	loading_screen
};