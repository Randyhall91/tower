
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"
class EventService {

  async getEvents() {
    const res = await api.get('api/events')
    console.log(res.data);
    AppState.towerEvent = res.data.map(e => new TowerEvent(e))
  }


}
export const eventService = new EventService()