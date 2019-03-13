import React from "react";
import { Button, Image, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { getMenu } from "./redux/actions";
import { connect } from "react-redux";
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import * as api from "../../services/api";
class MainMenuContainer extends React.Component {

  //Test API
  constructor(props) {
    super(props);
    this.state = {  // Khởi tạo state cho ứng dụng
      isLoading: true, // sử dụng để tạo màn hình loading khi dữ liệu đang được get từ API về
      Data: [],  // mảng chứa data được get từ API coinmarketcap
      isRefreshing: false,  // state được sử dụng khi dùng chức năng Pull to Refresh
    }
  }
  //End
  componentWillMount() {
    //this.props.navigation.setParams({ menuPath: null });

  }
  static navigationOptions = ({ navigation }) => {
    //const { params } = navigation.state;
    //const menuPath = params && params.menuPath;
    //console.log(params);
    return {
      /*headerRight:
        <View>
          <TouchableOpacity>
            <Text>{menuPath}</Text>
          </TouchableOpacity>
        </View>
      ,*/
      title: "Trang chủ",
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
  getData = () => {  // Hàm để get data
    this.setState({ isRefreshing: true });  // Vì đang gọi API nên sẽ để bằng true
    const params={
      access_token : this.props.auth.access_token ,
      parent_menu: null
    }
    api.get(params,"get_menu") // Hàm được import từ thư mục networking
      .then(response => {
        this.setState({  // Get thành công dữ liệu từ API về thì ta setState cho các state tương ứng
          isLoading: false,  // Vì load thành công data nên sẽ gán giá trị false để không hiển thị Loading nữa
          Data: response.data, // Gán data vào Data state
          isRefreshing: false, // Hoàn thành lấy data từ API nên gán bằng false
        });
        console.log(this.state.Data);
      })
      .catch((e) => { // Get thất bại dữ liệu từ API thì ta setState cho các state tương ứng
        this.setState({
          isRefreshing: false,  // Dù get thành công hay thất bại thì đều dừng nên sẽ gán bằng false
          isLoading: false,  // ý nghĩa giống isRefreshing
          Data: []  // get thất bại nên sẽ để mảng rỗng, k có dữ liệu
        });
        console.log(e);
      })     
  };
  componentDidMount() {
    const params = {
      parent_menu: null
    };
    //console.log("12345")

    //START CHANGES
    this.props.getMenu(params);
    //END CHANGES

    //Test API
    //this.getData();
    //End
  }
  _onPress = (item) => {
    const params = {
      parent_menu: item.mamenu
    };
    this.props.getMenu(params);
    this.props.navigation.navigate('ChildMenuScreen', {
      parent_menu: item.mamenu,
      tenmenu: item.tenmenu
    });

    //console.log(item.mamenu);
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
    console.log(data.menus);
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

        //START CHANGES
        //let arr = [...data.menus, ...data.menus];
        let arr = [...data.menus];
        //END CHANGES

        //START CHANGES
        //arr = [...arr, ...arr];
        //arr = [...arr, ...arr];
        //END CHANGES

        arr.map((y) => {
          return (y["code"] = this.randomColor());
        })
        
        let arr2=[...this.state.Data];
        arr2.map((y) => {
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
  getMenu: (params) => dispatch(getMenu(params)),
});
const mapStateToProps = state => ({
  auth: state.auth,
  menu: state.menu,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenuContainer);


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