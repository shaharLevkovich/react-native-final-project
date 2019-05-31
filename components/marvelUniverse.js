import React from 'react'
import { ImageBackground,TouchableOpacity,View, StyleSheet } from 'react-native'
import MovieInfo from '../components/movieInfo'
const styles = StyleSheet.create({
    list: {
        height:300,
        width:200,
        borderWidth:1,
        backgroundColor:'black',
    },
    img: {
        width:200,
        height:300
    },
    container: {
        
        flex:1,
        flexDirection: 'row',
        width:400,
        flexWrap: 'wrap',
    },
    logo:{
        marginTop:20,
        height:130,
        width: 400
    
    }
})
export default class marvelUniverse extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            isVisible: true,
            marvel_movies:[],
            current_movie:{}
        }
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/keyword/180547/movies?api_key=d9bc9e10056632a1a74c8260d60d105d&language=en-US&include_adult=false&page=1')
        .then(res => res.json())
        .then(data => this.setState({marvel_movies:data.results}, ()=>{}))
        fetch('https://api.themoviedb.org/3/keyword/180547/movies?api_key=d9bc9e10056632a1a74c8260d60d105d&language=en-US&include_adult=false&page=2')
        .then(res => res.json())
        .then(data => this.setState({ marvel_movies: [...this.state.marvel_movies, data.results[0], data.results[1], data.results[2]] }, ()=> console.log("hiii")))
    }
    render() {
        return(
        <View style={styles.container}>
            {this.state.isVisible?
            this.state.marvel_movies.map(item => (
              <View key={item.id} style={styles.list}>
              
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isVisible:false})
                    this.setState({current_movie:item})
                  }}
                >
                  <ImageBackground source={{uri: `http://image.tmdb.org/t/p/w185/${item.poster_path}`}} style={styles.img} />
                </TouchableOpacity>
            </View>)):
                <View>
                <MovieInfo data={this.state.current_movie}/>
                </View>
            
            }
        </View>
        )
    }
}
