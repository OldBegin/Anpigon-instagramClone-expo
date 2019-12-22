import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Container, Content, Icon, Thumbnail } from 'native-base';
import CardComponent from '../CardComponent';

export default class HomeTab extends Component {
 
  state = {
    feeds: [],
  }

  componentWillMount(){
    console.log('before Mount: ', this.state)
    this.fetchFeeds().then(feeds => {
      this.setState({ feeds });
    });
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor })=>(
      <Icon name='ios-home' style={{color:tintColor}} />
    )
  }

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
      .then(res => res.json())
      .then(res => res.result)
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
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/newbijohn/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/jacobyu/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/blockchainstudio/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/gomdory/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/bbooaae/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/codingman/avatar' }} />
            <Thumbnail style = {{marginHorizontal: 5}} source={{ uri: 'https://steemitimages.com/u/bukio/avatar' }} />
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
