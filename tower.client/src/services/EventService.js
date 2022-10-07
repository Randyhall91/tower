
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"
class EventService {

  async getEvents() {
    const res = await api.get('api/events')
    // console.log('events', res.data);
    AppState.towerEvent = res.data.map(e => new TowerEvent(e))
  }
  async getEventById(id) {
    AppState.activeEvent = {}
    const res = await api.get(`api/events/${id}`)
    console.log('eventById', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async createEvent(formData) {
    const res = await api.post('api/events', formData)
    const newEvent = new TowerEvent(res.data)
    // console.log(res.data);

    AppState.towerEvent.push(newEvent)
    return res.data

  }
  async cancelEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
    // const event = AppState.towerEvent.find(eventId)
    // event.isCanceled = true
    this.getEventById(eventId)
  }




  async makeTicketforEvent(eventId) {
    await api.post('api/tickets', { eventId })
    AppState.activeEvent.capacity--
    this.getTicketHolders(eventId)

  }
  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    // console.log('getTicketHolders', res.data)
    let ticketHolders = res.data
    let userTicket = ticketHolders.find(t => t.accountId == AppState.user.id)
    // console.log('check', checkForId.length);
    // TODO finish getting active users ticket into appstate properly
    if (userTicket) {
      AppState.usersTicket = userTicket
      // console.log('AppState.usersTicket', AppState.usersTicket.id);
    } else {
      AppState.usersTicket = null
      // console.log('UsersTicketShouldbeBlank', AppState.usersTicket);
    }
    AppState.eventTicketHolders = res.data
  }
  async removeTicket() {

    let ticket = AppState.usersTicket
    // console.log('usersTicket', AppState.usersTicket);
    await api.delete(`api/tickets/${ticket.id}`)
    // this.getTicketHolders()
    this.getTicketHolders(ticket.eventId)
    AppState.usersTicket = null
    AppState.activeEvent.capacity++
  }



  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.eventComments = res.data
    console.log('comments', res.data);
  }
  async removeComment(id) {
    const res = await api.delete(`api/comments/${id}`)
    AppState.eventComments = res.data
  }
  async createComment(formData) {
    const res = await api.post('api/comments/')

  }


}
export const eventService = new EventService()