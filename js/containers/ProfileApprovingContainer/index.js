import React, { Component} from 'react';
import { Container, Content, Header, Picker, Form, Item, Input, Icon, Button, Text, Left, Right, Body } from 'native-base';
import { View ,TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { getProfiles } from "./redux/actions";
import { connect } from "react-redux";
import { ListItem, SearchBar } from 'react-native-elements';

class ProveChildMenuContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      isFetching : true,
      selected: "key1",
    };
    this.arrayholder = [];
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Hồ sơ cá nhân',
      headerStyle: {
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '90%',
        textAlign: 'center',
      },

    }
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = item.toUpperCase();
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  renderHeader = () => {    
    return (      
      <SearchBar        
        placeholder="Type Here..."        
        lightTheme        
        round        
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}             
      />    
    );  
  };

  UNSAFE_componentWillReceiveProps(newProps){
    console.log('Will Mount');
    if(newProps.profiles){
      const { isFetching, data } = newProps.profiles;
      const recordProfiles = Object.values(data)[0];
      if(recordProfiles){
        this.setState({
          data:recordProfiles.records,
          isFetching:isFetching,
        })
      }
    }
  }
  componentDidMount() {
    const params = {
      parent_menu: null
    };  
    this.props.getProfiles(params);
  }
  // onValueChange(value) {
  //   this.setState({
  //     selected: value
  //   });
  // }
  
  // _onPress = (record) => {

  // }
  // _onRenderItem = (record) => {
  //   return (
  //     <TouchableOpacity onPress={() => this._onPress(record)} key={record.vnpt_ma_nhan_vien}>
  //       <Content  style={{marginBottom:5}}>
  //         <ListItem icon>
  //           <Body>
  //             <Text>{record.name}</Text>
  //             <Text>{record.vnpt_ma_nhan_vien}</Text>
  //           </Body>
  //           <Right>
  //             <Button style={{ backgroundColor: "#FF9501" }}>
  //                 <Text>{record.status_edition}</Text>
  //               </Button>
  //           </Right>
  //         </ListItem>
  //       </Content>
  //     </TouchableOpacity>
  //   )
  // }

  render() {
    if (this.isFetching) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
    else {
      if (this.data) {
        // const records = (recordProfiles.records).map((record) =>      
        //   this._onRenderItem(record)
        // );
       return(
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name}`}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
      );
          {/* <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Text>Danh mục cần xem:</Text>
        <Form>
            <Picker
              mode="dropdown"
              iosHeader="Chọn trạng thái"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Soạn thảo" value="key0" />
              <Picker.Item label="Chờ xác nhận" value="key1" />
              <Picker.Item label="Đã xác nhận" value="key2" />
            </Picker>
        </Form>  
        <ScrollView>
        {
          records
        }
        </ScrollView>
       
      </Container> */}
      //  );
      }
      else{
        return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        );
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getProfiles: (params) => dispatch(getProfiles(params), () => {
    if(newProps.profiles){
      const { isFetching, data } = newProps.profiles;
      const recordProfiles = Object.values(data)[0];
      if(recordProfiles){
        this.setState({
          data:recordProfiles.records,
          isFetching:isFetching,
        })
      }
    }
  })
});
const mapStateToProps = state => ({
  auth: state.auth,
  profiles: state.profiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProveChildMenuContainer);

const styles = StyleSheet.create({

});