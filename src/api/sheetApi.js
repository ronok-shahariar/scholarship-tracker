// Replace with your Apps Script Web App URL ending in /exec
const SCRIPT_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnR1l9Q8onzG36jfUvy4QYOZKjn1I57LHo3SFs_XXNVMLPad8zvLjDZl3CC2xQ8jDgerPbpc3GgMkf0MIiJjDylKR27_X1JvD73Z7-021fgpVtrFJpAuWaWjrCG_wEyt2LblMkrRa1QYkzvYSPTCOnss-nLn3jbA38U3xINoghQP4Hyc-j9PRchscm0-3DnMTTesV9PT0BaBp47ZxFqbWAYrNf9yflqAMrSBL5aSQQOPeGYSvfhnenenX6hVpCbztIBN836Fq8fw79cZk1SMqgVEZkqVag&lib=M5EU4fDmVJAywWsFikDH6cVtN3oLPAN5O";

export async function fetchDashboardData() {
  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return await res.json();
}

export async function sendSheetAction(action, payload = {}) {
  // Use text/plain to avoid CORS preflight options check on Apps Script
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload })
  });
  return await res.json();
}