import orderGetters from '@/store/getters/order';
import geoGetters from '@/store/getters/geo';
import profileGetters from '@/store/getters/profile';
import lib from '@/shared/lib';

const { getDeeper } = lib;

function indeterminate(state) {
	return state.appConfig.isLoading;
}

function companyLogo(state) {
	return state.user ? state.user.logo : '';
}

function user(state) {
	return state.user;
}

function userName(state) {
	return state.user ? `${state.user.name || ''} ${state.user.lastname || ''}` : '';
}

function token(state) {
	return state.token;
}

function snackbar(state) {
	return state.appConfig.snackbar;
}

function themeColors() {
	return JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}::theme`));
}

function pollData(state) {
	return state.pollData;
}

function getProducts(state) {
	return state.products.list;
}

function flagAddVoucher(state) {
	return state.profile.flagAddVoucher;
}

function getCurrencySymbol(state) {
	const { currencyDefault } = state;
	return getDeeper('symbol')(currencyDefault) || '';
}

function getCategories(state) {
	return state.categories;
}

function totalProducts(state) {
	return state.order.products ? state.order.products.length : 0;
}

function getDirections(state) {
	return state.directions;
}

function getWarehouses(state) {
	return state.warehouses;
}

function genders(state) {
	return state.genders;
}

function getFilters(state) {
	return state.filters;
}

function getCommerceData(state) {
	return state.commerce;
}

function bannersTypes(state) {
	return state.bannerTypes;
}

function getBanners(state) {
	return state.banners;
}

function getBannersHome(state) {
	return state.banners.filter(banner => banner.typeName === 'Home');
}

function getPromotionalBanner(state) {
	return state.banners.find(banner => banner.typeName === 'Promoción');
}

function getPromotionalDetailsBanner(state) {
	return state.banners.find(banner => banner.typeName === 'Promoción en detalle');
}

function getPlansBanner(state) {
	return state.banners.find(banner => banner.typeName === 'Promoción en planes');
}

function getCreditBanner(state) {
	return state.banners.find(banner => banner.typeName === 'Promoción en creditos');
}

function productParams(state) {
	return state.products.params;
}

function getLastPage(state) {
	return state.products.lastPage;
}

function currentPage(state) {
	return state.products.params.page;
}

function loadingCounter(state) {
	return state.appConfig.loadingCounter.length;
}

function windowLoaded(state) {
	return state.windowLoaded;
}

function templateColors(state) {
	return state.colors;
}

const methods = {
	bannersTypes,
	companyLogo,
	currentPage,
	genders,
	getBanners,
	getBannersHome,
	getCreditBanner,
	getCommerceData,
	getCurrencySymbol,
	getDirections,
	getLastPage,
	getPlansBanner,
	getPromotionalBanner,
	getProducts,
	getPromotionalDetailsBanner,
	getWarehouses,
	flagAddVoucher,
	indeterminate,
	loadingCounter,
	...geoGetters,
	...orderGetters,
	...profileGetters,
	pollData,
	productParams,
	snackbar,
	templateColors,
	themeColors,
	token,
	user,
	userName,
	getCategories,
	totalProducts,
	getFilters,
	windowLoaded,
};

export default methods;
