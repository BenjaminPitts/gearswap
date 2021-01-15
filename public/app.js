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
      this.setState({ instruments: response.data,type: '',
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

componentDidMount = () => {
  axios.get('/gearswap').then((response) => {
    this.setState({
      gear: response.data,
    })
  })
}

render = () => {
        return <div>
            <h1>Gear Swap</h1>

            <h2>Gears For Swap</h2>
            <section id="mid">
            <ul>
                {this.state.gear.map((gears) => {
                    return <li key={gears._id}>

                        <img src={gears.image} />
                        <br/>
                        <strong>{gears.type}</strong>
                        <br/>

                        <strong>{gears.make}</strong>
                        <br/>
                        {gears.model}, {gears.condition}
                        <br/>
                        <strong>{gears.price}</strong>
                        <br/>
                        <strong>{gears.seller}</strong>
                        <br/>

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
                    </li>
                })}
            </ul>
            </section>
            <section id="add">
                <h3>Do you have a gear want to SWAP?</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="type">Type</label>
                    <br/>
                    <input type="text" id="type" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="make">Make</label>
                    <br/>
                    <input type="text" id="make" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="model">Model</label>
                    <br/>
                    <input type="text" id="model" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="condition">Condition</label>
                    <br/>
                    <input type="text" id="condition" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="price">Rental Price</label>
                    <br/>
                    <input type="text" id="price" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="seller">Seller</label>
                    <br/>
                    <input type="text" id="seller" onChange={this.handleChange}/>
                    <br/>

                    <label htmlFor="image">Picture</label>
                    <br/>
                    <input type="url" id="image" onChange={this.handleChange}/>
                    <br/>

                    <input type="submit" value="Add Gear" />

                </form>
                </section>

        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
