const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');
const auth = require('../middleware/auth');

//get comments for a blog

router.get('/:blogId', async (req, res) => {
    try{
        const comments = await Comment.find(({blog: req.params.blogId})).populate('author', 'username');
        res.json(comments);
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//Add a comment to a blog

router.post('/:blogId', auth, async (req , res) => {
    const {content} = req.body
    try{
        const newComment = new Comment({
            content,
            author: req.user.id,
            blog: req.params.blogId,
        })
        await newComment.save();
        res.status(200).json(newComment)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router;