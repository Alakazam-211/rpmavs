import { NextRequest, NextResponse } from 'next/server';

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
 * TODO: Update these field IDs to match your actual QuickBase table structure
 * You can find field IDs by inspecting the table in QuickBase or using the GET /fields endpoint
 */
const FIELD_MAPPING = {
  // Contact Information
  firstName: 6,      // TODO: Update with actual field ID
  lastName: 7,       // TODO: Update with actual field ID
  email: 8,          // TODO: Update with actual field ID
  companyName: 9,    // TODO: Update with actual field ID
  
  // Project Information
  opportunityName: 10,  // TODO: Update with actual field ID
  projectName: 11,      // TODO: Update with actual field ID
  clientEndUser: 12,    // TODO: Update with actual field ID
  
  // Address Information
  jobsiteStreet1: 13,   // TODO: Update with actual field ID
  jobsiteStreet2: 14,   // TODO: Update with actual field ID
  jobsiteCity: 15,      // TODO: Update with actual field ID
  jobsiteState: 16,     // TODO: Update with actual field ID
  jobsiteZip: 17,       // TODO: Update with actual field ID
  
  // Dates and Budget
  quoteNeededBy: 18,    // TODO: Update with actual field ID
  startWorkDate: 19,    // TODO: Update with actual field ID
  completionDate: 20,   // TODO: Update with actual field ID
  budget: 21,           // TODO: Update with actual field ID
  
  // Services (checkboxes - may need to be handled as multi-select or separate fields)
  siteSurvey: 22,           // TODO: Update with actual field ID
  preSalesDesign: 23,       // TODO: Update with actual field ID
  designReview: 24,         // TODO: Update with actual field ID
  cad: 25,                  // TODO: Update with actual field ID
  installation: 26,         // TODO: Update with actual field ID
  projectManagement: 27,    // TODO: Update with actual field ID
  programming: 28,          // TODO: Update with actual field ID
  commissioning: 29,        // TODO: Update with actual field ID
  
  // Documentation (checkboxes)
  bom: 30,                  // TODO: Update with actual field ID
  sow: 31,                  // TODO: Update with actual field ID
  sketches: 32,             // TODO: Update with actual field ID
  wiringDiagrams: 33,       // TODO: Update with actual field ID
  floorPlans: 34,           // TODO: Update with actual field ID
  rcps: 35,                 // TODO: Update with actual field ID
  elevations: 36,           // TODO: Update with actual field ID
  misc: 37,                 // TODO: Update with actual field ID
  
  // Text Fields
  comments: 38,             // TODO: Update with actual field ID
  scopeOfWork: 39,          // TODO: Update with actual field ID
};

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
    record[FIELD_MAPPING.jobsiteState] = { value: formData.jobsiteAddress.state };
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

    // Get QuickBase user token from environment variables
    const quickbaseToken = process.env.QUICKBASE_USER_TOKEN;
    if (!quickbaseToken) {
      console.error('QUICKBASE_USER_TOKEN is not set in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: QuickBase token not configured' },
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
    const quickbaseResponse = await fetch(QUICKBASE_API_URL, {
      method: 'POST',
      headers: {
        'QB-Realm-Hostname': QUICKBASE_REALM,
        'Authorization': `QB-USER-TOKEN ${quickbaseToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RPM-AVS-Website/1.0',
      },
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

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        recordId: result.metadata?.createdRecordIds?.[0],
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
