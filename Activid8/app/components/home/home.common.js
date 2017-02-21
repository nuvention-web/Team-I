// app/components/button.common.js

///Didnt figure out how to make common for this component since it's basically the same file for both ios and android
///(still kept separate for both because havent tested on android)
//
//
//
// export default {
//   getInitialState() {
//     return {
//       cards: Cards,
//       outOfCards: false
//     }
//   },
//   handleYup (card) {
//     console.log("yup")
//   },
//   handleNope (card) {
//     console.log("nope")
//   },
//   cardRemoved (index) {
//     console.log("The index is ${index}");
//
//     let CARD_REFRESH_LIMIT = 3
//
//     if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
//       console.log("There are only ${this.state.cards.length - index - 1} cards left.");
//
//       if (!this.state.outOfCards) {
//         console.log("Adding ${Cards2.length} more cards");
//
//         this.setState({
//           cards: this.state.cards.concat(Cards2),
//           outOfCards: true
//         })
//       }
//
//     }
//
//   }
// };
