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


