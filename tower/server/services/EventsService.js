import { dbContext } from "../db/DbContext.js"



class EventsService {
  async getEvents() {
    const events = await dbContext
  }

}
export const eventsService = new EventsService()