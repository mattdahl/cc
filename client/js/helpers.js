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

/*Template.post.rendered = function () {
	if (_.comment_details(this.data.was_liked_by))
}*/