// @ts-ignore
import React,{Component} from 'react'
// @ts-ignore
import errorPng from './image/404.png'

class Error extends Component{
    render() {
        return(
            <div>
                <img src={errorPng} alt=""/>
            </div>
        )
    }
}
export default Error;
