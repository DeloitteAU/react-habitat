import * as React from 'react';


export interface IProps {
    title?: string
}

export interface IState {}

export class MochComponentTwo extends React.Component<IProps, IState> {


    render() {
        return <div>{this.innerText()}</div>;
    }


    innerText() {

        if(this.props.title !== null) {
            return `[component MochComponentTwo](title='${this.props.title}')`;
        }

        return '[component MochComponentTwo]';
    }

}
