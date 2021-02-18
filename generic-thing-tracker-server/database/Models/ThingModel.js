const mongoose = require('mongoose');
const thingSchema = require('../Schemas/ThingSchema.js');

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;