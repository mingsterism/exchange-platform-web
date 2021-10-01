import { storageRef } from "./firebase";
import { userProfile } from "../store/user.profile";

const imageRef = storageRef.child("ProfileImages"); // Points to folder name images

export const uploadProfileImage = (file, id) => {
  const spaceRef = imageRef.child(id);
  const uploadTask = spaceRef.put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        userProfile().changeProfilePic(downloadURL);
      });
    }
  );
};

export const downloadProfilePic = (id) => {
  const spaceRef = imageRef.child(id);
  spaceRef
    .getDownloadURL()
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      // inserted into an <img> element
      userProfile().changeProfilePic(url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
};
