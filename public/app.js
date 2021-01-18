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
  axios.post('/gearswap', this.state)
    .then(response =>
      this.setState({
      gear: response.data,
      type: '',
      make: '',
      model: '',
      condition: '',
      price:'',
      seller:'',
      image:''
    })
  )
}

deleteGear = (event) => {
  axios.delete('/gearswap/' + event.target.value)
  .then((response) => {
    this.setState({
      gear: response.data
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
  axios.get('/gearswap/' + event.target.id, this.state).then((response)=>{

      if(stats) {
        this.setState({
          showStats:false,
          gear: response.data
        })
      } else {
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
      gear: response.data
    })
  })
}

render = () => {
        return <div className='main'>
            <h1 id='top'>Gear Swap</h1>
            <h2><i>Rent some gear for the studio or an upcoming gig!</i></h2>
            <br />

            <div className='create'>
            <section id="add">

                <form className='formi'onSubmit={this.handleSubmit}>
                    <label htmlFor="type">Type:  </label>
                    <input required placeholder="What kind of Gear.."type="text" id="type" value={this.state.type} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="make">Make: </label>
                    <input placeholder="What Make.."type="text" id="make" value={this.state.make} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="model">Model: </label>
                    <input placeholder="What Model.." type="text" id="model" value={this.state.model} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="condition">Condition: </label>
                    <input placeholder="How's it look..."type="text" id="condition" value={this.state.condition} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="price">Rental Price $</label>
                    <input placeholder="Rental price per day" type="text" id="price" value={this.state.price} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="seller">Seller: </label>
                    <input placeholder="example@email.com" type="text" id="seller" value={this.state.seller} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="image">Image URL: </label>
                    <input placeholder="Post a pic"type="url" id="image" value={this.state.image} onChange={this.handleChange}/>
                    <br/>
                    <input type="submit" value="Post Gear" />

                </form>
                </section>
                </div>
                <br />

            <section id="mid">

            <br />
            <div className='itemBox'>
                {this.state.gear.map((gears) => {
                    return <div className='item' key={gears._id}>

                        <h2>Item: <i>{gears.type}</i></h2>
                        <img src={gears.image} /><br />
                        <button value={this.state._id} onClick={this.showStats}>
                        Show Details</button>

                        <h4>{ this.state.showStats ? 'Type: ' + gears.type : null }</h4>
                        <h4>{ this.state.showStats ? 'Make: ' + gears.make : null }</h4>
                        <h4>{ this.state.showStats ? 'Model: ' + gears.model : null }</h4>
                        <h4>{ this.state.showStats ? 'Condition: ' + gears.condition : null }</h4>
                        <h4>{ this.state.showStats ? 'Price $ ' + gears.price : null }</h4>
                        <h4>{ this.state.showStats ? <a href={'mailto:' + gears.seller}> Seller: {gears.seller}</a> : null }</h4>
                        <br/>
                        { this.state.showStats ? <details>
                            <summary>Edit {gears.type} Details</summary>
                            <form id={gears._id} onSubmit={this.updateGear}>
                                <label htmlFor="type">Type: </label>
                                <input
                                type="text"
                                id="type"
                                defaultValue={gears.type}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="make">Make: </label>
                                <input
                                type="text"
                                id="make"
                                defaultValue={gears.make}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="model">Model: </label>
                                <input
                                type="text"
                                id="model"
                                defaultValue={gears.model}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="condition">Condition:</label>
                                <input
                                type="text"
                                id="condition"
                                defaultValue={gears.condition}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="price">Rental Price: </label>
                                <input
                                type="text"
                                id="price"
                                defaultValue={gears.seller}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="seller">Seller: </label>
                                <input
                                type="text"
                                id="seller"
                                defaultValue={gears.seller}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="image">Image URL: </label>
                                <input
                                type="text"
                                id="image"
                                defaultValue={gears.image}
                                onChange={this.handleChange} />
                                <br />
                                <br />
                                <input type="submit" value="Update Details" />
                            </form>
                        </details> : null }
                        <br />
                        { this.state.showStats ? <button value={gears._id} onClick={this.deleteGear}>Remove</button> : null }
                    </div>
                })}
                </div>
            </section>
            <br />
            <br />
            <a href='/#top' id='bigger'>Back To Top</a>
            <a href='/gearswap/seed' className='seed'>Reload Available List</a>
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
