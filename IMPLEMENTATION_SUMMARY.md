# Doctor Verification System - Implementation Summary

## Overview
Implemented a complete role-based access control system with doctor verification workflow for MauLocum platform.

## User Roles
- **NORMAL_USER** (default) - Limited access, cannot view jobs
- **DOCTOR** - Full access after verification approval
- **EMPLOYER** - For facility owners (future implementation)
- **ADMIN** - System administrators

## Database Schema Changes

### Updated Models

#### User Model
```prisma
model User {
  id                 String              @id
  name               String
  email              String
  emailVerified      Boolean             @default(false)
  image              String?
  role               UserRole            @default(NORMAL_USER)
  phoneNumber        String?
  location           String?
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @default(now()) @updatedAt
  sessions           Session[]
  accounts           Account[]
  doctorVerification DoctorVerification?
}
```

#### DoctorVerification Model (NEW)
```prisma
model DoctorVerification {
  id                String             @id @default(cuid())
  userId            String             @unique
  user              User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName          String
  phoneNumber       String
  location          String
  specialty         String?
  yearsOfExperience Int
  provisionalId     String?
  fullId            String?
  apcNumber         String
  apcDocumentUrl    String
  status            VerificationStatus @default(PENDING)
  rejectionReason   String?
  submittedAt       DateTime           @default(now())
  reviewedAt        DateTime?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}
```

#### Enums (NEW)
```prisma
enum UserRole {
  NORMAL_USER
  DOCTOR
  EMPLOYER
  ADMIN
}

enum VerificationStatus {
  PENDING
  APPROVED
  REJECTED
}
```

## API Endpoints

### Profile Routes (`/api/v2/profile`)

1. **GET /user/:userId**
   - Fetches user profile with verification status
   - Returns user data including `doctorVerification` relation

2. **POST /verify-doctor**
   - Submits doctor verification request
   - Required fields:
     - fullName
     - phoneNumber
     - location
     - yearsOfExperience
     - apcNumber
     - apcDocumentUrl
     - provisionalId OR fullId (at least one required)
   - Optional: specialty
   - Creates verification record with PENDING status

3. **PATCH /user/:userId/role**
   - Updates user role (admin only)
   - Used to promote NORMAL_USER to DOCTOR after approval

## Frontend Components

### DoctorVerificationForm
**Location:** `/src/app/(main)/profile/_components/doctor-verification-form.tsx`

Features:
- Comprehensive form with validation
- File upload for APC document
- Real-time validation using Zod
- Loading states
- Error handling
- Responsive design

### Profile Page
**Location:** `/src/app/(main)/profile/page.tsx`

Features:
- Session-based authentication check
- Role-based content display
- Verification status indicators:
  - Blue alert: Needs verification (NORMAL_USER)
  - Yellow alert: Pending verification
  - Red alert: Rejected verification
  - Green badge: Verified (DOCTOR)
- Conditional form display
- Server-side rendering

## Workflow

### 1. New User Registration
```
User signs up → Role: NORMAL_USER → Limited access
```

### 2. Doctor Verification Process
```
NORMAL_USER visits profile
    ↓
Sees "Complete Profile" prompt
    ↓
Fills verification form
    ↓
Submits with APC document
    ↓
Status: PENDING
    ↓
Admin reviews
    ↓
APPROVED → Role changed to DOCTOR → Full access
    OR
REJECTED → User notified with reason
```

### 3. Access Control
- **NORMAL_USER**: Cannot access `/jobs` (guest view only)
- **DOCTOR**: Full access to browse and apply for jobs
- **EMPLOYER**: Manage facilities and post jobs
- **ADMIN**: Manage verifications and users

## Required Actions

### 1. Run Prisma Migration
```bash
cd /Users/khairulfitri/Documents/GitHub/mau-locum
npx prisma migrate dev --name add_doctor_verification
```

This will:
- Create new tables and enums
- Add new columns to User table
- Generate updated Prisma Client

### 2. Implement File Upload
The current implementation uses a placeholder URL for APC documents. You need to integrate a file storage service:

**Recommended Options:**
- **Cloudinary** (easiest for images/PDFs)
- **AWS S3** (most scalable)
- **Vercel Blob** (if using Vercel)
- **UploadThing** (developer-friendly)

**Update in:** `/src/app/(main)/profile/_components/doctor-verification-form.tsx`
```typescript
// Replace this placeholder:
const apcDocumentUrl = uploadedFile
  ? `https://storage.example.com/apc/${userId}/${uploadedFile.name}`
  : "";

// With actual upload logic:
const formData = new FormData();
formData.append('file', uploadedFile);
const uploadResponse = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
const { url } = await uploadResponse.json();
```

### 3. Implement Admin Dashboard
Create admin interface to:
- View pending verifications
- Approve/reject applications
- Update user roles
- View verification documents

### 4. Add Email Notifications
Notify users when:
- Verification submitted (confirmation)
- Verification approved
- Verification rejected (with reason)

### 5. Protect Job Routes
Add middleware or page-level checks:
```typescript
// In /jobs page
if (user.role === 'NORMAL_USER') {
  return <GuestJobView />; // Limited info only
}
return <FullJobView />; // Full access for doctors
```

## Environment Variables
Ensure these are set:
```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Testing Checklist

- [ ] New user can register
- [ ] Profile page shows verification prompt
- [ ] Form validation works correctly
- [ ] File upload accepts PDF/images
- [ ] Submission creates PENDING verification
- [ ] Pending status displays correctly
- [ ] Admin can approve verification
- [ ] User role updates to DOCTOR
- [ ] Verified users can access jobs
- [ ] Normal users cannot access jobs
- [ ] Rejection flow works with reason

## Future Enhancements

1. **Email Verification**
   - Verify email before allowing verification submission

2. **Document Verification**
   - OCR to extract APC number from document
   - Validate against MMC database

3. **Expiry Tracking**
   - Track APC expiry dates
   - Send renewal reminders

4. **Multi-document Support**
   - Allow multiple document uploads
   - Support for additional certifications

5. **Verification History**
   - Track all verification attempts
   - Audit log for admin actions

## Notes

- TypeScript errors in IDE are expected until Prisma migration is run
- The form uses react-hook-form with Zod validation
- All routes are protected with Better Auth session checks
- Dark mode support is included in all UI components
