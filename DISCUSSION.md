1. Needed to uncomment the database env variable in .env file to apply migration before I could seed database.
2. Updated .gitignore to exclude assitional files and directories that did not need to be part of the repo. (e.g. .env file)
3. Created BACKLOG.md to track and prioritize all the technical debt (issues) found with this project.
4. Systematically addresed each point in the BACKLOG.md creating a commit and pull request with each set of changes. Cleared table and ran seed again after schema changes.

```docker exec -it sea_advocate_matcher-db-1 psql -U postgres -d solaceassignment -c "TRUNCATE TABLE advocates RESTART IDENTITY;"```

```curl -X POST http://localhost:3000/api/seed```


