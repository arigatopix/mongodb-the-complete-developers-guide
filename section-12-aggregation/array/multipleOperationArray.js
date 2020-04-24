// ต้องการคะแนนของ examScores 3 อันแรก
// ปัญหาคือ examScores เป็น document ใน Array

db.friends.aggregate([
  { $unwind: '$examScores' },
  { $project: { _id: 1, name: 1, score: '$examScores.score' } },
  { $sort: { score: -1 } },
  {
    $group: {
      _id: '$_id',
      name: { $last: '$name' },
      maxScore: { $max: '$score' },
    },
  },
  { $sort: { maxScore: -1 } },
]);
