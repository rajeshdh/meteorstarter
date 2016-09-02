import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';
//import {gm} from 'meteor/cfs:graphicsmagick';
//import fs from 'fs';
//import Request from 'request'
//import {is_allowed} from '/lib/access_control';



// const Files = new FilesCollection({
const Files = new FilesCollection({
  storagePath: Meteor.settings.public.storage_path,
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: (file) => {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  onAfterUpload: (fileRef) => {
    console.log(fileRef);
  }

});



export default Files;
