Meteor.startup(function () {
	Session.set('current_page', 'latest');
	$('#top').css('background-color', 'transparent');
	$('#starred').css('background-color', 'transparent');
	$('#latest').css('padding','5px 10px');
	$('#top').css('padding','5px 10px');
	$('#starred').css('padding','5px 10px');
	$('#present_submit_dialog').css('padding', '5px 10px');
	$('#present_moderator_view').css('padding', '5px 10px');
	$('#present_submit_dialog').css('padding', '5px 10px');
});

Deps.autorun(function () {
    Meteor.subscribe('users');
    Meteor.subscribe('posts');
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