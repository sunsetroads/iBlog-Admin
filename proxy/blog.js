const cateogry = require('./category');
const postModel = require('../models/post').PostModel;
const async = require('async');

//获取所有类别和每种类别对应的文章数量
exports.getCategories = function (callback) {
	async.parallel([
		//获取所有文章
		function (cb) {
			postModel.find({}, { CategoryId: 1, _id: 0 }, (err, data) => {
				if (err) {
					cb(err)
				} else {
					cb(null, data)
				}
			})
		},

		//获取所有分类
		function (cb) {
			cateogry.getAll((err, data) => {
				if (err) {
					cb(err)
				} else {
					cb(null, data)
				}
			})
		}
	], (err, results) => {
		if (err) {
			callback(err);
			return;
		}

		let articles,
			categories,
			result = [];

		articles = results[0];
		categories = results[1];
		//给每个分类计算文章数量
		categories.forEach(category => {
			let arr = articles.filter(item => item.CategoryId === category.Alias)
			result.push({
				cateName: category.CateName,
				alias: category.Alias,
				count: arr.length
			})
		});
		//添加未分类
		let otherArr = articles.filter(item => item.CategoryId === "other")
		result.push({
			cateName: 'other',
			alias: 'ohter',
			count: otherArr.length
		})
		callback(null, result)
	})
};

//根据文章别名获取详情
exports.getArticleDetail = function(alias, callback) {
	const projection = {
		CreateTime: 1,
		_id: 0,
		Title: 1,
		Content: 1,
		Labels: 1,
		Url: 1,
		Source: 1
	};
	postModel.find({Alias: alias}, projection, (err, data) => {
		if (err) {
			callback(err);
		} else {
			callback(null, data)
		}
	})
}

//获取文章列表
exports.getArticles = function (params, callback) {
	const query = getArticlesQuery(params);
	const projection = getArticleProjection(params);
	postModel.find(query, projection, (err, data) => {
		if (err) {
			callback(err);
		} else {
			callback(null, data)
		}
	})
}

function getArticleProjection(params) {
	const projection = {
		CreateTime: 1,
		_id: 0,
		Title: 1,
		Alias: 1,
		Url: 1,
		Source: 1
	};
	if (params.isHome) {
		projection.Labels = 1
		projection.Summary = 1
		projection.ViewCount = 1
	}
	return projection
}

function getArticlesQuery(params) {
	const query = {};

	if (params.categoryAlias) {
		query.CategoryId = params.categoryAlias;
	}

	if (params.searchText) {
		query.$or = [{
			Alias: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}, {
			Title: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}, {
			Summary: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}, {
			Content: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}, {
			Labels: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}, {
			Url: {
				$regex: params.searchText,
				$options: 'gi'
			}
		}];
	}

	return query;
}