Meteor.startup(function () {
	// Set up admin credentials
	Meteor.users.update('ovu5ou6mxB8LjLmMM', {$set: {is_admin: true}});
	Meteor.users.update('fhDvGjhhrESaKxvs8', {$set: {is_admin: true}});

	if (Posts.find().count() < 100) {
		load_data();
	}
});