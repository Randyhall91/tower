
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"
class EventService {

  async getEvents() {
    const res = await api.get('api/events')
    console.log('events', res.data);
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
    AppState.towerEvent.push(newEvent)
    // TODO router.push to eventDetails page
  }




  async makeTicketforEvent(eventId) {
    // console.log(eventId);
    await api.post('api/tickets', { eventId })
    AppState.activeEvent.capacity--
    this.getTicketHolders(eventId)
  }
  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    console.log('getTicketHolders', res.data)
    AppState.eventTicketHolders = res.data
  }

}
export const eventService = new EventService()