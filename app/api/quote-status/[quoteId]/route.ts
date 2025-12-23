import { NextRequest, NextResponse } from 'next/server';
import { decodeQuoteId } from '@/lib/quote-id-cipher';

const QUICKBASE_REALM = 'rpmavs.quickbase.com';
const QUICKBASE_TABLE_ID = 'bt2kvdg53';
const QUICKBASE_API_URL = 'https://api.quickbase.com/v1/records/query';

// Field IDs for status page
const FIELD_MAPPING = {
  opportunityName: 26,  // Project Name
  dateCreated: 1,       // Date Created
  status: 47,          // This request has been processed (checkbox - might need to check actual status field)
  email: 8,            // Email Address
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quoteId: string }> }
) {
  try {
    // Await params (Next.js 16+ requires params to be awaited)
    const resolvedParams = await params;
    
    // Extract quoteId from params, or fallback to extracting from URL path
    // Next.js sometimes doesn't populate params correctly, so we extract from URL as fallback
    let quoteId = resolvedParams?.quoteId;
    
    // If resolvedParams.quoteId is undefined, extract from URL path
    if (!quoteId || quoteId === 'undefined') {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      const quoteIdIndex = pathParts.indexOf('quote-status');
      if (quoteIdIndex >= 0 && quoteIdIndex < pathParts.length - 1) {
        quoteId = pathParts[quoteIdIndex + 1];
      }
    }
    
    if (!quoteId || quoteId === 'undefined') {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      );
    }
    
    // URL decode the quoteId (handles %3D -> =)
    quoteId = decodeURIComponent(quoteId);

    // Decode the quote ID from Base64
    const recordId = decodeQuoteId(quoteId);
    
    if (!recordId) {
      return NextResponse.json(
        { error: 'Invalid quote ID' },
        { status: 400 }
      );
    }

    // Get QuickBase tokens
    const quickbaseToken = process.env.QUICKBASE_USER_TOKEN;
    const appToken = process.env.PROJECT_MANAGER_APP_TOKEN;

    if (!quickbaseToken || !appToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Query QuickBase for the specific record
    // Field 3 is Record ID# - use numeric comparison, not string
    const queryPayload = {
      from: QUICKBASE_TABLE_ID,
      where: `{3.EX.${recordId}}`, // Field 3 is Record ID#
      select: [FIELD_MAPPING.opportunityName, FIELD_MAPPING.dateCreated, FIELD_MAPPING.status, FIELD_MAPPING.email],
    };

    const requestHeaders: Record<string, string> = {
      'QB-Realm-Hostname': QUICKBASE_REALM,
      'Authorization': `QB-USER-TOKEN ${quickbaseToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'RPM-AVS-Website/1.0',
      'QB-App-Token': appToken,
    };

    const quickbaseResponse = await fetch(QUICKBASE_API_URL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(queryPayload),
    });

    if (!quickbaseResponse.ok) {
      const errorData = await quickbaseResponse.json().catch(() => ({ message: 'Unknown error' }));
      return NextResponse.json(
        { error: 'Failed to fetch quote status', details: errorData },
        { status: quickbaseResponse.status }
      );
    }

    const result = await quickbaseResponse.json();

    if (!result.data || result.data.length === 0) {
      return NextResponse.json(
        { error: 'Quote request not found' },
        { status: 404 }
      );
    }

    const record = result.data[0];
    
    // Extract field values
    const opportunityName = record[FIELD_MAPPING.opportunityName]?.value || 'N/A';
    const dateCreated = record[FIELD_MAPPING.dateCreated]?.value || null;
    const status = record[FIELD_MAPPING.status]?.value || false;
    const email = record[FIELD_MAPPING.email]?.value || '';

    // Format date
    let formattedDate = 'N/A';
    if (dateCreated) {
      try {
        const date = new Date(dateCreated);
        formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        formattedDate = dateCreated;
      }
    }

    // Obfuscate email: show first letter before @ + stars + @ + first letter after @ + stars + . + TLD
    function obfuscateEmail(email: string): string {
      if (!email || !email.includes('@')) {
        return email;
      }
      const [localPart, domain] = email.split('@');
      
      // Obfuscate local part (before @)
      let obfuscatedLocal = localPart;
      if (localPart.length > 1) {
        const firstLetter = localPart[0];
        const stars = '*'.repeat(localPart.length - 1);
        obfuscatedLocal = `${firstLetter}${stars}`;
      }
      
      // Obfuscate domain part (after @)
      // Find the first dot to separate domain name from TLD
      const firstDotIndex = domain.indexOf('.');
      if (firstDotIndex === -1) {
        // No dot found, just obfuscate the whole domain
        if (domain.length > 1) {
          const firstLetter = domain[0];
          const lastLetter = domain[domain.length - 1];
          const stars = '*'.repeat(domain.length - 2);
          return `${obfuscatedLocal}@${firstLetter}${stars}${lastLetter}`;
        }
        return `${obfuscatedLocal}@${domain}`;
      }
      
      const domainName = domain.substring(0, firstDotIndex);
      const tld = domain.substring(firstDotIndex); // Includes the dot and everything after (e.g., ".com" or ".example.io")
      
      let obfuscatedDomain = '';
      if (domainName.length > 0) {
        if (domainName.length === 1) {
          // Only one character, just show it
          obfuscatedDomain = `${domainName}${tld}`;
        } else {
          // Show first letter, stars, last letter, then TLD
          const firstLetter = domainName[0];
          const lastLetter = domainName[domainName.length - 1];
          const stars = '*'.repeat(domainName.length - 2);
          obfuscatedDomain = `${firstLetter}${stars}${lastLetter}${tld}`;
        }
      } else {
        obfuscatedDomain = tld;
      }
      
      return `${obfuscatedLocal}@${obfuscatedDomain}`;
    }

    return NextResponse.json({
      success: true,
      quoteId: quoteId,
      recordId: recordId,
      opportunityName: opportunityName,
      dateSubmitted: formattedDate,
      status: status ? 'Processed' : 'Pending',
      isProcessed: status,
      email: email,
      obfuscatedEmail: obfuscateEmail(email),
    });
  } catch (error) {
    console.error('Quote status API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
