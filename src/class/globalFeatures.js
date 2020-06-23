import l, { getDeeper, isEmpty } from '@/shared/lib';

class GlobalFeatures {
	constructor(products) {
		this.products = products;
		this.features = [];
	}
	allAvailable() {
		this.features = l.map(
			l.setNewProperty(
				'values',
				item => l.map(
					l.compose(
						l.setNewProperty('isSelected', el => !!el.isSelected),
						l.setNewProperty('notAllowed', false),
					), getDeeper('values')(item)),
			), this.features);
	}
	allUnSelected() {
		this.features = l.map(
			l.setNewProperty(
				'values',
				item => l.map(
					l.compose(
						l.setNewProperty('isSelected', false),
						l.setNewProperty('notAllowed', false),
					), getDeeper('values')(item)),
			), this.features);
	}
	get() {
		return this.features;
	}
	init(product) {
		this.products = [].concat(product, this.products);
		this.features = getDeeper('category.features')(this.products[0]) || [];
		this.products.forEach(this.setFeaturesValuesToGlobalFeatures.bind(this));
	}
	setFeaturesValuesToGlobalFeatures({ features }) {
		const self = this;
		features.forEach((feature) => {
			const { id, value } = feature;
			const index = self.features.findIndex(fea => fea.id === id);
			if (index > -1) {
				const currentFeature = { ...self.features[index] };
				if (currentFeature.values) {
					const indexValue = currentFeature.values.findIndex(item => item.value === value);
					if (indexValue === -1) {
						currentFeature.values.push(feature);
					}
				} else {
					currentFeature.values = [{ ...feature }];
				}
				self.features[index].values = currentFeature.values;
			}
		});
	}
	update(incomingFeatures) {
		this.features = this.features.map((feature) => {
			const newValues = feature.values.map((v) => {
				const current = l.find(l.equality('value', v.value), incomingFeatures);
				if (isEmpty(current)) {
					return l.compose(
						l.setNewProperty('isSelected', false),
						l.setNewProperty('notAllowed', true),
					)(v);
				}
				if (current.isSelected) {
					return l.setNewProperty('isSelected', current.isSelected)(v);
				}
				return l.compose(
					l.setNewProperty('isSelected', false),
					l.setNewProperty('notAllowed', false),
				)(v);
			});
			return l.setNewProperty('values', newValues)(feature);
		});
	}
}
export default GlobalFeatures;
