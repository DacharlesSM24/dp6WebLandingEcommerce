import lib from '@/shared/lib';

function clearUser(context) {
	context.commit('clearUser');
}

function toggleLoading(context, value) {
	context.commit('toggleLoading', value);
}

function showSnackBar(context, snackbar) {
	const visibleSnackBar = { ...snackbar };
	visibleSnackBar.isVisible = true;
	visibleSnackBar.color = visibleSnackBar.color || 'primary';
	context.commit('showSnackBar', visibleSnackBar);
}

function setToken(context, token) {
	context.commit('setToken', token);
}

function setUser(context, user) {
	const newUser = user;
	newUser.dni = Number(user.dni) ? user.dni : null;
	newUser.typePerson.documentNumber =
			Number(newUser.typePerson.documentNumber) ? newUser.typePerson.documentNumber : null;
	localStorage.setItem('ecommerce::ecommerce-user', JSON.stringify(newUser));
	context.commit('setUser', newUser);
}

function addProductToBuyCar(context, product) {
	const newProduct = product.quantity ? product : lib.setNewProperty('quantity', 1)(product);
	const productsSelected = JSON.parse(localStorage.getItem('ecommerce::product-select')) || [];
	const index = productsSelected.findIndex(
		p => p.id === newProduct.id && p.unitSelected === newProduct.unitSelected,
	);
	if (index > -1) {
		const currentProduct = productsSelected[index];
		const quantity = currentProduct.quantity + newProduct.quantity;
		productsSelected[index].quantity = quantity;
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected);
		context.commit('UPDATE_ORDER_DETAILS_IF_EXIST', productsSelected);
	} else {
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected.concat(newProduct));
		context.commit('UPDATE_ORDER_DETAILS_IF_EXIST', productsSelected.concat(newProduct));
	}
}

function updateProductSelect(context, product) {
	context.commit('UPDATE_PRODUCTS_SELECTED', product);
}

function updateFilters(context, filters) {
	this.commit('UPDATE_FILTERS', filters);
}

function getOrderData({ commit, dispatch }, order) {
	const { customerBill } = order;
	commit('SET_BILL_SELECTION', false);
	if (customerBill) {
		const { address, typePerson: { fullName: rzSocial, documentNumber: ruc } } = customerBill;
		commit('SET_BILLING_DATA', { address, rzSocial, ruc });
		commit('SET_BILL_SELECTION', true);
	}
	commit('SET_ORDER_INFO', { ...order });
	commit('SET_FLAG_PICKUP', order.flagPickUp);
	commit('SET_RESPONSIBLE', order.responsiblePickUp);
	commit('SET_DELIVERY_PLACE', order.customerAddress);
	commit('SET_ORDER_ID', order.id);
	commit('SET_ORDER_TOTAL', order.total);
	commit('SET_ORDER_DETAILS', order.details);
	dispatch('setShippingCostFromOrder', order);
	commit('SET_CUSTOMER_ADDRESS', null);
	commit('SET_ORDER_STATUS', order.orderStateId);
	commit('SET_FLAG_STATUS_ORDER', order.flagStatusOrder);
}

function setShippingCostFromOrder({ commit }, order) {
	const { costShippingFlagTax, costShippingTax, costShippingTaxAmount, costShipping } = order;
	const costShippingObject = {
		flagTax: costShippingFlagTax,
		tax: costShippingTax,
		taxAmount: costShippingTaxAmount,
		price: costShipping - costShippingTaxAmount,

	};
	commit('SET_SHIPPING_COST', costShippingObject.price);
	commit('SET_SHIPPING_COST_OBJECT', costShippingObject);
}

function setShippingCost({ commit }, shippingCost) {
	const { flagTax, tax, taxAmount, price } = shippingCost;
	const costShippingObject = {
		flagTax,
		tax,
		taxAmount,
		price,
	};
	commit('SET_SHIPPING_COST_OBJECT', costShippingObject);
}

function setNoShippingCost({ commit }) {
	const shippingCost = {
		flagTax: false,
		price: 0,
		tax: 0,
		taxAmount: 0,
	};
	commit('SET_SHIPPING_COST_OBJECT', shippingCost);
}

function SET_DEFAULT_VALUES({ commit, dispatch }) {
	localStorage.removeItem('ecommerce-order');
	commit('SET_BILLING_DATA', null);
	commit('SET_ORDER_INFO', null);
	commit('SET_CUSTOMER_ADDRESS', null);
	commit('SET_FLAG_PICKUP', 1);
	commit('SET_RESPONSIBLE', null);
	commit('SET_DELIVERY_PLACE', null);
	commit('SET_ORDER_ID', null);
	commit('SET_ORDER_TOTAL', null);
	commit('SET_ORDER_DETAILS', []);
	dispatch('setNoShippingCost');
	commit('SET_ORDER_STATUS', null);
	commit('SET_FLAG_STATUS_ORDER', null);
}

function UPDATE_ORDER_FROM_LOCAL_STORAGE({ commit }, orderInfo) {
	commit('SET_ORDER_INFO', { ...orderInfo } || null);
}

function DEFAULT_USER({ commit }) {
	const user = {
		email: '',
		logo: '/static/img/user.svg',
		profileImage: '',
		username: '',
	};
	commit('setUser', user);
}

function SET_WAY_PAYMENT({ commit }, context) {
	const waysPayment = context.getLocalStorage('ecommerce::ecommerce-data').wayPaymentCommerce;
	commit('SET_WAYS_PAYMENT', waysPayment);
}

function SET_BANK_ACCOUNTS({ commit }, context) {
	const bankAccounts = context.getLocalStorage('ecommerce::ecommerce-data').bankAccountsRelated;
	commit('SET_BANK_ACCOUNT_RELA', bankAccounts);
}

function MORE_PRODUCTS({ commit }) {
	commit('UPDATE_PRODUCT_PAGE');
}

function CLEAN_PRODUCTS_ARRAY({ commit }) {
	commit('RESET_PRODUCTS_ARRAY');
}

function UPDATE_PRODUCT_FILTER({ commit }, filter) {
	commit('SET_PRODUCT_FILTER', filter);
}

function START_PAGINATION({ commit }) {
	commit('PAGE_ONE');
}

function addService({ commit }, service) {
	commit('ADD_ONE_IN_SERVICE_COUNTER', service);
}

function resetCounter({ commit }) {
	commit('RESETING_COUNTER');
}

function minusService({ commit, state }, service) {
	const { config: { url } } = service;
	const index = state.appConfig.loadingCounter.findIndex(l => l.url === url);
	commit('MINUS_ONE_IN_SERVICE_COUNTER', index);
}

function SET_WINDOW_LOADED_TO_TRUE({ commit }) {
	commit('UPDATE_WINDOW_LOADED', true);
}

function SET_ECOMMERCE_THEME({ commit }, theme) {
	commit('SET_ECOMMERCE_COLORS', theme);
}

function setRatingProductId({ commit }, productId) {
	commit('SET_PRODUCT_ID_TO_RATE', productId);
}

function updateGatewayErrorCode({ commit }, errorCode) {
	commit('SET_GATEWAY_ERROR_CODE', errorCode);
}

function updateGatewayAuthorizationResponse({ commit }, data) {
	commit('SET_GATEWAY_AUTHORIZATION_RESPONSE', data);
}

function UPDATE_PRODUCT_SEARCH({ commit }, search) {
	commit('SET_PRODUCT_SEARCH', search);
}

function setFlagGrouper({ commit }, flagGrouper) {
	commit('SET_FLAG_GROUPER', Boolean(flagGrouper));
}

function loadProductsFromLocal({ commit }, context) {
	const products = context.getLocalStorage('ecommerce::product-select');
	commit('SET_ORDER_DETAILS', products);
}

const methods = {
	addProductToBuyCar,
	addService,
	CLEAN_PRODUCTS_ARRAY,
	clearUser,
	DEFAULT_USER,
	getOrderData,
	loadProductsFromLocal,
	minusService,
	MORE_PRODUCTS,
	setUser,
	setToken,
	showSnackBar,
	toggleLoading,
	updateFilters,
	updateGatewayAuthorizationResponse,
	updateGatewayErrorCode,
	UPDATE_ORDER_FROM_LOCAL_STORAGE,
	UPDATE_PRODUCT_FILTER,
	UPDATE_PRODUCT_SEARCH,
	updateProductSelect,
	resetCounter,
	setFlagGrouper,
	setNoShippingCost,
	setShippingCost,
	setShippingCostFromOrder,
	SET_ECOMMERCE_THEME,
	SET_DEFAULT_VALUES,
	SET_WAY_PAYMENT,
	SET_BANK_ACCOUNTS,
	setRatingProductId,
	SET_WINDOW_LOADED_TO_TRUE,
	START_PAGINATION,
};

export default methods;
