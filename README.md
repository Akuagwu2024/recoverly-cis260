# CIS 260 Project Submission – Recoverly: Lost & Found Hub

**1. Repository URL:**  
https://github.com/Akuagwu2024/recoverly-cis260

**2. Pull Request URL:**  
https://github.com/Akuagwu2024/recoverly-cis260/pull/1

**3. Issue URL:**  
https://github.com/Akuagwu2024/recoverly-cis260/issues/2

# Recoverly – Lost & Found Hub

This is the **Recoverly** project for CIS 260. This repository contains a static, student-built "Recoverly" site that can be hosted on **GitHub Pages** as a lightweight Lost & Found hub for a school community.
 The website will feature:
- A homepage to navigate and introduce the platform
- A form to report lost or found items
- A search functionality to browse lost/found items
- A contact system to ensure privacy

### Technologies Used:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Responsive Design: Tailwind CSS
- Map Integration: Google Maps API

### Project Structure:
- **/public**: Contains static files (HTML, CSS, JS)
- **/models**: MongoDB models
- **/routes**: Backend routes for handling requests
- **/server**: The main server setup

**4. Reflection:**  
Developing Recoverly helped me understand Git branching and file management. Uploading the proposal and organizing the repo worked well. I had trouble with the pull request setup initially, but resolved it by adding a file to the feature branch. One Git/GitHub concept I’d like to learn more about is managing multiple branches and merge conflicts

### To Run Locally
# Recoverly — Lost & Found Hub

**CIS 260 – Web Development**  
Project lead: Zitta Gardell-Norwood  
Audience: Students, staff and faculty — City Colleges of Chicago

## Summary
Recoverly is a simple Lost & Found hub intended for all seven City Colleges of Chicago campuses. This repository contains a browser-based prototype that requires no server: forms and messages use the browser's `localStorage`. The prototype is safe to demo and easy to host on GitHub Pages. For campus-wide use, the site can be extended with a shared backend.

## Files
- `index.html` — Home and overview
- `report.html` — Form to submit lost/found items (saved locally)
- `search.html` — Search saved reports (local)
- `contact.html` — Feedback and recovered-item notes (local)
- `style.css` — Kennedy-King maroon + gray theme and layout
- `script.js` — Client-side logic (localStorage, validation)
- `README.md` — Project documentation

## How to run
1. Put files in a GitHub repository (root or `public`).
2. Push to GitHub.
3. Enable GitHub Pages (Settings → Pages).
4. Open the published URL.

To preview locally: open `index.html` or run a simple server (for example: `python -m http.server`).

## Privacy and scope
- This prototype stores data in the browser. Clearing browser data removes stored reports and messages.
- For production: use a server (Node.js + Express) and a database (MongoDB) with authentication, rate limits and validation.

## Upgrade path
1. Add REST endpoints for reports and messages.  
2. Use MongoDB for shared storage.  
3. Implement authentication and role-based access for campus staff.  
4. Add moderation and export/import tools for admins.

## Why this matters
A campus-hosted Lost & Found service reduces reliance on ad-hoc channels and improves chances of reuniting people with their possessions. Recoverly is designed to be easy to adopt and extend.

## Contact
Project lead: Zitta Gardell-Norwood  
Repository: `recoverly-cis260`  
Live demo: https://Akuagwu2024.github.io/recoverly-cis260
**Make sure you have MongoDB installed locally** 

Linux: `sudo systemctl start mongod`
MacOS: `sudo brew services start mongodb-community`
Docker: `docker run -d -p 27017:27017 --name mongo mongo:latest`


`npm install`
`nmp run dev`

