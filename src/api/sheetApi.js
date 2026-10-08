const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzq1QY2MjoBat-fsOrvavBTS5dCbSiD8A0QigHXIFWt5njU_OI_ipeYCSp-BM9yZDIchA/exec";

export async function fetchDashboardData() {
  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return await res.json();
}

export async function sendSheetAction(action, payload = {}) {
  // Uses text/plain to avoid CORS preflight issues with Google Apps Script
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload })
  });
  return await res.json();
}