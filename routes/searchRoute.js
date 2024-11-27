const express = require('express');
const client = require('../config/elasticSearch');
const router = express.Router();

router.get('/:value', async (req, res) => {
    const { value } = req.params;

    try {
        const response = await client.search({
            index: 'products-01',
            body: {
                query: {
                    bool: {
                        should: [
                            {  // Full-text exact search
                                match: {
                                    "title": value
                                }
                            },
                            {  // Partial search using wildcard (fuzzy matching as fallback)
                                wildcard: {
                                    "title": {
                                        value: `*${value}*`
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        });

        res.json(response.hits.hits);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing search');
    }
});

module.exports = router;
