const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // This is required to parse the JSON body in POST requests

// Dummy articles data (will be replaced by file system later)
let articles = [
    {
        id: 1,
        title: 'Learning JavaScript',
        content: 'JavaScript is a versatile programming language for web development.',
        tags: ['JavaScript', 'Programming']
    },
    {
        id: 2,
        title: 'Introduction to Node.js',
        content: 'Node.js allows you to run JavaScript server-side.',
        tags: ['Node.js', 'JavaScript']
    }
];

// POST route for adding articles
app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content || !tags) {
        return res.status(400).json({ message: 'Title, content, and tags are required.' });
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        tags
    };

    articles.push(newArticle); // Add the article to the in-memory array

    // Optionally, save articles to a file
    fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));

    res.status(201).json(newArticle); // Respond with the created article
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
