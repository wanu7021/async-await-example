const users = [{
  id: 1,
  name: 'Jose',
  schoolId: 101
}, {
  id: 2,
  name: 'Maria',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find( user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id equal to ${id}`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = userId => {
  let user;
  return getUser(userId).then( tempUser => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then( grades => {
    let avg = 0;
    if (grades.length > 0) {
      avg = grades.map( grade => grade.grade )
        .reduce((a, b) => a + b ) / grades.length;
    }
    return `${user.name} has a ${avg}% in the class`;
  }).catch( e => console.log(e));
}

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let avg = 0;
  if (grades.length > 0) {
    avg = grades.map( grade => grade.grade )
      .reduce((a, b) => a + b ) / grades.length;
  }
  return `${user.name} has a ${avg}% in the class`;
};

getStatusAlt(1).then((res) => {
  console.log(res);
}).catch( e => {
  console.log(e);
});

console.log();

// getUser(1).then((res) => {
//   console.log(res);
// }).catch( e => {
//   console.log(e);
// });

// getGrades(101).then((res) => {
//   console.log(res);
// }).catch( e => {
//   console.log(e);
// });

// getStatus(1).then((res) => {
//   console.log(res);
// }).catch( e => {
//   console.log(e);
// });