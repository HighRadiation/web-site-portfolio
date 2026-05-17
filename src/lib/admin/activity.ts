import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export type ActivityAction = 'created' | 'updated' | 'deleted' | 'replied';
export type ActivityTargetType = 'project' | 'skill' | 'timeline' | 'message';

/**
 * Append a row to activity_log. Errors are swallowed because activity logging
 * must never block a mutation.
 */
export async function logActivity(
  supabase: SupabaseClient<Database>,
  actorId: string,
  action: ActivityAction,
  targetType: ActivityTargetType,
  targetLabel: string,
): Promise<void> {
  const { error } = await supabase.from('activity_log').insert({
    actor_id: actorId,
    action,
    target_type: targetType,
    target_label: targetLabel,
  });
  if (error) {
    console.error('logActivity failed:', error.message);
  }
}
