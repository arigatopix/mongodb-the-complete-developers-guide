db.transformedPersons
  .aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [78.0, -84.0],
        },
        maxDistance: 100000,
        distanceField: 'distance',
      },
    },
    { $limit: 1 },
  ])
  .pretty();
