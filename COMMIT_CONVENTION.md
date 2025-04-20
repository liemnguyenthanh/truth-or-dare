# Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

## Format

Each commit message consists of a **header**, a **body**, and a **footer**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **build**: Changes that affect the build system or external dependencies
- **chore**: Changes to the build process or auxiliary tools
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Revert to a commit
- **style**: Changes that do not affect the meaning of the code (formatting, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope is optional and can be anything specifying the place of the commit change.

### Subject

The subject is a short description of the change:
- Use sentence-case (first letter capitalized)
- No period at the end
- Maximum length of 72 characters

### Body

The body is optional and should include the motivation for the change and contrast with previous behavior.

### Footer

The footer is optional and can include references to issues or breaking changes.

## Examples

```
feat(auth): Add password reset functionality

Implement password reset flow with email verification.
Adds routes, controllers, and email templates.

Closes #123
```

```
fix(ui): Fix button alignment in mobile view

Buttons were overlapping on screens smaller than 375px.
``` 