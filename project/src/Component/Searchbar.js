import React,{Component} from 'react';
import './Searchbar.css';
import Loadingfunc from './Loadingfunc';
import Searchedcurr from './Searchedcurr';
 class Searchbar extends Component{
    state={
        yupp: false,
        currs: [],
        curr_name:'',
        api_fetched: false,
        searched_curr:[],
    }
    searchEvent =(e) =>
    {
        this.setState({
           [e.target.name]: ((e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1))
        });
        console.log(this.state.curr_name);
    }
    handleSubmit =(e) =>
    {
        e.preventDefault();
        let coin_id = this.state.currs.filter(coin =>{
            return coin.name===this.state.curr_name;
        }
            );
            console.log(coin_id);
            var xhr= new XMLHttpRequest();
            xhr.open("GET","https://api.coingecko.com/api/v3/coins/"+coin_id[0].id+"");
            xhr.send();
            var data;
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                 data=JSON.parse(xhr.responseText);//changing the data into json format
                 console.log(data);
                 this.setState({searched_curr:data,api_fetched: true});            
                }
              };
            }
     render()
     {
         return(
             <div>
             {this.state.yupp ?
             (
             <div className="header">
                 <h1>Crypto Wiki</h1>
                <form>
                    <div><input className="search-input mb-2" type="text" placeholder="Enter the Crypto Currency Name" name="curr_name" value={this.state.value} onKeyUp={this.searchEvent}  />
                    <button className="btn btn-success" type="button"  onClick={this.handleSubmit}>Get Info About Coin</button>
                    </div>
                </form>

                {this.state.api_fetched ? (<Searchedcurr api_data={this.state.searched_curr}  />) : (<p><b>Search For a Coin</b></p>)}

             </div>)
             :
             (
                  <Loadingfunc />
             )}
             
             </div>
         );
         //in this we used a yupp (initialised as false)such data when api is fetched only then html code should be rendered 
         
     }
     async componentDidMount()
    {
        const url= "https://api.coingecko.com/api/v3/coins/list";
        const res= await fetch(url);
        const data =await res.json();
        console.log(data);
        this.setState({currs:data,yupp: true});
        
    }
 }
 export default Searchbar;