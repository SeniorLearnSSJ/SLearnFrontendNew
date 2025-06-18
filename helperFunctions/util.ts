

export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("JWT parsing failed", e);
    return null;
  }
}


/**
 * Extracts the user's role from a decoded JWT object.
 * Supports flexible claim key naming (e.g., 'role', 'http://schemas.../role')
 */
export function extractRoleFromJwt(decoded: any): "Administrator" | "Member" | null {
  if (!decoded || typeof decoded !== "object") return null;

  const roleClaimKey = Object.keys(decoded).find((key) =>
    key.toLowerCase().includes("role")
  );

  const role = roleClaimKey ? decoded[roleClaimKey] : null;

  if (role === "Administrator" || role === "Member") {
    return role;
  }

  return null;
}

