module.exports = {
    postShipment: require('./shipment-post'),
    postShipmentAddress: require('./shipment-address-post'),
    deleteShipmentAddress: require('./shipment-address-delete'),
    putShipmentAddress: require('./shipment-address-put'),
    getShipmentAddress: require('./shipment-address-get'),
    getShipment: require('./shipment-get'),
    deleteShipment: require('./shipment-delete'),
    putShipment: require('./shipment-put')
};
