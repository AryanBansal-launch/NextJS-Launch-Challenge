export default function handler(request, response) {
    console.log('cloudfn API called')
    const users = [
      {name: "Jack", age: "25"},
      {name: "Rick", age: "28"},
      {name: "Jane", age: "34"},
    ];
    response.status(200).send(users);
  }