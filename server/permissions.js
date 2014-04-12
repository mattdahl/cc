Meteor.startup(function () {
	Meteor.users.update('YL3fXgx9fCAre4bLh', {$set: {is_admin: true}});
	Meteor.users.update('MQJLRhNPfNRCRJyrc', {$set: {is_admin: true}});
});