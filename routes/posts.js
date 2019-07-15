const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

// get all the posts from MongoDB
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch(err) {
		res.json({
			message: err
		});
	}
});

//get specific post from MongoDB
router.get('/:postId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch(err) {
		res.json({
			message: err
		});
	}
});

// submits a post to MongoDB
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		slug: req.body.slug,
		excerpt: req.body.excerpt,
		description: req.body.description
	});

	try {
		const savedPost = await post.save();
		res.json(savedPost);
	} catch(err) {
		res.json({
			message: err
		})
	}
});

// delete post from MongoDB
router.delete('/:postId', async (req, res) => {
	try {
		const removedPost = await Post.remove({
			_id: req.params.postId
		});
		res.json(removedPost);
	} catch(err) {
		res.json({
			message: err
		});
	}
});

// update a post in MongoDB
router.patch('/:postId', async (req, res) => {
	try {
		const updatedPost = await Post.updateOne({
			_id: req.params.postId
		}, {
			$set: {
				title: req.body.title,
				slug: req.body.slug,
				excerpt: req.body.excerpt,
				description: req.body.description
			}
		});
		res.json(updatedPost);
	} catch(err) {
		res.json({
			message: err
		});
	}
})

module.exports = router;
