$(document).ready(function(){
	$(document).on('change','.combo-select',function(){
		var text = $(this).val();

		var combo_input = $(this).next('.combo-input');
		combo_input.val(text);
		combo_input.trigger('input');
	});
});