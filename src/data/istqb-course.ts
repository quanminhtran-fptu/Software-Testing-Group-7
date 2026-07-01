import { Chapter } from '../types/course';

export const istqbCourse: Chapter[] = [
  {
    id: 1,
    title: 'CI/CD Basics',
    description: 'Learn what CI/CD means and why teams use it to automatically check code after every update.',
    icon: 'GitBranch',
    lessons: [
      {
        id: 1,
        title: 'What is CI?',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'CI/CD là gì? - ITviec', description: 'Bài viết giới thiệu CI/CD và các nguyên tắc triển khai', type: 'article', url: 'https://itviec.com/blog/ci-cd-la-gi/' },
          { title: 'Continuous Integration - Martin Fowler', description: 'Classic article on CI practices and principles', type: 'article' },
          { title: 'The DevOps Handbook', description: 'Gene Kim et al. - Comprehensive guide to CI/CD and DevOps', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'What is Continuous Integration?',
              paragraphs: [
                'Continuous Integration (CI) is a software development practice where developers frequently merge their code changes into a central repository. Every merge triggers an automated build and test sequence, catching problems early when they are cheapest to fix.',
                'The core idea is simple: instead of waiting weeks or months to integrate code, teams integrate continuously — sometimes multiple times per day. Each integration is verified by automated tests, giving teams confidence that their codebase always works.'
              ],
              highlight: {
                text: 'CI is about integrating code frequently and verifying each integration automatically. The goal is to detect defects as early as possible, when they are cheapest and easiest to fix.',
                type: 'definition'
              }
            },
            {
              heading: 'How CI Works in Practice',
              paragraphs: [
                'In a typical CI workflow, a developer creates a feature branch, writes code, and pushes it to the repository. The CI system detects the change and automatically runs a pipeline: installing dependencies, building the project, running tests, and reporting results.',
                'At companies like Amanotes, when a developer creates a pull request, the CI/CD system automatically runs build, test, lint check, and generates a report. The reviewer simply looks at the final status (passed or failed) to know whether the pull request meets quality standards.'
              ],
              bulletPoints: [
                'Developer pushes code to a branch',
                'CI system detects the change and triggers the pipeline',
                'Automated build, test, and lint checks run',
                'Results are reported back to the repository (passed or failed)',
                'Reviewer checks the status before approving the merge'
              ]
            },
            {
              heading: 'Why CI Matters',
              paragraphs: [
                'Without CI, integration happens late and painfully. Teams wait until the end of a release cycle to merge code, resulting in "integration hell" — days or weeks of resolving conflicts and fixing broken builds.',
                'CI eliminates this by making integration a non-event. Small, frequent integrations mean small, manageable conflicts. Automated tests catch regressions immediately. The codebase is always in a working state.'
              ],
              highlight: {
                text: 'CI reduces risk by making integration continuous rather than a big-bang event. Frequent small integrations are far easier than infrequent large ones.',
                type: 'tip'
              }
            },
            {
              heading: 'CI and Agile',
              paragraphs: [
                'CI complements Agile methodologies. While Agile focuses on work management and iterative delivery, CI focuses on the technical side — helping teams develop and deliver products faster.',
                'Together, they create a powerful combination: Agile provides the process framework, while CI provides the automation backbone that makes fast iteration sustainable.'
              ],
              highlight: {
                text: 'CI is like a complementary process that helps Agile work better. Agile manages the work; CI manages the technical execution.',
                type: 'info'
              }
            },
            {
              heading: 'When to Use CI',
              paragraphs: [
                'CI should be adopted as early as possible in a project. Even solo developers can benefit from CI — many services offer free tiers. The earlier you integrate CI, the more value you get over the project lifecycle.',
                'However, CI requires team capability. If no one can maintain the CI pipeline, or developers are not yet comfortable with the tools, it may be better to build competency first. A broken CI pipeline that no one can fix causes more disruption than no CI at all.'
              ],
              bulletPoints: [
                'Adopt CI as early as possible in the project lifecycle',
                'Even solo developers benefit from free CI services',
                'Ensure team has the skills to maintain the pipeline',
                'Start simple and evolve the pipeline over time'
              ]
            }
          ],
          realWorldExample: {
            title: 'CI at Amanotes — A Real-World Workflow',
            scenario: 'Mobile Game Development with CI/CD',
            story: [
              'Amanotes, a mobile game company, uses CI/CD extensively. Their Mobile Tech Lead, Nguyen Truong Giang, shared that their CI workflow has two main parts: Development and Deployment.',
              'In the Development workflow, when a developer creates a feature, they create a branch. After finishing, they open a pull request to merge into the development branch. The CI/CD system then automatically runs build, test, lint check, and generates a report.',
              'The reviewer simply looks at the pull request status — passed or failed — to know whether the code meets quality standards. This eliminates manual verification and speeds up the review process significantly.',
              'Giang noted that CI only covers part of the logic. Developers still need to review code manually to ensure it meets team standards, because some issues cannot be caught by automation alone.'
            ],
            lessons: [
              'CI automates build, test, and lint checks on every pull request',
              'Reviewers rely on pass/fail status to make merge decisions',
              'CI covers part of the logic — manual review is still essential',
              'Even mobile game development benefits from CI practices'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'What is CD?',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'CI/CD là gì? - ITviec', description: 'Bài viết giới thiệu CI/CD và các nguyên tắc triển khai', type: 'article', url: 'https://itviec.com/blog/ci-cd-la-gi/' },
          { title: 'Continuous Delivery - Jez Humble', description: 'Foundational book on CD principles and practices', type: 'book' },
          { title: 'Deployment Pipelines - Martin Fowler', description: 'Article on pipeline patterns for CD', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'What is Continuous Delivery?',
              paragraphs: [
                'Continuous Delivery (CD) extends CI by ensuring that the codebase is always in a deployable state. Every change that passes automated tests can be released to production at any time — with the push of a button.',
                'The key distinction: CD does not automatically deploy to production. It ensures the code is ready to deploy. A human makes the final decision about when to release, but the process is fully automated up to that point.'
              ],
              highlight: {
                text: 'Continuous Delivery means every successful build is ready for production. Deployment is a business decision, not a technical hurdle.',
                type: 'definition'
              }
            },
            {
              heading: 'What is Continuous Deployment?',
              paragraphs: [
                'Continuous Deployment goes one step further: every change that passes all tests is automatically deployed to production. No human intervention is required. This requires a high level of confidence in the test suite and monitoring.',
                'The choice between Delivery and Deployment depends on the team\'s maturity, risk tolerance, and regulatory requirements. Many teams start with Delivery and evolve to Deployment as their confidence grows.'
              ],
              bulletPoints: [
                'Continuous Delivery: Code is always ready to deploy; humans decide when',
                'Continuous Deployment: Code is automatically deployed after passing tests',
                'Both require robust automated testing and monitoring',
                'Start with Delivery, evolve to Deployment as confidence grows'
              ],
              highlight: {
                text: 'CD can mean Continuous Delivery (ready to deploy) or Continuous Deployment (auto-deploy). The difference is whether a human approves the release.',
                type: 'info'
              }
            },
            {
              heading: 'The Deployment Workflow',
              paragraphs: [
                'At Amanotes, the deployment workflow works as follows: when a pull request is merged into the branch, the system builds the product, then uploads it to TestFlight for iOS or Firebase App Distribution for Android.',
                'When the upload succeeds, a notification is sent to Slack so the QC team knows to download the build from TestFlight and perform manual testing. This combines automated deployment with manual verification — a practical hybrid approach.'
              ],
              bulletPoints: [
                'Pull request merged triggers automated build',
                'Build is uploaded to TestFlight (iOS) or Firebase App Distribution (Android)',
                'Slack notification alerts QC team of new build',
                'QC team downloads and performs manual testing'
              ]
            },
            {
              heading: 'Benefits of CD',
              paragraphs: [
                'CD eliminates manual steps in the software delivery process. Developers simply commit code — the rest (build, test, deploy) is handled automatically by CI/CD tools. Combined with automated testing, this creates a tight process that minimizes errors.',
                'Teams can release more frequently, with more confidence, and less stress. Small, frequent releases are less risky than large, infrequent ones. If something goes wrong, the blast radius is small and rollback is straightforward.'
              ],
              highlight: {
                text: 'Applying CI/CD is a way to effectively eliminate manual steps in the software development process. The developer\'s job is just to commit code — everything else is automated.',
                type: 'tip'
              }
            },
            {
              heading: 'Choosing a CI/CD Service',
              paragraphs: [
                'When selecting a CI/CD service, teams should consider multiple factors: ease of use, configuration options, build speed, platform support, documentation quality, and cost.',
                'Amanotes tested CircleCI and Microsoft\'s App Center initially. CircleCI was difficult to use, and App Center had weak configuration options leading to long build times. They eventually chose Bitrise for its user-friendly UI/UX and mobile-focused features.',
                'It\'s recommended to test CI/CD tools on small projects first, but results from small projects should not be blindly applied to the entire organization — different projects have different complexity and requirements.'
              ],
              bulletPoints: [
                'Consider ease of use, configuration, build speed, and platform support',
                'Test tools on small projects before committing',
                'Different teams may need different tools based on their tech stack',
                'Documentation quality is a key differentiator'
              ]
            }
          ],
          realWorldExample: {
            title: 'Amanotes Deployment Pipeline',
            scenario: 'From Code Merge to Manual Testing',
            story: [
              'At Amanotes, the deployment workflow is fully automated up to the manual testing stage. When a pull request is merged, the CI/CD system automatically builds the app and uploads it to TestFlight or Firebase App Distribution.',
              'A Slack notification then alerts the QC team that a new build is available. The QC team downloads the build and performs manual testing — checking for issues that automated tests might miss.',
              'This hybrid approach combines the speed of automation with the thoroughness of human testing. The team initially tested CircleCI and App Center but found CircleCI difficult to use and App Center too slow. They settled on Bitrise for its mobile-focused features and friendly UI.',
              'Giang recommends testing CI/CD tools per team (e.g., Mobile team, NodeJS team, Java team) rather than by project size, since each tech stack has different requirements.'
            ],
            lessons: [
              'CD automates everything up to the deployment decision',
              'Slack notifications bridge automated builds and manual testing',
              'Tool selection should be team-specific, not one-size-fits-all',
              'Testing tools on small projects helps but doesn\'t guarantee success at scale'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: CI/CD Fundamentals',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What does CI stand for?',
              options: [
                'Continuous Integration',
                'Continuous Inspection',
                'Code Integration',
                'Centralized Infrastructure'
              ],
              correctAnswer: 'Continuous Integration',
              explanation: 'CI stands for Continuous Integration — the practice of frequently merging code changes into a central repository with automated build and test verification.',
              hint: 'Think about what developers do frequently with their code.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
              options: [
                'Delivery is for web apps, Deployment is for mobile apps',
                'Delivery requires manual approval to deploy; Deployment deploys automatically',
                'Delivery is faster than Deployment',
                'There is no difference'
              ],
              correctAnswer: 'Delivery requires manual approval to deploy; Deployment deploys automatically',
              explanation: 'Continuous Delivery keeps code ready to deploy but requires a human to push the button. Continuous Deployment automatically deploys every change that passes tests.',
              hint: 'Think about who makes the final deployment decision.'
            },
            {
              id: 3,
              type: 'multiple-choice',
              question: 'In the Amanotes CI workflow, what happens when a developer creates a pull request?',
              options: [
                'Nothing happens until manual review',
                'The CI/CD system automatically runs build, test, lint check, and generates a report',
                'The code is immediately deployed to production',
                'The code is rejected until manually approved'
              ],
              correctAnswer: 'The CI/CD system automatically runs build, test, lint check, and generates a report',
              explanation: 'At Amanotes, creating a pull request triggers the CI/CD pipeline to automatically run build, test, lint check, and report generation. The reviewer checks the pass/fail status.',
              hint: 'Think about what the CI system does automatically.'
            },
            {
              id: 4,
              type: 'dropdown',
              question: 'In the Amanotes deployment workflow, where is the iOS build uploaded after merging?',
              dropdownOptions: [
                { id: 'appstore', label: 'App Store' },
                { id: 'testflight', label: 'TestFlight' },
                { id: 'firebase', label: 'Firebase App Distribution' }
              ],
              correctAnswer: 'TestFlight',
              explanation: 'iOS builds are uploaded to TestFlight, while Android builds go to Firebase App Distribution. A Slack notification then alerts the QC team.',
              hint: 'Apple\'s beta testing platform.'
            },
            {
              id: 5,
              type: 'multi-select',
              question: 'Which are benefits of CI/CD? (Select all that apply)',
              options: [
                'Eliminates manual steps in the delivery process',
                'Catches defects early when they are cheapest to fix',
                'Guarantees zero bugs in production',
                'Enables more frequent and confident releases',
                'Replaces the need for manual code review entirely'
              ],
              correctAnswer: ['Eliminates manual steps in the delivery process', 'Catches defects early when they are cheapest to fix', 'Enables more frequent and confident releases'],
              explanation: 'CI/CD automates the delivery process, catches bugs early, and enables frequent releases. However, it cannot guarantee zero bugs, and manual review is still needed for issues automation cannot catch.',
              hint: 'Think about what automation can and cannot do.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'What notification tool does Amanotes use to alert the QC team about new builds?',
              correctAnswer: 'Slack',
              explanation: 'Amanotes uses Slack notifications to alert the QC team when a new build is available for testing on TestFlight or Firebase App Distribution.',
              hint: 'A popular team communication tool.'
            },
            {
              id: 7,
              type: 'multiple-choice',
              question: 'Why did Amanotes choose Bitrise over CircleCI and App Center?',
              options: [
                'Bitrise was the cheapest option',
                'CircleCI was difficult to use and App Center had weak configuration and slow builds',
                'Bitrise was the only option that supported mobile',
                'CircleCI and App Center were discontinued'
              ],
              correctAnswer: 'CircleCI was difficult to use and App Center had weak configuration and slow builds',
              explanation: 'Amanotes tested CircleCI (difficult to use) and App Center (weak configuration, slow builds) before choosing Bitrise for its user-friendly UI/UX and mobile-focused features.',
              hint: 'Think about usability and configuration issues with the other tools.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Pipeline Flow',
    description: 'Understand how code moves through a pipeline: push, install, build, test, and report.',
    icon: 'Boxes',
    lessons: [
      {
        id: 1,
        title: 'Pipeline Steps',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'GitLab CI/CD Documentation', description: 'Official GitLab CI/CD getting started guide', type: 'article', url: 'https://docs.gitlab.com/ci/' },
          { title: 'GitLab CI/CD Pipelines', description: 'Detailed reference for pipeline configuration', type: 'article' },
          { title: 'The DevOps Handbook', description: 'Gene Kim et al. - Pipeline concepts and best practices', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'What is a CI/CD Pipeline?',
              paragraphs: [
                'A CI/CD pipeline is a continuous method of software development where you continuously build, test, deploy, and monitor iterative code changes. This iterative process helps reduce the chance of developing new code based on buggy or failed previous versions.',
                'GitLab CI/CD can catch bugs early in the development cycle and helps ensure that code deployed to production complies with your established code standards. The pipeline is the backbone of the entire CI/CD process.'
              ],
              highlight: {
                text: 'A pipeline is a series of automated steps that code passes through from commit to deployment. Each step validates the code and prepares it for the next stage.',
                type: 'definition'
              }
            },
            {
              heading: 'Pipeline Structure: Stages and Jobs',
              paragraphs: [
                'Pipelines are made up of stages and jobs. A stage represents a phase in the pipeline (e.g., build, test, deploy). Each stage contains one or more jobs that run sequentially or in parallel within that stage.',
                'Stages run in order — the build stage must complete before the test stage begins. Jobs within a stage can run in parallel, speeding up the pipeline. If any job in a stage fails, the pipeline stops and later stages do not run.'
              ],
              bulletPoints: [
                'Build stage: Compiles code and creates artifacts',
                'Test stage: Runs automated tests to verify correctness',
                'Deploy stage: Pushes verified code to target environments',
                'Stages run sequentially; jobs within a stage can run in parallel',
                'A failed job stops the pipeline and prevents later stages from running'
              ],
              highlight: {
                text: 'Pipelines are made up of stages and jobs. The typical stages are build, test, and deploy — each representing a phase in the delivery process.',
                type: 'tip'
              }
            },
            {
              heading: 'Pipeline Triggers',
              paragraphs: [
                'Pipelines can be triggered by various events. The most common triggers are commits (pushing code) and merges (combining branches). Pipelines can also be triggered on a schedule or manually.',
                'When a developer pushes code, the pipeline automatically starts. This immediate feedback loop is essential — developers know within minutes whether their change broke something, not days or weeks later.'
              ],
              bulletPoints: [
                'Commit triggers: Pipeline runs when code is pushed',
                'Merge triggers: Pipeline runs when branches are merged',
                'Scheduled triggers: Pipeline runs on a timer (e.g., nightly)',
                'Manual triggers: Pipeline can be started manually when needed'
              ]
            },
            {
              heading: 'The .gitlab-ci.yml File',
              paragraphs: [
                'To use GitLab CI/CD, you start with a .gitlab-ci.yml file at the root of your project. This file specifies the stages, jobs, and scripts to be executed during your CI/CD pipeline. It is a YAML file with its own custom syntax.',
                'In this file, you define variables, dependencies between jobs, and specify when and how each job should be executed. The pipeline defined in this file executes on a runner when triggered.'
              ],
              highlight: {
                text: 'The .gitlab-ci.yml file is the heart of GitLab CI/CD. It defines everything: stages, jobs, scripts, variables, and execution rules.',
                type: 'definition'
              }
            },
            {
              heading: 'Pipeline Integration',
              paragraphs: [
                'In your pipeline, you can integrate with a wide range of tools and platforms. This includes testing frameworks, deployment platforms, notification services, security scanners, and more.',
                'The pipeline is part of a larger DevSecOps workflow that includes planning, creating, verifying, securing, releasing, and monitoring. Each phase feeds into the next, creating a continuous cycle of improvement.'
              ],
              bulletPoints: [
                'Integrate testing frameworks (unit, integration, end-to-end)',
                'Connect to deployment platforms (cloud, containers, servers)',
                'Add security scanning (SAST, DAST, dependency checks)',
                'Send notifications to Slack, email, or other channels',
                'Monitor deployments and collect metrics'
              ]
            }
          ],
          realWorldExample: {
            title: 'A Typical Pipeline in Action',
            scenario: 'From Developer Push to Production Deployment',
            story: [
              'Imagine a developer pushes a new feature to a Git repository. Within seconds, the CI/CD system detects the change and starts the pipeline.',
              'BUILD STAGE: The pipeline installs dependencies and compiles the code. If the build fails (e.g., a syntax error), the pipeline stops immediately and the developer gets a notification. No further stages run.',
              'TEST STAGE: If the build succeeds, the test stage runs. Unit tests, integration tests, and lint checks execute. If any test fails, the pipeline stops and the developer sees which test failed and why.',
              'DEPLOY STAGE: If all tests pass, the deploy stage pushes the code to a staging environment. Further tests may run in staging before promoting to production.',
              'The entire process is automated. The developer\'s only action was pushing code. Everything else — build, test, deploy — was handled by the pipeline defined in the .gitlab-ci.yml file.'
            ],
            lessons: [
              'Pipelines run automatically when code is pushed',
              'Each stage must pass before the next one begins',
              'A failure in any stage stops the entire pipeline',
              'The developer\'s only action is pushing code — the rest is automated'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Build and Test Flow',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'GitLab CI/CD Documentation', description: 'Official GitLab CI/CD getting started guide', type: 'article', url: 'https://docs.gitlab.com/ci/' },
          { title: 'GitLab Runners', description: 'How runners execute pipeline jobs', type: 'article' },
          { title: 'CI/CD Variables and Expressions', description: 'GitLab variable management for pipelines', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Runners: The Engines of CI/CD',
              paragraphs: [
                'Runners are the agents that run your jobs. These agents can run on physical machines or virtual instances. When a pipeline is triggered, the runner loads the specified container image, clones your project, and runs the job either locally or in the container.',
                'If you use GitLab.com, runners on Linux, Windows, and macOS are already available for use. If needed, you can also register your own runners for custom environments or specific hardware requirements.'
              ],
              highlight: {
                text: 'Runners are the agents that execute pipeline jobs. They can run on physical machines, virtual instances, or in containers. You can use shared runners or register your own.',
                type: 'definition'
              }
            },
            {
              heading: 'CI/CD Variables',
              paragraphs: [
                'GitLab CI/CD variables are key-value pairs you use to store and pass configuration settings and sensitive information, like passwords or API keys, to jobs in a pipeline. Variables can be hard-coded in the .gitlab-ci.yml file, set in project settings, or generated dynamically.',
                'Variables can be defined at the project, group, or instance level. You can configure them with security settings to protect sensitive data. This makes pipelines flexible without exposing secrets in the code.'
              ],
              bulletPoints: [
                'Variables store configuration and sensitive data (passwords, API keys)',
                'Can be defined in .gitlab-ci.yml, project settings, or generated dynamically',
                'Available at project, group, or instance level',
                'Security settings protect sensitive variables from being exposed'
              ]
            },
            {
              heading: 'CI/CD Expressions',
              paragraphs: [
                'GitLab CI/CD expressions allow you to inject data dynamically into your pipeline configuration. The data available depends on the expression context. For example, the inputs context allows you to access information passed into the configuration file from a parent file or when a pipeline is run.',
                'Expressions use the $[[ ]] syntax and are validated when you create a pipeline. You can also validate expressions in the pipeline editor before committing changes, catching errors early.'
              ],
              highlight: {
                text: 'CI/CD expressions use the $[[ ]] syntax to inject dynamic data into pipeline configuration. They are validated at pipeline creation time, catching errors early.',
                type: 'info'
              }
            },
            {
              heading: 'CI/CD Components',
              paragraphs: [
                'A CI/CD component is a reusable pipeline configuration unit. You can use a CI/CD component to compose an entire pipeline configuration or a small part of a larger pipeline. Components are added with the include:component directive.',
                'Reusable components help reduce duplication, improve maintainability, and promote consistency across projects. You can create a component project and publish it to the CI/CD Catalog to share it across multiple projects. GitLab also provides component templates for common tasks.'
              ],
              bulletPoints: [
                'Components are reusable pipeline configuration units',
                'Added with the include:component directive',
                'Reduce duplication and improve maintainability',
                'Can be published to the CI/CD Catalog for sharing',
                'GitLab provides templates for common tasks and integrations'
              ],
              highlight: {
                text: 'Reusable components help reduce duplication, improve maintainability, and promote consistency across projects. Think of them as functions for your pipeline.',
                type: 'tip'
              }
            },
            {
              heading: 'The Build-Test-Deploy Cycle',
              paragraphs: [
                'The fundamental flow of a CI/CD pipeline follows a build-test-deploy cycle. Each phase has a specific purpose and feeds into the next:',
                'Build: Compile code, install dependencies, create artifacts. This phase catches compilation errors and dependency issues.',
                'Test: Run automated tests to verify correctness. This includes unit tests, integration tests, and any quality checks like linting or security scanning.',
                'Deploy: Push verified code to target environments. This can be staging for further testing, or production for release.'
              ],
              bulletPoints: [
                'Build: Compile, install dependencies, create artifacts',
                'Test: Run unit tests, integration tests, lint checks, security scans',
                'Deploy: Push to staging or production environments',
                'Each phase must pass before the next begins',
                'Failures stop the pipeline and notify the developer'
              ]
            }
          ],
          realWorldExample: {
            title: 'GitLab CI/CD in Practice',
            scenario: 'A Team\'s Pipeline Configuration',
            story: [
              'A development team configures their GitLab CI/CD pipeline in a .gitlab-ci.yml file at the root of their project. The file defines three stages: build, test, and deploy.',
              'BUILD: The runner pulls a Node.js Docker image, installs dependencies with npm install, and compiles the TypeScript code. The build artifact is saved for later stages.',
              'TEST: The test stage runs unit tests with Jest, integration tests with Cypress, and a lint check with ESLint. CI/CD variables provide the test database URL and API keys without hardcoding them.',
              'DEPLOY: If all tests pass, the deploy stage uses a CI/CD component for AWS deployment. The component handles authentication, uploads the artifact to S3, and triggers an Elastic Beanstalk deployment.',
              'The team uses a reusable component for the AWS deployment step, shared from their CI/CD Catalog. This reduces duplication across their 12 microservice repositories.'
            ],
            lessons: [
              'The .gitlab-ci.yml file defines the entire pipeline',
              'Runners execute jobs in containers with specified images',
              'Variables provide configuration without hardcoding secrets',
              'Reusable components reduce duplication across projects',
              'The build-test-deploy cycle is the fundamental pipeline flow'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: Pipeline Flow',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What are pipelines made up of in GitLab CI/CD?',
              options: [
                'Scripts and commands only',
                'Stages and jobs',
                'Containers and images',
                'Variables and expressions'
              ],
              correctAnswer: 'Stages and jobs',
              explanation: 'Pipelines are made up of stages and jobs. Stages represent phases (build, test, deploy), and jobs are the individual tasks within each stage.',
              hint: 'Think about the two levels of organization in a pipeline.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'What happens if a job in a pipeline stage fails?',
              options: [
                'The pipeline continues to the next stage',
                'Only that job is skipped, others continue',
                'The pipeline stops and later stages do not run',
                'The pipeline restarts from the beginning'
              ],
              correctAnswer: 'The pipeline stops and later stages do not run',
              explanation: 'If any job in a stage fails, the pipeline stops. Later stages do not run, preventing broken code from being deployed.',
              hint: 'Think about why pipelines are designed to stop on failure.'
            },
            {
              id: 3,
              type: 'dropdown',
              question: 'What file defines a GitLab CI/CD pipeline?',
              dropdownOptions: [
                { id: 'dockerfile', label: 'Dockerfile' },
                { id: 'gitlab', label: '.gitlab-ci.yml' },
                { id: 'makefile', label: 'Makefile' }
              ],
              correctAnswer: '.gitlab-ci.yml',
              explanation: 'The .gitlab-ci.yml file at the root of the project specifies the stages, jobs, and scripts for the CI/CD pipeline. It is a YAML file with custom syntax.',
              hint: 'The filename includes the platform name.'
            },
            {
              id: 4,
              type: 'multiple-choice',
              question: 'What are runners in GitLab CI/CD?',
              options: [
                'People who review code',
                'Agents that run pipeline jobs on physical or virtual machines',
                'Scripts that test code',
                'Variables that configure the pipeline'
              ],
              correctAnswer: 'Agents that run pipeline jobs on physical or virtual machines',
              explanation: 'Runners are the agents that execute pipeline jobs. They can run on physical machines, virtual instances, or in containers. GitLab.com provides shared runners for Linux, Windows, and macOS.',
              hint: 'Think about what actually executes the pipeline jobs.'
            },
            {
              id: 5,
              type: 'multi-select',
              question: 'Which are typical stages in a CI/CD pipeline? (Select all that apply)',
              options: [
                'Build',
                'Test',
                'Deploy',
                'Marketing',
                'Sales'
              ],
              correctAnswer: ['Build', 'Test', 'Deploy'],
              explanation: 'The typical pipeline stages are build (compile and create artifacts), test (run automated tests), and deploy (push to environments). Marketing and Sales are not pipeline stages.',
              hint: 'Think about the technical phases of software delivery.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'What syntax does GitLab CI/CD use for dynamic expressions?',
              correctAnswer: '$[[ ]]',
              explanation: 'GitLab CI/CD expressions use the $[[ ]] syntax to inject data dynamically into pipeline configuration. They are validated when a pipeline is created.',
              hint: 'It uses square brackets inside dollar signs.'
            },
            {
              id: 7,
              type: 'multiple-choice',
              question: 'What is a CI/CD component in GitLab?',
              options: [
                'A physical server that runs pipelines',
                'A reusable pipeline configuration unit',
                'A type of test framework',
                'A monitoring dashboard'
              ],
              correctAnswer: 'A reusable pipeline configuration unit',
              explanation: 'A CI/CD component is a reusable pipeline configuration unit. It helps reduce duplication, improve maintainability, and promote consistency across projects. Components are added with include:component.',
              hint: 'Think about reusability in pipeline configuration.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: 'GitHub Actions',
    description: 'See how CI/CD platforms run workflows automatically whenever developers push code.',
    icon: 'Github',
    lessons: [
      {
        id: 1,
        title: 'Workflow Configuration',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'CircleCI Migration from Buildkite', description: 'Guide on migrating CI/CD configuration between platforms', type: 'article', url: 'https://circleci.com/docs/guides/migrate/migrating-from-buildkite/' },
          { title: 'CircleCI Configuration Reference', description: 'Complete YAML reference for CircleCI config', type: 'article' },
          { title: 'GitHub Actions Documentation', description: 'Official GitHub Actions workflow syntax guide', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Build Configuration Files',
              paragraphs: [
                'Every CI/CD platform uses a configuration file to define the pipeline. The file lives in your source code repository and specifies what jobs to run, in what order, and under what conditions.',
                'Different platforms use different file names and syntax. Buildkite uses .pipeline.yml, CircleCI uses .circleci/config.yml, GitLab uses .gitlab-ci.yml, and GitHub Actions uses workflow files in .github/workflows/. Despite differences, the concepts are similar across platforms.'
              ],
              highlight: {
                text: 'Build configuration is defined in a YAML file at the root of your source code repository. Different platforms use different filenames, but the concepts are universal.',
                type: 'definition'
              }
            },
            {
              heading: 'Defining Jobs and Steps',
              paragraphs: [
                'In CircleCI, a job is defined with steps that include checkout (to get the code) and run (to execute commands). For example, a simple job checks out the code and runs a shell script.',
                'In Buildkite, the equivalent is a step with a command. The migration from Buildkite to CircleCI involves converting steps to jobs with checkout and run steps. The structure is different but the purpose is the same: define what to execute.'
              ],
              bulletPoints: [
                'CircleCI: jobs with steps (checkout, run)',
                'Buildkite: steps with commands',
                'GitHub Actions: jobs with steps (uses, run)',
                'GitLab: jobs with scripts',
                'All platforms: define what to run and in what order'
              ]
            },
            {
              heading: 'Specifying Execution Environments',
              paragraphs: [
                'CI/CD platforms let you specify the environment for each job. In Buildkite, you specify a Docker image using plugins. In CircleCI, you specify a Docker image directly in the job configuration.',
                'For example, to use a Node.js 10 image: Buildkite uses a docker plugin, while CircleCI simply specifies docker: image: node:10. This is simpler and more direct in CircleCI.'
              ],
              highlight: {
                text: 'Different platforms specify Docker images differently. Buildkite uses plugins; CircleCI uses a direct docker key. Understanding these differences is key to migrating between platforms.',
                type: 'info'
              }
            },
            {
              heading: 'Multi-Stage Pipelines',
              paragraphs: [
                'Real pipelines have multiple stages with dependencies. For example, job1 and job2 run concurrently. Once they finish, job3 runs. Once job3 finishes, job4 runs. This creates a dependency graph.',
                'In Buildkite, this is done with wait steps between groups of commands. In CircleCI, this is done with workflows that specify requires relationships between jobs. The concept is the same — define which jobs depend on which others.'
              ],
              bulletPoints: [
                'Jobs can run concurrently (no dependencies)',
                'Jobs can depend on other jobs (sequential execution)',
                'Buildkite uses wait steps to separate groups',
                'CircleCI uses workflows with requires to define dependencies',
                'The dependency graph determines execution order'
              ],
              highlight: {
                text: 'In CircleCI, workflows define the order: job1 and job2 run first, then job3 requires both, then job4 requires job3. This creates a multi-stage pipeline with both parallel and sequential execution.',
                type: 'tip'
              }
            },
            {
              heading: 'Multi-Platform Execution',
              paragraphs: [
                'Many projects need to test on multiple platforms (Linux, macOS, Windows). Buildkite uses tags to identify build agents for different platforms. CircleCI provides executors for Docker, Linux, and macOS.',
                'For example, to run on Ubuntu and macOS: Buildkite uses agent tags (ubuntu: 16.04, osx: true). CircleCI uses machine (with an Ubuntu image) and macos (with an Xcode version) executors. Each platform has its own way of specifying the execution environment.'
              ],
              bulletPoints: [
                'Buildkite: uses agent tags to identify platforms',
                'CircleCI: provides Docker, Linux, and macOS executors',
                'GitHub Actions: uses runs-on to specify the runner OS',
                'Multi-platform testing ensures cross-platform compatibility'
              ]
            }
          ],
          realWorldExample: {
            title: 'Migrating from Buildkite to CircleCI',
            scenario: 'A Team\'s Platform Migration Journey',
            story: [
              'A team migrating from Buildkite to CircleCI starts with source control setup. Their code must be in GitHub, Bitbucket, or GitLab. If using GitHub Enterprise, they create a bare clone and push all references to the new repository.',
              'BUILD CONFIGURATION: They create a .circleci directory with a config.yml file. Their existing Buildkite .pipeline.yml is converted step by step. Shell scripts used in Buildkite can be reused directly in CircleCI.',
              'JOB CONVERSION: Each Buildkite step becomes a CircleCI job with checkout and run steps. Docker image specifications change from plugin syntax to direct docker key. Multi-stage pipelines use workflows with requires.',
              'MIGRATION ORDER: For complex builds, the team migrates in phases: first shell scripts and Docker compose, then workflows, then artifacts, then caching, then triggers, and finally performance optimizations. This phased approach reduces risk.',
              'The team keeps both Buildkite and CircleCI reference documentation open side-by-side during migration, making it easier to convert each build step accurately.'
            ],
            lessons: [
              'Migration starts with source control setup',
              'Shell scripts can be reused across platforms',
              'Configuration syntax differs but concepts are universal',
              'Phased migration reduces risk for complex pipelines',
              'Keeping reference docs open side-by-side speeds conversion'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Push Triggers and Workflows',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'CircleCI Migration from Buildkite', description: 'Guide on migrating CI/CD configuration between platforms', type: 'article', url: 'https://circleci.com/docs/guides/migrate/migrating-from-buildkite/' },
          { title: 'CircleCI Workflows', description: 'How to orchestrate jobs with workflows', type: 'article' },
          { title: 'CircleCI Caching', description: 'Speed up builds with dependency caching', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'How Triggers Work',
              paragraphs: [
                'Triggers are events that start a pipeline. The most common trigger is a push — when a developer pushes code to the repository, the CI/CD system detects the change and starts the pipeline automatically.',
                'This automatic triggering is what makes CI/CD "continuous." Developers don\'t need to manually start builds. The system watches for changes and responds immediately, creating a fast feedback loop.'
              ],
              highlight: {
                text: 'Push triggers are the heartbeat of CI/CD. Every code push automatically starts the pipeline, creating immediate feedback for developers.',
                type: 'definition'
              }
            },
            {
              heading: 'Types of Triggers',
              paragraphs: [
                'CI/CD platforms support various trigger types. Push triggers fire when code is pushed to a branch. Pull request triggers fire when a PR is opened or updated. Schedule triggers fire on a timer (e.g., nightly builds). Manual triggers allow starting a pipeline on demand.',
                'Different triggers can run different pipelines. For example, a push to a feature branch might run only unit tests, while a merge to the main branch runs the full pipeline including deployment.'
              ],
              bulletPoints: [
                'Push triggers: fire when code is pushed to any branch',
                'Pull request triggers: fire when a PR is opened or updated',
                'Schedule triggers: fire on a timer (e.g., nightly at 2 AM)',
                'Manual triggers: allow starting a pipeline on demand',
                'Different triggers can run different pipeline configurations'
              ]
            },
            {
              heading: 'Workflows: Orchestrating Jobs',
              paragraphs: [
                'Workflows define the order and dependencies of jobs. In CircleCI, a workflow specifies which jobs run first, which run in parallel, and which depend on others. This orchestration is key to efficient pipelines.',
                'For example, a workflow might run build-dependencies and build-artifacts concurrently, then run test (which requires both), then run deploy (which requires test). This maximizes parallelism while respecting dependencies.'
              ],
              highlight: {
                text: 'Workflows orchestrate job execution. They define which jobs run in parallel, which depend on others, and the overall pipeline flow. Efficient workflows minimize total pipeline time.',
                type: 'tip'
              }
            },
            {
              heading: 'Migration Phases for Complex Builds',
              paragraphs: [
                'When migrating complex build configurations between platforms, it\'s recommended to move build steps in phases rather than all at once. This reduces risk and helps the team learn the new platform gradually.',
                'The recommended migration order is: first execute shell scripts and Docker compose files, then set up workflows, then configure artifacts, then add caching, then set up triggers, and finally optimize performance.'
              ],
              bulletPoints: [
                'Phase 1: Execute shell scripts and Docker compose files',
                'Phase 2: Set up workflows and job dependencies',
                'Phase 3: Configure artifact storage and transfer',
                'Phase 4: Add caching to speed up builds',
                'Phase 5: Set up triggers (push, PR, schedule)',
                'Phase 6: Optimize performance and parallelism'
              ],
              highlight: {
                text: 'For larger and more complex build files, migrate in phases: shell scripts first, then workflows, then artifacts, then caching, then triggers, then performance. This reduces migration risk.',
                type: 'warning'
              }
            },
            {
              heading: 'Docker Authentication',
              paragraphs: [
                'When using Docker execution environments, authenticating Docker pulls from image registries is recommended. Authenticated pulls allow access to private Docker images and may also grant higher rate limits, depending on your registry provider.',
                'This is especially important for pipelines that pull many Docker images. Without authentication, you may hit rate limits that slow down or break your builds. Authentication is a simple step that prevents these issues.'
              ],
              bulletPoints: [
                'Authenticate Docker pulls for private images',
                'Authentication may grant higher rate limits',
                'Prevents build failures due to rate limiting',
                'Especially important for pipelines pulling many images'
              ]
            }
          ],
          realWorldExample: {
            title: 'A Multi-Stage Workflow in Action',
            scenario: 'Concurrent Builds with Dependencies',
            story: [
              'A team configures a CircleCI workflow with four jobs. Job1 builds dependencies. Job2 builds artifacts. Both run concurrently to save time.',
              'Once both complete, Job3 runs tests. It requires both Job1 and Job2 — it cannot start until both finish. This ensures tests run against the complete build.',
              'Once tests pass, Job4 deploys. It requires Job3. If tests fail, deployment never happens — the pipeline stops automatically.',
              'The workflow configuration looks like: job1 and job2 run first (no dependencies), job3 requires [job1, job2], job4 requires [job3]. This creates a diamond-shaped dependency graph.',
              'This structure maximizes parallelism (job1 and job2 run at the same time) while ensuring correctness (job3 waits for both, job4 waits for job3). The total pipeline time is shorter than running all jobs sequentially.'
            ],
            lessons: [
              'Workflows define job order and dependencies',
              'Independent jobs run concurrently to save time',
              'Dependent jobs wait for their requirements to complete',
              'A failure in any job prevents dependent jobs from running',
              'Efficient workflows balance parallelism with correctness'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: Workflows and Triggers',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What is the most common trigger for a CI/CD pipeline?',
              options: [
                'Manual start by an administrator',
                'A push event (code pushed to the repository)',
                'A scheduled timer',
                'An email notification'
              ],
              correctAnswer: 'A push event (code pushed to the repository)',
              explanation: 'Push triggers are the most common. When a developer pushes code, the CI/CD system detects the change and automatically starts the pipeline, creating immediate feedback.',
              hint: 'Think about what event starts the pipeline automatically.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'In CircleCI, how do you define that job3 requires both job1 and job2 to complete first?',
              options: [
                'Add a wait step between jobs',
                'Use the requires key in the workflow configuration',
                'Set a timeout on job3',
                'Add job3 as a plugin to job1 and job2'
              ],
              correctAnswer: 'Use the requires key in the workflow configuration',
              explanation: 'In CircleCI workflows, you use the requires key to define dependencies: job3: requires: [job1, job2]. This ensures job3 waits for both to complete.',
              hint: 'Think about the CircleCI workflow syntax for dependencies.'
            },
            {
              id: 3,
              type: 'dropdown',
              question: 'In CircleCI, what directory and file name is used for the build configuration?',
              dropdownOptions: [
                { id: 'pipeline', label: '.pipeline.yml' },
                { id: 'circle', label: '.circleci/config.yml' },
                { id: 'gitlab', label: '.gitlab-ci.yml' }
              ],
              correctAnswer: '.circleci/config.yml',
              explanation: 'CircleCI uses a .circleci directory at the project root with a config.yml file inside it. Buildkite uses .pipeline.yml and GitLab uses .gitlab-ci.yml.',
              hint: 'The directory name matches the platform name.'
            },
            {
              id: 4,
              type: 'multi-select',
              question: 'What is the recommended migration order for complex build files? (Select the correct phases)',
              options: [
                'Shell scripts and Docker compose first',
                'Workflows second',
                'Artifacts third',
                'Caching fourth',
                'Performance optimization first'
              ],
              correctAnswer: ['Shell scripts and Docker compose first', 'Workflows second', 'Artifacts third', 'Caching fourth'],
              explanation: 'The recommended migration order is: shell scripts and Docker compose, then workflows, then artifacts, then caching, then triggers, and finally performance optimization. Starting with performance optimization is premature.',
              hint: 'Start simple, add complexity in phases.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'Why is Docker authentication recommended when using Docker execution environments?',
              options: [
                'It is required by all CI/CD platforms',
                'It allows access to private images and may grant higher rate limits',
                'It speeds up build execution by 10x',
                'It enables automatic deployment'
              ],
              correctAnswer: 'It allows access to private images and may grant higher rate limits',
              explanation: 'Authenticating Docker pulls allows access to private Docker images and may grant higher rate limits from your registry provider, preventing build failures due to rate limiting.',
              hint: 'Think about rate limits and private images.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'In Buildkite, what file defines the build configuration?',
              correctAnswer: '.pipeline.yml',
              explanation: 'Buildkite uses a .pipeline.yml file in the root directory of the source code repository. This is equivalent to CircleCI\'s .circleci/config.yml.',
              hint: 'The filename includes the word "pipeline".'
            },
            {
              id: 7,
              type: 'multiple-choice',
              question: 'What is the purpose of workflows in CI/CD?',
              options: [
                'To store sensitive variables',
                'To orchestrate job execution order and dependencies',
                'To compile source code',
                'To send notifications to Slack'
              ],
              correctAnswer: 'To orchestrate job execution order and dependencies',
              explanation: 'Workflows define which jobs run in parallel, which depend on others, and the overall execution order. They orchestrate the pipeline to maximize efficiency while respecting dependencies.',
              hint: 'Think about how jobs are organized and ordered.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Testing & Reports',
    description: 'Learn how automated tests show pass or fail results, and how reports help developers fix problems quickly.',
    icon: 'BarChart3',
    lessons: [
      {
        id: 1,
        title: 'Automated Testing in CI/CD',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'Bitrise Documentation', description: 'Official Bitrise docs for mobile DevOps and CI/CD', type: 'article', url: 'https://docs.bitrise.io/' },
          { title: 'Bitrise CI', description: 'Automate builds and tests for mobile apps', type: 'article' },
          { title: 'Mobile DevOps Best Practices', description: 'Testing strategies for mobile CI/CD', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Bitrise: Mobile DevOps Platform',
              paragraphs: [
                'Bitrise is a Mobile DevOps Platform tailored for mobile engineering teams. It equips teams for success at every step, from planning to monitoring. The platform automates builds and tests, and deploys mobile apps with a focus on the unique challenges of mobile development.',
                'Unlike general-purpose CI/CD tools, Bitrise is specifically designed for mobile. This means better support for iOS and Android builds, native mobile testing frameworks, and mobile-specific deployment pipelines like TestFlight and Google Play.'
              ],
              highlight: {
                text: 'Bitrise is a Mobile DevOps Platform that automates builds, tests, and deployment specifically for mobile apps. It covers the entire lifecycle from planning to monitoring.',
                type: 'definition'
              }
            },
            {
              heading: 'Bitrise CI: Automating Builds and Tests',
              paragraphs: [
                'Bitrise CI automates builds and tests for mobile apps. When a developer pushes code, Bitrise automatically compiles the app, runs tests, and reports results. This is especially valuable for mobile development where local builds can be slow and environment-dependent.',
                'The platform supports iOS, Android, and cross-platform frameworks like React Native and Flutter. Each platform has specific build steps and test integrations, all configurable through Bitrise\'s visual workflow editor.'
              ],
              bulletPoints: [
                'Automates builds for iOS, Android, and cross-platform frameworks',
                'Runs unit tests, integration tests, and UI tests automatically',
                'Visual workflow editor for configuring build steps',
                'Supports React Native, Flutter, and other mobile frameworks',
                'Reports pass/fail results with detailed logs'
              ]
            },
            {
              heading: 'Build Cache: Speeding Up Builds',
              paragraphs: [
                'Bitrise Build Cache speeds up builds on any CI/CD platform or in a local environment. Caching stores build artifacts and dependencies so they don\'t need to be recompiled or re-downloaded on every run.',
                'For mobile apps, caching is especially impactful. iOS builds, for example, can take 20-30 minutes without caching but only 5-10 minutes with it. Build Cache works across different CI/CD platforms, not just Bitrise.'
              ],
              highlight: {
                text: 'Build Cache speeds up your builds on any CI/CD platform or in a local environment. For mobile apps, caching can reduce build times from 30 minutes to under 10 minutes.',
                type: 'tip'
              }
            },
            {
              heading: 'Release Management',
              paragraphs: [
                'Bitrise Release Management lets teams test and release mobile apps in an automated and transparent way. It manages the entire release process from build to distribution, ensuring quality at every step.',
                'The release pipeline can include automated testing, manual approval gates, distribution to testing groups, and final submission to app stores. Each step is tracked and visible, giving teams full visibility into the release process.'
              ],
              bulletPoints: [
                'Automated release pipeline from build to app store',
                'Manual approval gates for quality control',
                'Distribution to testing groups (TestFlight, Google Play internal)',
                'Full visibility and tracking of the release process',
                'Integration with app store submission APIs'
              ]
            },
            {
              heading: 'Insights: Monitoring and Analytics',
              paragraphs: [
                'Bitrise Insights lets teams explore analytics, monitor trends, and set up alerts to improve efficiency. This goes beyond pass/fail — it provides data on build times, test coverage, failure rates, and trends over time.',
                'With Insights, teams can identify bottlenecks (e.g., a test suite that takes too long), track quality trends (e.g., increasing failure rate), and set up alerts for critical issues (e.g., build failure rate exceeds threshold).'
              ],
              highlight: {
                text: 'Insights provides analytics, trend monitoring, and alerts. It helps teams identify bottlenecks, track quality trends, and respond to issues before they become critical.',
                type: 'info'
              }
            }
          ],
          realWorldExample: {
            title: 'Amanotes and Bitrise',
            scenario: 'Mobile Game Testing with Bitrise',
            story: [
              'Amanotes, a mobile game company, chose Bitrise as their CI/CD platform after testing CircleCI and App Center. They found Bitrise\'s UI/UX to be the most user-friendly and its mobile-focused features ideal for their game development workflow.',
              'When a developer merges a pull request, Bitrise automatically builds the game and uploads it to TestFlight (iOS) or Firebase App Distribution (Android). A Slack notification alerts the QC team to download and manually test the build.',
              'Bitrise\'s Build Cache significantly reduces build times for their large game projects. What used to take 30 minutes now takes under 10, allowing faster iteration and more frequent testing.',
              'The Insights dashboard helps the team track build performance over time. They noticed that certain test suites were slowing down builds and optimized them, reducing average pipeline time by 40%.'
            ],
            lessons: [
              'Bitrise is specifically designed for mobile app CI/CD',
              'Build Cache dramatically reduces build times for mobile projects',
              'Insights helps identify bottlenecks and track quality trends',
              'Automated builds + manual testing = practical hybrid approach',
              'Mobile-focused tools outperform general-purpose CI/CD for mobile teams'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Reading Reports and Build Hub',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'Bitrise Documentation', description: 'Official Bitrise docs for mobile DevOps and CI/CD', type: 'article', url: 'https://docs.bitrise.io/' },
          { title: 'Bitrise Build Hub', description: 'High-performance build infrastructure for GitHub Actions', type: 'article' },
          { title: 'Bitrise Insights', description: 'Analytics and monitoring for CI/CD', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Understanding CI/CD Reports',
              paragraphs: [
                'CI/CD reports are the primary way developers understand what happened during a pipeline run. A good report shows whether the pipeline passed or failed, which specific tests failed, error messages, logs, and artifacts produced.',
                'Reading reports effectively is a critical skill. A failed pipeline report should tell you: what failed (which job/test), why it failed (error message and logs), where it failed (which step), and how to fix it (suggested actions or links to details).'
              ],
              highlight: {
                text: 'CI/CD reports tell developers what failed, why, where, and how to fix it. Effective report reading is the key to fast debugging and continuous improvement.',
                type: 'definition'
              }
            },
            {
              heading: 'Types of Reports',
              paragraphs: [
                'CI/CD platforms generate various types of reports. Build reports show compilation results and errors. Test reports show which tests passed, failed, or were skipped, often with detailed assertions and stack traces. Coverage reports show what percentage of code was tested. Security reports flag vulnerabilities found during scanning.'
              ],
              bulletPoints: [
                'Build reports: compilation results, errors, warnings',
                'Test reports: pass/fail/skip counts, detailed failure messages, stack traces',
                'Coverage reports: percentage of code covered by tests',
                'Security reports: vulnerabilities found by security scanning',
                'Performance reports: build times, test durations, trends over time'
              ]
            },
            {
              heading: 'Build Hub: High-Performance Infrastructure',
              paragraphs: [
                'Bitrise Build Hub provides high-performance build infrastructure for GitHub Actions, purpose-built for mobile app development. This means faster builds, more reliable execution, and better resource allocation for mobile-specific workloads.',
                'Build Hub is designed to handle the unique demands of mobile builds — large binary sizes, complex dependency trees, platform-specific SDKs, and long compilation times. By optimizing for these characteristics, Build Hub delivers significantly better performance than generic CI infrastructure.'
              ],
              highlight: {
                text: 'Build Hub provides high-performance build infrastructure for GitHub Actions, purpose-built for mobile app development. It handles the unique demands of mobile builds better than generic CI infrastructure.',
                type: 'tip'
              }
            },
            {
              heading: 'The Bitrise Platform Overview',
              paragraphs: [
                'Bitrise\'s Mobile DevOps Platform equips teams for success at every step, from planning to monitoring. The platform includes several key components that work together:',
                'Bitrise as a Platform provides the fundamentals. Bitrise CI automates builds and tests. Build Cache speeds up builds. Release Management handles app releases. Insights provides analytics and monitoring. Build Hub offers high-performance infrastructure.'
              ],
              bulletPoints: [
                'Bitrise as a Platform: Learn the fundamentals of your Mobile DevOps platform',
                'Bitrise CI: Automate builds and tests, and deploy your mobile apps',
                'Build Cache: Speed up your builds on any CI/CD platform or locally',
                'Release Management: Test and release mobile apps in an automated way',
                'Insights: Explore analytics, monitor trends, and set up alerts',
                'Build Hub: High-performance build infrastructure for GitHub Actions'
              ],
              highlight: {
                text: 'Bitrise covers the entire mobile DevOps lifecycle: CI for builds and tests, Build Cache for speed, Release Management for deployment, Insights for monitoring, and Build Hub for infrastructure.',
                type: 'info'
              }
            },
            {
              heading: 'Acting on Reports',
              paragraphs: [
                'Reports are only valuable if teams act on them. A failed test report should lead to a fix. A coverage report showing low coverage should lead to new tests. A performance report showing slow builds should lead to optimization.',
                'The best teams make report-driven decisions. They review Insights dashboards regularly, set up alerts for critical metrics, and use report data to prioritize improvements. This creates a continuous improvement loop: build, test, report, analyze, improve, repeat.'
              ],
              bulletPoints: [
                'Failed tests: Fix the code or the test, then rerun the pipeline',
                'Low coverage: Write new tests to cover untested code paths',
                'Slow builds: Optimize caching, parallelize jobs, or upgrade infrastructure',
                'Security issues: Patch vulnerabilities before deploying',
                'Trends: Use Insights to identify patterns and make proactive improvements'
              ],
              highlight: {
                text: 'Reports are only valuable if teams act on them. The best teams create a continuous improvement loop: build, test, report, analyze, improve, repeat.',
                type: 'warning'
              }
            }
          ],
          realWorldExample: {
            title: 'From Failed Report to Fixed Code',
            scenario: 'A Developer\'s Debugging Journey',
            story: [
              'A developer pushes code and receives a CI/CD notification: the pipeline failed. They open the report and see that the test stage failed — specifically, a unit test for the payment module.',
              'The test report shows: "Expected status 200 but received 500." The stack trace points to a null pointer in the payment service. The log shows the error occurred when processing a null customer ID.',
              'The developer reads the build report too — the build succeeded, so the issue is in the test, not compilation. They check the coverage report and notice the null ID case was not covered in their local testing.',
              'They fix the code to handle null customer IDs, add a test case for this scenario, and push again. The pipeline runs, all tests pass, and the code is deployed. Total time from failure to fix: 15 minutes — thanks to a clear, actionable report.',
              'The team\'s Insights dashboard shows this pattern: null pointer issues are the most common failure type. They add static analysis to catch these before tests run, reducing failures by 30% over the next month.'
            ],
            lessons: [
              'Reports tell you what failed, why, and where to look',
              'Test reports with stack traces enable fast debugging',
              'Coverage reports reveal untested code paths',
              'Insights dashboards reveal patterns for proactive improvement',
              'Acting on reports creates a continuous improvement loop'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: Testing & Reports',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What is Bitrise?',
              options: [
                'A general-purpose CI/CD platform for web applications',
                'A Mobile DevOps Platform tailored for mobile engineering teams',
                'A code review tool',
                'A database management system'
              ],
              correctAnswer: 'A Mobile DevOps Platform tailored for mobile engineering teams',
              explanation: 'Bitrise is a Mobile DevOps Platform specifically designed for mobile engineering teams. It automates builds, tests, and deployment for mobile apps from planning to monitoring.',
              hint: 'Think about what makes Bitrise different from other CI/CD tools.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'What does Bitrise Build Cache do?',
              options: [
                'Stores test results for later analysis',
                'Speeds up builds on any CI/CD platform or in a local environment',
                'Manages app store submissions',
                'Sends notifications to Slack'
              ],
              correctAnswer: 'Speeds up builds on any CI/CD platform or in a local environment',
              explanation: 'Build Cache stores build artifacts and dependencies so they don\'t need to be recompiled or re-downloaded. It works on any CI/CD platform, not just Bitrise, and can reduce mobile build times from 30 minutes to under 10.',
              hint: 'Think about what "cache" means in the context of builds.'
            },
            {
              id: 3,
              type: 'dropdown',
              question: 'Which Bitrise feature provides analytics, trend monitoring, and alerts?',
              dropdownOptions: [
                { id: 'ci', label: 'Bitrise CI' },
                { id: 'insights', label: 'Insights' },
                { id: 'hub', label: 'Build Hub' }
              ],
              correctAnswer: 'Insights',
              explanation: 'Bitrise Insights lets teams explore analytics, monitor trends, and set up alerts to improve efficiency. It goes beyond pass/fail to provide data on build times, test coverage, and failure rates.',
              hint: 'Think about which feature is about visibility and data.'
            },
            {
              id: 4,
              type: 'multi-select',
              question: 'Which are components of the Bitrise platform? (Select all that apply)',
              options: [
                'Bitrise CI for automating builds and tests',
                'Build Cache for speeding up builds',
                'Release Management for app releases',
                'Insights for analytics and monitoring',
                'Build Hub for high-performance infrastructure'
              ],
              correctAnswer: ['Bitrise CI for automating builds and tests', 'Build Cache for speeding up builds', 'Release Management for app releases', 'Insights for analytics and monitoring', 'Build Hub for high-performance infrastructure'],
              explanation: 'All five are key components of the Bitrise platform: CI, Build Cache, Release Management, Insights, and Build Hub. Together they cover the entire mobile DevOps lifecycle.',
              hint: 'All of these are mentioned in the Bitrise documentation.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'What should a good CI/CD report tell you when a pipeline fails?',
              options: [
                'Only that the pipeline failed',
                'What failed, why it failed, where it failed, and how to fix it',
                'The name of the developer who caused the failure',
                'The cost of the failed pipeline run'
              ],
              correctAnswer: 'What failed, why it failed, where it failed, and how to fix it',
              explanation: 'A good report tells you what failed (which job/test), why (error message and logs), where (which step), and how to fix it. This enables fast debugging and continuous improvement.',
              hint: 'Think about what information you need to fix a failed pipeline.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'What Bitrise feature provides high-performance build infrastructure for GitHub Actions?',
              correctAnswer: 'Build Hub',
              explanation: 'Build Hub provides high-performance build infrastructure for GitHub Actions, purpose-built for mobile app development. It handles the unique demands of mobile builds better than generic CI infrastructure.',
              hint: 'Two words, the second one is "Hub".'
            },
            {
              id: 7,
              type: 'multiple-choice',
              question: 'What is the continuous improvement loop in CI/CD?',
              options: [
                'Build, deploy, monitor, repeat',
                'Build, test, report, analyze, improve, repeat',
                'Code, commit, push, repeat',
                'Plan, code, test, release'
              ],
              correctAnswer: 'Build, test, report, analyze, improve, repeat',
              explanation: 'The continuous improvement loop is: build, test, report, analyze, improve, repeat. Reports are only valuable if teams act on them — analyzing data and making improvements creates the loop.',
              hint: 'Think about what happens after you get a report.'
            }
          ]
        }
      }
    ]
  }
];
