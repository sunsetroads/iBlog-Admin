const express = require('express');
const router = express.Router();
const blog = require('../proxy/blog')
const moment = require('moment');
const showdown = require('showdown');

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
		blog.getArticleDetail(alias, (err, data) => {
			if (err) {
				next(err);
			} else {
				let resultContent;
				if (data.ContentType === 'markdown') {
					const converter = new showdown.Converter();
					converter.setFlavor('github');
					resultContent = converter.makeHtml(data.Content);
				} else {
					resultContent = data.Content;
				}
				res.json({
					Title: data.Title,
					CreateTime: moment(data.CreateTime).format('YYYY-MM-DD hh:mm'),
					Content: resultContent,
					Labels: data.Labels,
					Source: data.Source,
					Url: data.Url
				});
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
	blog.getArticles(params, (err, data) => {
		if (err) {
			next(err);
		} else {
			let results = [];
			data.forEach(item => {
				let post = {
					Alias: item.Alias,
					Title: item.Title,
					CreateTime: moment(item.CreateTime)
						.format('YYYY-MM-DD'),
					Source: item.Source,
					Url: item.Url,
				};
				if (params.isHome) {
					post.Summary = item.Summary;
					post.Labels = item.Labels;
					post.ViewCount = item.ViewCount;
				}
				results.push(post)
			});
			res.json(results);
		}
	})
})

module.exports = router;
