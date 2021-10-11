import { storageRef } from "./firebase";
import { userProfile } from "../store/user.profile";
import { userProduct } from "../store/user.product";
import firebase from "firebase/app";
import "firebase/auth";

const imageRef = storageRef.child("ProfileImages"); // Points to folder name images
const prodFolder = storageRef.child("product-images");

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

export const uploadProdImg = async (files, prodId) => {
  userProduct().uploadComplete = false;
  const user = firebase.auth().currentUser;
  const folderId = user.uid + "&" + prodId;
  console.log("Folder ID is ", folderId);
  const spaceRef = prodFolder.child(folderId);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const fileLocation = spaceRef.child(fileName);

    // https://stackoverflow.com/questions/53574671/how-to-await-the-upload-of-file-to-firebase-storage-in-flutter/53577390
    const uploadTask = await fileLocation.put(file);
    const getDownloadUrl = await uploadTask.ref.getDownloadURL();
    userProduct().addPhotoUrl(getDownloadUrl);
    console.log("Current urls: ", userProduct().productPhotos);
  }
  userProduct().uploadComplete = true;
};

export const deleteProfilePhoto = () => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const fileLocation = imageRef.child(uid);
  fileLocation
    .delete()
    .then(() => console.log("Successfully delete profile photo"))
    .catch((err) => console.log("err"));
};

export const deleteProdImg = (folderName, fileLink) => {
  const array = fileLink.split("%");
  const array2 = array[3].split("?");
  const fileName = array2[0].substring(2, array2[0].length);
  // console.log("file name is ", fileName);
  const folderRef = prodFolder.child(folderName);
  const fileRef = folderRef.child(fileName);
  fileRef
    .delete()
    .then(() => console.log("Successfully delete profile photo"))
    .catch((err) => console.log(err));
};
