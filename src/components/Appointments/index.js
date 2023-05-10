import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isFiltered: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        isStarred: false,
        time: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onStarButtonClicked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilterButtonClicked = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  render() {
    const {appointmentsList, title, date, isFiltered} = this.state
    const starredBtnStyles = isFiltered ? 'active-star-btn' : 'star-btn'
    const filteredList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    const listToBeDisplayed = isFiltered ? filteredList : appointmentsList
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="data-img-container">
            <div className="data-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-styles" onSubmit={this.onAddAppointment}>
                <label className="label-styles" htmlFor="Your Title">
                  Title
                </label>
                <br />
                <input
                  value={title}
                  className="input-styles"
                  name="Your Title"
                  placeholder="Title"
                  type="text"
                  onChange={this.onTitleChange}
                />
                <br />
                <label className="label-styles" htmlFor="Date">
                  Date
                </label>
                <br />
                <input
                  value={date}
                  className="input-styles"
                  placeholder="Your Comment"
                  type="date"
                  name="Date"
                  onChange={this.onDateChange}
                />
                <br />
                <button type="submit" className="btn" data-testid="star">
                  Add
                </button>
              </form>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="comments-img"
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="star-button-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              type="button"
              className={`${starredBtnStyles}`}
              onClick={this.onFilterButtonClicked}
            >
              Starred
            </button>
          </div>
          <div>
            <ul className="comments-container">
              {listToBeDisplayed.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  onStarButtonClicked={this.onStarButtonClicked}
                  eachAppointment={eachAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
