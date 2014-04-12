Template.header.events = {
	'click span#present_submit_dialog': function (event, template) {
		$('#submit_dialog').show();
	}
};

Template.submit_dialog.events = {
	'click div.submit': function (event, template) {
		Posts.insert({
			post_number: Posts.find().count(),
			body: template.find('#submission_body').value,
			is_approved: false,
			was_liked_by: [],
			timestamp: (new Date()).toString().substring(0, 21),
			comments: [],
			content_warnings: []
		});

		$('#submit_dialog').hide();
	}
};