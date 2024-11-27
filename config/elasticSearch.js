const { Client } = require("@elastic/elasticsearch");
const fs=require('fs')
const client = new Client({
    node: 'https://localhost:9200',
    auth:{
      username:'elastic',
      password:'783dvGZSvZEfeqU*HFXG'
    },
    tls: {
      ca:fs.readFileSync('./elastic-cerificate.pem'),
      rejectUnauthorized: false,
    },
  });
  
  // Test Elasticsearch connection
  client.ping({}, (error, response) => {
    if (error) {
      console.error('Elasticsearch is down!');
    } else {
      console.log('Elasticsearch is running.');
    }
  });

  module.exports=client;