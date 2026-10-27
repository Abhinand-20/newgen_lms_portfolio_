---
name: gitupdate
description: Commit the current changes and push them to the dev branch using the team's git workflow (checkout dev, pull, add, commit, pull --rebase, push). Use when the user types /gitupdate or asks to push their changes to dev.
---

# /gitupdate: push the current changes to `dev`

Run this exact workflow, in this order. The text after `/gitupdate`, if any, is the commit message.

```bash
git checkout dev
git pull origin dev
# Code changes
git add .
git commit -m "Describe your changes"
git pull --rebase origin dev
git push origin dev
```

## How to apply it

1. **Check first.** Run `git status` and `git branch -a`. If there is nothing to commit, say so and stop.
2. **`git checkout dev`.** Uncommitted changes come along to `dev`.
   - If `dev` exists only on the remote, run `git checkout -b dev --track origin/dev`.
   - If `dev` exists nowhere, ask the user before creating it. Don't push to any other branch instead.
3. **`git pull origin dev`.** If the pull refuses because of uncommitted changes, use `git pull --autostash origin dev`.
4. **`git add .`.** Before committing, look at what got staged. If it includes secrets (`.env`, keys) or build output (`node_modules/`, `.next/`), unstage them and tell the user.
5. **`git commit -m "..."`.**
   - Use the user's message if they gave one.
   - Otherwise write a short, specific message from the actual diff. Never commit the literal text "Describe your changes".
6. **`git pull --rebase origin dev`.** If the rebase stops on a conflict, stop and show the user the conflicted files. Don't resolve conflicts by guessing, and don't run `git rebase --skip`.
7. **`git push origin dev`.** Never force-push. If the push is rejected, report it and stop.
8. **Report.** Give the commit hash, the message, and confirm that `dev` on the remote was updated.
