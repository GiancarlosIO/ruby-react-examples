import AppDispatcher from '../dispatcher/app.dispatcher';
import AppConstants from '../constants/app.constants';
import {EventEmitter} from 'events';
import objectAssign from 'object-assign';
import CONTACT_API from '../utils/api/contactList.api';

var CHANGE_EVENT = 'change';

var _contacts = [];

var AppStore = objectAssign({}, EventEmitter.prototype, {
  saveContact: function(contact) {
    _contacts.push(contact);
  },
  getContacts: function() {
    return _contacts;
  },
  setContacts: function(contacts) {
    _contacts = contacts;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.actionType) {
    case AppConstants.SAVE_CONTACT:
      console.log('saving contact...');
      // Save in API
      CONTACT_API.createContact(action.contact).request.then(
        (response) => {
          // Store save
          AppStore.saveContact(action.contact);
          // Emit a change
          AppStore.emit(CHANGE_EVENT);
        },
        (error) => { console.log(error); }
      ).catch( error => console.log(error) );
      break;
    case AppConstants.RECEIVE_CONTACTS:
      console.log('receiving contacts');
      // Store the contacts
      AppStore.setContacts(action.contacts);
      // Emit a change
      AppStore.emit(CHANGE_EVENT);
      break;
  }
  return true;
});

export default AppStore;
