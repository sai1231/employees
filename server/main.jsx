import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import {Employees} from '../imports/collections/employees';
import {image, helpers} from 'faker';

Meteor.startup(() => {
  // code to run on server at startup

//Check if data exists in collection
    const numberRecords = Employees.find({}).count();

    console.log(numberRecords);

    if(!numberRecords){
        //Generate some data
        //.times means, for loop the function runs 5000 times here
        _.times(5000, ()=>{
            const {name, email, phone} = helpers.createCard();

            Employees.insert({
                name, email, phone,
                avatar: image.avatar()

//   The above is similar to
//                name: name,
//                email: email,
//                phone: phone

            });
        });
    }

    Meteor.publish('employees', function(){
        return Employees.find({}, {limit:20});
    })
});
