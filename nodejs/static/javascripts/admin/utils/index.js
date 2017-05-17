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

	loadJS: function(url, onLoad) {
	    var s    = document.createElement('script');
	    var tag  = document.getElementsByTagName('script')[0];
	    s.async  = true;
	    s.src    = url;
	    s.onload = onLoad;
	    tag.parentNode.insertBefore(s, tag);
	},

	parseTree: function(nodes, options) {
		options = options || {};
		var copyList = nodes.slice();
		console.log(111, options, copyList);
		var root = {
			id       : '0',
			parentId : '0',
			parent   : null,
			key      : '0',
			value    : '0',
			label    : '无',
			children : []
		};
		var stores = [];
		stores.push(root);
		if (options.isFindKey && options.id == '0') {
			return '0';
		}
		while (copyList.length) {
			var tree = stores[0];
			for (var i = copyList.length - 1; i >= 0; i--) {
				if (copyList[i].parentId === tree.id || (!copyList[i].parentId && tree === root)) {
					var key;
					if (options.multiple) {
						key = copyList[i].parentId + '-' + copyList[i].id;
					} else {
						key = tree.key + '-' + copyList[i].id;
					}
					//如果options有id的话，那么表示要得到结点的key
					if (options.isFindKey && options.id == copyList[i].id) {
						console.log('options.id', options.id, copyList[i].id);
						return key;
					}
					var node = {
						id       : copyList[i].id,
						parentId : copyList[i].parentId,
						parent   : tree,
						key      : key,
						value    : key,
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
		if (options.withRoot) {
			var children = root.children.slice(0);
			children.unshift({
				id       : '0',
				parentId : '0',
				parent   : null,
				key      : '0',
				value    : '0',
				label    : '无',
				children : []
			});
			return children;
		}
		return root.children;
	},

	parseTreeNodeKey: function(categories, id) {
		if (!categories || categories.length <= 0) {
			throw new Error('分类列表为空，或长度为0');
		}
		return this.parseTree(categories, {
			isFindKey: true,
			id       : id
		});
	}
};