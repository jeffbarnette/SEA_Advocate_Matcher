# Contributing to Solace Advocate Directory

> **📝 Disclaimer**: This contributing guide serves as an example of detailed development documentation. In a real-world project, you would customize the guidelines, coding standards, and processes to match your team's specific requirements and preferences.

Thank you for your interest in contributing to the Solace Advocate Directory! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** and clone your fork
2. **Create a feature branch** from `main`
3. **Set up the development environment** following the [README.md](./README.md)
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any` types
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS classes and our design system
- **Naming**: Use descriptive, camelCase names for variables and functions
- **Comments**: Add JSDoc comments for complex functions

### Component Structure

```typescript
// Component file structure
import React from 'react';

interface ComponentProps {
  // Define props with TypeScript
}

export const ComponentName = React.memo(({ prop1, prop2 }: ComponentProps) => {
  // Component logic here
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

### File Organization

- **Components**: Place in `src/app/components/`
- **Hooks**: Place in `src/hooks/`
- **Utilities**: Place in `src/lib/`
- **Types**: Place in `src/app/types/`
- **Styles**: Place in `src/styles/`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- **Component Tests**: Use React Testing Library
- **Hook Tests**: Test custom hooks with `@testing-library/react-hooks`
- **API Tests**: Test API routes with Jest
- **Coverage**: Aim for >80% test coverage

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🎨 Design System

### Colors

- **Primary**: `#1a5f3f` (Solace Green)
- **Secondary**: `#f4a261` (Gold Accent)
- **Neutral**: Gray scale from 50-900

### Typography

- **Font Family**: Inter (primary), Playfair Display (logo)
- **Sizes**: xs (12px) to 4xl (36px)
- **Weights**: 400 (normal) to 700 (bold)

### Spacing

- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px
- **Use**: Consistent spacing using Tailwind classes

## 🔧 Database Changes

### Schema Updates

1. **Modify** `src/db/schema.ts`
2. **Generate migration**: `npx drizzle-kit generate`
3. **Test migration**: `npm run migrate:up`
4. **Update seed data** if needed

### Adding New Fields

```typescript
// Example: Adding a new field to advocates table
export const advocates = pgTable("advocates", {
  // ... existing fields
  newField: varchar("new_field", { length: 100 }),
});
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 1024px (stacked layout)
- **Desktop**: ≥ 1024px (horizontal layout)

### Testing Responsiveness

- Test on multiple screen sizes
- Use browser dev tools
- Test on actual mobile devices when possible

## 🚀 Deployment

### Environment Variables

Required for production:
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to "production"
- `ALLOWED_ORIGINS`: Comma-separated allowed origins

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: OS, Node.js version, browser
2. **Steps to reproduce**: Clear, numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console errors**: Any error messages

## 💡 Feature Requests

When suggesting features:

1. **Use case**: Why is this feature needed?
2. **User story**: How would users benefit?
3. **Implementation ideas**: Any technical considerations
4. **Priority**: How important is this feature?

## 📝 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated
- [ ] Screenshots added (for UI changes)

### PR Description

Include:
- **Summary**: What changes were made
- **Type**: Bug fix, feature, refactor, etc.
- **Testing**: How changes were tested
- **Screenshots**: For UI changes
- **Breaking changes**: If any

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on multiple environments
4. **Approval** and merge

## 📞 Support

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check existing docs first

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Thank you for contributing to the Solace Advocate Directory! 🎉
