db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments', 'tags'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        text: {
          bsonType: 'string',
          description: 'text must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be a objectId and is required',
        },
        tags: {
          bsonType: 'array',
        },
        comments: {
          bsonType: 'array',
          description: 'must be a array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must be a objectId and is required',
              },
            },
          },
        },
      },
    },
  },
});
