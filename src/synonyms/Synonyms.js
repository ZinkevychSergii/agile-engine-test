import React, { PureComponent, createRef } from "react";
import PropTypes from 'prop-types';
import { getSynonyms } from './api'

import './Synonyms.css';

class Synonyms extends PureComponent {

    constructor(...props) {
        super(...props);
        this.state = { synonyms: [] }
        this.component = createRef();
        this.select = createRef();
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.onApply = this.onApply.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    }

    handleOutsideClick(event) {
        if(this.component.current.contains(event.target)) return;
        this.props.onOutsideClick();
    }

    onApply() {
        this.props.apply(this.select.current.value);
    }

    getSynonims() {
        getSynonyms(this.props.word)
            .then(synonyms => {
                synonyms.length ?  this.setState({ synonyms, fetched: true }) : this.props.onOutsideClick();
            });
    }

    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick);
        this.getSynonims();
    }

    render() {
        const { style, position, topOffset } = this.props;
        const { synonyms, fetched } = this.state;
        const top = this.props.position.pageY + topOffset;

        if (!fetched) return null;

        return(
            <div style={{...style, top, left: position.pageX }} ref={this.component} className="synonyms">
                <h4>Synonyms</h4>
                <div className="content">
                    { synonyms.length && 
                        <select ref={this.select}>
                            {synonyms.map(({word},k) => (<option key={k} value={word}>{word}</option>))}
                        </select>
                    }
                </div>
                <div className="controlls">
                        <button onClick={this.onApply}>Apply</button>
                        <button onClick={this.props.onOutsideClick}>Close</button>
                </div>
            </div>
        );
    }
}

Synonyms.defaultProps = {
    topOffset: 20,
    style: {
        width: 250,
        height: 150,
        position: "absolute"
    }
}

Synonyms.propTypes = {
    word: PropTypes.string,
    topOffset: PropTypes.number,
    style: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        position: PropTypes.st
    }),
    onOutsideClick: PropTypes.func,
    apply: PropTypes.func
}

export default Synonyms;