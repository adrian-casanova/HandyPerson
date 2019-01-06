import firebase from 'firebase';

export const getAllUsers = () => new Promise ((resolve, reject) => {
  const database = firebase.firestore();
  database.settings({
    timestampsInSnapshots: true
  });
  database.collection('users')
    .get()
      .then((snapshot => {
        resolve(snapshot);
      }))
      .catch(e => reject(e));
});

export const getUserName = (email) => new Promise ((resolve, reject) => {
  const database = firebase.firestore();
  database.settings({
    timestampsInSnapshots: true
  });
  const ref = database.collection('users');
  const query = ref.where('email', '==', email);
  query.get()
    .then(response => resolve(response))
    .catch(e => console.log(e));
})