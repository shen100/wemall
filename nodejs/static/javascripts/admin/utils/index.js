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
		if (options.isFindNodeKey && options.id == '0') {
			return '0';
		}
		while (copyList.length) {
			var tree = stores[0];
			for (var i = copyList.length - 1; i >= 0; i--) {
				if (copyList[i].parentId === tree.id || (!copyList[i].parentId && tree === root)) {
					var key = tree.key + '-' + copyList[i].id;
					if (options.isFindNodeKey && options.id == copyList[i].id) {
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
			var children  = root.children.slice(0);
			root.children = [];
			children.unshift(root);
			return children;
		}
		return root.children;
	},

	parseTreeNodeKey: function(nodes, id) {
		if (!nodes || nodes.length <= 0) {
			throw new Error('树形数组为空，或长度为0');
		}
		return this.parseTree(nodes, {
			isFindNodeKey : true,
			id            : id
		});
	},

	uuid: function() {
	    function s4() {
	        var time  = new Date().getTime();
	        time      = time % 16;
	        time      = time.toString(16);
	        var s     = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        var pos   = parseInt(Math.random() * 4);
	        var sArr  = s.split('');
	        sArr[pos] = time;
	        return sArr.join('');
	    }
	    var timestamp = '' + (new Date().getTime());
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	        s4() + '-' + timestamp.substring(1);
	}
};