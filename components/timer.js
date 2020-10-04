import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import moment from "moment"
export default class App extends React.Component {

  state={
    eventDate:moment.duration().add({hours:0,minutes:1,seconds:30}), // add 9 full days
    hours:0,
    mins:0,
    secs:0
  }

  componentDidMount(){
    this.updateTimer()
  }
  updateTimer=()=>{
    
    const x = setInterval(()=>{
      let { eventDate} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)

  }
  render(){
    const { hours, mins, secs } = this.state
    return (
      <View>
        <Text style={{fontWeight:"bold",fontSize:20,color:"#50010C"}}></Text>
        <Text style={{fontWeight:"bold",fontSize:50,marginBottom:50,textAlign: 'center'}}>{`${hours} : ${mins} : ${secs}`}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});