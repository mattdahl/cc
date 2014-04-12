Meteor.startup(function () {
	Session.set('current_page', 'latest');
	$('#latest').css('font-size', '22px');
});

Template.post_list.posts = function (argument) {
	switch (Session.get('current_page')) {
		case 'top':	return Posts.find({}, {sort: {likes: -1, post_number: -1}}); break;
		case 'latest': return Posts.find({}, {sort: {post_number: -1, post_number: -1}}); break;
	}
};