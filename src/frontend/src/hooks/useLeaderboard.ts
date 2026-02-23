import { useGetLeaderboard, useSubmitScore } from './useQueries';

export function useLeaderboard() {
  return useGetLeaderboard();
}

export { useSubmitScore };
