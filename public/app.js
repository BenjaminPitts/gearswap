class App extends React.Component {

  state = {
    type: '',
    make: '',
    model: '',
    condition: '',
    price:'',
    seller:'',
    image:'',
    gear:[],

  }
  handleChange =  (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }
    handleSubmit = event => {
  event.preventDefault()
  axios
    .post('/gearswap', this.state)
    .then(response =>
      this.setState({ gear: response.data,type: '',
      make: '',
      model: '',
      condition: '',
      price:'',
      seller:'',
      image:''  })
    )
}

deleteGear = (event) => {
  axios.delete('/gearswap/' + event.target.value).then((response) => {
    this.setState({
      gear: response.data,
    })

  })

}

updateGear = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/gearswap/' + id, this.state).then((response) => {
    this.setState({
      gear: response.data,
      type: '',
      make: '',
      model: '',
      condition: '',
      price:'',
      seller:'',
      image:'',
    })
  })
}

showStats=(event)=>{
  event.preventDefault()
  let stats = this.state.showStats
  axios.get('/gearswap/' + event.target.id).then((response)=>{

      if(stats){
        this.setState({
          showStats:false,
          gear: response.data
        })
      }else{
        this.setState({
          showStats:true,
          gear: response.data
        })
      }
  })
}

componentDidMount = () => {
  axios.get('/gearswap').then((response) => {
    this.setState({
      gear: response.data,
    })
  })
}

render = () => {
        return <div className='main'>
            <h1>Gear Swap</h1>

            <h2><i>Rent some gear for the studio or an upcoming gig!</i></h2>
            <br />


            <div className='create'>
            <section id="add">
            <h6> *Required</h6>

                <form className='formi'onSubmit={this.handleSubmit}>
                    <label htmlFor="type">Type  </label>

                    <input required placeholder="What kind of Gear.."type="text" id="type" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="make">Make</label>
                    <input placeholder="What Make.."type="text" id="make" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="model">Model</label>
                    <input placeholder="What Model.."type="text" id="model" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="condition">Condition</label>
                    <input placeholder="How's it look ..."type="text" id="condition" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="price">Rental Price</label>
                    <input placeholder="How Much You Ask Daily.."type="text" id="price" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="seller">Seller Email:</label>
                    <input placeholder="Please Add You contact.."type="text" id="seller" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="image">Picture</label>
                    <input placeholder="Do You Have A Picture.."type="url" id="image" onChange={this.handleChange}/>
                    <br/>

                    <input type="submit" value="Add Gear" />

                </form>
                </section>
                </div>
                <br />
            <section id="mid">
            <button value={this.state._id} onClick={this.showStats}>Show Details</button>
            <br />
            <div className='itemBox'>
                {this.state.gear.map((gears) => {
                    return <div className='item' key={gears._id}>


                        <img src={gears.image} />

                        <h4>{ this.state.showStats ? 'Type: ' + gears.type : null }</h4>
                        <h4>{ this.state.showStats ? 'Make: ' + gears.make : null }</h4>
                        <h4>{ this.state.showStats ? 'Model: ' + gears.model : null }</h4>
                        <h4>{ this.state.showStats ? 'Condition: ' + gears.condition : null }</h4>
                        <h4>{ this.state.showStats ? 'Price: ' + gears.price : null }</h4>
                        <h4>{ this.state.showStats ? <a href={'mailto:' + gears.seller}>Seller: {gears.seller}</a> : null }</h4>


                        <button value={gears._id} onClick={this.deleteGear}>Remove</button>
                        <br/>
                        <details>
                            <summary>Edit {gears.type} Details</summary>
                            <form id={gears._id} onSubmit={this.updateGear}>

                                <label htmlFor="type">Type</label>
                                <br />
                                <input
                                type="text"
                                id="type"
                                defaultValue={gears.type}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="make">Make</label>
                                <br/>
                                <input
                                type="text"
                                id="make"
                                defaultValue={gears.make}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="model">Gear Model</label>
                                <br />
                                <input
                                type="text"
                                id="model"
                                defaultValue={gears.model}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="condition">Condition</label>
                                <br />
                                <input
                                type="text"
                                id="condition"
                                defaultValue={gears.condition}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="price">Rental Price</label>
                                <br />
                                <input
                                type="text"
                                id="price"
                                defaultValue={gears.seller}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="seller">Seller</label>
                                <br />
                                <input
                                type="text"
                                id="seller"
                                defaultValue={gears.seller}
                                onChange={this.handleChange}
                                />
                                <br />

                                <label htmlFor="image">Picture</label>
                                <br />
                                <input
                                type="text"
                                id="image"
                                defaultValue={gears.image}
                                onChange={this.handleChange}
                                />
                                <br />

                                <input type="submit" value="Update Details" />
                            </form>
                        </details>

                    </div>
                })}
                </div>

            </section>
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
