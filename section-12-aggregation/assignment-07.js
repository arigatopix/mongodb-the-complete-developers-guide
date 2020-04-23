db.persons
  .aggregate([
    { $match: { 'dob.age': { $gt: 50 } } },
    {
      $group: {
        _id: { gender: '$gender' },
        totalPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' },
      },
    },
    { $sort: { totalPers: -1 } },
  ])
  .pretty();
