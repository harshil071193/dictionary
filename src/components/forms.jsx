import React from "react";

class Forms extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:null,
            result:null
        }
    }

    handleChange=(e)=>{
        e.preventDefault();
        this.setState({word:e.target.value})
    }
    handleResult=(e)=>{
        e.preventDefault();
        const rawUrl="https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+this.state.word;
        const url=rawUrl;
        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "19b81f702fmsh49626b38fb9a889p15ac00jsnbad1fd1580ba"
            }
        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        
        .then(data=>{
            console.log(data)
            this.setState({result:data.list});
        })

        .catch(err => {
            console.error(err);
        });
    }
    render(){
        console.log("word",this.state.word)
        return(
            <div className="form">
                <div className="serch">
                    <input type="text" placeholder="enter word" onChange={this.handleChange} />
                    <button onClick={this.handleResult}>Search</button>
                </div>
                
                {
                    this.state.result!==null && this.state.result.length!==0 ?
                    this.state.result?.slice(0,1)?.map((item)=>(
                        <h3>{item?.definition}</h3>
                    ))
                    :
                    <></>
                }
            </div>
        )
    }
}

export default Forms;