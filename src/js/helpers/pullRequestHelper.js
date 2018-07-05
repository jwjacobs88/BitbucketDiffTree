(function(PullRequestModel) {
	'use strict';

	var PullRequestHelper = {

		getPullRequestMetadata: function() {
			var $body = $('body');
			var oCurrentUser = $('.profile-link').data('user');
			var oCurrentRepo = $('input[name="project_id"]').data('project-path');
			var oCurrentPr = $('.merge-request').data('url');

			var pullRequestModel = new PullRequestModel();
			pullRequestModel.userId = oCurrentUser;
			pullRequestModel.pullRequestId = oCurrentPr;
			pullRequestModel.repoFullSlug = oCurrentRepo;

			return pullRequestModel;
		},

	};

	// Export via namespace
	BDT.Helpers.PullRequestHelper = PullRequestHelper;

})(BDT.Models.PullRequestModel);