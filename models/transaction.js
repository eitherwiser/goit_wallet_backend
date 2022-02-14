const { Schema, SchemaTypes, model } = require("mongoose");

const transactionSchema = Schema(
  {
    amount: {
      type: Number,
      require: true,
      min: 0.01,
    },
    isIncome: {
      type: Boolean,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    date: {
      type: Number,
      require: true,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    comment: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

transactionSchema.pre("save", function (next) {
  const date = new Date(this.date);
  this.year = date.getFullYear();
  this.month = date.getMonth() + 1;
  next();
});

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
