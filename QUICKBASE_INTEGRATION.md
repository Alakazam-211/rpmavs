# QuickBase Integration Guide

This document explains how the QuickBase integration works for the quote request form.

## Overview

The quote request form (`/get-a-quote`) submits data to QuickBase using the QuickBase RESTful API. When a user completes the form, it creates a new record in the QuickBase table.

## Configuration

### Environment Variables

Add the following environment variable to your `.env` file (for local development) and Vercel project settings:

```
QUICKBASE_USER_TOKEN=your_quickbase_user_token_here
```

**Important**: Keep this token secure and never commit it to version control.

### QuickBase Table Information

- **Realm Hostname**: `rpmavs.quickbase.com`
- **Table ID**: `bt2kvdg53`
- **App ID**: `bikmcn82r`
- **Table URL**: https://rpmavs.quickbase.com/nav/app/bikmcn82r/table/bt2kvdg53/action/td

## Field ID Mapping

The API route (`app/api/quote-request/route.ts`) maps form fields to QuickBase field IDs. You **must** update the `FIELD_MAPPING` object with the actual field IDs from your QuickBase table.

### How to Find Field IDs

1. Log into QuickBase and navigate to your table
2. Go to Settings > Fields
3. Each field will have a Field ID (FID) displayed
4. Alternatively, use the QuickBase API to get field information:
   ```
   GET https://api.quickbase.com/v1/fields?tableId=bt2kvdg53
   ```

### Current Field Mapping Structure

The form collects the following data:

#### Contact Information
- First Name
- Last Name
- Email
- Company Name

#### Project Information
- Opportunity Name
- Project Name
- Client/End User

#### Address Information
- Street Address 1
- Street Address 2
- City
- State
- ZIP Code

#### Dates & Budget
- Quote Needed By
- Start Work Date
- Completion Date
- Budget

#### Services (Checkboxes)
- Site Survey
- Pre-Sales Design
- Design Review
- CAD
- Installation
- Project Management
- Programming
- Commissioning

#### Documentation (Checkboxes)
- BOM
- SOW
- Sketches
- Wiring Diagrams (SLD)
- Floor Plans
- RCP's
- Elevations
- Misc.

#### Text Fields
- Comments
- Scope of Work

## API Endpoint

The form submits to: `POST /api/quote-request`

### Request Format

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "companyName": "Acme Corp",
  "opportunityName": "Project Name",
  "projectName": "Unique Project Name",
  "clientEndUser": "Client Name",
  "jobsiteAddress": {
    "street1": "123 Main St",
    "street2": "Suite 100",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "quoteNeededBy": "2025-12-31",
  "startWorkDate": "2026-01-15",
  "completionDate": "2026-03-31",
  "budget": "$50,000",
  "services": {
    "siteSurvey": true,
    "preSalesDesign": false,
    ...
  },
  "documentation": {
    "bom": true,
    "sow": false,
    ...
  },
  "comments": "Additional comments",
  "scopeOfWork": "Detailed scope..."
}
```

### Response Format

**Success (200)**:
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "recordId": 123,
  "metadata": {
    "createdRecordIds": [123],
    "totalNumberOfRecordsProcessed": 1
  }
}
```

**Error (400/500)**:
```json
{
  "error": "Error message",
  "details": {}
}
```

## Testing

1. Ensure `QUICKBASE_USER_TOKEN` is set in your environment
2. Update field IDs in `app/api/quote-request/route.ts`
3. Fill out the form at `/get-a-quote`
4. Submit and verify the record appears in QuickBase

## Troubleshooting

### Common Issues

1. **"QUICKBASE_USER_TOKEN is not set"**
   - Ensure the environment variable is set in `.env` (local) or Vercel settings (production)

2. **"Failed to submit quote request to QuickBase"**
   - Check that field IDs in `FIELD_MAPPING` match your QuickBase table
   - Verify the user token has permission to create records in the table
   - Check QuickBase API response in server logs for specific error messages

3. **Field validation errors**
   - Some fields may have validation rules in QuickBase
   - Check the `details` field in the error response for specific field errors

4. **Date format issues**
   - Dates are formatted as ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
   - Ensure your QuickBase date fields accept this format

## QuickBase API Documentation

For more information, refer to the QuickBase RESTful API documentation:
- Swagger file: `QuickBase_RESTful_API_2025-12-21T20_09_57.501Z.json`
- Endpoint: `POST /v1/records`
- Base URL: `https://api.quickbase.com`
