export default {
	getSidebarCurData: (sidebarData, location) => {
		let pathname = location.pathname;
		pathname = pathname.charAt(0) == '/' ? pathname : '/' + pathname;
		for (let i = 0; i < sidebarData.length; i++) {
			for (let j = 0; j < sidebarData[i].children.length; j++) {
				let menuItem = sidebarData[i].children[j];
				if (pathname == menuItem.url) {
					return {
						parent   : sidebarData[i],
						menuItem : menuItem
					};
				}
			}
		}
	}
};