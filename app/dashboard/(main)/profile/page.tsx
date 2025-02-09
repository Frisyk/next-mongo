import { Metadata } from 'next';
import { getUser, getUserScoresWithNames } from '@/lib/dal';
import { getEvaluationsForUser, getUserScore } from '@/lib/admin/students';
import Profile from './Profile';

export const metadata: Metadata = {
  title: 'My Profile',
};

export default async function Page() {
  const user = await getUser();
  const latestEvaluation = user
    ? await getEvaluationsForUser(user.id).then(res => res?.data?.[0] || null)
    : null;

  const userScores = await getUserScore(user.id);

  return <Profile scores={JSON.stringify(userScores)} iuser={JSON.stringify(user)} ilatestEvaluation={JSON.stringify(latestEvaluation)} />;
}
