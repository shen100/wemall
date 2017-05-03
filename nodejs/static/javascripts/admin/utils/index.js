export default {
	getSidebarCurData: (sidebarData, location) => {
		let pathname = location.pathname;
		pathname = pathname.charAt(0) == '/' ? pathname : '/' + pathname;
		for (let i = 0; i < sidebarData.length; i++) {
			for (let j = 0; j < sidebarData[i].children.length; j++) {
				let menuItem = sidebarData[i].children[j];
				var urls = menuItem.url;
				if (!urls) {
					continue;
				}
				if (typeof urls == 'string') {
					urls = [urls];
				}
				for (let k = 0; k < urls.length; k++) {
					if (pathname === urls[k] || typeof urls[k] != 'string' && pathname.match(urls[k])) {
						return {
							parent   : sidebarData[i],
							menuItem : {
								id    : menuItem.id,
								title : menuItem.title,
								url   : urls[0]
							}
						};
					}
				}
			}
		}
	},

	parseCategoryTree: function(nodes) {
		var copyList = nodes.slice();
		var root = {
			id       : '',
			parentId : '0',
			parent   : null,
			key      : '',
			value    : '',
			label    : '',
			children : []
		};
		var stores = [];
		stores.push(root);
		while (copyList.length) {
			var tree = stores[0];
			for (var i = copyList.length - 1; i >= 0; i--) {
				if (copyList[i].parentId === tree.id || (!copyList[i].parentId && tree === root)) {
					var node = {
						id       : copyList[i].id,
						parentId : copyList[i].parentId,
						parent   : tree,
						key      : copyList[i].parentId + '-' + copyList[i].id,
						value    : copyList[i].parentId + '-' + copyList[i].id,
						label    : copyList[i].name,
						children : []
					};
					stores.push(node);
					tree.children.push(node);
					copyList.splice(i, 1);
				}
			}
			stores.splice(0, 1);
		}
		return root.children;
	}
};