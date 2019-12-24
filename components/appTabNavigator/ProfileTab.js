import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import {Icon, Container, Content, Header, Left, Right, Body, Button} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

//const {width} = Dimensions.get('window');

export default class ProfileTab extends Component {

  constructor(props){
    super(props);
    this.state={
      profile: {},
      userName: '',
      postCount: 0,
      followingCount: 0,
      followerCount: 0,
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='ios-person' style={{ color: tintColor }} />
    )
  }
  componentDidMount() {

    const username = 'anpigon'; // 내 계정명
    this.fetchAccount(username)
    .then(({name, post_count, json_metadata}) => {
      const { profile } = JSON.parse(json_metadata);
      this.setState({
        userName: name, 
        postCount: post_count,
        profile: profile
      })})

    this.fetchFollowCount(username)
    .then(({ following_count, follower_count }) => {
      this.setState({
        followingCount: following_count, // 팔로잉 수
        followerCount: follower_count // 팔로워 수
      }, console.log('followData', following_count))
    });
  }
  fetchAccount(username) {
    const data = {
      id: 3,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_accounts",
        [[username]]
      ]
    };
    return fetch('https://api.steemit.com', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result[0])
  }

  fetchFollowCount(username){
    const data = {
      id: 4,
      jsonrpc: "2.0",
      method: "call",
      params:[
        "follow_api",
        "get_follow_count",
        [username],
      ],
    };
    return fetch('https://api.steemit.com',{
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(res => res.json() )
    .then(resJson => resJson.result );
  }

  render() {
    const { 
      profile,
      userName, 
      postCount, 
      followerCount,
      followingCount, } = this.state;
  
    return (
      <Container style={{ flex: 1, backgroundColor: 'white' }}>
        <Header>
          <Left><Icon name='md-person-add' style={{ paddingLeft: 10 }} /></Left>
          <Body><Text>나그네</Text></Body>
          <Right><EntypoIcon name='back-in-time' style={{ paddingRight: 10, fontSize: 32 }} /></Right>
        </Header>
        <Content>
          <View style={styles.topMainView}>
            <View style={styles.leftThumbnail}>
              <Image source={{url: profile.profile_image}} style={{width:75, height:75, borderRadius:37.5}} />
            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
              <View style={styles.countContainer}>
                <View style={{alignItems: 'center'}}>
                  <Text>{postCount}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>posts </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{followerCount}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>follower </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{followingCount}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>following </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                <Button borderd light style={styles.buttonEditProfile}>
                  <Text>Edit Profile</Text>
                </Button>
                <Button borderd light small icon style={styles.buttonSetting} >
                  <Icon name='settings' />
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.bottomMainView}>
            <Text>{userName}</Text>
            <Text>{profile.about}</Text>
            <Text>{profile.website}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles= StyleSheet.create({
  topMainView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    height: 100,
    // borderWidth: 0.5,
    // borderColor: '#5a5a5a',
  },
  leftThumbnail:{
    flex: 1, 
    alignItems: 'center', 
    paddingLeft: 10, 
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#5a5a5a',
  },
  countContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: 270,
    // borderColor: 'black', 
    // borderWidth: 0.5, 
  },
  buttonEditProfile:{
    flex:4,
    marginLeft: 10,
    justifyContent: 'center',
    height: 30,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  buttonSetting: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    height: 30,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#5a5a5a',
  },
  bottomMainView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    // borderWidth: 0.5,
    // borderColor: '#5a5a5a',
  }
})