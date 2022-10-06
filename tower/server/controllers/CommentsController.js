import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.makeComment)
      .delete('/:id', this.deleteComment)
  }
  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async makeComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.makeComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}