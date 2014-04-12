Meteor.publish('users', function () {
	return Meteor.users.find({_id: this.userId}, {fields: {'is_admin': 1,}});
});

Meteor.publish('posts', function () {
	return Posts.find();
});