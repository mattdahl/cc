Meteor.startup(function () {
	Session.set('current_page', 'latest');
	$('#latest').css('font-size', '22px');
});

Template.post_list.posts = function () {
	switch (Session.get('current_page')) {
		case 'top':	return Posts.find({}, {sort: {likes: -1, post_number: -1}}); break;
		case 'latest': return Posts.find({}, {sort: {post_number: -1}}); break;
		case 'starred': return Posts.find({was_starred_by: {$in: [Meteor.userId()]}}, {sort: {post_number: -1}}); break;
	}
};

Template.moderator_view.posts = function () {
	return Posts.find({is_approved: false});
};