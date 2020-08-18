import React from 'react';

import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends React.Component {
    //Auxiliary is a higher order component, for wrapping all the sub items - to avoid the error that needed to wrap ery sub component that wrap a parent element.
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosesHandler= () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer}});
    }

    render(){
        return(
        <Auxiliary>
            
            <Toolbar drawerToggleClicked= {this.sideDrawerToggleHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosesHandler}/>
            <main className={styles.content}>
                {this.props.children}
            </main>
        </Auxiliary>
    );
};
};

export default Layout;