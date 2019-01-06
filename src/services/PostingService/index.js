import firebase from 'firebase';

export const createPost = (body) => new Promise ((resolve, reject) => {
  const database = firebase.firestore();
  database.settings({
    timestampsInSnapshots: true
  });
  const {
    title,
    description,
    cost,
    userEmail,
    userId,
    date,
    postedBy,
    isHourly,
    imageUrls,
    postId
  } = body;
  console.log('body: ', body);
  database.collection('posts')
    .add({
      title,
      description,
      cost,
      userEmail,
      userId,
      date,
      postedBy,
      isHourly,
      imageUrls,
      postId
    })
      .then(docRef => resolve(docRef))
      .catch(e => reject(e))
});

export const getAllPosts = () => new Promise ((resolve, reject) => {
  const database = firebase.firestore();
  database.settings({
    timestampsInSnapshots: true
  });
  database.collection('posts')
    .get()
      .then(snapshot => resolve(snapshot))
      .catch(e => reject(e));
})