const client = require('./elasticSearch');

const  createIndex=async()=> {
  try {
    const response = await client.indices.create({
      index: 'products-01',
      body: {
        mappings: {
          properties: {
            title: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword'
                }
              }
            },
            price: { type: 'float' },
            description: { type: 'text' },
            category: { type: 'keyword' }
          }
        }
      }
    });
    console.log('Index created:', response);
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

async function addBulkData() {
    try {
      const bulkResponse = await client.bulk({
        body: [
          // Document 1
          { index: { _index: 'products-01' } },
          { title: 'Phone A', price: 8999, description: 'A budget smartphone', category: 'smartphones' },
          // Document 2
          { index: { _index: 'products-01' } },
          { title: 'Phone B', price: 11999, description: 'A mid-range smartphone', category: 'smartphones' },
          // Document 3
          { index: { _index: 'products-01' } },
          { title: 'Tablet A', price: 15000, description: 'A budget tablet', category: 'tablets' },
          // Document 4
          { index: { _index: 'products-01' } },
          { title: 'Smartwatch X', price: 4999, description: 'An affordable smartwatch', category: 'wearables' }
        ]
      });
  
      if (bulkResponse.errors) {
        console.error('Some documents failed to index:', bulkResponse.items);
      } else {
        console.log('Bulk data indexed successfully.');
      }
    } catch (error) {
      console.error('Error adding bulk data:', error);
    }
  }

module.exports={createIndex,addBulkData};
