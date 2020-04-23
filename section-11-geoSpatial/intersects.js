db.areas
  .find({
    area: {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [100.262072, 16.813834],
        },
      },
    },
  })
  .pretty();
