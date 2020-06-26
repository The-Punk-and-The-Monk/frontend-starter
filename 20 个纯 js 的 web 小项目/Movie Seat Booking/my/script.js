const fakeMovieDatas = new Map();
fakeMovieDatas.set("Joker", {
  name: "Joker",
  pricePerSeat: 12,
  occupiedSeats: [[2,4], [2,5], [3,7], [3,8], [5,4], [5,5]]
})

fakeMovieDatas.set("Toy Story 4", {
  name: "Toy Story 4",
  pricePerSeat: 8,
  occupiedSeats: [[3,4], [3,5], [6, 3], [6, 4]]
})


class Model {
  constructor() {
    if(localStorage.hasOwnProperty("fakeMovieDatas")){
      this.movies = this._jsonToMap(JSON.parse(localStorage.getItem("fakeMovieDatas")))
    }else{
      this.movies = fakeMovieDatas
      localStorage.setItem("fakeMovieDatas", JSON.stringify(this._mapToJson(fakeMovieDatas)))
    }
  }

  _strMapToObj(strMap){
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }
  /**
  *map转换为json
  */
  _mapToJson(map) {
  return JSON.stringify(this._strMapToObj(map));
  }

  _objToStrMap(obj){
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
    }
    return strMap;
  }
  /**
  *json转换为map
  */
  _jsonToMap(jsonStr){
    return this._objToStrMap(JSON.parse(jsonStr));
  }
  
  getMovies(){
    return this.movies
  }

  update(){
    localStorage.setItem("fakeMovieDatas", JSON.stringify(this._mapToJson(this.movies)))
  }

  addOccupiedSeats(movieName, seats){
    this.movies.get(movieName).occupiedSeats.push(...seats)
    this.update()
  }
}

class View {
  constructor(){
    this.selector = document.getElementById('movieSelector')
    this.seatsContainer = document.getElementById('seatsContainer')
    this.seatCounter = document.getElementById('seat-counter')
    this.priceCounter = document.getElementById('price-counter')
    this.bookingButton = document.getElementById('booking-button')
    this.allSeats = new Map()
    this.occupiedSeats = []
    this.selectedSeats = new Map()
    this.selectedMovieOption = null
    this.selectedMoviePrice = 0
    this.initSeats()
  }

  initSeats(){
    for(let i = 1; i < 7; i++){
      for(let j = 1; j < 11; j++){
        if(j == 3 || j == 8){
          continue
        }
        let seat = this.getSeat(i, j)
        this.seatsContainer.appendChild(seat)
        this.allSeats.set(i + ',' + j, seat)
      }
    }
  }

  toGridCoord(originCoord){
    let [x, y] = originCoord
    if(y >= 1 && y <= 2){
      return [x, y]
    } else if(3 <= y && y <= 6){
      return [x, y+1]
    } else if(7<=y && y <= 8){
      return [x, y+2]
    }
    throw new Error('Invaild origin coordinate y, y should between [1, 8], but got: ' + y)
  }

  toOriginCoord(gridCoord){
    let [x, y] = gridCoord
    if(1 <= y && y <= 2){
      return [x, y]
    }else if(4<=y && y <= 7){
      return [x, y-1]
    }else if(9 <= y && y <= 10){
      return [x, y-2]
    }
    throw new Error('Invaild gridCoord, y should between [1,10] and y != 3, y != 8, but got : ' + y)
  }

  getSeat(row, column){
    let seat = document.createElement('div')
    seat.classList.add('seat')
    seat.style['grid-row'] = row
    seat.style['grid-column'] = column
    seat.gridRow = row 
    seat.gridColumn = column
    return seat
  }

  setMovieSelectorOptions(movies){
    for(let movie of movies.keys()){
      let option = document.createElement('option')
      option.value = movies.get(movie).name
      option.innerText = movies.get(movie).name + ` ($${movies.get(movie).pricePerSeat})`
      this.selector.append(option)
    }
  }

  displayMovie(movie){
    // 清除原先选中的 movie
    if(this.selectedMovieOption){
      this.selectedMovieOption.selected = false
      this.selectedMovieOption = null
      this.selectedMoviePrice = 0
    }

    // 清除先前的 occupiedSeats
    for(let seat of this.occupiedSeats){
      seat.classList.remove('occupied')
    }
    this.occupiedSeats = []

    // 清除选中的 seat
    for(let seat of this.selectedSeats.values()){
      seat.classList.remove('selected')
    }
    this.selectedSeats.clear()
    this.updateCounter()


    // 选中 movie
    let movieOption = this.selector.querySelector(`[value="${movie.name}"]`)
    movieOption.selected = true
    this.selectedMovieOption = movieOption
    this.selectedMoviePrice = movie.pricePerSeat
    
    // 设置 occupiedSeats
    for(let coord of movie.occupiedSeats){
      let gridCoord = this.toGridCoord(coord)
      let seat = this.allSeats.get(gridCoord[0] + ',' + gridCoord[1])
      seat.classList.add('occupied')
      this.occupiedSeats.push(seat)
    }
  }

  updateCounter(){
    let numOfSelectedSeat = this.selectedSeats.size
    this.seatCounter.innerText = numOfSelectedSeat
    this.priceCounter.innerText = numOfSelectedSeat * this.selectedMoviePrice
  }

  handleSeatClick = (e) => {
    if(e.target.closest('.seats-container') && e.target.classList.contains('seat')){
      e.preventDefault()
      let seat = e.target
      if(seat.classList.contains('occupied')){
        return
      }
      if(seat.classList.contains('selected')){
        seat.classList.remove('selected')
        this.selectedSeats.delete(seat.gridRow + ',' + seat.gridColumn)
      }else{
        seat.classList.add('selected')
        this.selectedSeats.set(seat.gridRow + ',' + seat.gridColumn, seat)
      }
      this.updateCounter()
    }
  }

  bindEvents(controller){
    this.seatsContainer.addEventListener('click', this.handleSeatClick)
    this.selector.onchange = controller.handleMovieSelectorChange
    this.bookingButton.onclick = controller.handleBooking
  }
  
}


class Controller{
  constructor(model, view){
    this.model = model
    this.view = view

    this.view.setMovieSelectorOptions(this.model.movies)
    this.view.displayMovie(this.model.movies.values().next().value)
    
    this.view.bindEvents(this)
  }

  handleMovieSelectorChange = (e)=>{
    this.view.displayMovie(this.model.movies.get(e.target.value))
  }

  handleBooking = (e)=>{
    if(this.view.selectedSeats.size == 0){
      return
    }
    let newOccupiedSeats = Array.from(this.view.selectedSeats.values())
                            .map(seat => this.view.toOriginCoord([seat.gridRow, seat.gridColumn]));
    this.model.addOccupiedSeats(this.view.selector.value, newOccupiedSeats)
    this.view.displayMovie(this.model.movies.get(this.view.selector.value))
  }
}


let view = new View()
let model = new Model()
let controller = new Controller(model, view)