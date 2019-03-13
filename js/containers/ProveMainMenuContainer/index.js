import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';

class ProveMainMenuContainer extends Component {

    _onPress = () => {
      
        this.props.navigation.navigate('ChildMenuScreen');

        //console.log(item.mamenu);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Vào đây để phê duyệt</Text>
                <Button
                    title="Confirm Profile Screen"
                    onPress={this._onPress}
                />
            </View>
        )
    }
}

export default ProveMainMenuContainer;
