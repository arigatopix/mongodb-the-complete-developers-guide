db.friends
  .aggregate([
    { $project: { _id: 0, examScores: { $slice: ['$examScores', -2] } } },
  ])
  .pretty();
