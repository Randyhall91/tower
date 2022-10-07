import { Logger } from "sass"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class EventsService {
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comment.find({ eventId })
      .populate('creator', 'name picture')
    return comments
  }

  async cancelEvent(id, userinfo) {
    const event = await this.getEventById(id)

    // @ts-ignore
    if (event.creatorId.toString() != userinfo.id) {
      throw new Forbidden("You can't cancel this...It's not yours")
    }
    event.isCanceled = true
    await event.save()
    return event
  }

  async editEvent(eventId, eventData, userInfo) {

    const event = await this.getEventById(eventId)

    //@ts-ignore
    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden("You can't edit this...It's not yours")
    }
    if (event.isCanceled) {
      throw new Forbidden("You can't edit an event after its been canceled")
    }
    eventData.isCanceled = false

    const updatedEvent = await dbContext.Event.findOneAndUpdate(
      { _id: eventId },
      { $set: eventData },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return updatedEvent
  }


  async getEventById(id) {
    const event = await dbContext.Event.findById(id).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid or bad Id')
    }
    return event
  }



  async createEvent(eventData) {
    const event = await dbContext.Event.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }
  async getEvents(query) {
    const events = await dbContext.Event.find({
      ...query,
    }).populate('creator', 'name picture')
    return events
  }

}
export const eventsService = new EventsService()