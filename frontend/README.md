# YourPath frontend

The current prototype is in the repository root:
- `index.html`
- `styles.css`
- `site-data.js`
- `app_scratch.js`

The current JavaScript is a large monolithic prototype. Keep it intact while the backend is being built in this branch, then integrate the Supabase adapter in a controlled change.

## Current limitations
- Some account and questionnaire data are saved to browser localStorage.
- Demo login logic is not secure and must not be used for real accounts.
- Local browser storage does not synchronize across devices or browsers.
- The `/api/ai/start` request expects a server endpoint that has not been verified here.

## Integration order
1. Load the Supabase JavaScript client and a local configuration file.
2. Replace signup/login/logout/password-reset handlers with Supabase Auth.
3. Load the authenticated user's profile from `profiles`.
4. Save completed questionnaire answers to `assessments`.
5. Save generated pathway results to `pathway_reports`.
6. Load saved pathways and reports from the database after login.
7. Remove password storage and account objects from localStorage.
8. Test owner-only access using two separate test accounts before launch.

Do not place private service keys in HTML, JavaScript, or any public repository.
