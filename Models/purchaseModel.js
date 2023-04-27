const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    purchase: {type: String},
    category: {type: String},
    cost: {type: Number},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date: {type: Date}
});
const purchase = mongoose.model('purchase', purchaseSchema);

module.exports = {
    purchase
}