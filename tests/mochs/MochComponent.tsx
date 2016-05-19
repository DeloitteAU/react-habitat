import * as React from 'react';


export interface IProps {
    title?: string
}

export interface IState {}

export class MochComponent extends React.Component<IProps, IState> {


    render() {
        return <div>{this.innerText()}</div>;
    }


    innerText() {

        if(this.props.title !== null) {
            return `[component MochComponent](title='${this.props.title}')`;
        }
        
        return '[component MochComponent]';
    }

}

