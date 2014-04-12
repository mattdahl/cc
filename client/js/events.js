Template.header.events = {
	'click span#present_submit_dialog': function (event, template) {
		$('#submit_dialog').show();
	}
};

Template.submit_dialog.events = {
	'click div.submit': function (event, template) {
		$('#submit_dialog').hide();
	}
};