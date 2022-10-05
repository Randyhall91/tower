import { dbContext } from "../db/DbContext.js"



class EventsService {
  async createEvent(eventData) {
    const event = await dbContext.Event.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }
  async getEvents() {
    const events = await dbContext.Event.find().populate('creator', 'name picture')
    return events
  }

}
export const eventsService = new EventsService()