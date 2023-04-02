# Engineering Requirements Document (ERD): CLIMAN

This document explores the design of CLIMAN, a clinic management tool 
designed to connect doctors with their patients and other doctors

We'll use a basic client/server architecture, where a single server is deployed
on a cloud provider next to a relational database, and serving HTTP traffic from
a public endpoint.

## Storage

We'll use a relational database (schema follows) to fast retrieval of posts and
comments. A minimal database implementation such as sqlite3 suffices, although
we can potentially switch to something with a little more power such as
PostgreSql or MySql if necessary. Data will be stored on the server on a separate, backed
up volume for resilience. There will be no replication or sharding of data at
this early stage.

We ruled out storage-as-a-service services such as Firestore and the like in
order to showcase building a standalone backend for educational purposes.

### Schema:

We'll need at least the following entities to implement the service:

**Users**:
|       Column      |      Type      |
|-------------------|----------------|
|         ID        |  STRING/UUID   |
|       Email       |     STRING     |
|      Password     |     STRING     |

**UserInformation**:
|       Column      |      Type      |
|-------------------|----------------|
|       UserId      |  STRING/UUID   |
|     First name    |     STRING     |
|     Last name     |     STRING     |
|      Gender       |     STRING     |
|       Image       |      FILE      |
|       Phone       |     NUMERIC    |
|     Birthdate     |      DATE      |
|      Address      |     STRING     |
|       City        |     STRING     |
|       Type        |     STRING     |
|      Status       |     STRING     |
|    RegisterDate   |      DATE      |

**Appointments**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|     DoctorId      |  STRING/UUID   |
|     PatientId     |  STRING/UUID   |
|     Treatment     |     STRING     |
|       Date        |      DATE      |
|       Time        |   TIMESTAMP    |
|      status       |     STRING     |

**AppointmentsRequests**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|     DoctorId      |  STRING/UUID   |
|     PatientId     |  STRING/UUID   |
|     Treatment     |     STRING     |
|       Date        |      DATE      |
|       Time        |   TIMESTAMP    |
|      status       |     STRING     |

**PatientNotes**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|     DoctorId      |  STRING/UUID   |
|     PatientId     |  STRING/UUID   |
|    Description    |     STRING     |
|       Date        |      DATE      |
|       Time        |   TIMESTAMP    |

**PatientFiles**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|     DoctorId      |  STRING/UUID   |
|     PatientId     |  STRING/UUID   |
|     FileName      |     STRING     |
|       Path        |      File      |
|       Date        |      DATE      |
|       Time        |   TIMESTAMP    |

**Conversations**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|     CreatedBy     |  STRING/UUID   |
|    ReceiverID     |  STRING/UUID   |
|     CreatedAt     |      DATE      |

**Messages**
|       Column      |      Type      |
|-------------------|----------------|
|        ID         |  STRING/UUID   |
|  ConversationID   |  STRING/UUID   |
|     SenderID      |  STRING/UUID   |
|    ReceiverID     |  STRING/UUID   |
|       Body        |     STRING     |
|       Date        |      DATE      |
|       Time        |   TIMESTAMP    |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Django is selected for implementing the server for speed of development.
- Rest Framework is the web server framework.

### Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords
encrypted and stored in the database. OAuth is to be added initially or later
for Google + Facebook and maybe others.

### API

**Auth**:

```
/signIn  [POST]
/signUp  [POST]
```

**Main**:

```
/  [GET]
```

**Patients**:

```
/patients/list  [GET]
/patients/:id  [GET]
```

**Appointments**:

```
/appointments/list  [GET]
/appointments/:id  [GET]
/appointments/:id  [PUT]
```

**Notes**:

```
/notes/:id  [GET]
/notes/:id  [POST]
/notes/:id  [PUT]
/notes/:id  [DELETE]
```

**Files**:

```
/files/:id  [GET]
/files/:id  [POST]
/files/:id  [DELETE]
```

**Conversation**:

```
/conversation/:id  [GET]
/conversation/:id  [POST]
/conversation/:id  [PUT]
```

**Messages**:

```
/messages/:id  [GET]
/messages/:id  [POST]
/messages/:id  [DELETE]
```


## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

- The web client will be implemented in React.js.
- See Figma/screenshots for details.
- API server will serve a static bundle of the React app.
- Uses ReactQuery to talk to the backend.
- Uses Chakra UI for building the CSS components.