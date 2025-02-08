export const status = {
    a: { label: 'Active', value: 'a', bg_color: 'green' },
    s: { label: 'Suspended', value: 's', bg_color: 'red' },
    i: { label: 'Inactive', value: 'i', bg_color: 'gray' },

    getByValue(value) {
        return this[value] ? this[value] : null;
    },

    getByLabel(label) {
        return Object.values(this).find(status => status.label === label) || null;
    },

    list() {
        return Object.values(this);
    }
};
