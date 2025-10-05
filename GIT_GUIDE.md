# Git Guide for Todo Application

## 📋 Project Overview
This is the Git documentation for the **Todo Application** - an Angular-based task management system with modern UI/UX design and comprehensive authentication features.

## 🚀 Quick Start

### Prerequisites
- [Git](https://git-scm.com/downloads) installed on your system
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Clone the Repository
```bash
# Clone the repository
git clone https://github.com/Safwan176/Todo-white-helmet.git

# Navigate to project directory
cd Todo-white-helmet

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗️ Project Structure
```
Todo/
├── src/
│   ├── app/
│   │   ├── layouts/              # Layout components (Main & Auth)
│   │   ├── header/               # Header component
│   │   ├── pages/
│   │   │   ├── login/           # Authentication module
│   │   │   └── todo/            # Todo management module
│   │   ├── core/                # Core services & guards
│   │   └── shared/              # Shared components
│   ├── assets/                  # Static assets
│   └── environments/            # Environment configurations
├── public/                      # Public assets
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # Project documentation
```

## 🌿 Git Workflow

### Branch Strategy
We follow a **Feature Branch Workflow**:

- `main` - Production-ready code
- `feature/*` - New features (e.g., `feature/user-authentication`)
- `bugfix/*` - Bug fixes (e.g., `bugfix/login-validation`)
- `hotfix/*` - Critical production fixes

### Development Workflow

#### 1. Start New Feature
```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Or create from latest main
git pull origin main:feature/your-feature-name
git checkout feature/your-feature-name
```

#### 2. Work on Feature
```bash
# Check status
git status

# Add changes
git add .                    # Add all changes
git add src/app/specific-file.ts  # Add specific file

# Commit changes
git commit -m "feat: add user authentication logic"

# Push to remote
git push origin feature/your-feature-name
```

#### 3. Create Pull Request
1. Push your feature branch to GitHub
2. Navigate to GitHub repository
3. Click "Compare & pull request"
4. Add description and request review
5. Merge after approval

### Commit Message Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

# Types:
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: maintenance tasks

# Examples:
git commit -m "feat(auth): implement JWT token validation"
git commit -m "fix(todo): resolve drag-and-drop issue"
git commit -m "docs: update API documentation"
git commit -m "style(header): improve responsive design"
```

## 🔧 Common Git Commands

### Repository Management
```bash
# Check repository status
git status

# View commit history
git log --oneline --graph

# View remote repositories
git remote -v

# Add new remote
git remote add upstream https://github.com/original/repo.git
```

### Branch Operations
```bash
# List all branches
git branch -a

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/existing-feature

# Delete branch (after merge)
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

### Syncing Changes
```bash
# Pull latest changes
git pull origin main

# Fetch without merging
git fetch origin

# Push changes
git push origin feature/your-branch

# Push and set upstream
git push -u origin feature/your-branch
```

### Undoing Changes
```bash
# Discard unstaged changes
git checkout -- filename.ts

# Unstage files
git reset HEAD filename.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create new commit that undoes previous commit
git revert <commit-hash>
```

## 🔄 Handling Merge Conflicts

### When Conflicts Occur
```bash
# Pull latest changes
git pull origin main

# If conflicts occur, Git will mark them in files like:
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> branch-name
```

### Resolving Conflicts
1. **Open conflicted files** in your editor
2. **Review both versions** of the conflicting code
3. **Choose or combine** the changes as needed
4. **Remove conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`)
5. **Test your changes** to ensure they work
6. **Stage resolved files**: `git add filename.ts`
7. **Complete the merge**: `git commit`

### Prevent Conflicts
```bash
# Regularly sync with main
git checkout main
git pull origin main
git checkout feature/your-branch
git merge main

# Or use rebase for cleaner history
git rebase main
```

## 📦 Release Management

### Creating Releases
```bash
# Tag a release
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## 🛠️ Development Setup

### Initial Setup
```bash
# Configure Git (first time)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch
git config --global init.defaultBranch main

# Set VS Code as default editor
git config --global core.editor "code --wait"
```

### Project Setup
```bash
# Clone and setup
git clone https://github.com/Safwan176/Todo-white-helmet.git
cd Todo-white-helmet
npm install

# Create your feature branch
git checkout -b feature/your-feature

# Start development
npm start
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Problems
```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:Safwan176/Todo-white-helmet.git

# Or configure credentials
git config credential.helper store
```

#### 2. Merge Conflicts
```bash
# Abort merge and start over
git merge --abort

# Reset to clean state
git reset --hard HEAD
git clean -fd
```

#### 3. Accidental Commits
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo and discard changes
git reset --hard HEAD~1
```

#### 4. Large Files
```bash
# Remove large files from history
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/large/file' \
--prune-empty --tag-name-filter cat -- --all
```

## 📋 Pre-commit Checklist

Before committing code, ensure:

- [ ] **Code compiles** without errors: `ng build`
- [ ] **Tests pass**: `npm test`
- [ ] **Linting passes**: `ng lint`
- [ ] **No console.log** statements in production code
- [ ] **Commit message** follows convention
- [ ] **Files staged** are relevant to the commit
- [ ] **Sensitive data** is not included (API keys, passwords)

### Automated Checks
```bash
# Run all checks
npm run lint
npm run test
npm run build --prod

# Or use a single command if configured
npm run pre-commit
```

## 🔐 Security Best Practices

### Protecting Sensitive Data
1. **Never commit**:
   - API keys
   - Database passwords
   - JWT secrets
   - Personal access tokens

2. **Use environment variables**:
   ```typescript
   // environment.ts
   export const environment = {
     production: false,
     apiKey: process.env['API_KEY']
   };
   ```

3. **Update .gitignore**:
   ```gitignore
   # Environment files
   .env
   .env.local
   .env.*.local
   
   # IDE files
   .vscode/
   .idea/
   
   # Dependencies
   node_modules/
   
   # Build outputs
   dist/
   tmp/
   ```

### Access Control
```bash
# Set repository permissions on GitHub
# Settings > Manage access > Invite collaborators

# Protect main branch
# Settings > Branches > Add rule
# Require pull request reviews
# Require status checks
```

## 📚 Additional Resources

### Git Learning
- [Pro Git Book](https://git-scm.com/book) - Comprehensive Git guide
- [GitHub Guides](https://guides.github.com/) - GitHub-specific tutorials
- [Interactive Git Tutorial](https://learngitbranching.js.org/) - Visual learning

### Angular Development
- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Reference](https://angular.io/cli)
- [Angular Style Guide](https://angular.io/guide/styleguide)

### Project Tools
- [VS Code](https://code.visualstudio.com/) - Recommended IDE
- [GitLens Extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Enhanced Git support
- [Angular Extension Pack](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

## 🤝 Contributing

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Code Review Process
1. **Self-review** your changes
2. **Request review** from team members
3. **Address feedback** promptly
4. **Squash commits** if requested
5. **Merge** after approval

### Communication
- Use **clear commit messages**
- **Comment** complex code
- **Update documentation** when needed
- **Ask questions** in pull requests

---

## 📞 Support

For help with Git or this project:
- **Create an issue** on GitHub
- **Check existing issues** first
- **Contact maintainers** for urgent matters
- **Refer to documentation** for common questions

---

**Happy Coding! 🚀**

---
*Last updated: $(date)*
*Project: Todo Application*
*Repository: [Todo-white-helmet](https://github.com/Safwan176/Todo-white-helmet)*