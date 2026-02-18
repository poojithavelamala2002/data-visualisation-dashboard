const express = require("express");
const router = express.Router();
const Data = require("./model");
const jsonData = require("./jsondata.json");

// Load data into MongoDB only once
router.get("/insert-data", async (req, res) => {
    try {
        await Data.deleteMany({});
        await Data.insertMany(jsonData);
        res.send("Data inserted successfully!");
    } catch (err) {
        res.status(500).send(err);
    }
});

// CLEAN FILTERED DATA
router.get("/data", async (req, res) => {
    const filters = {};

    for (let key in req.query) {
        if (req.query[key] !== "" && req.query[key] !== null) {
            filters[key] = req.query[key];
        }
    }

    const results = await Data.find(filters);
    res.json(results);
});

// FILTER OPTIONS FOR DASHBOARD
router.get("/filters", async (req, res) => {
    const fields = ["country", "sector", "topic", "region", "pestle"];

    const filterData = {};

    for (let field of fields) {
        filterData[field] = await Data.distinct(field, {
            [field]: { $ne: "" }
        });
    }

    res.json(filterData);
});

module.exports = router;
