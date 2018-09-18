// ATTENTION -- This page was just Anthony explaining how this and props work - this code is not used in the project

import React from 'react';


class Form extends React.Component { 
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <form>
                <input type="text" placeholder={this.props.inputText} />
                <button type="submit">{this.props.submitText}</button>
            </form>
        )
    }
}

//Form({ inputText: 'Add a user', submitText: 'Submit' });


<Form 
    inputText='Add a user' 
    submitText="Submit" 
/>

// props = { inputText: 'Add a user', submitText: 'Submit' }