import express from 'express'
import { withCatch } from '../../../common/withCatch'
import root from '../../../root'

const router = express.Router()

router.get(
  '/:name',
  withCatch(async (req, res) => {
    const partyMembers = await root.partyService.findPartyMembersForPlayer(
      req.params.name,
    )

    res.status(200).send({ data: partyMembers })
  }),
)

export const party = router
