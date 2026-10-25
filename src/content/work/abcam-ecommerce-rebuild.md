---
title: Rebuilding Abcam's global e-commerce platform
subtitle: Sign-in, customer accounts and order tracking for a launch in four regions
client: Abcam
clientNamed: true
sector: Life sciences, e-commerce
role: Senior engineer
through: Crosstide
start: 2022-01
end: 2024-10
stack: [React, Next.js, TypeScript, GraphQL, AWS, Kafka]
relevantIf: A senior engineer for sign-in, customer data and a multi-region launch.
summary: I helped build sign-in, customer accounts and order tracking for Abcam's new e-commerce platform. It launched in the US, Europe, China and Japan.
featured: true
order: 4
---

## At a glance

Abcam sells research products to scientists around the world. It replaced its old online shop with a new global platform. I was a senior engineer on the customer accounts team, and I led the order tracking system. The new platform launched in the US, Europe, China and Japan.

## The situation

Customers needed to sign in, see their orders and track deliveries in their own language. Customer data came from several older systems, and other Abcam teams depended on it. Existing customers also had to move to a new sign-in service.

## What I did

- Built secure sign-in and registration, and moved existing customers to a new sign-in service.
- Built the My Account pages, where customers see their orders, addresses and deliveries.
- Led the order tracking system, from the first prototype to a separate application with its own release pipeline.
- Built APIs that give other Abcam teams the customer data they need, with checks that stop changes from breaking their systems.
- Added translations and local address rules for each market, including Chinese and Japanese.

## The result

The new platform went live in the US, Europe, China and Japan. Customers in each region can sign in, manage their account and track orders in their own language. Customers can also track an order without signing in. Other teams get customer data from documented, tested APIs.

<details>
<summary>Technical detail</summary>

**Sign-in and access control**

- The first sign-in flow ran on Azure AD B2C. We then moved it to AWS Cognito.
- Cognito triggers create each new user in Mulesoft after they register.
- Login, logout and token refresh run on the server. Tokens are stored in httpOnly cookies, so browser scripts cannot read them.
- The user pool has a custom password policy and short-lived tokens. Error messages do not show which email addresses have accounts.
- Role-based checks in the GraphQL API stop a user from reading another user's data.
- The second version of sign-in, in 2024, added a new registration flow, email confirmation and a migration flow for existing users.

**Customer data and services**

- The Accounts GraphQL API serves contacts, organisations, addresses, incidents and marketing preferences.
- Lambda functions read Kafka and SQS messages and write customer and order data into PostgreSQL (Aurora).
- A REST API, documented with OpenAPI, serves other teams, including the ordering system.
- A CI check blocks schema changes that would break other teams.
- A shared email service lets other services send transactional email through SendGrid.

**Order tracking**

- The tracking application is a separate Next.js app with its own tracking API.
- The site is a static export on S3 and CloudFront, and the API runs on Lambda.
- The GitLab CI pipeline gives each branch its own test deployment and runs Cypress tests.

**International launch**

- The account, sign-in and shared components are translated, including Chinese, Japanese and Dutch.
- Address validation rules vary by market.

</details>

## Stack

React, Next.js, TypeScript, Node.js, GraphQL, PostgreSQL (Aurora), AWS (Lambda, Cognito, SQS, SNS, S3, CloudFront), Kafka, Serverless Framework, Terraform, GitLab CI, Nx, Cypress and Jest.
