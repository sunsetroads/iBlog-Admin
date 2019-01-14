const express = require('express');
const router = express.Router();
const blog = require('../proxy/blog')
//获取类别
router.get('/categories', (req, res, next) => {
	blog.getCategories((err, result) => {
		if (err) {
			next(err);
		} else {
			res.json(result);
		}
	})
})

//获取文章详情
router.get('/articleDetail', (req, res, next) => {
	const alias = req.query.alias
	if (alias) {
		blog.getArticleDetail(alias, (err, result) => {
			if (err) {
				next(err);
			} else {
				res.json(result);
			}
		})
	} else {
		res.status(400).send("参数错误")
	}
})

//获取文章列表
router.post('/articles', (req, res, next) => {
	let params = {
		//分类获取
		categoryAlias: req.body.categoryAlias,
		//搜索获取
		searchText: req.body.searchText,
		//是否是首页
		isHome: req.body.isHome
	}
	blog.getArticles(params, (err, result) => {
		if (err) {
			next(err);
		} else {
			res.json(result);
		}
	})
})

module.exports = router;
