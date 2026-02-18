const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    year: Number,
    country: String,
    topic: String,
    region: String,
    city: String,
    end_year: String,
    sector: String,
    pestle: String,
    source: String,
    swot: String
}, { strict: false });

module.exports = mongoose.model("Data", DataSchema);
