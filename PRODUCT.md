# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Students/evaluators of a university course project (UTN, Aplicaciones Web Utilizando Software Libre) using FlowHub as an automation platform: connecting apps, defining triggers/actions, and reviewing execution history. There is no external commercial audience; the "user" is illustrative for demonstrating the built functionality.

## Product Purpose
FlowHub lets a user connect services ("connectors"), build automations from triggers and actions, and review past executions — an automation-platform pattern similar to Zapier/IFTTT/n8n. Success means demonstrating a complete, working full-stack flow: auth, connector management, automation building, and execution history.

## Positioning
No competitive differentiation is claimed. This is an academic project (university course TP) demonstrating a full-stack automation platform, not a market product competing with Zapier/IFTTT/n8n.

## Operating Context
React + Vite frontend (React Router, Zustand, React Query, React Hook Form + Zod, Axios, Tailwind CSS v4). Existing surfaces: landing page, auth (login/register), dashboard, connectors list, automation builder, automations list, execution history.

## Capabilities and Constraints
- Auth-gated app (ProtectedRoute) with a public landing/auth area.
- Core domain objects: connectors, automations (trigger + condition + action), executions.
- No backend/API constraints recorded yet beyond what `src/api/*.api.js` implies.

## Brand Commitments
None yet — no name story, logo, or voice has been fixed beyond the project name "FlowHub".

## Evidence on Hand
No real content, testimonials, or case studies. Future work must not fabricate customers, benchmarks, or proof.

## Product Principles
- Favor a clear, functional Operate experience (scanability, consistency) over marketing polish.
- Keep the academic scope honest: no invented market claims or fake social proof.
- Preserve existing working functionality (auth, automations, connectors, execution history) when refining visuals.

## Accessibility & Inclusion
No specific requirement established yet.
