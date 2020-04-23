db.cafe
  .find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [100.26148, 16.81501],
        },
        $maxDistance: 6000,
      },
    },
  })
  .pretty();
