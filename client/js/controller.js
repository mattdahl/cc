Meteor.startup(function () {
	Session.set('current_page', 'latest');
	/*$('#latest').css('font-size', '22px');*/
	$('#top').parent().css('background-color', 'transparent');
	$('#starred').parent().css('background-color', 'transparent');
	$('#latest').css('padding','10px');
	$('#top').css('padding','10px');
	$('#starred').css('padding','10px');
});

Template.post_list.posts = function (argument) {
	switch (Session.get('current_page')) {
		case 'top':	return Posts.find({}, {sort: {likes: -1, post_number: -1}}); break;
		case 'latest': return Posts.find({}, {sort: {post_number: -1}}); break;
		case 'starred': return Posts.find({was_starred_by: {$in: [Meteor.userId()]}}, {sort: {post_number: -1}}); break;
	}
};