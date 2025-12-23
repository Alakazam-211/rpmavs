import { NextRequest, NextResponse } from 'next/server';
import { encodeQuoteId } from '@/lib/quote-id-cipher';

/**
 * QuickBase API Configuration
 * Table ID: bt2kvdg53 (from URL: https://rpmavs.quickbase.com/nav/app/bikmcn82r/table/bt2kvdg53/action/td)
 * Realm Hostname: rpmavs.quickbase.com
 */
const QUICKBASE_REALM = 'rpmavs.quickbase.com';
const QUICKBASE_TABLE_ID = 'bt2kvdg53';
const QUICKBASE_API_URL = 'https://api.quickbase.com/v1/records';

/**
 * Field ID mapping for QuickBase table
 * Field IDs retrieved from QuickBase API on 2025-12-21
 * Table: bt2kvdg53 (Quote Requests)
 */
const FIELD_MAPPING = {
  // Contact Information
  firstName: 6,      // First Name
  lastName: 7,        // Last Name
  email: 8,           // Email Address
  companyName: 25,     // Company Name
  
  // Project Information
  opportunityName: 26,  // Project Name (used for opportunity name)
  projectName: 26,      // Project Name (same field as opportunity name)
  clientEndUser: 13,   // Client
  
  // Address Information
  jobsiteStreet1: 49,  // Street 1
  jobsiteStreet2: 50,  // Street 2
  jobsiteCity: 51,     // City
  jobsiteState: 52,    // State/Region
  jobsiteZip: 53,      // Postal Code
  
  // Dates and Budget
  quoteNeededBy: 24,   // Need by Date
  startWorkDate: 34,   // Start Work Date:
  completionDate: 35,   // Completion Date:
  budget: 36,          // Budget
  
  // Services (checkboxes)
  siteSurvey: 55,           // Site Survey
  preSalesDesign: 17,       // Pre-Sales Design
  designReview: 16,         // Design Review
  cad: 15,                  // CAD
  installation: 9,          // Installation
  projectManagement: 14,    // Project Management
  programming: 10,          // Programming
  commissioning: 12,        // Commissioning
  
  // Documentation (checkboxes)
  bom: 37,                  // BOM2 (checkbox)
  sow: 38,                  // SOW3 (checkbox)
  sketches: 39,             // Sketches2 (checkbox)
  wiringDiagrams: 40,       // Wiring Diagrams (SLD)
  floorPlans: 41,          // Floor Plans2 (checkbox)
  rcps: 42,                // RCP's (checkbox)
  elevations: 43,          // Elevations (checkbox)
  misc: 46,                // Misc.
  
  // Text Fields
  comments: 27,            // Comments
  scopeOfWork: 20,         // SOW2 (rich-text field)
};

/**
 * Maps US state codes to full state names for QuickBase multiple-choice field
 * Field 52 (State/Region) requires full state names, not codes
 */
const STATE_CODE_TO_NAME: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'DC': 'District of Columbia', 'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii',
  'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine',
  'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota',
  'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska',
  'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico',
  'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island',
  'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas',
  'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington',
  'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

/**
 * Converts state code to full state name for QuickBase
 */
function convertStateCodeToName(stateCode: string): string {
  const upperCode = stateCode.toUpperCase().trim();
  return STATE_CODE_TO_NAME[upperCode] || stateCode; // Return original if not found
}

/**
 * Formats a date string (YYYY-MM-DD) to QuickBase format (ISO 8601)
 */
function formatDateForQuickBase(dateString: string): string | null {
  if (!dateString) return null;
  // QuickBase expects ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ
  // For date-only fields, we'll use midnight UTC
  return `${dateString}T00:00:00Z`;
}

/**
 * Formats services/documentation checkboxes into a format QuickBase can understand
 * This depends on how your QuickBase table is structured:
 * - If using multi-select fields, return array of selected values
 * - If using separate checkbox fields, each will be handled individually
 */
function formatServices(services: Record<string, boolean>): string[] {
  return Object.entries(services)
    .filter(([_, checked]) => checked)
    .map(([key, _]) => key);
}

/**
 * Builds the QuickBase record data object
 */
function buildQuickBaseRecord(formData: any): Record<string, { value: any }> {
  const record: Record<string, { value: any }> = {};

  // Contact Information
  if (formData.firstName) {
    record[FIELD_MAPPING.firstName] = { value: formData.firstName };
  }
  if (formData.lastName) {
    record[FIELD_MAPPING.lastName] = { value: formData.lastName };
  }
  if (formData.email) {
    record[FIELD_MAPPING.email] = { value: formData.email };
  }
  if (formData.companyName) {
    record[FIELD_MAPPING.companyName] = { value: formData.companyName };
  }

  // Project Information
  if (formData.opportunityName) {
    record[FIELD_MAPPING.opportunityName] = { value: formData.opportunityName };
  }
  if (formData.projectName) {
    record[FIELD_MAPPING.projectName] = { value: formData.projectName };
  }
  if (formData.clientEndUser) {
    record[FIELD_MAPPING.clientEndUser] = { value: formData.clientEndUser };
  }

  // Address Information
  if (formData.jobsiteAddress?.street1) {
    record[FIELD_MAPPING.jobsiteStreet1] = { value: formData.jobsiteAddress.street1 };
  }
  if (formData.jobsiteAddress?.street2) {
    record[FIELD_MAPPING.jobsiteStreet2] = { value: formData.jobsiteAddress.street2 };
  }
  if (formData.jobsiteAddress?.city) {
    record[FIELD_MAPPING.jobsiteCity] = { value: formData.jobsiteAddress.city };
  }
  if (formData.jobsiteAddress?.state) {
    // Convert state code to full state name for QuickBase multiple-choice field
    const stateName = convertStateCodeToName(formData.jobsiteAddress.state);
    record[FIELD_MAPPING.jobsiteState] = { value: stateName };
  }
  if (formData.jobsiteAddress?.zip) {
    record[FIELD_MAPPING.jobsiteZip] = { value: formData.jobsiteAddress.zip };
  }

  // Dates
  if (formData.quoteNeededBy) {
    const formattedDate = formatDateForQuickBase(formData.quoteNeededBy);
    if (formattedDate) {
      record[FIELD_MAPPING.quoteNeededBy] = { value: formattedDate };
    }
  }
  if (formData.startWorkDate) {
    const formattedDate = formatDateForQuickBase(formData.startWorkDate);
    if (formattedDate) {
      record[FIELD_MAPPING.startWorkDate] = { value: formattedDate };
    }
  }
  if (formData.completionDate) {
    const formattedDate = formatDateForQuickBase(formData.completionDate);
    if (formattedDate) {
      record[FIELD_MAPPING.completionDate] = { value: formattedDate };
    }
  }

  // Budget
  if (formData.budget) {
    record[FIELD_MAPPING.budget] = { value: formData.budget };
  }

  // Services (as individual checkbox fields)
  if (formData.services) {
    if (formData.services.siteSurvey) {
      record[FIELD_MAPPING.siteSurvey] = { value: true };
    }
    if (formData.services.preSalesDesign) {
      record[FIELD_MAPPING.preSalesDesign] = { value: true };
    }
    if (formData.services.designReview) {
      record[FIELD_MAPPING.designReview] = { value: true };
    }
    if (formData.services.cad) {
      record[FIELD_MAPPING.cad] = { value: true };
    }
    if (formData.services.installation) {
      record[FIELD_MAPPING.installation] = { value: true };
    }
    if (formData.services.projectManagement) {
      record[FIELD_MAPPING.projectManagement] = { value: true };
    }
    if (formData.services.programming) {
      record[FIELD_MAPPING.programming] = { value: true };
    }
    if (formData.services.commissioning) {
      record[FIELD_MAPPING.commissioning] = { value: true };
    }
  }

  // Documentation (as individual checkbox fields)
  if (formData.documentation) {
    if (formData.documentation.bom) {
      record[FIELD_MAPPING.bom] = { value: true };
    }
    if (formData.documentation.sow) {
      record[FIELD_MAPPING.sow] = { value: true };
    }
    if (formData.documentation.sketches) {
      record[FIELD_MAPPING.sketches] = { value: true };
    }
    if (formData.documentation.wiringDiagrams) {
      record[FIELD_MAPPING.wiringDiagrams] = { value: true };
    }
    if (formData.documentation.floorPlans) {
      record[FIELD_MAPPING.floorPlans] = { value: true };
    }
    if (formData.documentation.rcps) {
      record[FIELD_MAPPING.rcps] = { value: true };
    }
    if (formData.documentation.elevations) {
      record[FIELD_MAPPING.elevations] = { value: true };
    }
    if (formData.documentation.misc) {
      record[FIELD_MAPPING.misc] = { value: true };
    }
  }

  // Text Fields
  if (formData.comments) {
    record[FIELD_MAPPING.comments] = { value: formData.comments };
  }
  if (formData.scopeOfWork) {
    record[FIELD_MAPPING.scopeOfWork] = { value: formData.scopeOfWork };
  }

  return record;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.opportunityName) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, and opportunityName are required' },
        { status: 400 }
      );
    }

    // Get QuickBase tokens from environment variables
    const quickbaseToken = process.env.QUICKBASE_USER_TOKEN;
    const appToken = process.env.PROJECT_MANAGER_APP_TOKEN;
    
    if (!quickbaseToken) {
      console.error('QUICKBASE_USER_TOKEN is not set in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: QuickBase user token not configured' },
        { status: 500 }
      );
    }
    
    if (!appToken) {
      console.error('PROJECT_MANAGER_APP_TOKEN is not set in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: QuickBase app token not configured' },
        { status: 500 }
      );
    }

    // Build QuickBase record
    const quickbaseRecord = buildQuickBaseRecord(formData);

    // Prepare QuickBase API request
    const quickbasePayload = {
      to: QUICKBASE_TABLE_ID,
      data: [quickbaseRecord],
    };

    // Make request to QuickBase API
    const requestHeaders: Record<string, string> = {
      'QB-Realm-Hostname': QUICKBASE_REALM,
      'Authorization': `QB-USER-TOKEN ${quickbaseToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'RPM-AVS-Website/1.0',
    };
    
    // Add app token header if app requires it
    if (appToken) {
      requestHeaders['QB-App-Token'] = appToken;
    }
    
    const quickbaseResponse = await fetch(QUICKBASE_API_URL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(quickbasePayload),
    });

    if (!quickbaseResponse.ok) {
      let errorData;
      try {
        errorData = await quickbaseResponse.json();
      } catch {
        errorData = await quickbaseResponse.text();
      }
      
      console.error('QuickBase API error:', errorData);
      console.error('QuickBase API status:', quickbaseResponse.status);
      
      return NextResponse.json(
        { 
          error: 'Failed to submit quote request to QuickBase',
          details: errorData,
          status: quickbaseResponse.status
        },
        { status: quickbaseResponse.status }
      );
    }

    const result = await quickbaseResponse.json();

    // Check if there were any line errors (partial failures)
    if (result.metadata?.lineErrors && Object.keys(result.metadata.lineErrors).length > 0) {
      console.error('QuickBase line errors:', result.metadata.lineErrors);
      return NextResponse.json(
        { 
          error: 'Some fields failed validation in QuickBase',
          details: result.metadata.lineErrors,
          createdRecordIds: result.metadata.createdRecordIds
        },
        { status: 207 }
      );
    }

    const recordId = result.metadata?.createdRecordIds?.[0];
    const encodedId = recordId ? encodeQuoteId(recordId) : null;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        recordId: recordId,
        quoteId: encodedId, // Encoded ID for use in URLs
        statusUrl: encodedId ? `/quote-status/${encodedId}` : null,
        metadata: result.metadata
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quote request API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
