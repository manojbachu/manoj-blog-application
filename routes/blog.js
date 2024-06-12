const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const auth = require('../middleware/auth');


//all Blogs
router.get('/', async(req, res) => {
    try{
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//create new blog

router.post('/', auth, async(req, res) => {
    const {title, content} = req.body;
    try{
        const newBlog = new Blog({title, content, author: req.user.id});
        await newBlog.save()
        res.status(200).json(newBlog);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//get a specific blog by id

router.get('/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).populate('author','username');
        res.json(blog)
    }catch(error){
        res.status(200).json({error: error.message});
    }
});

//update a blog

router.put('/:id', auth, async(req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if (blog.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();
        res.json(blog);
    }catch (error){
        res.status(500).json({error: error.message})
    }
})

//Delete a blog

router.delete('/:id', auth, async(req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(blog.author.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized"});
        }
        await blog.remove();
        res.json({msg:'Blog removed'})
    }catch (error)  {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;