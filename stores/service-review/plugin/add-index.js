module.exports = (schema) => {
    schema.index({ userId: 1 });
    schema.index({ serviceId: 1 });
}
;
