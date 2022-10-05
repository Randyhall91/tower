import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
  }
  async getEvents(res, req, next) {
    try {
      const events = await eventsService.getEvents()
    } catch (error) {
      next(error)
    }
  }

}