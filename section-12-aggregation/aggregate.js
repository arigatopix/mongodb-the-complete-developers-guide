db.persons
  .aggregate([
    { $match: { gender: 'male' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } },
    },
    { $sort: { totalPersons: -1 } },
  ])
  .pretty();
