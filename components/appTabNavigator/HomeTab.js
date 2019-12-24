import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import CardComponent from '../CardComponent';
import uuidV4 from 'uuid/v4';

export default class HomeTab extends Component {
 constructor(props){
   super(props);
   this.state = {
    feeds: [],
    followings: [],
  }
 }

  // 스팀잇에서 가져온 피드를 컴퍼넌트의 마운팅 이전에 state에 저장
  componentDidMount(){
    // console.log('componentDidMount');
    this.fetchFeeds().then(feeds => {
      this.setState({ feeds });
    });
    this.fetchFollowing().then(followings => {
      this.setState({ followings });
    });
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor })=>(
      <Icon name='ios-home' style={{color:tintColor}} />
    )
  }

  // 스팀잇에서 피드를 가져오는 메소드 - kr 테그에서 최신글 15개를 가져옴
  fetchFeeds() {
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{ tag: "kr", limit: 15 }]
      ]
    };
    return fetch('https://api.steemit.com', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => json.result)
  }

  // 스팀잇에서 팔로잉 친구 가져와서 출력하는 메소드
  fetchFollowing() {
    const data = {
      id: 2,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "follow_api",
        "get_following",
        ["anpigon", "", "blog", 10]
      ]
    };
    
    return fetch('https://api.steemit.com', 
    { 
      method: 'POST', body: JSON.stringify(data) 
    })
    .then(res => res.json())
    .then((json)=>{ console.log('data', data); return json})
    .then(json => json.result.map(({following}) => following))
  }

  render() {
    const { feeds, followings } = this.state;
    console.log('followings in HomeTab: ', followings)
    return (
      <Container style={styles.container}> 
      <Header style={{marginTop: 25}}>
        <Left><Icon name='ios-camera' style={{paddingLeft: 10}} /></Left>
        <Body><Text style={{textAlign: 'center'}}>Instagram</Text></Body>
        <Right><Icon name='ios-send' style={{paddingRight: 10}} /></Right>
      </Header>
        <View style={{ height: 100 }}>
          <View style={styles.storyHeader} >
              <Text>Stories</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name='md-play' style={{fontSize: 14}} />
              <Text>Watch All</Text>
            </View>
          </View>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center', paddingStart: 5, paddingEnd: 5}}
          >
            {
              followings.length > 0
              ? followings.map(following => 
                <Thumbnail
                  key = {uuidV4()}
                  style = {{ marginHorizontal: 5 }} 
                  source = {{ uri: `https://steemitimages.com/u/${following}/avatar` }} />
              )
              : console.log('folowings is empty')
            }
          </ScrollView>
        </View>
        <Content>
          {
            feeds.length > 0
            ? feeds.map( feed => <CardComponent key={ feed.post_id }  data={ feed } /> )
            : console.log('feeds is empty')
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyHeader:{
    marginHorizontal: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});