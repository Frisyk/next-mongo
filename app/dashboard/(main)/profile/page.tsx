import { Metadata } from 'next';
import { getUser } from '@/lib/dal';
import { getEvaluationsForUser, getUserScore } from '@/lib/admin/students';
import Profile from './Profile';

export const metadata: Metadata = {
  title: 'Profil Saya',
};

export default async function Page() {
  const user = await getUser();
  const latestEvaluation = user
    ? await getEvaluationsForUser(user.id).then(res => res?.data?.[0] || null)
    : null;

  const userScores = user ? await getUserScore(user.id) : null;

  return <Profile scores={JSON.stringify(userScores)} iuser={JSON.stringify(user)} ilatestEvaluation={JSON.stringify(latestEvaluation)} />;
}
