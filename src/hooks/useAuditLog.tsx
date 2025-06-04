
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useAuditLog = () => {
  const { user } = useAuth();

  const logAction = async (
    action: string,
    tableName?: string,
    recordId?: string,
    oldValues?: any,
    newValues?: any
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('log_audit_event', {
        p_action: action,
        p_table_name: tableName || null,
        p_record_id: recordId || null,
        p_old_values: oldValues ? JSON.stringify(oldValues) : null,
        p_new_values: newValues ? JSON.stringify(newValues) : null
      });

      if (error) {
        // Silent error handling - no console logging
      }
    } catch (error) {
      // Silent error handling - no console logging
    }
  };

  return { logAction };
};
