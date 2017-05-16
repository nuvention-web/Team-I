
  pickcontainer : {
    marginLeft: 20,
    width: 100,
    height: 150,
    marginTop: -75
  },
  viewContainer: {
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});

        <Text style={styles.header}> Age: </Text>
        <TextInput
        style={{height: 40, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight: 20}}
        onChangeText={(age) => this.setState({age})}
        value={this.state.age}
        keyboardType={'number-pad'}
        maxLength={2}
        />
        <Text style={styles.header}> Bio: </Text>
        <TextInput
        multiline = {true}
        numberOfLines = {3}
        style={{height: 100, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight: 20}}
        onChangeText={(bio) => this.setState({bio})}
        value={this.state.bio}
        maxLength={140}
        />
          {/* </View>
          <View style={{height: 200, width: 100}}> */}
          <Text style={styles.header}> Interested in: </Text>
          <Picker
            style={styles.pickcontainer}
            selectedValue={this.state.interestedIn}
            onValueChange={(interestedIn) => this.setState({interestedIn: interestedIn})}>
            <Picker.Item label="Men" value="man" />
            <Picker.Item label="Women" value="woman" />
          </Picker>
          {/* </View>
        </View> */}
        <Button
            containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
            style={{fontSize: 14, color: "white"}}
            onPress={()=>{
              var userObj = {};
              userObj.age = this.state.age;
              userObj.bio = this.state.bio;
              userObj.gender = this.state.gender;
              userObj.interestedIn = this.state.interestedIn;
              saveFirebaseUser(userObj).then((val)=>{
                console.log("Successfully updated user");
                // Actions.pop({refreshme: true});
                // Actions.pop({ refresh: { refreshme: true } });
                // Actions.myProfile({type: "reset"});
                // Actions.pop({ type: "refresh" })
                Actions.pop({ refresh: { refreshing: true }})
              }, (err)=> {console.log(err);});
            }}
            accessibilityLabel="Save Changes"
          >
            Save Changes
        </Button>
  pickcontainer : {
    marginLeft: 20,
    width: 100,
    height: 150,
    marginTop: -75
  },
  viewContainer: {
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});
