import React, { Component, createRef } from 'react';
import PropTypes from "prop-types";

import './TextEditor.css';

class TextEditor extends Component {

    constructor(...props) {
        super(...props);
        this.editable = createRef("editable");
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.html !== this.editable.current.innerHTML;
      }

    onDoubleClick(event) {
        const selection = window.getSelection();
        const position = { pageX: event.pageX, pageY: event.pageY };
        this.props.onChangeText(this.editable.current.innerHTML);
        this.props.onSelect({ selection, position });
    }

    render() {
        return (
            <div className="text-editor-wrapper">
                <div ref={this.editable} 
                    onDoubleClick={this.onDoubleClick}
                    contentEditable 
                    dangerouslySetInnerHTML={{ __html: this.props.text }}
                />
            </div>
        );
    }
}
TextEditor.propTypes = {
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    onSelect: PropTypes.func
}

export default TextEditor;
