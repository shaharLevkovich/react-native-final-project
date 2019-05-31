import React from 'react'
import { Text,ImageBackground,View, StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import Reviews from '../components/reviews'
import MarvelUniverse from '../components/marvelUniverse'


export default class movieInfo extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            isVisible:true,
            isReturn:true,
            current_movie:null
        }
    }
    // componentDidMount(){
    //     fetch('https://api.themoviedb.org/3/keyword/180547/movies?api_key=d9bc9e10056632a1a74c8260d60d105d&language=en-US&include_adult=false&page=1')
    //     .then(res => res.json())
    //     .then(data => this.setState({marvel_movies:data.results}, ()=>{}))
    //     fetch('https://api.themoviedb.org/3/keyword/180547/movies?api_key=d9bc9e10056632a1a74c8260d60d105d&language=en-US&include_adult=false&page=2')
    //     .then(res => res.json())
    //     .then(data => this.setState({ marvel_movies: [...this.state.marvel_movies, data.results[0], data.results[1], data.results[2]] }, ()=> console.log(this.state.marvel_movies)))
    // }
    render() {
        return(
        <View style={{marginTop: 5}}>
        {this.state.isReturn?
            this.state.isVisible?
        <View>
            <TouchableOpacity
                  onPress={() => {
                    this.setState({isReturn:false})
                  }}

            ><ImageBackground source={require('../images/go-back-arrow.png')} style={{height:30, width:30, position:'absolute', top:450}} />
            </TouchableOpacity>

            <ImageBackground source={{uri: `http://image.tmdb.org/t/p/w185/${this.props.data.poster_path}`}} style={{height:150, width:120, position:'absolute', left:270}} />
            <Text style={{color:'white', fontSize:24,width:250}}>{this.props.data.title}{'\n'}</Text>
            <Text style={{color:'white', fontSize:18}}>Release date: {this.props.data.release_date}{'\n'}</Text>
            <Text style={{color:'white', fontSize:18}}>Rating: {this.props.data.vote_average}{'\n\n'}</Text>
            <Text style={{color:'white', fontSize:18}}>Summary: {this.props.data.overview.slice(0,300)}</Text>
            <TouchableOpacity style={{backgroundColor: 'red', width: 100,height:30,positin:'absolute',top:70, left: 150,borderRadius:10}}onPress={()=>{
                this.setState({isVisible:false})
                this.setState({current_movie:this.props.data.id})}
                }><Text style={{color:'white', fontSize:24, textAlign:'center'}}>Reviews</Text></TouchableOpacity></View>:<View><Reviews data={this.state.current_movie}/></View>:
            <View><MarvelUniverse/></View>}  
        </View>
        )
    }
}