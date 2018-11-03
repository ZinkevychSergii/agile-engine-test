import React from 'react';
import PropTypes from 'prop-types';

import './ControlPanel.css';

const ControlPanel = ({ onExec, commandList }) => (
    <div id="control-panel">
        <div id="format-actions">
            {commandList.map(({command, content}, k) => 
                <button 
                    key={k}
                    onClick={() => onExec(command)}
                    className="format-action" 
                    type="button"
                    dangerouslySetInnerHTML={{__html: content}} />
            )}
        </div>
    </div>
)

ControlPanel.defaultProps = {
    commandList: [
        { command: "bold", content: "<b>B</b>" },
        { command: "italic", content: "<i>I</i>" },
        { command: "underline", content: "<u>U</u>" }
    ]
}

ControlPanel.propTypes = {
    onExec: PropTypes.func,
    commandList: PropTypes.arrayOf(PropTypes.shape({
        command: PropTypes.string,
        content: PropTypes.string
    }))
}

export default ControlPanel;
