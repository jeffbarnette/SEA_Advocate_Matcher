1. Needed to uncomment the database env variable in .env file to apply migration before I could seed database.
2. Updated .gitignore to exclude assitional files and directories that did not need to be part of the repo. (e.g. .env file)
3. Created BACKLOG.md to track and prioritize all the technical debt (issues) found with this project.
4. Systematically addresed each point in the BACKLOG.md creating a commit and pull request with each set of changes. Cleared table and ran seed again after schema changes.

```docker exec -it sea_advocate_matcher-db-1 psql -U postgres -d solaceassignment -c "TRUNCATE TABLE advocates RESTART IDENTITY;"```

```curl -X POST http://localhost:3000/api/seed```

5. Created a new branch and PR to address API security vulnerabilities and to fix build errors.

6. Created a new branch and PR to address environment configuration. Setup a proper .env.example file.

7. Created a new branch and PR to address the frontend performance issues. This required completely rewriting the page component to address all of the frontend performance issues. Also fixed searching.

8. Created a new branch and PR to address the search functionality.

9. Created a new branch and PR to address the database integration issues. Added missing migrations, fixed seed data issues and verified database connection.

10. Created a new branch and PR to address the React antipatterns found. Addressed inline styles and poor compoment structure. I have renamed the original files with a **-old.tsx** so they are there for historical purposes and comparison.

11. Created a new branch and PR to address outstanding issues for local env linting and testing. Added tests. Added API documentation.

12. Created a new branch and PR to enhance the UI and visual experience of the app. This was a bonus just because I felt the UI needed a little love. ❤️