import React, { useState, useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './UserContext'
import Auth from '../lib/auth'

const SingleRestaurant = (props) => {
  const [data, setData] = useState({})
  const [info, setInfo] = useState({})
  const [added, setAdded] = useState(false)
  


  const { userInfo, setUserInfo } = useContext(UserContext)

  let alreadyAdded = null

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/restaurants/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (userInfo) {
      setInfo(userInfo)
      alreadyAdded = userInfo.favouriteRestaurants.some((rest) => {
        return rest._id === data._id
      })
      setAdded(alreadyAdded)
    
    } else return
  }, [userInfo])


  const favourite = () => {
    let update = info.favouriteRestaurants
    update.push(data)
    setInfo({ ...info, favouriteRestaurants: update })
    console.log(info)
    axios.put('/api/profile/edit', info, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(res => {
        setUserInfo(res.data)
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  console.log(userInfo)
  console.log(added)

  return <div className="section has-text-centered is-full-height">
    <div className="container is-center">
      <div className="columns is-multiline">
        <div className="column is-half-tablet">
          <div className="title">
            {data.name}
          </div>
          <div className="subtitle">
            {data.category}
          </div>
          <img src={data.image} alt="Placeholder image" />
          <p>
            {data.type}
          </p>
          <p>
            {data.location}
          </p>
          <p>
            {data.postcode}
          </p>
          <p>
            {data.priceRange}
          </p>
          {added ? <button className="button is-success" title="Disabled button" disabled>Added</button> : userInfo && info.username && <button className="button is-success" onClick={favourite}>Save to Profile</button>}
        </div>
      </div>
    </div>
  </div>

}

export default SingleRestaurant