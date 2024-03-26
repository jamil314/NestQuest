const columns = [
  "id",
  "username",
  "firstname",
  "lastname",
  "email",
  "phonenumber",
  "registered",
  "lastloggedin",
  "password",
  "status",
];

exports.getUserWithId = (id) => `SELECT * from users where id = ${id}`;

exports.createUser = (user) => {
  console.log(user);
  return `SELECT * from users where id = ${10}`;
};
