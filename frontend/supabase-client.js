/*
 * YourPath Supabase adapter foundation.
 *
 * Load Supabase JS v2 UMD before this file, then load
 * supabase-config.js. This file is not wired into app_scratch.js yet.
 * Browser code must never use a service_role key.
 */
(function () {
  "use strict";

  const config = window.YOURPATH_SUPABASE_CONFIG;
  const sdk = window.supabase;

  if (!config || !config.url || !config.publishableKey ||
      config.url.includes("YOUR_PROJECT_REF") ||
      config.publishableKey.includes("YOUR_SUPABASE_PUBLISHABLE_KEY")) {
    console.warn("YourPath: add a real Supabase URL and publishable key to supabase-config.js.");
    return;
  }
  if (!sdk || typeof sdk.createClient !== "function") {
    console.error("YourPath: Supabase JS v2 was not loaded before supabase-client.js.");
    return;
  }

  const client = sdk.createClient(config.url, config.publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  function requireUser() {
    return client.auth.getUser().then(({ data, error }) => {
      if (error) throw error;
      if (!data.user) throw new Error("Please sign in to continue.");
      return data.user;
    });
  }

  async function signUp({ email, password, displayName }) {
    const { data, error } = await client.auth.signUp({
      email: String(email || "").trim().toLowerCase(),
      password,
      options: { data: { display_name: String(displayName || "").trim() } }
    });
    if (error) throw error;
    return data;
  }

  async function signIn({ email, password }) {
    const { data, error } = await client.auth.signInWithPassword({
      email: String(email || "").trim().toLowerCase(),
      password
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async function sendPasswordReset(email, redirectTo) {
    const { error } = await client.auth.resetPasswordForEmail(
      String(email || "").trim().toLowerCase(),
      redirectTo ? { redirectTo } : undefined
    );
    if (error) throw error;
  }

  async function getProfile() {
    const user = await requireUser();
    const { data, error } = await client.from("profiles")
      .select("id, display_name, country, education_stage, created_at, updated_at")
      .eq("id", user.id).single();
    if (error) throw error;
    return data;
  }

  async function updateProfile(profile) {
    const user = await requireUser();
    const allowed = {
      id: user.id,
      display_name: String(profile.display_name || "").trim().slice(0, 100) || null,
      country: String(profile.country || "").trim().slice(0, 80) || null,
      education_stage: String(profile.education_stage || "").trim().slice(0, 80) || null,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await client.from("profiles")
      .upsert(allowed).select().single();
    if (error) throw error;
    return data;
  }

  async function saveAssessment({ answers, questionnaireVersion = "v1", completed = true }) {
    const user = await requireUser();
    const { data, error } = await client.from("assessments").insert({
      user_id: user.id,
      questionnaire_version: questionnaireVersion,
      answers: answers && typeof answers === "object" ? answers : {},
      completed_at: completed ? new Date().toISOString() : null
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function savePathwayReport({ assessmentId = null, results, reportVersion = "v1" }) {
    const user = await requireUser();
    const { data, error } = await client.from("pathway_reports").insert({
      user_id: user.id,
      assessment_id: assessmentId,
      report_version: reportVersion,
      results: results && typeof results === "object" ? results : {}
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function listMyReports(limit = 20) {
    const user = await requireUser();
    const { data, error } = await client.from("pathway_reports")
      .select("id, assessment_id, report_version, results, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(Math.max(1, Math.min(Number(limit) || 20, 100)));
    if (error) throw error;
    return data || [];
  }

  async function savePathway(pathwayKey, notes = "") {
    const user = await requireUser();
    const { data, error } = await client.from("saved_pathways").upsert({
      user_id: user.id,
      pathway_key: String(pathwayKey || "").trim().slice(0, 160),
      notes: String(notes || "").trim().slice(0, 2000)
    }, { onConflict: "user_id,pathway_key" }).select().single();
    if (error) throw error;
    return data;
  }

  async function listSavedPathways() {
    const user = await requireUser();
    const { data, error } = await client.from("saved_pathways")
      .select("id, pathway_key, notes, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function uploadPrivateFile(file) {
    const user = await requireUser();
    if (!(file instanceof File)) throw new Error("Choose a file first.");
    if (file.size > 10 * 1024 * 1024) throw new Error("File must be 10 MB or smaller.");
    const safeName = String(file.name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
    const path = user.id + "/" + crypto.randomUUID() + "-" + safeName;
    const { data, error } = await client.storage.from("yourpath-private")
      .upload(path, file, { upsert: false, contentType: file.type || "application/octet-stream" });
    if (error) throw error;
    const { error: metadataError } = await client.from("user_files").insert({
      user_id: user.id,
      storage_path: data.path,
      display_name: safeName,
      mime_type: file.type || null
    });
    if (metadataError) {
      await client.storage.from("yourpath-private").remove([data.path]);
      throw metadataError;
    }
    return data;
  }

  async function createPrivateFileUrl(path, expiresInSeconds = 60) {
    await requireUser();
    const { data, error } = await client.storage.from("yourpath-private")
      .createSignedUrl(path, Math.max(30, Math.min(Number(expiresInSeconds) || 60, 300)));
    if (error) throw error;
    return data.signedUrl;
  }

  window.YourPathBackend = Object.freeze({
    client,
    signUp,
    signIn,
    signOut,
    sendPasswordReset,
    getProfile,
    updateProfile,
    saveAssessment,
    savePathwayReport,
    listMyReports,
    savePathway,
    listSavedPathways,
    uploadPrivateFile,
    createPrivateFileUrl,
    onAuthStateChange(callback) {
      return client.auth.onAuthStateChange(callback);
    }
  });
})();
