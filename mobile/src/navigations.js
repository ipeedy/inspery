import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import { colors } from './utils/constants';

const AppMainNav = StackNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
  cardStyle: {
    backgroundColor: '#F1F6FA',
  },
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: colors.WHITE
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.SECONDARY
    }
  })
});

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    })
    return <AppMainNav navigation={nav} />
  }
}

export default connect(state => ({
  nav: state.nav
}))(AppNavigator);

export const router = AppMainNav.router;
