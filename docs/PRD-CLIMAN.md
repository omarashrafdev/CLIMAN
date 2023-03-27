# Product Requirements Document (PRD): CLIMAN

CLIMAN is a clinic management tool designed to enable doctors to help their patients through sharing their patients data with other doctors.
It also allows doctors and patients to manage their appointments.

# Experience: Doctors

## Dashboard

The main page of site is the dashboard and it has some graphs and total numbers (Appointments - Requests - Patients - Rating - Payment)

Without signing in, users will see 403 unauthorized error. After signing in, users can view their dashboard.

## Patient List

The site will contain a list of all patients associated with the doctor viewing the page, each patient showing up with his name, email, picture, next appointment date, last appointment date, register date. 

The list has search by name, email, and phone number. The list has sorting by name and different dates. Each patient has his own page that contain all the information associated to his account.

Without signing in, users will see 403 unauthorized error. After signing in, users can view their patient list.

## Appointments

Users can view their appointments list for all the patients associated with the doctor viewing the page that contains patient name, treatment, date & time, and last visit.

The list has search by name, email, and phone number. The list has sorting by name and different dates. The list has filtering by treatment and specific date range. Each appointment has his own page that contain all the information associated to this appointment.

Without signing in, users will see 403 unauthorized error. After signing in, users can view their patient list.

## Messages

Users can view their conversations with their patients and other doctors. The page has list of conversations on the left and the messages of the active one on the middle and user information on the right with actions (View profile - Report - Block).

The chatting experience provides file upload and emoji's explorer (Discord DM like).

Without signing in, users will see 403 unauthorized error. After signing in, users can view their messages.

## Settings

Users can view their profile settings which contain 
- Change password
- Change email
- Edit profile information
- Disable Account

Without signing in, users will see 403 unauthorized error. After signing in, users can view their settings.