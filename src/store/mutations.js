import Vue from 'vue';
import orderMutations from '@/store/mutations/order';
import geoMutations from '@/store/mutations/geo';
import profileMutations from '@/store/mutations/profile';

function clearUser(state) {
	Vue.set(state, 'token', null);
	Vue.set(state, 'user', null);
}

function setToken(state, token) {
	Vue.set(state, 'token', token);
}

function setUser(state, user) {
	Vue.set(state, 'user', user);
}

function showSnackBar(state, snackbar) {
	Vue.set(state.appConfig, 'snackbar', { ...snackbar });
}

function toggleLoading(state, value) {
	Vue.set(state.appConfig, 'isLoading', value);
}

function UPDATE_POLL_PROGRESS(state, number) {
	Vue.set(state.pollData, 'progress', state.pollData.progress + number);
}

function SET_PRODUCTS(state, products) {
	Vue.set(state.products, 'list', products);
}

function SET_PRODUCT_TO_BUY(state, product) {
	const newProduct = { ...product };
	newProduct.quantity = 1;
	Vue.set(state.order, 'products', state.order.products.concat({ ...newProduct }));
}

function SET_ORDER_ID(state, id) {
	Vue.set(state.order, 'id', id);
}

function UPDATE_FLAG_ADD_VOUCHER(state, flag) {
	Vue.set(state.profile, 'flagAddVoucher', flag);
}

function SET_CATEGORIES(state, categories) {
	Vue.set(state, 'categories', categories);
}

function SET_ORDER_TOTAL(state, total) {
	Vue.set(state.order, 'total', total);
}

function UPDATE_PRODUCTS_SELECTED(state, products) {
	if (products) {
		localStorage.setItem('ecommerce::product-select', JSON.stringify(products));
		Vue.set(state.order, 'products', [...products]);
	} else {
		localStorage.removeItem('ecommerce::product-select');
		Vue.set(state.order, 'products', []);
	}
}

function SET_WAREHOUSES(state, warehouses) {
	Vue.set(state, 'warehouses', state.warehouses.concat(warehouses));
}

function SET_DIRECTIONS(state, directions) {
	const addressDefault = { id: 0, addressLine1: 'Nueva dirección', name: 'Nueva dirección' };
	Vue.set(state, 'directions', [].concat(addressDefault, directions));
}

function UPDATE_FILTERS(state, filters) {
	Vue.set(state, 'filters', filters);
}

function SET_CURRENCY_DEFAULT(state, currency) {
	Vue.set(state, 'currencyDefault', currency);
}

function SET_BANNERS(state, banners) {
	Vue.set(state, 'banners', banners);
}

function SET_COMMERCE_DATA(state, data) {
	Vue.set(state, 'commerce', data);
}

function UPDATE_PRODUCT_PAGE(state) {
	const newPage = state.products.params.page + 1;
	Vue.set(state.products.params, 'page', newPage);
}

function PAGE_ONE(state) {
	Vue.set(state.products.params, 'page', 1);
}

function LAST_PAGE(state, headers) {
	const totalPage = headers['x-last-page'];
	Vue.set(state.products, 'lastPage', Number(totalPage));
}

function RESET_PRODUCTS_ARRAY(state) {
	Vue.set(state.products, 'list', []);
}

function SET_PRODUCT_FILTER(state, filters) {
	Vue.set(state.products.params, 'filters', filters);
}

function ADD_ONE_IN_SERVICE_COUNTER(state, service) {
	state.appConfig.loadingCounter.push(service);
}

function MINUS_ONE_IN_SERVICE_COUNTER(state, index) {
	const current = state.appConfig.loadingCounter;
	current.splice(index, 1);
	Vue.set(state.appConfig, 'loadingCounter', current);
}

function UPDATE_WINDOW_LOADED(state, flag) {
	Vue.set(state, 'windowLoaded', flag);
}

function SET_ECOMMERCE_COLORS(state, theme) {
	const { primary, secondary, border, title, subtitle } = theme;
	const colors = { primary, secondary, border, title, subtitle };
	Vue.set(state, 'colors', colors);
}

function RESETING_COUNTER(state) {
	Vue.set(state.appConfig, 'loadingCounter', []);
}

function SET_PRODUCT_ID_TO_RATE(state, productId) {
	Vue.set(state, 'productIdToRate', productId);
}

function SET_RELATED_PRODUCTS(state, relatedProducts) {
	Vue.set(state.products, 'relateds', relatedProducts);
}

const methods = {
	ADD_ONE_IN_SERVICE_COUNTER,
	clearUser,
	...geoMutations,
	...orderMutations,
	...profileMutations,
	PAGE_ONE,
	setToken,
	setUser,
	showSnackBar,
	toggleLoading,
	RESET_PRODUCTS_ARRAY,
	LAST_PAGE,
	MINUS_ONE_IN_SERVICE_COUNTER,
	SET_BANNERS,
	SET_COMMERCE_DATA,
	SET_CURRENCY_DEFAULT,
	SET_DIRECTIONS,
	SET_ECOMMERCE_COLORS,
	SET_ORDER_ID,
	SET_PRODUCTS,
	SET_PRODUCT_FILTER,
	SET_PRODUCT_TO_BUY,
	SET_WAREHOUSES,
	UPDATE_FLAG_ADD_VOUCHER,
	UPDATE_POLL_PROGRESS,
	SET_CATEGORIES,
	SET_ORDER_TOTAL,
	SET_PRODUCT_ID_TO_RATE,
	SET_RELATED_PRODUCTS,
	RESETING_COUNTER,
	UPDATE_FILTERS,
	UPDATE_PRODUCT_PAGE,
	UPDATE_PRODUCTS_SELECTED,
	UPDATE_WINDOW_LOADED,
};

export default methods;
