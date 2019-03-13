import React, { Component } from 'react'
import { Text, View } from "react-native";
import MainMenuContainer from "../containers/MainMenuContainer";
import ChildMenuContainer from "../containers/ChildMenuContainer";
import ProfileApprovingContainer from "../containers/ProfileApprovingContainer"
import { createStackNavigator } from 'react-navigation';
const HomeStackNavigator = createStackNavigator(
    {
        MainMenuScreen:
        {
            screen: MainMenuContainer
        },
        ChildMenuScreen:
        {
            screen: ChildMenuContainer
        },
        ProfileApproving : {
            screen: ProfileApprovingContainer
        }
    },
    {
        initialRouteName: "MainMenuScreen",
    }
)
export default HomeStackNavigator;