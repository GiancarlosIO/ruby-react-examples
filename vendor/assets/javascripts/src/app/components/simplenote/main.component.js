import React from 'react';

import NoteAPI from './api/note.api';

import MenuComponent from './menu/menu.component';
import NoteTextareaComponent from './note/note.textarea.component';
import NoteMenuComponent from './note-menu/note.menu.component';
import NoteListComponent from './note/note.list.component';
import SelectTagComponent from './tags/selectTag.component';
import TagBarComponent from './tags/tagBar.component';

export default class NoteMainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.cancelRequests = [];
    this.state = {
      notesList: [],
      noteSelected: {},
      saveStatus: '',
      searchText: ''
    }
  }

  // ====== custom events =======
  selectNote = (note) => {
    this.setState({noteSelected: note});
  }
  handleChangeTextarea = (text) => {
    this.updateNote(this.state.noteSelected.id, text);
  }
  handleSearchChange = (text)  => {
    this.setState({searchText: text});
  }
  // ====== end custom events =======

  // ====== custom call api functions =======
  shouldCancelAllRequest = (reason) => {
    if (reason) {
      for(let i in this.cancelRequests) {
        this.cancelRequests[i]();
      }
    };
  }
  getNotesList = () => {
    setTimeout(() => {
      let xhrPromise = NoteAPI.getNotes();
      this.cancelRequests.push(xhrPromise.cancel);
      this.shouldCancelAllRequest(this.unmounted);
      xhrPromise.request.then(
        response => {
          let notesList = response.data.notes;
          this.setState({
            notesList: notesList,
            noteSelected: notesList.length > 0 ? notesList[0] : {}
          })
        }
      ).catch( error => { console.log('error to get notesList', error); }
      );
    }, 1000);
  }
  updateNote = (id, text) => {
    this.setState({saveStatus: 'saving...'}, () => {
      let xhrPromise = NoteAPI.updateNote(id, text);
      this.cancelRequests.push(xhrPromise.cancel);
      this.shouldCancelAllRequest(this.unmounted);
      xhrPromise.request.then(
        response => {
          if (response.statusText === 'OK') {
            let newNotesList = this.state.notesList.map(
              (note) => {
                if (note.id == id) { note.text = text; };
                return note
              }
            );
            this.setState({
              noteSelected: response.data,
              notesList: newNotesList,
              saveStatus: 'saved!'
            });
          }
        }
      ).catch( error => {
        console.log('updated failed', error)
        requestAPI.error = error;
      });
    })
  }
// ====== end custom call api functions =======

  componentDidMount() {
    this.getNotesList();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    let {notesList, noteSelected, saveStatus, searchText} = this.state;
    let notes;
    if (searchText.length > 0) {
      notes = notesList.filter( note => (note.text.indexOf(searchText) > -1) );
    } else {
      notes = notesList;
    }
    return (
      <div>
        <div className="row">
          <NoteMenuComponent handleSearchChange={this.handleSearchChange}/>
          <MenuComponent />
        </div>
        <div className="row">
          <SelectTagComponent />
          <TagBarComponent saveStatus={saveStatus}/>
        </div>
        <div className="row">
          <NoteListComponent notesList={notes} noteSelected={noteSelected} selectNote={this.selectNote}/>
          <NoteTextareaComponent note={noteSelected} handleChangeTextarea={this.handleChangeTextarea}/>
        </div>
      </div>
    )
  }
}
