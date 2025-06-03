
import { supabase } from '@/integrations/supabase/client';

export interface AuditLogEntry {
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
}

export class AuditLogger {
  private static sessionToken: string | null = null;

  static setSessionToken(token: string) {
    this.sessionToken = token;
  }

  static async logAction(entry: AuditLogEntry): Promise<void> {
    if (!this.sessionToken) {
      console.warn('No admin session token available for audit logging');
      return;
    }

    try {
      const userAgent = navigator.userAgent;
      
      const { error } = await supabase.rpc('log_audit_event', {
        p_action: entry.action,
        p_table_name: entry.table_name || null,
        p_record_id: entry.record_id || null,
        p_old_values: entry.old_values ? JSON.stringify(entry.old_values) : null,
        p_new_values: entry.new_values ? JSON.stringify(entry.new_values) : null,
        p_session_token: this.sessionToken,
        p_user_agent: userAgent
      });

      if (error) {
        console.error('Failed to log audit event:', error);
      }
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  }

  static async getAuditLogs(limit: number = 100): Promise<any[]> {
    if (!this.sessionToken) {
      throw new Error('No admin session token available');
    }

    try {
      const { data, error } = await supabase.rpc('get_audit_logs', {
        session_token: this.sessionToken,
        limit_count: limit
      });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      throw error;
    }
  }
}
