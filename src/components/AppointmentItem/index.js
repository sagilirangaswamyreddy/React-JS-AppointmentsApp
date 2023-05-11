import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onStarButtonClicked} = props
  const {id, isStarred, title, date} = eachAppointment
  const time = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onLike = () => {
    onStarButtonClicked(id)
  }

  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <>
      <li>
        <div className="comment-item-container">
          <div className="title-button-container">
            <p className="item-title">{title}</p>
            <button
              type="button"
              className="item-star-btn"
              onClick={onLike}
              data-testid="star"
            >
              <img className="like-img" src={imageUrl} alt="star" />
            </button>
          </div>
          <div>
            <p>{time}</p>
          </div>
        </div>
      </li>
    </>
  )
}
export default AppointmentItem
