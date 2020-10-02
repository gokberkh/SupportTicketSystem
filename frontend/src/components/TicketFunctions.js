import axios from 'axios'

export const ticket = newTicket => {
  return axios
    .post('tickets/addTickets', {
      name: newTicket.name,
      img: this.state.file,
      content: newTicket.content,
      messages: newTicket.messages
    })
    .then(response => {
      console.log('New ticket success')
    })
}

export const getTicket = test => {
  return axios
    .get('tickets/getTicketAll', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
