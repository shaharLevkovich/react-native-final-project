import React from 'react'
import { Text,ImageBackground,View, StyleSheet,TouchableOpacity} from 'react-native'
import ReadMore from 'react-native-read-more-text'
import MarvelUniverse from './marvelUniverse';

export default class reviews extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            isVisible:true,
            isReturn:true,
            reviews:[],
            movie_name:null
        }
        this._renderRevealedFooter=this._renderRevealedFooter.bind(this)
        this._renderTruncatedFooter=this._renderTruncatedFooter.bind(this)
    }
    componentDidMount(){
        fetch(`http://api.themoviedb.org/3/movie/${this.props.data}/reviews?api_key=d9bc9e10056632a1a74c8260d60d105d`)
        .then(res => res.json())
        .then(data => this.setState({reviews:data.results}, ()=>console.log(this.state.reviews)))
        fetch(`https://api.themoviedb.org/3/movie/${this.props.data}?api_key=d9bc9e10056632a1a74c8260d60d105d&language=en-US`)
        .then(res => res.json())
        .then(data => this.setState({movie_name:data.title}, ()=>console.log(this.state.movie_name)))
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: 'red',fontSize:16, marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
    
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: 'red',fontSize:16, marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
      }
    
    render() {
        return(
        <View style={{marginTop: 5}}>
        {this.state.isReturn?
        <View>
        <TouchableOpacity
                  onPress={() => {
                    this.setState({isReturn:false})
                  }}

            ><ImageBackground source={require('../images/go-back-arrow.png')} style={{height:30, width:30}} />
            </TouchableOpacity>
        <Text style={{color:'white', fontSize:30, fontWeight:'bold', textAlign:'center'}}>{this.state.movie_name} Reviews</Text>
        {this.state.reviews.map(item => (
              <View key={item.id} style={{marginTop: 10}}>

              <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>Author: {item.author}</Text>

              <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <Text style={{color:'white', fontSize:16}}>
                {item.content}
              </Text>
            </ReadMore>
        </View>))}</View>:<View><MarvelUniverse/></View>}
        </View>
        )
    }
}