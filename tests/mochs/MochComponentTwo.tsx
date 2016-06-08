/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

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
