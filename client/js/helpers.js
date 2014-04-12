Template.post.has_liked = function () {
	if (!_.contains(this.was_liked_by, Meteor.userId())) {
		return 'inline-block';
	} else {
		return 'none';
	}
};

Template.post.has_unliked = function () {
	if (_.contains(this.was_liked_by, Meteor.userId())) {
		return 'inline-block';
	} else {
		return 'none';
	}
};

Template.post.has_starred = function () {
	if (_.contains(this.was_starred_by, Meteor.userId())) {
		return 'inline-block';
	} else {
		return 'none';
	}
};

Template.post.has_unstarred = function () {
	if (!_.contains(this.was_starred_by, Meteor.userId())) {
		return 'inline-block';
	} else {
		return 'none';
	}
};

Template.post.rendered = function () {
	var max_comment_height = 150;
	$(this.firstNode).find('.comment_details').each(function (index, element) {
		max_comment_height -= element.clientHeight;

		if (max_comment_height < 0) {
			$(element).hide();
		}

		$(this).parent().find('.seemore').show();
	});
};