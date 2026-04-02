# Backend Integration Guide for `Frontend/`

This document describes how to implement a backend that supports the current Launchpad-style frontend under `Frontend/`.

The UI currently uses local state and `localStorage` for auth, meetings, and integrations (`Frontend/src/hooks/useAppState.ts`). The backend should replace those mock/local flows with persistent, multi-user APIs.

---

## 1) Recommended Backend Architecture

- **API style:** REST + optional WebSocket/SSE for live meeting updates.
- **Base URL:** `https://api.<your-domain>/v1`
- **Auth:** secure session cookies (recommended) or short-lived JWT + refresh token.
- **Storage:** relational DB (PostgreSQL recommended) + object storage for recordings/transcripts exports.
- **Integrations:** OAuth 2.0 connectors for Google, Zoom, Jira, Confluence.

---

## 2) Core Data Contracts

These match the frontend contracts in `Frontend/src/types/index.ts` and related components.

### User

```json
{
  "id": "usr_123",
  "name": "Alex Johnson",
  "role": "Engineering Manager",
  "email": "alex@company.com",
  "avatar": "https://cdn.example.com/avatar/alex.png"
}
```

### Meeting

```json
{
  "id": "mtg_123",
  "title": "Sprint Planning",
  "date": "2026-04-10",
  "time": "10:00",
  "duration": 60,
  "type": "virtual",
  "status": "upcoming",
  "participants": [
    { "id": "usr_2", "name": "Sarah Johnson", "avatar": "...", "role": "Product Manager" }
  ],
  "organizer": { "id": "usr_1", "name": "Alex Johnson" },
  "project": "Mobile App Redesign",
  "description": "Plan next sprint work",
  "agenda": "1) Risks 2) Scope 3) Owners",
  "prepNotes": "Read architecture doc before meeting",
  "hasNotes": false,
  "hasRecording": false,
  "hasTranscript": false,
  "actionItemsCount": 0,
  "zoomLink": "https://zoom.us/j/123456",
  "location": null,
  "recordingUrl": null,
  "transcriptUrl": null
}
```

### Integrations

```json
{
  "googleCalendar": { "connected": true, "data": { "account": "alex@company.com" } },
  "zoom": { "connected": false, "data": null },
  "jira": { "connected": true, "data": { "instance": "company.atlassian.net", "selectedProject": "MT" } },
  "confluence": { "connected": false, "data": null }
}
```

---

## 3) API Endpoints

## Auth & Session

- `POST /auth/login`
  - Request: `{ "email": "...", "password": "..." }`
  - Response: `{ "user": User, "permissions": UserPermissions }`
- `POST /auth/logout`
- `GET /auth/session`
  - Returns current authenticated user/session.
- `POST /auth/refresh` (if using token auth)

## Users, Roles, Permissions

- `GET /users/me`
- `GET /roles`
- `GET /permissions/me`

Role names should include those used in UI:
- `Engineering Manager`
- `Product Manager`
- `UI/UX Lead`
- `Team Lead`
- `Employee`

## Meetings

- `GET /meetings?status=upcoming|ongoing|completed&from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /meetings/{meetingId}`
- `POST /meetings`
  - Supports single + recurring creation.
- `PATCH /meetings/{meetingId}`
- `DELETE /meetings/{meetingId}`

Optional recurrence contract for series support:

```json
{
  "title": "Team Sync",
  "date": "2026-04-10",
  "time": "09:00",
  "duration": 30,
  "type": "standup",
  "participants": ["usr_2", "usr_3"],
  "recurrence": {
    "mode": "weekly",
    "count": 4,
    "daysOfWeek": [1, 3]
  }
}
```

## Meeting Details: Notes, Action Items, Decisions, Transcript

- `GET /meetings/{meetingId}/notes`
- `PUT /meetings/{meetingId}/notes`
- `GET /meetings/{meetingId}/action-items`
- `POST /meetings/{meetingId}/action-items`
- `PATCH /meetings/{meetingId}/action-items/{itemId}`
- `GET /meetings/{meetingId}/decisions`
- `POST /meetings/{meetingId}/decisions`
- `GET /meetings/{meetingId}/transcript`
- `GET /meetings/{meetingId}/recording`

## Live Meeting State

- `POST /meetings/{meetingId}/join`
- `POST /meetings/{meetingId}/leave`
- `POST /meetings/{meetingId}/start`
- `POST /meetings/{meetingId}/end`

Realtime channel (`ws` or `sse`):
- `/meetings/{meetingId}/stream`
  - emits transcript chunks, speaker changes, action item extraction, and status updates.

## Integrations (OAuth + Sync)

- `GET /integrations`
- `POST /integrations/{provider}/connect` (returns OAuth URL)
- `GET /integrations/{provider}/callback` (server-side OAuth callback)
- `POST /integrations/{provider}/disconnect`
- `POST /integrations/{provider}/sync`

Provider-specific:
- `GET /integrations/google/calendars`
- `GET /integrations/zoom/meetings`
- `GET /integrations/jira/projects`
- `GET /integrations/confluence/spaces`

## Exports / Docs / Tickets

- `POST /meetings/{meetingId}/export/confluence`
- `POST /meetings/{meetingId}/export/google-doc`
- `POST /meetings/{meetingId}/export/jira`

## AI Endpoints (for Launchpad smart features)

- `POST /ai/prep-notes`
- `POST /ai/smart-scheduling`
- `POST /ai/summarize-meeting`
- `POST /ai/generate-jira-stories`

---

## 4) Auth, Session, and Security Notes

- Use `HttpOnly`, `Secure`, `SameSite=Lax/Strict` cookies for session tokens when possible.
- Enforce tenant/org scoping on every query (`org_id` or equivalent).
- Add role-based authorization checks for:
  - Jira ticket creation
  - Confluence export
  - Integration management
  - user-management features
- Validate external webhook signatures (Zoom/Jira/Google) before processing.
- Encrypt integration refresh tokens/secrets at rest.
- Add audit events for critical actions (meeting delete, integration connect/disconnect, ticket creation).

---

## 5) Deployment Considerations

- **CORS:** allow frontend origin(s), credentials enabled if cookie auth is used.
- **Environment variables** (typical):
  - `API_BASE_URL`
  - `SESSION_SECRET`
  - `DATABASE_URL`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`
  - `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`
  - `OBJECT_STORAGE_BUCKET`
  - `AI_PROVIDER_API_KEY`
- **Background jobs:** transcript ingestion, meeting sync, ticket/doc exports.
- **Observability:** structured logs + request IDs + tracing for integration calls.
- **Rate limiting:** protect auth and AI-heavy endpoints.

---

## 6) Concrete Frontend Integration Steps

1. **Create API client layer**
   - Add `Frontend/src/lib/api.ts` (or similar) with typed request helpers.
2. **Replace `localStorage` auth flow**
   - In `useAppState.ts`, replace `meetingTracker_auth` reads/writes with:
     - `GET /auth/session` on load
     - `POST /auth/login` / `POST /auth/logout`
3. **Replace meetings mock data**
   - On load: fetch from `GET /meetings`.
   - CRUD handlers (`addMeeting`, `updateMeeting`, `deleteMeeting`) call backend APIs first, then update UI state.
4. **Wire integrations panel**
   - `Integrations.tsx` connect/disconnect actions call `/integrations/*`.
   - Load integration status from `GET /integrations`.
5. **Wire meeting details**
   - Replace mock action items/decisions/notes with `GET /meetings/{id}/*`.
   - Persist edits with `POST/PUT/PATCH` endpoints.
6. **Enable live meeting behavior**
   - For `OngoingMeeting.tsx`, subscribe to `/meetings/{id}/stream`.
   - Surface transcript and action item updates in real time.
7. **Turn on export actions**
   - Connect CTA buttons in `MeetingDetails.tsx` to export endpoints.
8. **Add optimistic UI + retry**
   - Keep responsive UX for scheduling and updates; reconcile on API responses.
9. **Add contract tests**
   - Add backend schema tests and frontend integration tests for auth, meetings, integrations, and exports.

---

## 7) Suggested Rollout Order

1. Auth/session + user profile
2. Meetings CRUD + dashboard listing
3. Meeting details (notes/actions/decisions)
4. Integrations OAuth status + sync
5. Export and AI workflows
6. Realtime meeting stream

This order aligns to how the current UI is structured and minimizes migration risk from local mock state to production backend services.
