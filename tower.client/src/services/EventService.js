
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
    console.log('eventbyid', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }


}
export const eventService = new EventService()