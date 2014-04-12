Meteor.startup(function () {
	Session.set('current_page', 'top');
	$('#latest').css('font-size', '22px');
});

Template.post_list.posts = function (argument) {
	switch (Session.get('current_page')) {
		case 'top':	return Posts.find({}, {sort: {likes: -1, post_number: -1}}); break;
		case 'latest': return Posts.find({}, {sort: {timestamp: -1, post_number: -1}}); break;
	}
};