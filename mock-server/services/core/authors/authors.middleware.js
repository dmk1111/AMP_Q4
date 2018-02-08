const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/authors', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
      authors = server.db.getState().authors;
		console.log(sort);
		console.log(queryStr);
		if (authors.length < to) {
			to = authors.length;
		}
    authors = authors.slice(from, to);

		res.json(authors);
	});

	return router;
};
