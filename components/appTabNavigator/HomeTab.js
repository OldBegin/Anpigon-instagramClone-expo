import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Container, Content, Icon, Thumbnail } from 'native-base';
import CardComponent from '../CardComponent';

export default class HomeTab extends Component {
 
  state = {
    feeds: [],
    followings: [],
  }

  // 스팀잇에서 가져온 피드를 컴퍼넌트의 마운팅 이전에 state에 저장
  componentWillMount(){
    
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
      jsonrc: "2.0",
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
    }).then(res => res.json())
      .then(resObj => resObj.result.map(({result}) => result))
  }

  render() {
    console.log('rendering : ', this.state)
    return (
      <Container style={styles.container}> 
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
              this.state.followings.map(following => 
                <Thumbnail 
                  style = {{ marginHorizontal: 5 }} 
                  source = {{ uri: `https://steemitimages.com/u/${following}/avatar` }} />
              )
            }
          </ScrollView>
        </View>
        <Content>
          {
            this.state.feeds.map( feed => <CardComponent key = { feed.post_id }  data = { feed } /> )
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