# Anpigon-instagramClone-expo
인스타그램 클론 강좌 예제 시작(12/20)

## 라이브러리
for cli
```js
$ yarn add native-base         // ui library
$ yarn add @expo/vector-icons  // ui library
$ yarn add react-navigation    // navigation library
$ yarn add react-native-gesture-handler //navigation 의존성 라이브러리
$ yarn add react-navigation-stack //navigation 의존성 라이브러리
```
for expo cli
```js
expo install
react-navigation               //navigation
react-native-gesture-handler   //dependency for navigation
react-native-reanimated        //dependency for navigation
react-native-screens           //dependency for navigation
react-navigation-stack         //dependency for navigation
@expo/vector-icons             //ui library
native-base                    //ui libreary 
출처: https://eso0609.tistory.com/88 [엄코딩의 개발 일지]
```
## 사용한 라이브러리 및 기능들
   
#### createMaterialTopTabNavigator 사용
createBottomTabNavigation 에 페이지넘김 애니메이션이 추가된 라우팅 라이브러리임.   
첫번째 인수에는 라우팅스크린을 설정하고, 두번째 인수에 옵션을 설정할 수 있음.   

```js
const AppTabNavigator = createMaterialTopTabNavigator({
     HomeTab: { screen: HomeTab },
     SearchTab: { screen: SearchTab },
   },
   {
     swipeEnabled: true,         //스와이프로 화면전환할수 있다. 디폴트는 false 이다.
     tabBarPosition: "bottom",   //tabBar 의 위치를 Bottom으로 설정
     tabBarOptions:{
       style: {
         ...Platform.select({
           ios:{
             backgroundColor: 'white',
           },
           android: {
             backgroundColor: 'white',
           },
         })
       },
       ...Platform.select({
         android:{
           bounces: true,
         },
       }),
       upperCaseLabel: false,           // 탭문자를 소문자로 지정한다  디폴트는 : true
       showIcon: true,                  // 아이콘을 보여준다.
       showLabel: false,                // 탭문자레이블을 보여준다 디폴트는 : ture
       iconStyle: { height: 50 },
       activeTintColor: '#000',         // 선택되었을때의 컬러
       inactiveTintColor: '#d1cece',    // 선택되지 않았을때의 컬러
  },
})
```

   
#### native-base 의 컴퍼넌트를 사용
native-base의 ui에서 <Icon> 컴퍼넌트를 가져와서 navigationOptions 내부에 아이콘으로 적용하는등,
  ui 라이브러리를 다양하게 사용함.

- Icon
- Container
- Content
- Card
- CardItem
- Button
- Left
- Right
- Thumbnail
   
#### fetch
외부의사이트의 api를 가져와서 컴퍼넌트에 적용하여 랜더링


