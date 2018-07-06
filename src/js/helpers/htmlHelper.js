(function() {
	'use strict';

	var HtmlHelper = {

		buildTreeHtml: function(oTreeNodeObject) {
			var childItems = oTreeNodeObject.getChildrenAsArray();

			if (childItems.length === 0) {
				return '';
			}

			var treeHtml = '<ul>';

			childItems.forEach(function(childItem, index) {
				var data = childItem.data;
				var className = '';
				var content;

				if (data.isLeaf) {
					className += 'isLeaf ';
				}

				if (data.commentCount > 0) {
					className += 'hasComment ';
				}

				if (data.bIsReviewed) {
					className += 'isReviewed ';
				}

				treeHtml += '<li class="' + className
					+ '" data-file-identifier="' + data.link
					+ '" data-file-name="' + data.name
					+ (data.isLeaf ? '" data-is-reviewed="' + data.bIsReviewed : '')
					+ '">';

				if (data.isLeaf) {
					content =
						HtmlHelper.buildFileIconHtml(data.bIsReviewed) + '&nbsp;' +
						HtmlHelper.buildLozengeFileStatusHtml(data.fileStatus) + '&nbsp;' +
						data.name + '&nbsp' +
						HtmlHelper.buildCommentCountBadgeHtml(data.commentCount);

					treeHtml += '<a href="#" title="' + data.name + '">' + content + '</a>';
				} else {
					content =
						HtmlHelper.buildFolderOpenIconHtml() + '&nbsp;' +
						data.name;

					treeHtml += '<a href="#" title="' + data.name + '">' + content + '</a>';
				}

				// Build child nodes recursively
				treeHtml += HtmlHelper.buildTreeHtml(childItem);

				treeHtml += '</li>';
			});

			treeHtml += '</ul>';

			return treeHtml;
		},

		buildTreeAsSidebarHtml: function() {

		},

		buildDiffTreeActionsPanelHtml: function(bUseCompactMode) {
			bUseCompactMode = bUseCompactMode || false;
			var manifestData = chrome.runtime.getManifest();

			return '<div class="dt-actions">' +
						'<div class="dt-action-group">' +
							//'<a id="btnMinimizeDiffTree" href="#" class="dt-action-item"><span class="aui-icon aui-icon-small aui-iconfont-arrows-left" title="Minimize diff tree">Minimize diff tree</span></a>' +
							'<a id="btnRemoveDiffTree" href="#" class="dt-action-item"><span class="fa fa-window-close" title="Remove diff tree"></span></a>' +
						'</div>' +
						'<div class="dt-action-group dt-main-actions">' +
							'<a id="btnCompactEmptyFoldersToggle" href="#" class="dt-action-item" title="' + (bUseCompactMode ? 'Uncompact empty folders' : 'Compact empty folders') + '"><span class="fa ' + (bUseCompactMode ? 'fa-compress' : 'fa-expand') + '"></span></a>' +
							'<a id="btnCollapseAllFolders" href="#" class="dt-action-item"><span class="fa fa-arrow-up" title="Collapse all folders"></span></a>' +
							'<a id="btnExpandAllFolders" href="#" class="dt-action-item"><span class="fa fa-arrow-down" title="Expand all folders"></span></a>' +
						'</div>' +
						'<div style="padding: 10px; width: 100%;">' +
							'<div class="searchBox">' +
								'<input type="text" id="searchBox" placeholder="Search"/>' +
								'<span id="clearSearch" class="aui-icon aui-icon-small aui-iconfont-remove-label" />' +
							'</div>' +
						'</div>' +
				'</div>';
		},

		buildLozengeFileStatusHtml: function(iFileStatus) {
			var sResult = '';
			switch (iFileStatus) {
			case 0: //file added
				sResult = '<span class="badge badge-pill" original-title="Added">A</span>';
				break;
			case 1: //file modified
				sResult = '<span class="badge badge-pill" original-title="Modified">M</span>';
				break;
			case 2: //file deleted
				sResult = '<span class="badge badge-pill" original-title="Deleted">D</span>';
				break;
			}

			return sResult;
		},

		buildCommentCountBadgeHtml: function(iCount) {
			if (iCount && iCount > 0) {
				return '<span class="fa-stack fa-1x">' +
						'<i class="fa fa-comment-o fa-stack-1x" style="font-size:1.25em"></i>' +
						'<strong class="fa-stack-1x" style="font-size:.7em">'+ 
							iCount + 
						'</strong>' +
					'</span>';
			}

			return '';
		},

		buildFileIconHtml: function(bIsReviewed) {
			var title = HtmlHelper.getMarkAsReviewedCheckboxTitle(bIsReviewed);
			return '<span class="jstree-node-icon reviewed-checkbox fa fa-circle-o fileIcon" title="' + title + '"></span>';
		},

		buildFolderOpenIconHtml: function() {
			return '<span class="jstree-node-icon fa fa-folder-open folderIcon" style="color:#0075B1;"></span>';
		},

		buildFolderCloseIconHtml: function() {
			return '<span class="jstree-node-icon fa fa-folder folderIcon" style="color:#0075B1;"></span>';
		},

		getMarkAsReviewedCheckboxTitle: function(bIsReviewed) {
			return bIsReviewed ? 'Click to unmark as reviewed' : 'Click to mark as reviewed';
		}
	};

	// Export via namespace
	BDT.Helpers.HtmlHelper = HtmlHelper;

})();