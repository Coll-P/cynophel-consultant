const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
const app = express();
require('dotenv').config()

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // disable logging
});

// Define the Article model
const Article = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

// Sync all defined models to the DB
sequelize
  .sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Error syncing database:", err));

app.use(cors());
app.use(express.json());

// Get all articles
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Create a new article
app.post("/api/articles", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    console.error("Failed to create article:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

// Get a single article
app.get("/api/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Failed to fetch article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// Update an article
app.put("/api/articles/:id", async (req, res) => {
  try {
    const [updated] = await Article.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedArticle = await Article.findByPk(req.params.id);
      res.json(updatedArticle);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Failed to update article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

// Delete an article
app.delete("/api/articles/:id", async (req, res) => {
  try {
    const deleted = await Article.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Article deleted successfully" });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Failed to delete article:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
