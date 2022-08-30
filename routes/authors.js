const express = require("express");
const Author = require("../models/author");
const router = express.Router();

// All Authors route
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions); // get all authors
    res.render("authors/index", { authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

// New Author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect("authors");
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render("authors/new", {
  //       author: author,
  //       errorMessage: "Error creating author",
  //     });
  //   } else {
  //     // res.redirect(`authors/${newAuthor.id}`);
  //     res.redirect("authors");
  //   }
  // });
});

module.exports = router;
