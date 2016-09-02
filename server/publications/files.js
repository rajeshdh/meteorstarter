import {Files} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
//import {is_allowed} from '/lib/access_control';


export default function () {
  Meteor.publish('file.list', function (filterText) {
    check(filterText, Match.Optional(String));

      if (filterText === '' || !filterText) {
        return Files.collection.find({});
      } else {
        return Files.collection.find({$or: [
          {_id: {$regex: filterText}},
          {name: {$regex: filterText}},
          {description: {$regex: filterText}},
        ]})
      }

  });

  Meteor.publish('file.item', function (fileId) {
    check(fileId, String);

      return Files.collection.find(fileId);

  });

  Meteor.publish('file.cover', function (albumId) {
    check(albumId, String);

      var result = Files.collection.find({
        "meta.albumId": albumId,
        "meta.usage": "cover"
      });
      return result;

  });

  Meteor.publish('file.covers', function () {
      var result = Files.collection.find({
        "meta.usage": "cover"
      });
      return result;

  });
}
