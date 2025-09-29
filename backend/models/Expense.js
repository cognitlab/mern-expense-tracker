const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true}, //Example: Food, Rent, Groceries
    amount: { type: Number, required: true},
    date: { type: Date, default: Date.now },
}, { timestamps: true });

// const ExpenseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   icon: String,
//   category: { type: String, required: true },
//   amount: { type: Number, required: true },
//   expenseDate: { type: Date, default: Date.now }, // clearer name
// }, { timestamps: true });


module.exports = mongoose.model("Expense", ExpenseSchema);