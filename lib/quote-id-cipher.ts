/**
 * Base64 encoding/decoding for QuickBase record IDs
 * Uses Base64 encoding to obfuscate sequential record IDs in URLs
 * 
 * This matches QuickBase's Base64Encode function for consistency
 */

/**
 * Encodes a QuickBase record ID to a Base64 string
 * @param recordId - The QuickBase record ID (e.g., 42)
 * @returns Base64 encoded string (e.g., "NDI=")
 */
export function encodeQuoteId(recordId: number): string {
  // Convert number to string, then to Base64
  const str = recordId.toString();
  // Use Buffer in Node.js environment (server-side)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }
  // Fallback for browser environment
  return btoa(str);
}

/**
 * Decodes a Base64 string back to a QuickBase record ID
 * @param encodedId - The Base64 encoded string (e.g., "NDI=")
 * @returns The original record ID or null if invalid
 */
export function decodeQuoteId(encodedId: string): number | null {
  try {
    let decoded: string;
    // Use Buffer in Node.js environment (server-side)
    if (typeof Buffer !== 'undefined') {
      decoded = Buffer.from(encodedId, 'base64').toString('utf8');
    } else {
      // Fallback for browser environment
      decoded = atob(encodedId);
    }
    
    const recordId = parseInt(decoded, 10);
    
    // Verify it's a valid positive integer
    if (!isNaN(recordId) && recordId > 0) {
      return recordId;
    }
    return null;
  } catch {
    return null;
  }
}
