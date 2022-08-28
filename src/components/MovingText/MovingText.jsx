import React from 'react';
import './style.css'

function MovingText(props) {
    return (
        <div
            style={{
                borderTop: '3px solid #d32f2f',
                borderBottom: '3px solid #d32f2f',
                overflow: 'hidden',
                padding: '20px 10px'
            }}
        >
            <div id="scroll-text" style={{ color: 'white', fontSize: 20 }}>
                Ask our AI voice assistant to find you a movie. E.g., "Show me spider-man movies", "Find me Avatar"
            </div>
        </div>
    );
}

export default MovingText;