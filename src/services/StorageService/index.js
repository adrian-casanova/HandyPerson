import firebase from 'firebase';

export const uploadImage = (body) => new Promise((resolve, reject) => {
  const { email, fileName, file, postId } = body;
  console.log('body: ', body);
  const storage = firebase.storage();
  const userImages = storage.ref().child(`${email}/${postId}/${fileName}`);
    userImages.putString(file, 'base64', { contentType: 'image/jpeg' })
    .then((snapshot) => {
      const downloadUrl = snapshot.ref.getDownloadURL();
      resolve(downloadUrl);
    })

  .catch(e => reject(e));
});

const convertToByteArray  = (base64) => {
  const binary_string =  window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array( len );
  for (let i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}