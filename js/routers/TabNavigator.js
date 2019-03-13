import React, { Component } from 'react'
import { Text, View } from "react-native";
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStackNavigator from "./HomeStackNavigator";
import DanhBaStackNavigator from "./DanhBaStackNavigator";
import ChatStackNavigator from "./ChatStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ProfileForm from "../containers/ProfileContainer"

export default TabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) =>
          (
            <Icon
              name='home'
              color={tintColor}
              size={24}
            />
          ),
        title: "Trang chủ"
      }
    },
    DanhBaScreen: {
      screen: DanhBaStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) =>
          (
            <Icon
              name='list-alt'
              color={tintColor}
              size={24}
            />
          ),
        title: "Danh bạ"
      },
    },
    ChatScreen: {
      screen: ChatStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) =>
          (
            <Icon
              name='wechat'
              color={tintColor}
              size={24}
            />
          ),
        title: "Chat"
      },
    },
    ProfileScreen: {
      screen: ProfileForm,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) =>
          (
            <Icon
              name='user'
              color={tintColor}
              size={24}
            />
          ),
        title: "Cá nhân"
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#5bc0de',
      //inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        //backgroundColor: '#444444'
      },
    }
  }
);
