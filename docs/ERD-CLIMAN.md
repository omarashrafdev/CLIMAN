# Engineering Requirements Document (ERD): CLIMAN (v 1.0)

CLIMAN is a sophisticated clinic management tool designed to streamline the collaboration between doctors, patients, and healthcare professionals. This document delves into the design and architecture of CLIMAN, focusing on empowering doctors to provide optimal patient care while managing clinic operations efficiently.

## Purpose:

CLIMAN aims to revolutionize clinic management by providing doctors with a user-friendly platform that facilitates seamless data sharing among healthcare professionals. The primary objectives include enhancing patient care, improving appointment management, and fostering effective collaboration among medical practitioners.

## Architecture:

CLIMAN adopts a basic client/server architecture, deploying a single server on a cloud provider alongside a relational database. This server serves HTTP traffic from a public endpoint, ensuring accessibility and scalability.

## Database Schema:

The relational database underpinning CLIMAN includes entities such as Users, Patients, Appointments, Notes, and Files. These entities capture critical information required for efficient clinic management.

### Users:

| Column          | Type          |
| --------------- | ------------- |
| ID              | STRING/UUID   |
| Email           | STRING        |
| Password        | STRING        |
| First name      | STRING        |
| Last name       | STRING        |
| Gender          | STRING        |
| Image           | FILE          |
| Phone           | NUMERIC       |
| Birthdate       | DATE          |
| Address         | STRING        |
| City            | STRING        |
| Type            | STRING        |
| Status          | STRING        |
| RegisterDate    | DATE          |

- **Gender** [MALE (M), FEMALE (F)]
- **City** [List of Cities]
- **Type** [DOCTOR (D), ADMIN (A)]
- **Status** [NEW (N), VERIFIED (V), SUSPENDED (S)]

### Patients:

| Column          | Type          |
| --------------- | ------------- |
| UserId          | STRING/UUID   |
| Email           | STRING        |
| First name      | STRING        |
| Last name       | STRING        |
| Gender          | STRING        |
| Image           | FILE          |
| Phone           | NUMERIC       |
| Birthdate       | DATE          |
| Address         | STRING        |
| City            | STRING        |
| Type            | STRING        |
| Status          | STRING        |
| RegisterDate    | DATE          |

### Appointments:

| Column          | Type          |
| --------------- | ------------- |
| ID              | STRING/UUID   |
| DoctorId        | STRING/UUID   |
| PatientId       | STRING/UUID   |
| Treatment       | STRING        |
| Description     | STRING        |
| Date            | DATE          |
| Time            | TIMESTAMP     |
| Status          | STRING        |

- **Status** [SCHEDULED (S), DONE (D), CANCELED (C)]

### Notes:

| Column          | Type          |
| --------------- | ------------- |
| ID              | STRING/UUID   |
| DoctorId        | STRING/UUID   |
| PatientId       | STRING/UUID   |
| Description     | STRING        |
| Date            | DATE          |
| Time            | TIMESTAMP     |

### Files:

| Column          | Type          |
| --------------- | ------------- |
| ID              | STRING/UUID   |
| DoctorId        | STRING/UUID   |
| PatientId       | STRING/UUID   |
| FileName        | STRING        |
| Path            | FILE          |
| Date            | DATE          |
| Time            | TIMESTAMP     |

## Authentication and API:

### Auth:

In version 1, CLIMAN implements a JWT-based authentication mechanism for user login and registration. Passwords are encrypted and stored in the database. OAuth integration for platforms like Google and Facebook is a potential enhancement for future releases.

#### API Endpoints:

- `/signIn` [POST]: Initiates login using email and password.
- `/signUp` [POST]: Facilitates user registration with basic information.
- `/profile/complete` [PUT]: Enables the completion of user information after registration.

### Main:

- `/dashboard` [GET]: Retrieves elements and numeric summaries for the user's dashboard.

### Patients:

- `/patients/` [GET]: Fetches all patients.
- `/patients/` [POST]: Adds a new patient record.
- `/patients/:id` [GET]: Retrieves patient information using ID.
- `/patients/:id` [PUT]: Edits patient information using ID.
- `/patients/:id` [DELETE]: Deletes a patient record using ID.

### Appointments:

- `/appointments/` [GET]: Retrieves all appointments.
- `/appointments/` [POST]: Adds a new appointment record.
- `/appointments/:id` [GET]: Retrieves appointment information using ID.
- `/appointments/:id` [PUT]: Edits appointment information using ID.
- `/appointments/:id` [DELETE]: Deletes an appointment record using ID.

### Notes:

- `/notes/:id` [GET]: Retrieves patient notes using patient ID.
- `/notes/:id` [POST]: Adds new patient notes using patient ID.
- `/notes/:id` [PUT]: Edits patient notes using note ID.
- `/notes/:id` [DELETE]: Deletes patient notes using note ID.

### Files:

- `/files/:id` [GET]: Retrieves patient files using patient ID.
- `/files/:id` [POST]: Adds patient files using patient ID