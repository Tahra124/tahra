# Tahra Morsi — GitHub Pages Website

This folder contains the finished static website. It does not need Node.js, LaTeX, or any special software to run.

## Add Tahra's personal photo

1. Choose a clear portrait photo of Tahra.
2. Rename it to tahra-photo.jpg.
3. Put it inside the assets folder, next to the CV PDF.

The exact path must be:

~~~text
assets/tahra-photo.jpg
~~~

The website already shows a graceful placeholder until the photo is added.

## Test it on Ubuntu

Open a terminal in this folder, then run:

~~~bash
python3 -m http.server 8000
~~~

Open http://localhost:8000 in your web browser. Press Ctrl+C in the terminal when you finish testing.

## Publish with GitHub Pages

1. Create a free GitHub account for Tahra at https://github.com.
2. Create a new public repository.
3. Upload the contents of this folder to the repository. Upload the files inside this folder, not the folder itself.
4. In the repository, open Settings, then Pages.
5. Under Build and deployment, select Deploy from a branch.
6. Choose the main branch and the root folder, then save.
7. GitHub will show the public website address after it finishes publishing.

For the exact address https://tahra.github.io, the GitHub username must be tahra and the repository must be named tahra.github.io. If that username is unavailable, GitHub will use an address such as https://username.github.io instead. A custom domain can be connected later if desired.

## Update the website later

- Edit index.html to change the biography, experience, contact details, or links.
- Edit styles.css to change colours, layout, or typography.
- Replace assets/Tahra_Abdulsalam_Morsi_Taha_CV.pdf when a new CV is ready.
- Replace assets/tahra-photo.jpg to update the portrait.

## Privacy note

The public site deliberately does not include date of birth, marital status, full street address, or referees' personal phone numbers. Those details remain appropriate for a CV shared directly with employers, but not for a public website.
