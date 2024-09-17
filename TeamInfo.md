# Basic Information
| Info     | Description           |
| -------- | --------------------- |
| TeamID   | Team-034              |
| TeamName | CursedQueries         |
| Captain  | Jeffrey Wong          |
| Captain  | jwong19@illinois.edu  |
| Member1  | Sneha Sundar          |
| Member1  | snehas9@illinois.edu  |
| Member2  | Min Jae Kim           |
| Member2  | minjaek3@illinois.edu |
| Member3  | Will Nelson           |
| Member3  | wbn3@illinois.edu     |

# Summary
Many students struggle to find peers to study with when preparing for difficult classes. Because this class did not have a structured team matchmaker, a campuswire post had to be hastily made to account for the issue. Our project tackles this issue for all classes on campus, as the Study Group Finder is a centralized matchmaking website that allows students in common classes to find or form study groups. Users could create/join groups, and customize a profile to specify preferences to conveniently help with group formation.

The website will grant students the ability to create and find new groups primarily based on class. To find existing groups, there will be a search based on the course code, filtered by categories like availability and topic. Upon selecting a potential group to join, there will be a calendar feature on the website to help students actually set up the group’s meeting based on their availability. Communication between students will happen outside the app where the group searcher finds the group creator’s contact through their profile info.

##  Creative Component:
Smart Group Recommendations: We will match study groups to students based on their classes, purposes, meeting time. This feature will recommend the best groups for students to join based on their input, saving time and optimizing group compatibility.

##  Usefulness:
This application solves a common problem faced by university students—finding and organizing study groups. The Study Group Finder app will make it easier for students to connect, form effective study groups, and improve their academic performance through collaboration. The platform is especially useful for students who prefer group study sessions but lack methods to reach out to peers.
While there are general messaging platforms (e.g., GroupMe, Discord) that do the same thing, none specifically cater to forming academic study groups. Additionally, we have features catering to tackling this issue scheduling, group matching, or filtering by topic. 


##  Realness (Datasets):
1) Data Sources:
University Course Data: We will integrate the university’s course catalog dataset with gpa information (in CSV format) to allow users to create study groups based on specific courses. It will also allow our recommendations for how often a study group should meet based on course GPA. 
Student Availability Data: Initially, users will input their available study times, but we will also use the Calendar API to also recommend possible timings for the study group that work for all of its members. 
2) User Data: 
The user profile data will capture student information such as course enrollments, preferred study times, and what study group “focus” they want. This will be stored in a (most likely SQL) database, with typical fields such as user_id, course name, availability, and preferences.
3) Data Format: 
Course data in CSV format, availability data via (JSON) from Google Calendar API, and user profiles stored in a relational database (SQL).
4) Data Size: Course data could involve hundreds of entries, while student data would vary depending on how many users register on the platform.

## Detailed Functionality:
Users will be able to do the following:
1) Create Study Groups: Users can create new study groups based on their course, and provide additional information like availability and study preferences (like a custom text input for specifics).
2) Search and Join Groups: Users can browse available study groups, filtering by course, study topic, or group size, and request to join groups that fit their criteria.
3) Scheduling: Groups of people can schedule study sessions when their members are available. The UI for this function will resemble calendar apps like Outlook and Google Calendar.
4) Manage Profiles: Users can set up profiles with details about their academic interests, courses, and preferred study times. They will have an option to create an account with a Username and Password which contains this profile.

## Low-Fidelity UI Mockup:

1) Homepage: Search bar with filters for course code, subject, and available study groups.
![Photo](Photos\Draft_UI_Search.png)

2) Group Listings: A list or grid of available study groups with a brief description, group size, meeting time, and a button to request to join.
![Photo](Photos\Draft_UI_GroupInfo.png)

3) Group Dashboard: A page where users can see group details.
![Photo](Photos\Draft_UI_Search2.png)

1) Group Creation Page: A form to create a new study group, including input fields for course, study preferencesand group details.
![Photo](Photos\Draft_UI_GroupCreate.png)

1) Profile Page: A user profile page where users can manage their personal information, study preferences, upcoming group meetings.
![Photo](Photos\Draft_UI_Mainmenu.png)
