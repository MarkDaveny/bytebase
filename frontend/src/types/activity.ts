import type { LogEntity_Level } from "@/types/proto/v1/logging_service";
import { LogEntity_Action } from "@/types/proto/v1/logging_service";
import type { FieldId } from "../plugins";
import { t } from "../plugins/i18n";
import type { ExternalApprovalEvent } from "./externalApproval";
import type { IssueId, PrincipalId, SheetId, StageId, TaskId } from "./id";
import type { IssueStatus } from "./issue";
import type { MemberStatus, RoleType } from "./member";
import type {
  StageStatusUpdateType,
  TaskRunStatus,
  TaskStatus,
} from "./pipeline";
import type { ApprovalEvent } from "./review";

export function activityName(action: LogEntity_Action): string {
  switch (action) {
    case LogEntity_Action.ACTION_ISSUE_CREATE:
      return t("activity.type.issue-create");
    case LogEntity_Action.ACTION_ISSUE_COMMENT_CREATE:
      return t("activity.type.comment-create");
    case LogEntity_Action.ACTION_ISSUE_FIELD_UPDATE:
      return t("activity.type.issue-field-update");
    case LogEntity_Action.ACTION_ISSUE_STATUS_UPDATE:
      return t("activity.type.issue-status-update");
    case LogEntity_Action.ACTION_PIPELINE_STAGE_STATUS_UPDATE:
      return t("activity.type.pipeline-stage-status-update");
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATUS_UPDATE:
      return t("activity.type.pipeline-task-status-update");
    case LogEntity_Action.ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE:
      return t("activity.type.pipeline-task-status-update");
    case LogEntity_Action.ACTION_PIPELINE_TASK_PRIOR_BACKUP:
      return t("activity.type.pipeline-task-prior-backup");
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATEMENT_UPDATE:
      return t("activity.type.pipeline-task-statement-update");
    case LogEntity_Action.ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE:
      return t("activity.type.pipeline-task-earliest-allowed-time-update");
    case LogEntity_Action.ACTION_MEMBER_CREATE:
      return t("activity.type.member-create");
    case LogEntity_Action.ACTION_MEMBER_ROLE_UPDATE:
      return t("activity.type.member-role-update");
    case LogEntity_Action.ACTION_MEMBER_ACTIVATE:
      return t("activity.type.member-activate");
    case LogEntity_Action.ACTION_MEMBER_DEACTIVE:
      return t("activity.type.member-deactivate");
    case LogEntity_Action.ACTION_PROJECT_REPOSITORY_PUSH:
      return t("activity.type.project-repository-push");
    case LogEntity_Action.ACTION_PROJECT_DATABASE_TRANSFER:
      return t("activity.type.project-database-transfer");
    case LogEntity_Action.ACTION_PROJECT_MEMBER_CREATE:
      return t("activity.type.project-member-create");
    case LogEntity_Action.ACTION_PROJECT_MEMBER_DELETE:
      return t("activity.type.project-member-delete");
  }
  console.assert(false, `undefined text for activity type "${action}"`);
  return "";
}

export type ActivityLevel = "INFO" | "WARN" | "ERROR";

export type ActivityIssueCreatePayload = {
  issueName: string;
};

// TaskRollbackBy records an issue rollback activity.
// The task with taskID in IssueID is rollbacked by the task with RollbackByTaskID in RollbackByIssueID.
export type TaskRollbackBy = {
  issueId: IssueId;
  taskId: TaskId;
  rollbackByIssueId: IssueId;
  rollbackByTaskId: TaskId;
};

export type ActivityIssueCommentCreatePayload = {
  externalApprovalEvent?: ExternalApprovalEvent;
  issueName: string;
  taskRollbackBy?: TaskRollbackBy;
  approvalEvent?: ApprovalEvent;
};

export type ActivityIssueFieldUpdatePayload = {
  fieldId: FieldId;
  oldValue?: string;
  newValue?: string;
  issueName: string;
};

export type ActivityIssueStatusUpdatePayload = {
  oldStatus: IssueStatus;
  newStatus: IssueStatus;
  issueName: string;
};

export type ActivityStageStatusUpdatePayload = {
  stageId: StageId;
  stageStatusUpdateType: StageStatusUpdateType;
  issueName: string;
  stageName: string;
};

export type ActivityTaskStatusUpdatePayload = {
  taskId: TaskId;
  oldStatus: TaskStatus;
  newStatus: TaskStatus;
  issueName: string;
  taskName: string;
};

export type ActivityPipelineTaskRunStatusUpdatePayload = {
  taskId: TaskId;
  newStatus: TaskRunStatus;
  issueName: string;
  taskName: string;
};

export type ActivityTaskStatementUpdatePayload = {
  taskId: TaskId;
  oldStatement: string;
  newStatement: string;
  oldSheetId: SheetId;
  newSheetId: SheetId;
  issueName: string;
  taskName: string;
};

export type ActivityTaskPriorBackup = {
  taskId: TaskId;
  schemaMetadata: DatabaseSchemaMetadata[];
  issueName: string;
  taskName: string;
};

export type DatabaseSchemaMetadata = {
  schema: string;
  table: string;
};

export type ActivityTaskEarliestAllowedTimeUpdatePayload = {
  taskId: TaskId;
  oldEarliestAllowedTs: number;
  newEarliestAllowedTs: number;
  issueName: string;
  taskName: string;
};

export type ActivityMemberCreatePayload = {
  principalId: PrincipalId;
  principalName: string;
  principalEmail: string;
  memberStatus: MemberStatus;
  role: RoleType;
};

export type ActivityMemberRoleUpdatePayload = {
  principalId: PrincipalId;
  principalName: string;
  principalEmail: string;
  oldRole: RoleType;
  newRole: RoleType;
};

export type ActivityMemberActivateDeactivatePayload = {
  principalId: PrincipalId;
  principalName: string;
  principalEmail: string;
  role: RoleType;
};

export type ActivityProjectRepositoryPushPayload = {
  issueId?: number;
  issueName?: string;
};

export type ActivityProjectDatabaseTransferPayload = {
  databaseId: number;
  databaseName: string;
};

export type ActionPayloadType =
  | ActivityIssueCreatePayload
  | ActivityIssueCommentCreatePayload
  | ActivityIssueFieldUpdatePayload
  | ActivityIssueStatusUpdatePayload
  | ActivityTaskStatusUpdatePayload
  | ActivityTaskStatementUpdatePayload
  | ActivityTaskEarliestAllowedTimeUpdatePayload
  | ActivityMemberCreatePayload
  | ActivityMemberRoleUpdatePayload
  | ActivityMemberActivateDeactivatePayload
  | ActivityProjectRepositoryPushPayload
  | ActivityProjectDatabaseTransferPayload;

export interface FindActivityMessage {
  resource?: string;
  creatorEmail?: string;
  level?: LogEntity_Level[];
  action?: LogEntity_Action[];
  createdTsAfter?: number;
  createdTsBefore?: number;
  order?: "asc" | "desc";
  pageSize?: number;
  pageToken?: string;
}
