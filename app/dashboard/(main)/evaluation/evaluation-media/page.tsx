import { Metadata } from "next";
import { getAllMediaEvaluations, getUserMediaEvaluation } from "@/lib/actions/mediaEvaluationActions";
import { verifySession } from "@/lib/stateless-session";
import MediaEvaluationList, { UserEvaluationData } from "./MediaEvaluationList";

export const metadata: Metadata = {
  title: 'Evaluasi Media Pembelajaran',
};

export default async function MediaEvaluationPage() {
  const session = await verifySession();
  const [evaluationsResult, userEvaluationResult] = await Promise.all([
    getAllMediaEvaluations(),
    getUserMediaEvaluation()
  ]);

  const evaluations = evaluationsResult.success ? evaluationsResult.data : [];
  const userEvaluation = userEvaluationResult.success ? userEvaluationResult.data : null;
  const currentUserId = session?.userId;

  return (
    <div className="container mx-auto pb-8 px-4">
      <MediaEvaluationList 
        initialEvaluations={evaluations || []} 
        initialUserEvaluation={userEvaluation as UserEvaluationData | null}
        currentUserId={currentUserId || null}
      />
    </div>
  );
} 