Template.header.events = {
	'click span#present_submit_dialog': function (event, template) {
		$('#submit_dialog').show();
		$('#blk_background').show();
	},
	'click span#latest': function (event, template) {
		Session.set('current_page', 'latest');

		$('#latest').css('background-color', '#b1b1b1');
		$('#top').css('background-color', 'transparent');
		$('#starred').css('background-color', 'transparent');
	},
	'click span#top': function (event, template) {
		Session.set('current_page', 'top');

		$('#latest').css('background-color', 'transparent');
		$('#top').css('background-color', '#b1b1b1');
		$('#starred').css('background-color', 'transparent');
	},
	'click span#starred': function (event, template) {
		Session.set('current_page', 'starred');

		$('#latest').css('background-color', 'transparent');
		$('#top').css('background-color', 'transparent');
		$('#starred').css('background-color', '#b1b1b1');
	},
	'click span#present_moderator_view': function (event, template) {
		Session.set('current_page', 'moderator_view');
		$('#post_container').hide();
		$('#moderator_view').show();
	}
};

Template.submit_dialog.events = {
	'click div.submit': function (event, template) {
		if (!template.find('#submission_body').value.length) {
			alert('You cannot send an empty confession!');
			return false;
		}
		Posts.insert({
			post_number: Posts.find().count() + 1,
			body: template.find('#submission_body').value,
			is_approved: false,
			was_liked_by: [],
			likes: 0,
			timestamp: (new Date()).toString().substring(0, 21),
			comments: [],
			content_warnings: [],
			was_starred_by: [],
			flagged_words: filter_flagged_words(template.find('#submission_body').value)
		});

		$('#submit_dialog').hide();
		$('#blk_background').hide();

		template.find('#submission_body').value = '';
	},
	'click div.exit_button': function(event,template) {
		$('#submit_dialog').hide();
		$('#blk_background').hide();
	}
};

Template.post.events = {
	'click div.like': function (event, template) {
		if (!Meteor.user()) {
			alert('You must be logged in to use this feature!');
			return false;
		}
		if (!_.contains(this.was_liked_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$push: {was_liked_by: Meteor.user()._id},
				$inc: {likes: 1}
			});
		}
	},
	'click div.unlike': function (event, template) {
		if (_.contains(this.was_liked_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$pull: {was_liked_by: Meteor.user()._id},
				$inc: {likes: -1}
			});
		}
	},
	'click div.comment': function (event, template) {
		if (!Meteor.user()) {
			alert('You must be logged in to use this feature!');
			return false;
		}

		if (!template.find('.comment_input').value.length) {
			alert('You must comment in order to post a comment!');
			return false;
		}

		var new_comment = {
			body: template.find('.comment_input').value,
			timestamp: (new Date()).toString().substring(0, 21),
			user_id: Meteor.user()._id,
			username: Meteor.user().profile.name
		};

		Posts.update(this._id, {$push: {comments: new_comment}});

		template.find('.comment_input').value = '';
	},
	'click img.unstarred': function (event, template) {
		if (!Meteor.user()) {
			alert('You must be logged in to use this feature!');
			return false;
		}
		if (!_.contains(this.was_starred_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$push: {was_starred_by: Meteor.user()._id}
			});
		}
	},
	'click img.starred': function (event, template) {
		if (_.contains(this.was_starred_by, Meteor.user()._id)) {
			Posts.update(this._id, {
				$pull: {was_starred_by: Meteor.user()._id}
			});
		}
	},
	'click span.seemore': function (event, template) {
		template.findAll('.comment_details').each(function (index, element) {
			$(element).show();
		});
		$(template.find('.seemore')).hide();
	},
	'click .content_warning_shield': function (event, template) {
		$(template.find('.content_warning_shield')).hide();
		$(template.find('.post_content')).show();
	},
	'keypress input.comment_input': function (evt, template) {
		if (!Meteor.user()) {
			alert('You must be logged in to use this feature!');
			return false;
		}

    	if (evt.which === 13) {
    		if (!template.find('.comment_input').value.length) {
			alert('You must comment in order to post a comment!');
			return false;
		}
		var new_comment = {
			body: template.find('.comment_input').value,
			timestamp: (new Date()).toString().substring(0, 21),
			user_id: Meteor.user()._id,
			username: Meteor.user().profile.name
		};

		Posts.update(this._id, {$push: {comments: new_comment}});

		template.find('.comment_input').value = '';

    }
  }
};

Template.moderator_post.events = {
	'click div.approve': function (event, template) {
		Posts.update(this._id, {
			$set: {is_approved: true}
		});

	},
	'click div.reject': function (event, template) {
		Posts.remove(this._id);
	}
};

