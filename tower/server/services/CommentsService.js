import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";




class CommentsService {
  async deleteComment(id, accountId) {

    const comment = await dbContext.Comment.findById(id)
    if (!comment) {
      throw new Error('bad commentId or request')
    }
    // @ts-ignore
    if (comment.creatorId.toString() != accountId) {
      throw new Forbidden("No deleting comments that aren't yours...hater")
    }
    await comment.deleteOne()

    return comment
  }
  async makeComment(body) {
    const comment = await dbContext.Comment.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }

}
export const commentsService = new CommentsService()