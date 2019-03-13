import React from "react";
import { Button, Image, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { getMenu2 } from "./redux/actions";
import { connect } from "react-redux";
import { FlatGrid } from 'react-native-super-grid';;
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';


class ChildMenuContainer extends React.Component {
  componentWillMount() {
    // this.props.navigation.setParams({ menuPath: null });
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    // const menuPath = params && params.menuPath;    
    return {
      /*headerRight:
        <View>
          <TouchableOpacity>
            <Text>{menuPath}</Text>
          </TouchableOpacity>
        </View>
      ,*/
      title: params.tenmenu,
      headerStyle: {
        //backgroundColor: '#333',
      },
      //headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '90%',
        //textAlign: 'center',
      },

    }


  }
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    
    //if (_.isEmpty(this.props.menu.data)) {
    if (true) {  
      const { navigation } = this.props;
      const parent_menu = navigation.getParam('parent_menu', null);
      const params = {
        parent_menu : parent_menu
      };
      this.props.getMenu(params);
    }

   
  }
  _onPress = (item) => {
    // const params = {
    //   parent_menu: item.mamenu,
    // };   
    this.props.navigation.navigate('ProfileApproving', {
      parent_menu: item.mamenu,
      tenmenu: item.tenmenu
    }); 
  }

  randomColor() {
    const items = ['#8e44ad', '#f39c12', '#9b59b6', '#2ecc71', '#1abc9c', '#e67e22', '#7f8c8d', '#16a085', '#1abc9c', '#3498db', '#9b59b6', '#2980b9', '#e67e22', '#7f8c8d', '#f39c12', '#34495e', '#2c3e50'];
    var random = items[Math.floor(Math.random() * items.length)]
    return random;
  }

  _onRenderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <View key={item.id} style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <View>
            <Image style={styles.poster} source={{ uri: item.menu_image_url }} />
          </View>
          <Text style={styles.itemName}>{item.tenmenu}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    //console.log(this.props.menu);
    const { isFetch, data } = this.props.menu;
    //console.log(data.menus);
    if (isFetch) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      )
    }
    else {
      if (data.menus != undefined) {
        //console.log(data.menus);
        let arr = [...data.menus];

        //let arr = [...data.menus, ...data.menus];
        //arr = [...arr, ...arr];
        //arr = [...arr, ...arr];

        arr.map((y) => {
          return (y["code"] = this.randomColor());
        })

        //console.log(arr);
        return (
        
            <FlatGrid
              itemDimension={(Dimensions.get('window').width - (30 + 2 * 4)) / 4}
              items={arr}
              style={styles.gridView}
              fixed={false}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={({ item }) => this._onRenderItem(item)}
            />
          
        );
      }
      else {
        return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        )
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getMenu: (params) => dispatch(getMenu2(params)),
});
const mapStateToProps = state => ({
  auth: state.auth,
  menu: state.menu2,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChildMenuContainer);


const styles = StyleSheet.create({
  gridView: {
    marginTop: 1,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});