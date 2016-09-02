import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'
import {Files} from '/lib/collections'

export default class UserChangePicture extends React.Component {
    /**
   * Functions that run every time the component updates
   * @access private
   */
    componentDidUpdate() {
        Materialize.updateTextFields()
    }

    /**
   * Changes currently logged in user's name
   * @access private
   * @param {event} e Submit event from form
   */
    uploadPicture(e) {
        e.preventDefault()
        //console.log(e.target.avatar.files);
        let files = e.target.avatar.files;
        for (let i = 0; i < files.length; i++) {
            console.log('send');
            let file = files[i];
            if (file) {
                var uploadInstance = Files.insert({
                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    meta: {
                        usage: file.usage || "",
                        albumId: file.albumId || ""
                    }
                }, false);

                uploadInstance.on('start', function() {});

                uploadInstance.on('error', function(error) {});

                uploadInstance.on('end', function(error, fileObj) {
                    if (error) {
                        console.log(error.reason);
                    } else {
                        console.log('Successfully uploaded.');

                        // make sure cover is unique by running updated method
                        // if (file.usage && file.usage === 'cover') {
                        //     Meteor.call('file.update', fileObj, (err, res) => {
                        //         if (err) {
                        //             notification.alert(3, err.reason, 2.5);
                        //         }
                        //     })
                        // }

                    }
                });

                uploadInstance.start();
            }
        }
    }

    /**
   * Content to be displayed
   * @access private
   * @returns {jsx}
   */
    render() {
        // let givenName, familyName = null
        //
        // if(this.props.profile.givenName || this.props.profile.familyName){
        //   givenName = this.props.profile.givenName
        //   familyName = this.props.profile.familyName
        // }

        return (
            <form method="post" className="row section" ref="userPictureForm" onSubmit={this.uploadPicture.bind(this)}>
                <fieldset>
                    <legend>Profile Picture</legend>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" name="avatar"></input>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                    <input type="submit" value="Change" className="btn waves-effect"></input>
                </fieldset>
            </form>
        )
    }
}
