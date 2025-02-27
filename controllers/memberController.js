import bcrypt from 'bcryptjs';

import messages from '../config/messages.js';
import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

const addMember = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const secret = req.body.secret;

  const hashRow = await DatabaseHandler.getMembershipSecret();
  const hash = hashRow?.hash;

  if (!hash) {
    return res.status(500).json({ redirect: '/' });
  }

  const match = await bcrypt.compare(secret, hash);

  if (!match) {
    req.session.alert = messages.membership.wrongSecret;
    return res.status(403).json({ redirect: '/' });
  }

  await DatabaseHandler.setMembershipStatus(userId);
  return res.status(200).json({ alert: 'success', redirect: '/' });
});

export default {
  addMember,
};
