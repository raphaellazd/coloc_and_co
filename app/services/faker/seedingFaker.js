import 'dotenv/config';
import {faker } from '@faker-js/faker/locale/fr';
import client from './app/dbClient.js';

const NB_USERS = 8;

function generateUsers(nbUsers) {
  const users = [];
  for (let iUser = 0; iUser < nbUsers; iUser += 1) {
    const birthdate = faker.date.between({
        from: "1959-01-01",
        to: "2004-01-01"
    });
    const user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      birthdate: birthdate.toISOString(),
      phone_number: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      emergency_name: faker.person.firstName(),
      emergency_number: faker.phone.number(),
      profession: faker.person.jobTitle(),
      avatar: faker.image.avatar(),
    };
    users.push(user);
  }
  return users;
}


async function insertUsers(users) {
  await client.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  const userValues = users.map(
    (user) => `(
                 '${user.firstname}',
                 '${user.lastname}',
                 '${user.birthdate}',
                 '${user.phone_number}',
                 '${user.email}',
                 '${user.password}',
                 '${user.emergency_name}',
                 '${user.emergency_number}',
                 '${user.profession}',
                 '${user.avatar}'
                
                
             )`
  );

  const query = `
             INSERT INTO "user"
             (
                 "firstname",
                 "lastname",
                 "birthdate",
                 "phone_number",
                 "email",
                 "password",
                 "emergency_name",
                 "emergency_number",
                 "profession",
                 "avatar"
                 
               
             )
             VALUES 
             ${userValues}
             RETURNING id, firstname, lastname, birthdate::date, email, password, phone_number, emergency_name, emergency_number, profession, avatar
             
             
            
    `;
    const result = await client.query(query);
    return result.rows;
}

function generateColocation(nbColoc) {
    const colocs = [];
    for (let iColoc = 0; iColoc < nbColoc; iColoc += 1) {
      const coloc = {
        name: faker.person.middleName(),
        address: faker.location.streetAddress({useFullAddress: true}),
        access_code: faker.location.zipCode(),
     
      };
      colocs.push(coloc);
    }
    return colocs;
  }

  console.log(generateColocation(2));

(async () => {
  const users = generateUsers(NB_USERS);
  const insertedUsers = await insertUsers(users);
  //console.log(insertedUsers);
})();
