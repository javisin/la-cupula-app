/* eslint no-param-reassign: 0 */
import { CronJob } from 'cron';
import { Op } from 'sequelize';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import { PlanModel } from '../../Context/Plans/infraestructure/PlanModel';

process.env.TZ = 'Europe/London';

export default new CronJob(
  '0 0 0 * * *',
  async () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const users = await SequelizeUser.findAll({
      include: [{ model: PlanModel, as: 'plan', where: { mode: 'subscription' } }],
      where: {
        subscriptionId: null,
        paidAt: {
          [Op.lt]: oneMonthAgo,
        },
      },
    });

    await Promise.all(
      users.map((user) => {
        user.planBookings = 0;
        user.planId = null;
        user.paidAt = null;
        return user.save();
      }),
    );
  },
  null,
  false,
  'Europe/London',
);
