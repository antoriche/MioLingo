# AGENTS.md - Building MioLingo with BMAD

This document explains how to use the BMAD (Build with MAD) agent system to develop MioLingo from the Product Requirements Document (PRD).

## Overview

MioLingo is a language learning Progressive Web App (PWA) designed to help learn Vietnamese through daily flashcard practice. The project uses the BMAD agent system to orchestrate development workflows.

## Getting Started

### 1. Review the PRD

Start by reviewing the Product Requirements Document:
- **Location**: [`_bmad-output/planning-artifacts/prd.md`](_bmad-output/planning-artifacts/prd.md)
- **Purpose**: Defines the product vision, success criteria, user journeys, and technical requirements

### 2. Available Agents

The BMAD system provides specialized agents for different phases of development:

#### Business Management Module (BMM) - Core Development Agents

- **Analyst** (`@bmd-custom-bmm-analyst`): Requirements analysis and feature breakdown
- **Architect** (`@bmd-custom-bmm-architect`): System architecture and technical design
- **Dev** (`@bmd-custom-bmm-dev`): Feature implementation and coding
- **Tech Writer** (`@bmd-custom-bmm-tech-writer`): Documentation creation
- **UX Designer** (`@bmd-custom-bmm-ux-designer`): User experience design
- **TEA** (`@bmd-custom-bmm-tea`): Test execution and quality assurance
- **PM** (`@bmd-custom-bmm-pm`): Project management and coordination
- **SM** (`@bmd-custom-bmm-sm`): Sprint management and agile ceremonies
- **Quick Flow Solo Dev** (`@bmd-custom-bmm-quick-flow-solo-dev`): End-to-end rapid development

#### Build Module Builders (BMB) - Agent System Management

- **Agent Builder** (`@bmd-custom-bmb-agent-builder`): Create and customize agents
- **Module Builder** (`@bmd-custom-bmb-module-builder`): Build agent modules
- **Workflow Builder** (`@bmd-custom-bmb-workflow-builder`): Design workflows

#### Creative & Innovation Suite (CIS) - Ideation & Strategy

- **Brainstorming Coach** (`@bmd-custom-cis-brainstorming-coach`): Facilitate ideation sessions
- **Creative Problem Solver** (`@bmd-custom-cis-creative-problem-solver`): Solve complex challenges
- **Design Thinking Coach** (`@bmd-custom-cis-design-thinking-coach`): Apply design thinking
- **Innovation Strategist** (`@bmd-custom-cis-innovation-strategist`): Strategic planning
- **Presentation Master** (`@bmd-custom-cis-presentation-master`): Create presentations
- **Storyteller** (`@bmd-custom-cis-storyteller`): Craft narratives

## Recommended Workflow: Building from the PRD

### Phase 1: Analysis & Planning

1. **Use the Analyst** to break down PRD requirements into user stories and tasks
   ```
   @bmd-custom-bmm-analyst Review the PRD and create a backlog of user stories for the MVP
   ```

2. **Use the Architect** to design the technical architecture
   ```
   @bmd-custom-bmm-architect Design the system architecture based on the PRD requirements
   ```

3. **Use the PM** to prioritize and plan sprints
   ```
   @bmd-custom-bmm-pm Create a sprint plan for MVP development
   ```

### Phase 2: Design

4. **Use the UX Designer** for user interface design
   ```
   @bmd-custom-bmm-ux-designer Design the flashcard learning interface
   ```

### Phase 3: Implementation

5. **Use the Dev** or **Quick Flow Solo Dev** for feature implementation
   ```
   @bmd-custom-bmm-dev Implement the flashcard component based on the PRD
   ```
   
   Or for rapid end-to-end development:
   ```
   @bmd-custom-bmm-quick-flow-solo-dev Build the entire lesson flow feature
   ```

### Phase 4: Quality Assurance

6. **Use the TEA** for testing
   ```
   @bmd-custom-bmm-tea Create and execute tests for the flashcard system
   ```

### Phase 5: Documentation

7. **Use the Tech Writer** to document the implementation
   ```
   @bmd-custom-bmm-tech-writer Document the flashcard API and component usage
   ```

## Quick Start for Solo Development

For rapid prototyping and MVP development, use the **Quick Flow Solo Dev** agent:

```
@bmd-custom-bmm-quick-flow-solo-dev Build the MVP flashcard learning system from the PRD
```

This agent combines analysis, architecture, development, and testing in a streamlined workflow.

## Existing Artifacts

The following artifacts have already been created:

- **PRD**: [`_bmad-output/planning-artifacts/prd.md`](_bmad-output/planning-artifacts/prd.md)
- **Architecture**: [`_bmad-output/planning-artifacts/architecture.md`](_bmad-output/planning-artifacts/architecture.md)
- **Brainstorming Session**: [`_bmad-output/analysis/brainstorming-session-2026-01-19.md`](_bmad-output/analysis/brainstorming-session-2026-01-19.md)
- **Implementation Artifacts**: [`_bmad-output/implementation-artifacts/`](_bmad-output/implementation-artifacts/)

## Working with Agents

### Invoking Agents

Reference agents using their full name with the `@` prefix:
```
@bmd-custom-bmm-dev [your request here]
```

### Agent Configuration

Agent configurations are stored in:
- **Agent manifests**: [`_bmad/_config/agents/`](_bmad/_config/agents/)
- **Agent definitions**: [`_bmad/bmm/agents/`](_bmad/bmm/agents/)

### Customizing Workflows

Workflows can be found and customized in:
- **BMM Workflows**: [`_bmad/bmm/workflows/`](_bmad/bmm/workflows/)
- **BMB Workflows**: [`_bmad/bmb/workflows/`](_bmad/bmb/workflows/)
- **CIS Workflows**: [`_bmad/cis/workflows/`](_bmad/cis/workflows/)

## Team Configurations

Pre-configured teams for different development scenarios:
- **Full-stack Team**: [`_bmad/bmm/teams/team-fullstack.yaml`](_bmad/bmm/teams/team-fullstack.yaml)
- **Default Party**: [`_bmad/bmm/teams/default-party.csv`](_bmad/bmm/teams/default-party.csv)

## Feature Request Workflow

When a user requests a new feature or functionality, follow this workflow:

### Step 1: Check PRD Alignment

First, review the [PRD](_bmad-output/planning-artifacts/prd.md) to determine if the requested feature aligns with the product vision and requirements:

- **Is the feature explicitly mentioned or implied in the PRD?**
- **Does it support the defined user journeys and success criteria?**
- **Is it within the scope of the current phase (MVP, Phase 2, etc.)?**

### Step 2: Choose Your Path

#### Path A: Feature is Aligned with PRD

If the feature request aligns with the PRD, proceed directly to implementation:

1. **Use the Analyst** to break down the feature into tasks:
   ```
   @bmd-custom-bmm-analyst Analyze the [feature name] and create implementation tasks based on PRD section [X]
   ```

2. **Use the Dev or Quick Flow Solo Dev** to implement:
   ```
   @bmd-custom-bmm-dev Implement [feature name] as specified in the PRD
   ```

#### Path B: Feature is NOT Aligned with PRD

If the feature request does not align with or is not covered in the PRD, **update the PRD first** before implementation:

1. **Use the Analyst** to assess the impact and alignment:
   ```
   @bmd-custom-bmm-analyst Evaluate how [feature request] fits with our product vision and current PRD
   ```

2. **Use the PM** to prioritize and update product direction:
   ```
   @bmd-custom-bmm-pm Review [feature request] and recommend whether to update the PRD or defer the feature
   ```

3. **Use the Brainstorming Coach or Design Thinking Coach** for strategic alignment:
   ```
   @bmd-custom-cis-brainstorming-coach Help explore how [feature request] could enhance the product vision
   ```

4. **Update the PRD** with the approved changes before proceeding to implementation

5. **Then proceed with Path A** (implementation)

### Key Principle

**Never implement features that diverge from the PRD without first updating the PRD.** This ensures:
- Product coherence and vision alignment
- Proper documentation of product evolution
- Informed decision-making about scope and priorities
- Clear communication with stakeholders

## Best Practices

1. **Start with the PRD**: Always reference the PRD when working on new features
2. **Use the Right Agent**: Choose the specialist agent for each task
3. **Document as You Go**: Use the Tech Writer agent to maintain documentation
4. **Test Early**: Involve the TEA agent early in the development process
5. **Iterate**: Use the PM or SM agents to manage iterations and sprints

## Support

For questions about the BMAD system or agent usage, refer to:
- **BMB README**: [`_bmad/bmb/README.md`](_bmad/bmb/README.md)
- **Core Configuration**: [`_bmad/core/config.yaml`](_bmad/core/config.yaml)

---

**Remember**: The PRD is your north star. All development should align with the vision and requirements defined in [`_bmad-output/planning-artifacts/prd.md`](_bmad-output/planning-artifacts/prd.md).
