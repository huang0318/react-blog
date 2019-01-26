import React, {Component} from 'react';
import Header from '../../components/header';
import Nav from '../../components/nav';
import NotFound from '../../components/notFount';
import './../../assets/common.css'
import routerConfig from './../../routerConfig'
import { connect } from 'react-redux';
import {isShowNav} from './../../store/actions.js'

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            navArr: [],
        }
    }
    render() {
        return (
            <div>
                <Header/>
                {this.state.navArr.length > 0 && <Nav isShow={this.state.isShow} navArr={this.state.navArr} {...this.props}/>}
                {(this.props.match.path === '*' && this.props.match.url !== '/') ?
                    <NotFound {...this.props}/>:<div className="main-container">{this.props.children}</div>
                }
            </div>
        );
    }
    componentDidMount() {
        window.addEventListener("scroll",this.props.getScrollHeight);
        routerConfig.forEach(e => {
            if (Array.isArray(e.children) && e.children.length > 0) {
                if (this.props.location.pathname.indexOf(e.path) > -1) {
                    this.setState({
                        navArr: e.children
                    },function () {
                    })
                }
            }
        });
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
}
function mapGetState(state) {
    return state
}
function mapDispatchState(dispatch) {
    return {
        getScrollHeight () {
            dispatch(isShowNav(window.scrollY <= 60))
        },
    }
}
export default connect(mapGetState,mapDispatchState)(BasicLayout)