(function() {
	'use strict';

	var HashingHelper = {

		getHash: function(sContent) {
            console.log('MD5 Hash: ', $.md5(sContent))
            return $.md5(sContent);
        }

	};

	// Export via namespace
	BDT.Helpers.HashingHelper = HashingHelper;

})();