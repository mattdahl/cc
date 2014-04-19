Posts.allow({
	insert: function (user_id, doc) { // Anyone can submit a post if it's not mangled
		if (_.isEqual(doc, _.pick(doc, '_id', 'body', 'comments', 'content_warnings', 'flagged_words', 'is_approved', 'likes', 'post_number', 'timestamp', 'was_liked_by', 'was_starred_by'))) {
			return true;
		}
	},
	update: function (user_id, doc, field_names, modifier) {
		// If the user is an admin, allow them to update anything
		if (Meteor.user().is_admin) {
			return true;
		}
		else {
			// Regular users can only modify the was_liked_by field, the was_starred_by field and the commet field, and only one at a time
			switch (field_names[0]) {
				case 'was_liked_by':
					if (field_names[1] != 'likes') {
						return false;
					}
					if (field_names.length > 2) {
						return false;
					}
					// #click div.like
					if ((!_.contains(doc.was_liked_by, user_id) && modifier.$push.was_liked_by) && modifier.$inc.likes === 1) {
						return true;
					}
					// #click div.unlike
					else if ((_.contains(doc.was_liked_by, user_id) && modifier.$pull.was_liked_by) && modifier.$inc.likes === -1) {
						return true;
					}
					else {
						return false;
					}
					break;
				case 'was_starred_by':
					if (field_names.length > 1) {
						return false;
					}
					// #click img.unstarred
					if (!_.contains(doc.was_starred_by, user_id) && modifier.$push.was_starred_by === user_id) {
						return true;
					}
					// #click img.starred
					else if (_.contains(doc.was_starred_by, user_id) && modifier.$pull.was_starred_by === user_id) {
						return true;
					}
					else {
						return false;
					}
					break;
				case 'comment':
					if (field_names.length > 1) {
						return false;
					}
					if (modifier.$push.comments.user_id === user_id && modifier.$push.comments.username === Meteor.user().profile.name) {
						return true;
					}
					else {
						return false;
					}
				default:
					return false;
			}
		}
	},
	remove: function (user_id, doc) {
		return Meteor.user().is_admin;
	}
});