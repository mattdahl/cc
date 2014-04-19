Meteor.startup(function () {
	// Set up admin credentials
	Meteor.users.update('okPjs3HjPwMRb2Ghk', {$set: {is_admin: true}});

	if (Posts.find().count() < 100) {
		load_data();
	}
});