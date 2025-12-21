/**
 * Script to fetch QuickBase field IDs and update the field mapping
 * Usage: node scripts/fetch-quickbase-fields.js
 */

const QUICKBASE_REALM = 'rpmavs.quickbase.com';
const QUICKBASE_TABLE_ID = 'bt2kvdg53';
const QUICKBASE_API_URL = 'https://api.quickbase.com/v1/fields';

// Get token from environment variable
const token = process.env.QUICKBASE_USER_TOKEN;

if (!token) {
  console.error('Error: QUICKBASE_USER_TOKEN environment variable is not set');
  console.error('Please set it in your .env file or export it before running this script');
  process.exit(1);
}

async function fetchFields() {
  try {
    const url = `${QUICKBASE_API_URL}?tableId=${QUICKBASE_TABLE_ID}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'QB-Realm-Hostname': QUICKBASE_REALM,
        'Authorization': `QB-USER-TOKEN ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RPM-AVS-Website/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`QuickBase API error: ${response.status} - ${errorText}`);
    }

    const fields = await response.json();
    
    console.log(`\nFound ${fields.length} fields in QuickBase table ${QUICKBASE_TABLE_ID}\n`);
    console.log('Field ID Mapping:');
    console.log('='.repeat(80));
    
    // Group fields by likely category based on label
    const fieldMap = {};
    
    fields.forEach(field => {
      const label = field.label.toLowerCase();
      const id = field.id;
      const type = field.fieldType;
      
      fieldMap[label] = { id, type, originalLabel: field.label };
    });
    
    // Print all fields for reference
    fields.forEach(field => {
      console.log(`  ${field.id.toString().padStart(3)}: ${field.label.padEnd(40)} (${field.fieldType})`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('\nSuggested Field Mapping (update FIELD_MAPPING in route.ts):\n');
    
    // Try to match form fields to QuickBase fields
    const mappings = {
      firstName: ['first name', 'firstname', 'fname', 'first'],
      lastName: ['last name', 'lastname', 'lname', 'last', 'surname'],
      email: ['email', 'e-mail', 'email address'],
      companyName: ['company', 'company name', 'organization', 'org'],
      opportunityName: ['opportunity', 'opportunity name', 'project name', 'quote name'],
      projectName: ['project', 'project name', 'unique project'],
      clientEndUser: ['client', 'end user', 'end-user', 'customer'],
      jobsiteStreet1: ['street', 'address', 'street address', 'street 1', 'address 1', 'street address 1'],
      jobsiteStreet2: ['street 2', 'address 2', 'street address 2', 'address line 2'],
      jobsiteCity: ['city'],
      jobsiteState: ['state'],
      jobsiteZip: ['zip', 'zip code', 'postal code', 'postcode'],
      quoteNeededBy: ['quote needed', 'quote date', 'needed by', 'quote by'],
      startWorkDate: ['start', 'start date', 'work start', 'start work'],
      completionDate: ['completion', 'complete', 'end date', 'completion date', 'finish'],
      budget: ['budget', 'cost', 'price'],
      siteSurvey: ['site survey', 'survey'],
      preSalesDesign: ['pre-sales', 'pre sales', 'presales design', 'pre-sales design'],
      designReview: ['design review', 'review'],
      cad: ['cad'],
      installation: ['install', 'installation'],
      projectManagement: ['project management', 'pm', 'project mgmt'],
      programming: ['program', 'programming'],
      commissioning: ['commission', 'commissioning'],
      bom: ['bom', 'bill of materials'],
      sow: ['sow', 'statement of work'],
      sketches: ['sketch', 'sketches'],
      wiringDiagrams: ['wiring', 'diagram', 'wiring diagram', 'sld'],
      floorPlans: ['floor plan', 'floorplan'],
      rcps: ['rcp', 'rcps', 'reflected ceiling'],
      elevations: ['elevation', 'elevations'],
      misc: ['misc', 'miscellaneous', 'other'],
      comments: ['comment', 'comments', 'notes', 'note'],
      scopeOfWork: ['scope', 'scope of work', 'sow text'],
    };
    
    const result = {};
    
    Object.keys(mappings).forEach(formField => {
      const searchTerms = mappings[formField];
      let found = false;
      
      for (const term of searchTerms) {
        for (const [label, fieldInfo] of Object.entries(fieldMap)) {
          if (label.includes(term)) {
            result[formField] = fieldInfo.id;
            found = true;
            console.log(`  ${formField.padEnd(25)} => ${fieldInfo.id.toString().padStart(3)} (${fieldInfo.originalLabel})`);
            break;
          }
        }
        if (found) break;
      }
      
      if (!found) {
        console.log(`  ${formField.padEnd(25)} => ??? (NOT FOUND - check QuickBase table)`);
      }
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('\nCopy the field IDs above and update FIELD_MAPPING in app/api/quote-request/route.ts\n');
    
    return { fields, mappings: result };
    
  } catch (error) {
    console.error('Error fetching fields:', error.message);
    process.exit(1);
  }
}

fetchFields();
