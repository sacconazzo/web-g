import React, { useRef } from 'react';
import JoditEditor from "jodit-react";
import { Jodit } from 'jodit';

function checkMessage(editor) {
    const statusbar = document.createElement('div');
    statusbar.style.backgroundColor = '#f8f8f8';
    statusbar.style.fontSize = '11px';
    // statusbar.style.color = '#DC143C';

    function calcStat() {
        const text = Jodit.modules.Helpers.trim(editor.editor.innerText)
        const emailsArray = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailsArray != null && emailsArray.length) {
            statusbar.innerText = statusbar.style.borderTop = statusbar.style.padding = '';
        } else {
            statusbar.innerText =  'your email reference is currently missing';
            statusbar.style.borderTop = '1px solid #dadada';
            statusbar.style.padding = '1px 4px';
        }
        
    }

    editor.events
        .on('change afterInit', editor.async.debounce(calcStat, 100))
        .on('afterInit', function () {
            editor.container.appendChild(statusbar);
        });
}

const Editor = (props) => {
    const editor = useRef(Jodit)
    //const [content, setContent] = useState('')

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        toolbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        showPlaceholder: false,
        hidePoweredByJodit: true,
        statusbar: true
    }

    Jodit.plugins.add('status', checkMessage);

    return (
        <JoditEditor
            ref={editor}
            value={props.content}
            config={config}
            //tabIndex={1} // tabIndex of textarea
            //onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { props.bingo(newContent) }}
        />
    );
}

export default Editor;