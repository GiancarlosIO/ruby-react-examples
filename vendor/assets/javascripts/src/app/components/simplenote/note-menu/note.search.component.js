import React from 'react';

export default class NoteSearchComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = () => {
    let value = this.inputSearch.value;
    this.props.handleChange(value);
  }

  render() {
    return (
      <div className="column--8 flex-center">
        <div className="input--icon">
          <input className="input__text" type="text" placeholder="note name..." onChange={this.onChange} ref={ el => this.inputSearch = el }/>
          <i className="fa fa-search"></i>
        </div>
      </div>
    );
  }
}

NoteSearchComponent.propTypes = {
  handleChange: React.PropTypes.func.isRequired
}
