# Contributing to SportsPro AI

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/sportsproai.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m 'Add your feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Guidelines

### Code Style

- Use ESLint configuration provided
- Format code with Prettier
- Write meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Git Workflow

```bash
# Always work on feature branches
git checkout -b feature/my-feature

# Keep branch updated
git fetch origin
git rebase origin/main

# Squash commits before merging
git rebase -i HEAD~3

# Push to your fork
git push origin feature/my-feature
```

### Commit Messages

```
type(scope): subject

Body explaining what and why, not how.

Footer with issue references.
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- perf: Performance improvement
- test: Adding tests

**Example:**
```
feat(predictions): add parlay generator

Implement intelligent parlay suggestions based on AI analysis.
Uses Kelly criterion for stake sizing.

Closes #123
```

### Testing

All new features must include tests:

```javascript
// backend/__tests__/services/ai-predictor.test.js
describe('AI Predictor Service', () => {
  test('should calculate correct probability', () => {
    const prediction = aiPredictor.predictMatch(matchData)
    expect(prediction.probability_home).toBeGreaterThan(0)
    expect(prediction.probability_home).toBeLessThanOrEqual(1)
  })
})
```

### Documentation

Update documentation for:
- New API endpoints
- Configuration changes
- Architecture modifications
- New features

## Pull Request Process

1. Update README.md with any changes
2. Update documentation as needed
3. Add tests for new functionality
4. Ensure CI/CD passes
5. Request review from maintainers

## Reporting Bugs

When reporting bugs, include:

1. **Description**: What is the problem?
2. **Steps to Reproduce**: How to recreate the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, etc.
6. **Screenshots/Logs**: Any relevant attachments

## Feature Requests

When suggesting features:

1. **Description**: Clear explanation of the feature
2. **Use Case**: Why is this needed?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Any alternatives considered?

## Development Setup

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

## Architecture

Review [ARCHITECTURE.md](./docs/ARCHITECTURE.md) before making major changes.

## Community

- GitHub Discussions: Ask questions
- GitHub Issues: Report bugs or request features
- Pull Requests: Submit code changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to SportsPro AI! 🙌**
