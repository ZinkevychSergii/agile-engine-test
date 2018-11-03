import React, {Component} from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import TextEditor from "./text-editor/TextEditor";
import getMockText from './text.service';
import Synonyms from './synonyms/Synonyms';

import './App.css';

class App extends Component {

    def

    constructor(...props) {
        super(...props);
        this.state = { 
            text: "",
            selectionData: null
        }
        this.execCommand = this.execCommand.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.applySynonyms = this.applySynonyms.bind(this);
    }

    componentDidMount() {
        getMockText().then(text => {
            this.setState({ text });
        });
    }

    execCommand(command) {
        document.execCommand(command, false, null);
    }

    onChangeText(text) {
        this.setState({ text });
    }

    onSelect(selectionData) {
        this.setState({ selectionData });
    }

    applySynonyms(newWord) {
        const { text, selectionData: { selection } } = this.state;
        const { startOffset, endOffset } = selection.getRangeAt(0);
        this.setState({
            text: text.substr(0, startOffset) + newWord + " " + text.substr(endOffset),
            selectionData: null
        });
    }

    render() {
        const { text, selectionData } = this.state;

        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel onExec={this.execCommand}/>
                    <TextEditor 
                        onChangeText={this.onChangeText} 
                        onSelect={this.onSelect}
                        text={text}/>
                    { selectionData && 
                        <Synonyms 
                            word={selectionData.selection.toString()}
                            apply={this.applySynonyms}
                            position={selectionData.position}
                            onOutsideClick={() => this.onSelect()} /> }
                </main>
            </div>
        );
    }
}

export default App;
