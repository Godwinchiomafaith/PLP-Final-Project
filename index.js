const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = 3500;

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create `crops` table
app.get('/create-crops', (req, res) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Crops (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) return res.status(400).send('Error creating crops table');
        res.send('Crops table created successfully');
    });
});

// Create `yields` table
app.get('/create-yields', (req, res) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Yields (
            id SERIAL PRIMARY KEY,
            crop_id INT NOT NULL,
            quantity VARCHAR(50) NOT NULL,
            harvest_date DATE NOT NULL,
            FOREIGN KEY (crop_id) REFERENCES Crops(id) ON DELETE CASCADE
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) return res.status(400).send('Error creating yields table');
        res.send('Yields table created successfully');
    });
});

// Create `market_prices` table
app.get('/create-market-prices', (req, res) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Market_Prices (
            id SERIAL PRIMARY KEY,
            crop_id INT NOT NULL,
            market_name VARCHAR(100) NOT NULL,
            price_per_unit VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            FOREIGN KEY (crop_id) REFERENCES Crops(id) ON DELETE CASCADE
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) return res.status(400).send('Error creating market prices table');
        res.send('Market Prices table created successfully');
    });
});

// Create `best_markets` table
app.get('/create-best-markets', (req, res) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Best_Markets (
            id SERIAL PRIMARY KEY,
            crop_id INT NOT NULL,
            market_name VARCHAR(100) NOT NULL,
            reason TEXT,
            FOREIGN KEY (crop_id) REFERENCES Crops(id) ON DELETE CASCADE
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) return res.status(400).send('Error creating best markets table');
        res.send('Best Markets table created successfully');
    });
});

// Add sample data for crops
app.get('/add-crops', (req, res) => {
    const sql = `
        INSERT INTO Crops (name, description) VALUES
        ('Wheat', 'A staple grain used for bread and cereals'),
        ('Corn', 'A versatile crop for food and biofuel'),
        ('Rice', 'A major food crop grown in wetlands'),
        ('Soybeans', 'Used for oil and protein-rich food'),
        ('Tomatoes', 'A popular vegetable crop for cooking');
    `;
    db.query(sql, (err) => {
        if (err) {
            console.error('Error inserting sample crops:', err);
            return res.status(500).send('Error adding sample crops');
        }
        res.send('Sample crops added successfully');
    });
});

// Add sample yields
app.get('/add-yields', (req, res) => {
    const sql = `
        INSERT INTO Yields (crop_id, quantity, harvest_date) VALUES
        (1, '5000 kg', '2024-09-15'),
        (2, '3000 kg', '2024-07-10'),
        (3, '7000 kg', '2024-08-25'),
        (4, '2000 kg', '2024-10-01'),
        (5, '1500 kg', '2024-06-20');
    `;
    db.query(sql, (err) => {
        if (err) {
            console.error('Error inserting sample yields:', err);
            return res.status(500).send('Error adding sample yields');
        }
        res.send('Sample yields added successfully');
    });
});

// Add sample market prices
app.get('/add-market-prices', (req, res) => {
    const sql = `
        INSERT INTO Market_Prices (crop_id, market_name, price_per_unit, date) VALUES
        (1, 'Springfield Market', '20 USD/kg', '2024-09-15'),
        (2, 'Metropolis Market', '15 USD/kg', '2024-07-10'),
        (3, 'Gotham Market', '30 USD/kg', '2024-08-25'),
        (4, 'Star City Market', '25 USD/kg', '2024-10-01'),
        (5, 'Central City Market', '10 USD/kg', '2024-06-20');
    `;
    db.query(sql, (err) => {
        if (err) {
            console.error('Error inserting sample market prices:', err);
            return res.status(500).send('Error adding market prices');
        }
        res.send('Sample market prices added successfully');
    });
});

// Add sample best markets
app.get('/add-best-markets', (req, res) => {
    const sql = `
        INSERT INTO Best_Markets (crop_id, market_name, reason) VALUES
        (1, 'Springfield Market', 'High demand during fall'),
        (2, 'Metropolis Market', 'Competitive pricing'),
        (3, 'Gotham Market', 'Large urban customer base'),
        (4, 'Star City Market', 'Premium market for organics'),
        (5, 'Central City Market', 'Close proximity to farms');
    `;
    db.query(sql, (err) => {
        if (err) {
            console.error('Error inserting sample best markets:', err);
            return res.status(500).send('Error adding best markets');
        }
        res.send('Sample best markets added successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
