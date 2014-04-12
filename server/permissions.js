Meteor.startup(function () {
	Meteor.users.update('6QNzgS897HxsymEPc', {$set: {is_admin: true}});
});