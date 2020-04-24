db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [0, 20, 30, 50, 80],
        output: {
          averageAge: { $avg: '$dob.age' },
          totalPersons: { $sum: 1 },
          name: { $push: '$name.first' },
        },
      },
    },
  ])
  .pretty();

// bucketAuto
db.persons
  .aggregate([
    {
      $bucketAuto: {
        groupBy: '$dob.age',
        buckets: 5,
        output: {
          averageAge: { $avg: '$dob.age' },
          totalPersons: { $sum: 1 },
        },
      },
    },
  ])
  .pretty();
