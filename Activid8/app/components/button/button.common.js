// app/components/button.common.js

import firebaseApp from "../../services/firebase/firebaseService";

export default {
  getInitialState() {
    return {
      pressed: false
    };
  },

  handlePress() {
    this.setState({pressed: !this.state.pressed});

    //firebaseApp send item to App
    var db = firebaseApp().database();
    var ref = db.ref("test");
    var t = Math.round(new Date().getTime()/1000);
    var tmp = {};
    tmp[t] = 1;
    ref.update(tmp);
  }
};
