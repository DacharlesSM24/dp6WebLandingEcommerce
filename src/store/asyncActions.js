const asyncActions = {
	LOAD_PRODUCTS: async ({ commit, state }, { context }) => {
		const { params } = state.products;
		const request = [];
		if (context.$store.state.token) {
			request.push(context.$httpProducts.get('products/favorites', { params }));
		} else {
			request.push(context.$httpProducts.get('products-public', { params }));
		}
		const [{ data: products }] = await Promise.all(request);
		commit('SET_PRODUCTS', products);
	},
	SET_FAVORITE_FLAG: async (state, { context, product }) => {
		const url = `products/favorite/${context.product.id}`;
		const body = {
			isFavorite: product.flagFavorite,
		};
		await this.$httpQtc.post(url, body);
	},
	CREATE_ORDER: async ({ commit }, { context, body }) => {
		const url = 'orders';
		const { data: order } = await context.$httpSales.post(url, body);
		commit('SET_ORDER_ID', order.id);
		commit('SET_ORDER_TOTAL', order.total);
	},
	LOAD_DEPARTMENTS: async ({ commit }, context) => {
		const url = 'province';
		const { data: departments } = await context.$httpSales.get(url);
		commit('SET_DEPARTMENTS', departments);
	},
	LOAD_DISTRICTS: async ({ commit }, { context, departmentId }) => {
		const url = `cities/${departmentId}`;
		const { data: districts } = await context.$httpSales.get(url);
		commit('SET_DISTRICTS', districts);
	},
	LOAD_PROVINCES: async ({ commit }, { context, districtId }) => {
		const url = `parish/${districtId}`;
		const { data: parish } = await context.$httpSales.get(url);
		commit('SET_PROVINCES', parish);
	},
	LOAD_CATEGORIES: async ({ commit }, { context }) => {
		let { data: response } = await context.$httpProductsPublic.get('e-categories-public');
		response = response.map((r) => {
			const newCategory = { ...r };
			newCategory.select = false;
			newCategory.hover = false;
			return newCategory;
		});
		commit('SET_CATEGORIES', response);
	},
};

export default asyncActions;
