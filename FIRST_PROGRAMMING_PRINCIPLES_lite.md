# FIRST PROGRAMMING PRINCIPLES

## Understanding Before Creation

This document establishes core principles for software development on the Career Connected Learning Hub project. These principles prioritize understanding, planning, and testing before implementing changes.

## 1. FACTS Over Opinions

- **System Understanding**: Before proposing changes, gain comprehensive knowledge of the existing architecture, components, and data flow
- **Evidence-Based Decisions**: Base development decisions on observed system behavior, not assumptions
- **Technical Feasibility**: Evaluate if proposed features work with the current architecture before advocating for them
- **User-Centered Design**: Consider actual user needs supported by usage data or feedback

## 2. CURATE Before Create

- **Inventory Existing Components**: Identify reusable elements in the codebase before writing new code
- **Review Similar Implementations**: Research how similar features were previously built in the system
- **Leverage Existing Patterns**: Follow established patterns and conventions for consistency
- **Minimize Duplication**: Prefer enhancing existing components over creating new ones

## 3. PLAN Before Code

- **Map Dependencies**: Identify all affected system components before implementation
- **Document Interfaces**: Define clear input/output contracts before writing code
- **Evaluate Impact**: Assess performance, security, and accessibility implications
- **Sequence Changes**: Break complex implementations into logical, testable steps
- **Set Success Criteria**: Define what "done" looks like before starting work

## 4. TEST Before Commit

- **Define Test Cases**: Write test cases that validate functionality before implementation
- **Test Data Preparation**: Create realistic test data that covers edge cases
- **Component Testing**: Verify individual components work as expected in isolation
- **Integration Testing**: Confirm components work together as expected
- **Regression Testing**: Ensure changes don't break existing functionality

## 5. ITERATE For Improvement

- **Start Small**: Begin with a minimal viable implementation that can be tested
- **Gather Feedback**: Collect user input on implemented changes
- **Measure Performance**: Evaluate actual vs. expected performance metrics
- **Refine Incrementally**: Make iterative improvements based on real-world usage
- **Document Learnings**: Record insights for future development

## 6. VERSION CONTROL Best Practices

- **Feature Branches**: Create a new branch for each feature or fix
- **Commit Often**: Make small, atomic commits with descriptive messages
- **Meaningful Messages**: Write commit messages that explain why changes were made
- **Backup First**: Create backups before making significant changes
- **Pull Before Push**: Always pull the latest changes before pushing your work
- **Code Review**: Use pull requests for peer review of important changes
- **Revert Plan**: Always have a plan to revert changes if they cause issues

## 7. DESIGN EXCELLENCE Principles

- **Intuitive Flow**: Create logical user journeys that guide users through complex processes
- **Visual Harmony**: Maintain consistent design language across all components
- **Accessibility First**: Design with inclusive principles to accommodate all users
- **Responsive Implementation**: Ensure seamless experiences across all device sizes
- **Performance Optimization**: Balance visual richness with loading speed and performance
- **Button Purpose**: Never make a button unless it is designed to open something or take you somewhere specific on the site; informational items should use text links, not buttons

## 7a. MOBILE UX/UI Best Practices

- **Mobile-First Mindset**: Design for mobile experiences first, then enhance for larger screens
- **Document Flow Priority**: Keep interactive elements within the natural document flow, not fixed positions
- **Touch Target Sizing**: Make buttons and interactive elements at least 44x44px for comfortable tapping
- **Form Field Visibility**: Ensure all form fields and their associated buttons are visible within the same viewport
- **Keyboard Interaction**: Test with mobile keyboards to ensure forms remain usable when keyboard appears
- **Context Preservation**: Maintain user's context when transitioning between states or steps
- **Input Field Optimization**: Use appropriate input types and font sizes (16px+) to prevent iOS zoom
- **Multi-Step Clarity**: For multi-step processes, ensure users can easily see and access navigation controls
- **Test On Devices**: Always test on actual mobile devices, not just browser emulators
- **Error Recovery**: Make it easy to recover from errors without losing form data or context

## 7b. SEARCH ENGINE VISIBILITY Control

- **robots.txt Implementation**: Always include a robots.txt file at the root level for search engine crawl control
  - Use `User-agent: *` and `Disallow: /` to block all crawlers from the entire site for private projects
  - For public projects, use more selective directives to control which pages can be indexed
- **Meta Tags Requirement**: Add both `<meta name="robots" content="noindex, nofollow">` and `<meta name="googlebot" content="noindex, nofollow">` to HTML files that should not be indexed
- **Layered Protection**: Always implement both robots.txt and meta tags for sensitive pages, as robots.txt is a request that some crawlers may ignore
- **Visibility Verification**: Regularly check search engine indexes using "site:domain.com" searches to confirm indexing status
- **Removal Process**: For already indexed pages, use Google Search Console's URL removal tool to request immediate de-indexing

## 8. HUMAN PRODUCERS Philosophy

- **Empower Not Replace**: Design AI tools that enhance human capabilities rather than replacing them
- **Transparency**: Make AI processes understandable to users through clear visualization
- **User Control**: Provide appropriate levels of customization and override capabilities
- **Skill Development**: Structure interfaces to gradually increase user expertise over time
- **Feedback Integration**: Create mechanisms to continuously improve based on user interaction

## 9. API INTEGRATION Best Practices

- **Rate Limit Awareness**: Always use fetch to learn API rate limits (per minute, per hour, per day) before implementation
- **Limit Compliance**: Strictly adhere to documented rate limits to maintain free tier access
- **Implement Caching**: Cache all API responses to avoid paying for repeated requests
- **Cache Invalidation**: Define clear cache expiration policies based on data freshness requirements
- **Local Storage**: Use appropriate storage mechanisms (localStorage, IndexedDB, Redis) for caching based on data size
- **Error Handling**: Implement robust handling for rate limit errors with appropriate backoff strategies
- **Usage Tracking**: Monitor API usage to prevent exceeding limits
- **Documentation**: Keep rate limit information documented for team reference

## Architecture Overview

### System Components

1. **Frontend (Svelte)**
   - Components for UI presentation
   - Services for API communication
   - Stores for state management
   - Routes for navigation

2. **Backend (FastAPI)**
   - API endpoints for data access
   - Service integrations with external APIs
   - Database models for data persistence
   - Tool definitions for AI capabilities

3. **AI Integration (Flask/Ollama)**
   - LLM model access for career guidance
   - Prompting system for specialized coaching
   - Tools for career data analysis

4. **External API Integrations**
   - DataUSA for career statistics
   - GitHub for repository recommendations
   - BLS and College Scorecard for educational data

## Implementation Workflow

1. **Understand the requirement** in context of the entire system
2. **Curate existing components** relevant to the requirement
3. **Plan implementation** with clear interfaces and success criteria
4. **Create a feature branch** to isolate the changes
5. **Make a backup** of critical components before making changes
6. **Write test cases** that validate the expected behavior
7. **Implement the feature** following established patterns
8. **Test thoroughly** across components
9. **Document changes** for future reference
10. **Commit changes** with descriptive commit messages
11. **Create a pull request** for code review when appropriate
12. **Collect feedback** and iterate on implementation as needed

## Getting Started with a Feature

Before adding a new feature:
1. Run the application with `./run.sh` to understand current functionality
2. Explore existing components in both frontend and backend
3. Read API documentation and existing implementation patterns
4. Create a design document outlining your approach
5. Discuss the approach with stakeholders before implementing
6. Follow language-specific best practices (PEP 8 for Python, TypeScript style guide)

