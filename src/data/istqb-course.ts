import { Chapter } from '../types/course';

export const istqbCourse: Chapter[] = [
  {
    id: 1,
    title: 'Fundamentals of Testing',
    description: 'Learn why testing is essential, the seven testing principles, and the fundamental test process.',
    icon: 'BookOpen',
    lessons: [
      {
        id: 1,
        title: 'Why Testing is Necessary',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Official ISTQB certification syllabus - Section 1.1', type: 'book' },
          { title: 'The Economics of Software Quality', description: 'Research on defect cost increase over development phases', type: 'article' },
          { title: 'NASA Software Engineering Case Studies', description: 'How NASA handles critical software testing', type: 'book' },
          { title: 'Code Complete', description: 'Steve McConnell - Chapter 20 on debugging and testing philosophy', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'The Fundamental Question: Why Test?',
              paragraphs: [
                'Before diving into testing techniques, we must ask: why do we test software at all? The philosophical foundation of testing rests on a simple truth - humans are fallible. Every line of code written by a human carries the possibility of error. Testing is our acknowledgment of imperfection and our commitment to quality.',
                'Testing is not about finding every bug - an impossible goal. It is about reducing risk to acceptable levels, building confidence, and providing information for decisions. As Edsger Dijkstra famously said: "Testing shows the presence, not the absence of bugs." This humility shapes everything we do.'
              ]
            },
            {
              heading: 'Software Defects and Failures',
              paragraphs: [
                'A human being can make an error (mistake), which produces a defect (fault or bug) in the software code or document. If a defect in code is executed, it can cause a failure, but not all defects cause failures.',
                'This chain - error, defect, failure - is fundamental. Understanding it transforms how we think about defects. A defect is dormant until executed. A failure is visible, but the underlying defect may be hidden. This is why static testing (finding defects without execution) is so valuable - it catches bugs during their dormant phase.'
              ],
              highlight: {
                text: 'A defect can lead to a failure, but the presence of defects does not guarantee failures will occur. Some defects exist for years, never causing failures because the code path is never executed.',
                type: 'definition'
              }
            },
            {
              heading: 'Error, Defect, and Failure: The Chain',
              paragraphs: [
                'Understanding the relationship between errors, defects, and failures is fundamental to software testing. Each element of this chain represents a different manifestation of the same underlying problem.'
              ],
              bulletPoints: [
                'Error (Mistake): A human action that produces an incorrect result. Example: A developer misunderstands a requirement and implements the wrong logic.',
                'Defect (Fault/Bug): A flaw in a component or system that can cause failure. Example: The incorrect logic becomes lines of code that contain a flaw.',
                'Failure: Deviation of the component or system from its expected delivery, service, or result. Example: A user experiences the wrong behavior when using the feature.'
              ]
            },
            {
              heading: 'The Economics of Defect Discovery',
              paragraphs: [
                'Why find bugs early? Economics. IBM Systems Sciences Institute quantified the cost increase: finding a defect during design is 1x cost. During coding: 10x. During testing: 40x. In production: up to 1000x.',
                'This is not just about money - it is about relationships, trust, and reputation. A defect found by a tester costs developer time. The same defect found by a customer costs customer support, engineering, potentially lost business, and brand damage. The exponential cost curve makes early testing an investment, not an expense.'
              ],
              highlight: {
                text: 'The cost of fixing defects follows an exponential curve. Testing is not a cost center - it is a cost avoidance mechanism that yields returns throughout the project lifecycle.',
                type: 'tip'
              }
            },
            {
              heading: 'Testing Objectives',
              paragraphs: [
                'Testing has several objectives that guide the testing process. Understanding these objectives helps testers prioritize and focus their efforts appropriately:'
              ],
              bulletPoints: [
                'Find defects: The most obvious objective - discover bugs before users do',
                'Gain confidence: Comprehensive testing builds trust that the system will function correctly',
                'Provide information: Test results inform stakeholders about quality levels, risks, and readiness',
                'Prevent defects: Good test design can prevent defects by catching issues during requirements and design phases'
              ]
            },
            {
              heading: 'Testing and Quality',
              paragraphs: [
                'Testing contributes to quality improvement, but testing alone cannot ensure quality. Quality is achieved through proper processes, skilled personnel, and appropriate tools throughout the development lifecycle. Testing is one piece of a larger quality puzzle.',
                'Phil Crosby defined quality as "conformance to requirements" while Juran defined it as "fitness for use." Testing can verify both - does software meet specifications, and does it serve users needs? Yet testing cannot create quality. A beautifully tested system can still be of poor quality if requirements are wrong or architecture is flawed.'
              ],
              highlight: {
                text: 'Testing is one of many quality assurance activities, alongside reviews, static analysis, process improvement, training, and standards. Quality is built, not tested into software.',
                type: 'info'
              },
              interactiveExample: {
                type: 'dropdown',
                content: {
                  label: 'What happens when an error during coding leads to a defect in the code?',
                  options: [
                    { value: 'failure', label: 'A failure always occurs', explanation: 'Not always. A defect will only cause a failure if the defective code is executed. Dormant defects may never cause failures.' },
                    { value: 'none', label: 'Nothing happens', explanation: 'The defect exists and may cause failures when executed. It can lie dormant for years.' },
                    { value: 'maybe', label: 'The defect may cause a failure if executed', explanation: 'Correct! A defect must be executed to cause a failure. Many defects never cause failures because their code paths are never exercised.' }
                  ],
                  showExplanation: true
                }
              }
            }
          ],
          realWorldExample: {
            title: 'The Ariane 5 Disaster - A Defect Chain',
            scenario: 'June 4, 1996 - European Space Agency, French Guiana',
            story: [
              'At 370 seconds into flight, the Ariane 5 rocket self-destructed. 40 seconds of flight, $500 million lost. The cause? A software defect that traced back to a human error and lay dormant for years.',
              'THE ERROR: Engineers reused guidance software from Ariane 4 without fully validating it for Ariane 5. They assumed compatibility because the code had worked flawlessly for years.',
              'THE DEFECT: A horizontal velocity conversion routine in the reused code could overflow when converting 64-bit floating-point to 16-bit integer. Ariane 4 never reached velocities high enough to trigger this. Ariane 5 did.',
              'THE FAILURE: When overflow occurred, the guidance computer crashed. The backup computer took over but crashed too - running the same defective code. With both guidance systems down, the rocket veered off course. The onboard safety system correctly triggered self-destruction.',
              'Post-mortem analysis showed the defect always existed. It was never executed in Ariane 4. Testing with Ariane 5 velocity parameters would have caught it. The code was correct for one context, defective for another.'
            ],
            lessons: [
              'Reusing code without understanding its assumptions is inherently risky',
              'Defects can lie dormant for years until conditions change',
              'Context matters - what works in one environment may fail in another',
              'The chain: Human error (reuse without verification) -> Defect (overflow) -> Failure (rocket destruction)'
            ],
            simulation: [
              { type: 'info', text: 'You are a software engineer reviewing guidance computer code for Ariane 5. The code has worked perfectly on Ariane 4 for over 10 years and has been extensively tested. Managers are pushing to launch on schedule.' },
              { type: 'choice', text: 'Do you recommend testing for Ariane 5 velocity ranges?', choices: [
                { id: 'a', text: 'No - the code has a 10-year track record with no failures', correct: false, feedback: 'This is exactly what the real engineers decided. Ariane 5 had different velocity characteristics that caused overflow.' },
                { id: 'b', text: 'Yes, but only for ranges previously tested on Ariane 4', correct: false, feedback: 'Testing old ranges would not reveal new bugs. The defect was in the velocity value, not in previously tested ranges.' },
                { id: 'c', text: 'Yes, including maximum expected Ariane 5 horizontal velocity', correct: true, feedback: 'Correct! Testing with actual Ariane 5 velocities would have revealed the overflow. Context changed - testing needed to change too.' }
              ]},
              { type: 'result', text: 'The real engineers chose not to test because: 1) 10-year track record with zero failures, 2) Project schedule pressure, 3) Never considered that horizontal velocity could differ. The result: $500M loss, setback to European space program.' }
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Seven Testing Principles',
        type: 'theory',
        xpReward: 75,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 1.3 - Seven Testing Principles', type: 'book' },
          { title: 'The Art of Software Testing', description: 'Glenford Myers - Classic text on testing principles', type: 'book' },
          { title: 'Lessons Learned in Software Testing', description: 'Kaner, Bach, Pettichord - Practical wisdom from experienced testers', type: 'book' },
          { title: 'Software Testing Techniques', description: 'Boris Beizer - Foundational testing methodology', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'The Philosophy of Testing Principles',
              paragraphs: [
                'The seven testing principles are not arbitrary rules. They represent decades of hard-won wisdom from software failures, disasters, and lessons learned. Each principle encodes a philosophical truth about software, human nature, and the nature of testing itself.',
                'These principles emerged from research at organizations like NASA, the Department of Defense, and major software companies. They are grounded in evidence: studies of defect patterns, testing effectiveness, and project failures. Understanding the WHY behind each principle makes you a better tester than merely memorizing the WHAT.'
              ]
            },
            {
              heading: 'Principle 1: Testing Shows Presence, Not Absence',
              highlight: {
                text: 'Testing can show that defects are present, but can never prove that defects are absent. Testing reduces the probability of undiscovered defects but cannot guarantee perfection.',
                type: 'tip'
              },
              paragraphs: [
                'This is the most fundamental epistemological truth about testing. Consider: if you run 100 tests and find zero bugs, what do you know? You know that those 100 test scenarios did not reveal defects. What do you not know? Whether defect 101 exists.',
                'This principle has deep roots in epistemology and philosophy of science. Karl Popper introduced "falsifiability" - scientific theories cannot be proven true, only proven false. Similarly, software cannot be proven bug-free through testing, only proven buggy. The best you can say is "no defects were found under test conditions."',
                'Historical example: The Patriot missile failure in 1991 (28 soldiers killed) occurred despite extensive testing. A floating-point precision bug existed but was never exposed because tests did not run long enough. Testing showed the system worked - it did not show the hidden bug.'
              ]
            },
            {
              heading: 'Principle 2: Exhaustive Testing is Impossible',
              highlight: {
                text: 'Testing all possible combinations of inputs, preconditions, and outputs is not feasible except in trivial cases. We must make strategic choices about what to test.',
                type: 'warning'
              },
              paragraphs: [
                'The mathematics make this clear. Consider a function with just 3 inputs, each accepting 10 values. Total combinations: 10^3 = 1,000. Now consider a real program: dozens of inputs, infinite possible values (strings, decimals), unlimited sequences of operations. The numbers become astronomical.',
                'More profoundly, input combinations are compounded by system states, timing variations, and environmental factors. A simple program might have effectively infinite testable states. Testing everything becomes computationally equivalent to running every possible program - clearly infeasible.',
                'This reality forces us to prioritize. Not all tests have equal value. Risk analysis, equivalence partitioning, and prioritization techniques exist because we cannot test everything. The art of testing is the art of choosing wisely what NOT to test.'
              ]
            },
            {
              heading: 'Principle 3: Early Testing Saves Time and Money',
              highlight: {
                text: 'Finding and fixing defects earlier in the development lifecycle dramatically reduces cost. A defect found during requirements costs pennies to fix; the same defect in production costs thousands.',
                type: 'tip'
              },
              paragraphs: [
                'The cost escalation curve has been documented since the 1970s. IBM Systems Sciences Institute found that defects found in design cost 1x, in coding 5x, in unit testing 10x, in system testing 15x, in acceptance testing 40x, and post-release up to 1000x.',
                'Philosophically, this principle challenges the "we will fix it later" mentality. Paying a small cost now (early testing, reviews, quality design) prevents catastrophic costs later. It is the engineering equivalent of preventive medicine - treating early is cheaper than treating late.',
                'Early testing also has psychological benefits. Fixing a defect early is less stressful for developers. Late-stage bug fixes create pressure, shortcuts, and often new bugs. The culture of early quality reduces technical debt accumulation.'
              ]
            },
            {
              heading: 'Principle 4: Defects Cluster Together',
              highlight: {
                text: 'A small number of modules typically contain most defects discovered during testing. This Pareto principle (80/20 rule) helps focus testing efforts where they matter most.',
                type: 'definition'
              },
              paragraphs: [
                'Named after Italian economist Vilfredo Pareto, who observed that 80% of effects come from 20% of causes. In software: 80% of defects cluster in 20% of modules. Studies from Microsoft, IBM, and academic research consistently confirm this pattern.',
                'Why? Complex modules are harder to write correctly. Frequently changed modules accumulate bugs. Integration points (APIs, interfaces) are mistake-prone. Error-prone developers tend to make more errors. The causes cluster, so the effects cluster.',
                'This principle justifies risk-based testing. By identifying high-risk areas (complex, changed, integration-heavy modules), testers apply more effort where defects are likely. This is not about neglecting low-risk areas - it is about proportional testing to proportional risk.'
              ]
            },
            {
              heading: 'Principle 5: Beware the Pesticide Paradox',
              highlight: {
                text: 'Repeating the same tests eventually stops finding new defects. Tests must evolve, or they become ineffective at discovering new types of bugs.',
                type: 'warning'
              },
              paragraphs: [
                'The metaphor is powerful: pesticides kill insects, but overuse leads to resistant populations. Tests find bugs, but over-reliance on the same tests leads to bugs that hide in untested areas. The bugs evolve - so must the tests.',
                'This principle has profound implications for test maintenance. Regression test suites must be reviewed, updated, and expanded. Old tests find old bugs. New bugs require new tests. Automation without evolution creates a false sense of security.',
                'Consider: a test suite that passes 100% might mean either "software is perfect" or "tests are outdated." Test results are only meaningful if tests remain relevant to current risks. The pesticide paradox reminds us to question and evolve our test suites constantly.'
              ]
            },
            {
              heading: 'Principle 6: Testing is Context Dependent',
              highlight: {
                text: 'Testing done differently in different contexts. Safety-critical systems require more rigor than marketing websites. Context determines acceptable risk levels.',
                type: 'info'
              },
              paragraphs: [
                'A medical device that controls radiation dosage cannot have the same testing approach as a social media app. One bug in the medical device might kill a patient. One bug in the app might mildly annoy users. Risk tolerance fundamentally drives testing intensity.',
                'Context includes: system criticality (lives at stake?), business impact (financial losses?), user expectations (enterprise users vs. casual), regulatory requirements (FDA, SOX, GDPR), and available resources. Testing a NASA mission differs from testing a prototype MVP.',
                'This principle guards against both over-testing and under-testing. Over-testing wastes resources on low-risk systems. Under-testing invites disaster on high-risk systems. The mature tester matches testing intensity to contextual risk.'
              ]
            },
            {
              heading: 'Principle 7: Absence-of-Errors is a Fallacy',
              highlight: {
                text: 'Finding and fixing defects does not help if the system is unusable or does not meet user needs. It is possible to build the wrong system perfectly.',
                type: 'definition'
              },
              paragraphs: [
                'This principle addresses a subtle failure mode: a "defect-free" system that solves the wrong problem. Testing can confirm specifications are met - but what if specifications are wrong? What if user needs were never captured?',
                'Consider the famous example of the F-22 Raptor cockpit. Software worked perfectly per specification. But pilots could not reach the ejection handle in emergency. The specification was met - but the outcome was dangerous. Testing verified requirements, not usability.',
                'This principle demands that testers think beyond verification. Validation (building the right thing) is as important as verification (building the thing right). Testers must ask "does this meet user needs?" not just "does this meet specifications?"'
              ]
            }
          ],
          realWorldExample: {
            title: 'Therac-25 - Where Principles Collide',
            scenario: '1985-1987 - Atomic Energy of Canada Limited Medical Device',
            story: [
              'The Therac-25 radiation therapy machine killed and injured patients due to software defects. Analyzing this disaster through testing principles reveals why multiple safeguards failed simultaneously.',
              'The race condition: Operators who moved through screens quickly (under 8 seconds) triggered a data corruption bug. The software would then display "ready" while actually being in an incorrect mode, delivering massive radiation overdoses.',
              'PRINCIPLE 2 (Exhaustive testing impossible): They never tested the fast operator scenario. Normal speed testing passed. Racing through screens seemed absurd - no one considered it. The untested combination carried lethal risk.',
              'PRINCIPLE 5 (Pesticide paradox): The same tests passed repeatedly, giving false confidence. No new tests were added for the new software-behavioral prompts. Old tests found no bugs because bugs were in unexpected places.',
              'PRINCIPLE 7 (Absence-of-errors fallacy): The software met all specifications. It displayed what it was supposed to display. But what it displayed conflicted with actual mode, and no one specified that display and mode must self-consistently match.',
              'PRINCIPLE 1 (Presence not absence): Extensive testing did not prove the system safe. Six accidents occurred before the problem was understood. Testing could show defects were present - but only if tests covered the risk scenarios.'
            ],
            lessons: [
              'Principle 2: High-risk edge cases must be identified and tested, even if unlikely',
              'Principle 5: Test suites must evolve, especially after changes',
              'Principle 7: Meeting specifications does not guarantee safety or correctness',
              'Principle 1: Testing is only as good as its test cases - untested scenarios remain risky'
            ],
            simulation: [
              { type: 'info', text: 'A new radiation therapy machine is being tested. The software has passed 500 tests with no failures. Engineers are confident. The product is ready for market. You have the last chance to raise concerns.' },
              { type: 'choice', text: 'Which testing principle should concern you most?', choices: [
                { id: 'a', text: 'Exhaustive testing is impossible - there are untested scenarios', correct: true, feedback: 'Correct! 500 passed tests do not cover all scenarios. What about timing variations, unusual inputs?' },
                { id: 'b', text: 'Defects cluster together - the bugs are together somewhere', correct: false, feedback: 'While clustering is real, this principle focuses effort. It doesnt address untested scenarios.' },
                { id: 'c', text: 'Early testing saves money - we tested early enough', correct: false, feedback: 'Early testing is good, but irrelevant to whether current testing is sufficient.' }
              ]},
              { type: 'choice', text: 'What additional testing would you recommend?', choices: [
                { id: 'a', text: 'More of the same tests to increase confidence', correct: false, feedback: 'This is pesticide paradox thinking. Same tests wont reveal new bugs.' },
                { id: 'b', text: 'Stress testing, edge cases, and unlikely operator behaviors', correct: true, feedback: 'Correct! Testing the unexpected - exactly what was not tested - reveals hidden bugs.' },
                { id: 'c', text: 'No additional testing needed - 500 tests is sufficient', correct: false, feedback: 'This assumption has led to disasters. Test count does not equal test coverage.' }
              ]}
            ]
          }
        }
      },
      {
        id: 3,
        title: 'The Fundamental Test Process',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 1.4 - Test Process', type: 'book' },
          { title: 'IEEE 829 Test Documentation Standard', description: 'Industry standard for test documentation', type: 'article' },
          { title: 'Test Process Improvement Reference', description: 'TPI Next framework for maturity', type: 'article' },
          { title: 'Software Test Process Improvement', description: 'Tim Koomen and Martin Pol - TPI methodology', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Testing as a Disciplined Process',
              paragraphs: [
                'Testing is not random button-pushing or ad-hoc checking. It is a structured, repeatable process with defined activities, deliverables, and goals. Treating testing as a craft rather than chaos separates professional testing from amateur poking.',
                'The fundamental test process consists of five primary activities that may overlap or iterate: planning, analysis and design, implementation and execution, exit criteria evaluation, and closure. Each activity has specific purposes and deliverables.'
              ]
            },
            {
              heading: 'Test Planning',
              highlight: {
                text: 'Test planning defines scope, approach, resources, and schedule. It transforms vague intentions into concrete actions. A good test plan answers: what, how, who, when, and why.',
                type: 'definition'
              },
              paragraphs: [
                'Planning happens throughout the project, not just at the beginning. Initial planning sets direction. Ongoing planning adjusts to reality. The test plan is a living document that evolves with the project.',
                'Planning addresses: scope (what is and is not tested), approach (techniques, types, levels), resources (people, tools, environments), schedule (milestones, dependencies), and risks (what might go wrong).',
                'The test plan is not bureaucratic paperwork. It is a communication tool that aligns stakeholders and prevents misunderstandings. Projects fail when expectations are misaligned - the test plan documents expectations explicitly.'
              ]
            },
            {
              heading: 'Test Analysis and Design',
              highlight: {
                text: 'Test analysis transforms requirements and designs into concrete test cases. Design is where brainpower converts to test coverage - identifying WHAT to test and HOW to test it.',
                type: 'definition'
              },
              paragraphs: [
                'Analysis extracts test conditions from requirements. Design converts conditions into test cases with inputs, expected outcomes, and execution steps. This is where test design techniques (equivalence partitioning, boundary values) are applied.',
                'Design activities: identify test conditions, create test cases, design test data, plan test environment needs, and create test procedures. Good design creates tests that are traceable, repeatable, and maintainable.',
                'The outputs of analysis and design feed into implementation. Test cases are documented, prioritized, and sequenced. This work is intellectual - applying techniques and expertise, not clerical.'
              ]
            },
            {
              heading: 'Test Implementation and Execution',
              highlight: {
                text: 'Execution is where plans meet reality. Tests are run, results are compared to expectations, and discrepancies become defect reports. This is the visible testing activity.',
                type: 'definition'
              },
              paragraphs: [
                'Implementation prepares for execution: setting up environments, creating test data, organizing test suites. Execution runs tests according to procedures, logs results (pass/fail), and reports defects.',
                'Execution is not mindless script-following. Testers observe, question, and explore. A test script is a guide - a skilled tester notices anomalies beyond the script. Exploratory behavior complements scripted testing.',
                'Defects found during execution are documented with enough detail for reproduction. The defect report becomes a communication vehicle between tester and developer. Quality defect reports speed fixes; poor reports waste time.'
              ]
            },
            {
              heading: 'Exit Criteria Evaluation',
              highlight: {
                text: 'Exit criteria define when testing is sufficient. They are not arbitrary hurdles but reasoned goals that balance thoroughness with practicality. Without exit criteria, testing never ends.',
                type: 'definition'
              },
              paragraphs: [
                'Exit criteria might include: test coverage achieved (80% of planned tests executed), defect rates acceptable (no severity 1 bugs open for 48 hours), stability demonstrated (no crashes in 100 test hours), or stakeholders satisfied.',
                'These criteria should be defined during planning, not invented at project end. Pre-agreed criteria remove ambiguity. When someone asks "can we ship?", the answer is "exit criteria are met" or "exit criteria are not met."',
                'Exit criteria can be adjusted if justified. But changing criteria requires stakeholder agreement and documentation. Ad-hoc changes erode the value of having criteria at all.'
              ]
            },
            {
              heading: 'Test Closure Activities',
              highlight: {
                text: 'Closure captures lessons learned, archives artifacts, and closes the loop. Skipping closure wastes an opportunity for improvement and loses institutional knowledge.',
                type: 'definition'
              },
              paragraphs: [
                'Closure activities include: archiving test artifacts (plans, cases, results, defect reports), documenting lessons learned (what worked, what did not), closing defect reports, and preparing test summary reports.',
                'The test summary report is a key deliverable. It summarizes what was tested, what was found, quality levels achieved, and residual risks. This report informs release decisions.',
                'Lessons learned are particularly valuable. Without capturing them, the same mistakes repeat project after project. Organizations that systematically capture lessons improve over time. Those that do not stagnate.'
              ]
            }
          ],
          realWorldExample: {
            title: 'How Microsoft Ships Windows',
            scenario: 'Major Release Testing at Scale',
            story: [
              'Microsoft Windows involves 50+ million lines of code. Testing such a product requires industrial-strength process. Let us examine how each test process phase applies.',
              'PLANNING: Begins years before release. A release test plan defines scope (which features to test, which to defer), resources (500+ dedicated testers, partner teams), schedule (milestones tied to development), and approach (70% automated, 30% exploratory).',
              'ANALYSIS AND DESIGN: Test architects design test plans for each feature area. Millions of test cases are created, but not all are equally prioritized. Each test case has traceability to requirements.',
              'IMPLEMENTATION AND EXECUTION: Automated tests run 24/7. Over 200,000 unit tests execute per check-in. Integration tests run nightly. Manual exploratory testing happens continuously. Beta programs reach millions of real users.',
              'EXIT CRITERIA: Specific, measurable: No severity 1/2 bugs open. 99.5% automated test pass rate. Beta crash rate below threshold. Partner app compatibility verified. Criteria are documented and tracked.',
              'CLOSURE: Test summary reports document everything. Lessons learned feed into next release. Bug patterns inform process improvements. Test automation is archived for regression use.'
            ],
            lessons: [
              'Planning at scale requires months, not days',
              'Test design must parallel development',
              'Automation enables volume impossible manually',
              'Exit criteria must be specific and measurable',
              'Closure activities feed continuous improvement'
            ],
            simulation: [
              { type: 'info', text: 'You are the test lead for a banking mobile app. Deadline is in 8 weeks. Your team has 4 testers and limited test devices. Development is ongoing.' },
              { type: 'choice', text: 'Which test process activity should you START with?', choices: [
                { id: 'a', text: 'Start executing tests immediately to find bugs fast', correct: false, feedback: 'Without planning, you will test randomly and miss critical areas. Faster testing is not better testing if unfocused.' },
                { id: 'b', text: 'Create a test plan defining scope, approach, and resources', correct: true, feedback: 'Correct! Planning first ensures focused, efficient testing. Know where you are going before you start walking.' },
                { id: 'c', text: 'Design test cases for all features comprehensively', correct: false, feedback: 'You need scope and risk priorities before designing. Without planning, test design lacks direction.' }
              ]},
              { type: 'choice', text: 'A critical bug is found 3 days before release. Exit criteria state no severity 1 bugs. What do you do?', choices: [
                { id: 'a', text: 'Delay release until fixed and re-tested', correct: true, feedback: 'Correct! Exit criteria exist for a reason. Critical defects in banking apps cannot ship to users.' },
                { id: 'b', text: 'Release anyway and fix in a patch later', correct: false, feedback: 'This bypasses exit criteria without proper stakeholder agreement. Critical banking bugs risk financial harm.' },
                { id: 'c', text: 'Escalate to management and let them decide', correct: false, feedback: 'While escalation is appropriate, you need to recommend based on test process principles.' }
              ]}
            ]
          }
        }
      },
      {
        id: 4,
        title: 'The Psychology of Testing',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 1.5 - Psychology of Testing', type: 'book' },
          { title: 'Bugs and Stories: How Defect Reports Shape Perception', description: 'Research on constructive bug reporting', type: 'article' },
          { title: 'Thinking, Fast and Slow', description: 'Daniel Kahneman - Cognitive biases in testing', type: 'book' },
          { title: 'Debugging the Development Process', description: 'Steve Maguire - Team dynamics and testing', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'The Human Side of Testing',
              paragraphs: [
                'Testing is performed by humans. Humans have biases, emotions, and cognitive limitations. Understanding the psychology of testing is not "soft skills" padding - it is essential knowledge for effective testing.',
                'The relationship between testers and developers can be adversarial or cooperative. The same testing work can build quality or destroy morale, depending on how it is communicated. The psychology determines whether testing helps or hinders.'
              ]
            },
            {
              heading: 'The Tester Mindset',
              paragraphs: [
                'Testing requires a fundamentally different mindset from development. Developers create solutions. Testers find problems. Developers think "how can I make this work?" Testers think "how might this break?"'
              ],
              bulletPoints: [
                'Skepticism: Question assumptions, challenge correctness claims. Not cynicism, but healthy doubt.',
                'Curiosity: Wonder "what if?" and "what happens when?" Explore, not just follow paths.',
                'Precision: Notice details. A small variance might indicate a large problem.',
                'Destruction (constructive): Try to break things to find weaknesses before attackers do.',
                'Service mindset: Testing exists to help stakeholders make informed decisions, not to block releases.'
              ]
            },
            {
              heading: 'Cognitive Biases in Testing',
              highlight: {
                text: 'Cognitive biases affect testers and developers alike. Understanding these biases helps us compensate for them.',
                type: 'warning'
              },
              paragraphs: [
                'Confirmation bias: Testers and developers tend to seek information confirming their beliefs. Developers test happy paths. Testers may focus on favorite bug-hunting techniques, missing others.',
                'The key insight: we do not know what we do not see. Independent review, different perspectives, and structured techniques help overcome cognitive limitations.'
              ],
              bulletPoints: [
                'Confirmation bias: Favor information that confirms existing beliefs (testers may test around bugs they expect)',
                'Anchoring: Over-rely on first information (initial bug impressions shape subsequent testing)',
                'Availability bias: Focus on recent or memorable cases (last months bug leads to similar testing)',
                'Groupthink: Conform to team consensus without critical evaluation'
              ]
            },
            {
              heading: 'Developer Confirmation Bias',
              highlight: {
                text: 'Developers test to confirm their code works. Testers test to find where it does not. This fundamental difference explains why developers often miss their own bugs.',
                type: 'warning'
              },
              paragraphs: [
                'Code complete? The developer thinks "let me verify this works." Tests are written to pass, not fail. Edge cases are missed because the developer knows the code should handle them.',
                'This is not incompetence. It is human nature. We seek confirmation of our beliefs. Developers believe their code works. Their testing reflects this belief.',
                'Independence matters: A second set of eyes, without emotional attachment to the code, finds bugs the author cannot see. This principle justifies independent testing - not because testers are smarter, but because they are different.'
              ]
            },
            {
              heading: 'Building Constructive Relationships',
              highlight: {
                text: 'The goal is better software, not blame. Finding bugs is success, not finding fault. Bugs are opportunities to improve, not personal failings.',
                type: 'tip'
              },
              paragraphs: [
                'How a bug is reported affects the response it receives. Accusatory reports ("you broke this") create defensiveness. Objective reports ("this behavior differs from expected") enable problem-solving.'
              ],
              bulletPoints: [
                'Describe behavior, not blame: "The system returns null" not "you forgot null handling"',
                'Provide reproduction steps: A report that cannot be reproduced wastes developer time',
                'Be specific: Vague reports like "it does not work" frustrate everyone',
                'Acknowledge context: Developers may have reasons for choices; understand before judging',
                'Celebrate fixes: When bugs are fixed, acknowledge the work - builds goodwill'
              ]
            },
            {
              heading: 'The Value of Independent Testing',
              paragraphs: [
                'Independent testing teams bring fresh perspectives. This is not about skill difference - it is about structural difference. An independent tester has no stake in the code being correct and no emotional attachment to it.',
                'Levels of independence: developers testing their own code (lowest) -> developers testing each others code -> independent test team within organization -> external test organization (highest). Higher independence brings more objectivity but may also bring less domain knowledge.'
              ],
              highlight: {
                text: 'Independence is not superior judgment. It is freedom from the assumptions that blind authors. An independent tester sees what the developer cannot because they approach without preconceptions.',
                type: 'info'
              }
            }
          ],
          realWorldExample: {
            title: 'How One Tester Saved Black Friday',
            scenario: 'E-commerce Checkout System, November 2023',
            story: [
              'A major retailer prepared for Black Friday. The development team had implemented a "minor" update to payment processing two weeks before. All automated tests passed. The team was confident.',
              'Sarah, a QA tester, was performing exploratory testing on the checkout flow. Following test scripts, everything worked. But Sarahs curiosity led her to wonder: "What if someone clicks Pay multiple times quickly?"',
              'She tried clicking Pay three times rapidly. The system processed three charges. The same card. The same cart. Three identical $150 charges. A race condition bug - the payment-processing button was not disabled during processing.',
              'Sarah reported the bug with clear steps: "1. Add items to cart 2. Click Pay button 3 times rapidly 4. Observe multiple charges. Expected: One charge. Actual: Multiple charges."',
              'The bug report was objective, not accusatory. No "developer made a mistake." Just clear steps and expected vs. actual. The developer fixed it by end of day by disabling the button during payment processing.',
              'Black Friday: 2 million successful transactions. Zero multiple-charge complaints. $85 million in sales. Sarahs curiosity - and her constructive communication - prevented a potential nightmare of refunds, chargebacks, and reputation damage.'
            ],
            lessons: [
              'Exploratory testing finds what scripts miss - curiosity is a testing skill',
              'Constructive bug reports get fixed faster than accusatory ones',
              'Tester mindset questioned "what if user does something unexpected"',
              'The fix was simple - finding the bug was the hard part'
            ]
          }
        }
      },
      {
        id: 5,
        title: 'Quiz: Testing Fundamentals',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Which testing principle is rooted in Karl Popper\'s concept of falsifiability?',
              options: [
                'Exhaustive testing is impossible',
                'Testing shows the presence of defects, not their absence',
                'Defects cluster together',
                'Testing is context dependent'
              ],
              correctAnswer: 'Testing shows the presence of defects, not their absence',
              explanation: 'Poppers falsifiability principle states that scientific theories cannot be proven true, only proven false. Similarly, testing cannot prove software is bug-free, only that bugs exist.',
              hint: 'Think about what testing can prove vs. what it cannot prove.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'Why do developers have difficulty finding their own defects?',
              options: [
                'They lack testing skills',
                'Confirmation bias leads them to test confirming scenarios',
                'Defects are hidden from authors',
                'They do not care about quality'
              ],
              correctAnswer: 'Confirmation bias leads them to test confirming scenarios',
              explanation: 'Developers naturally test to confirm their code works. This confirmation bias leads to testing happy paths and expected scenarios, missing edge cases and unexpected inputs.',
              hint: 'Think about the psychological approach developers take when testing.'
            },
            {
              id: 3,
              type: 'dropdown',
              question: 'The principle stating that 80% of defects are found in 20% of modules is called:',
              dropdownOptions: [
                { id: 'pareto', label: 'Defect clustering' },
                { id: 'exhaustive', label: 'Exhaustive testing paradox' },
                { id: 'pesticide', label: 'Pesticide paradox' }
              ],
              correctAnswer: 'Defect clustering',
              explanation: 'Defect clustering, based on the Pareto principle, observes that a small number of modules contain most defects. This helps focus testing effort where it matters most.'
            },
            {
              id: 4,
              type: 'text-input',
              question: 'What principle states that repeating the same tests eventually stops finding new defects?',
              correctAnswer: 'pesticide paradox',
              explanation: 'The pesticide paradox: like insects becoming resistant to the same pesticide, software defects "resist" the same test patterns. Tests must evolve.',
              hint: 'Think about what happens to insects with repeated pesticide use.'
            },
            {
              id: 5,
              type: 'multi-select',
              question: 'Which are fundamental test process activities? (Select all that apply)',
              options: [
                'Test Planning',
                'Test Marketing',
                'Test Analysis and Design',
                'Test Implementation and Execution',
                'Test Sales'
              ],
              correctAnswer: ['Test Planning', 'Test Analysis and Design', 'Test Implementation and Execution'],
              explanation: 'The fundamental test process includes: planning, analysis/design, implementation/execution, exit criteria evaluation, and closure activities.'
            },
            {
              id: 6,
              type: 'multiple-choice',
              question: 'What is the primary purpose of test closure activities?',
              options: [
                'Generate metrics for management',
                'Archive test artifacts and document lessons learned',
                'Assign blame for defects',
                'Prepare for the next release cycle'
              ],
              correctAnswer: 'Archive test artifacts and document lessons learned',
              explanation: 'Closure activities capture institutional knowledge, archive artifacts for reference, and document lessons learned to enable continuous improvement.',
              hint: 'Think about what happens after testing is complete.'
            },
            {
              id: 7,
              type: 'dropdown',
              question: 'According to research, finding a defect in production costs how much more than finding it during requirements?',
              dropdownOptions: [
                { id: 'ten', label: '10x more' },
                { id: 'hundred', label: '100x more' },
                { id: 'thousand', label: 'Up to 1000x more' }
              ],
              correctAnswer: 'Up to 1000x more',
              explanation: 'IBM Systems Sciences Institute found that defects cost exponentially more to fix as they progress through the lifecycle, with production fixes up to 1000x more costly.',
              hint: 'The cost curve is exponential, not linear.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Testing Throughout the Lifecycle',
    description: 'Understand how testing fits into different development models and the various test levels.',
    icon: 'Layers',
    lessons: [
      {
        id: 1,
        title: 'Software Development Models',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 2.1 - Testing in SDLC', type: 'book' },
          { title: 'Agile Testing', description: 'Lisa Crispin and Janet Gregory - Comprehensive agile testing guide', type: 'book' },
          { title: 'The Waterfall Model', description: 'Winston Royce\'s original 1970 paper', type: 'article' },
          { title: 'Scrum Guide', description: 'Official Scrum methodology reference', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Testing Across Development Models',
              paragraphs: [
                'Software is developed through various lifecycle models: waterfall, V-model, iterative, incremental, agile. Each model brings different testing implications. Understanding these implications helps testers adapt to their context.',
                'Testing is not a phase to be inserted at the end. It is an activity that runs throughout development, with timing, intensity, and approach shaped by the development model being used.'
              ]
            },
            {
              heading: 'The V-Model',
              paragraphs: [
                'The V-model (developed by Rainer Faltin in the 1980s) visualizes development and testing as mirror images. Each development phase on the left has a corresponding test phase on the right. The V-shape emphasizes that testing activities parallel development.'
              ],
              bulletPoints: [
                'Requirements <-> Acceptance Testing',
                'System Design <-> System Testing',
                'Detailed Design <-> Integration Testing',
                'Coding <-> Component (Unit) Testing'
              ],
              highlight: {
                text: 'The V-model insight: test preparation begins when development activities begin, not when they end. Requirements analysis includes acceptance test design. Architecture design includes system test design.',
                type: 'definition'
              }
            },
            {
              heading: 'Iterative and Agile Models',
              paragraphs: [
                'Iterative models (RUP, spiral) and Agile frameworks (Scrum, Kanban) break development into cycles or sprints. Each cycle delivers potentially shippable software. Testing is continuous, not phase-gated.'
              ],
              bulletPoints: [
                'Testing happens in every iteration, not after development phases',
                'Regression testing becomes critical between iterations',
                'Test automation is essential for sustainable velocity',
                'Testers are team members, not separate phase participants',
                'Definition of Done includes tested to standard'
              ],
              highlight: {
                text: 'In Agile, testing is not "done after coding." Testing happens during the sprint, with test cases written alongside code. The whole team owns quality, not just testers.',
                type: 'tip'
              }
            },
            {
              heading: 'Implications for Testing',
              paragraphs: [
                'The development model shapes test timing, but not test fundamentals. Regardless of model, good testing includes planning, design, execution, and reporting. The model determines when these activities happen, not whether they happen.'
              ],
              bulletPoints: [
                'Waterfall: Testing is a distinct phase after development. All testing happens at once.',
                'V-Model: Testing parallels development. Each phase has a test counterpart.',
                'Agile: Testing is continuous. Every sprint includes testing activities.'
              ]
            }
          ],
          realWorldExample: {
            title: 'Spotify\'s Squad Model',
            scenario: 'How Spotify Integrated Testing with Development',
            story: [
              'Spotify pioneered a "squad" model for large-scale agile development. Each squad is a cross-functional team (8-12 people) including developers, designers, a product owner, and crucially, an embedded tester or "quality advocate."',
              'Testing before squads: Done by a separate QA team after development. Result: bottlenecks, late bug discovery, adversarial tester-developer relationship, release delays.',
              'Testing after squads: Embedded in each team. Testers participate in planning, design reviews, and standups. Testing happens during the sprint, not after. Automation is primary; exploratory testing adds human insight.',
              'Results: Deploy frequency increased from once per week to hundreds of deploys per day. Bug escape rate dropped 70%. Developer-tester relationship became collaborative.',
              'Key insight: The organizational change (embedding testers) was more impactful than any tool or technique. Testing became a team responsibility, not a separate department.'
            ],
            lessons: [
              'Embedding testers in teams removes handoff barriers',
              'Continuous testing beats phase-based testing',
              'Testers contribute more than testing - they improve team quality practices',
              'Automation enables volume and speed impossible manually'
            ],
            simulation: [
              { type: 'info', text: 'Your organization is transitioning from waterfall to agile two-week sprints. Previously you had a dedicated 4-week testing phase after development.' },
              { type: 'choice', text: 'How should testing timing change?', choices: [
                { id: 'a', text: 'Keep the 4-week testing phase after every sprint', correct: false, feedback: 'This creates a 6-week cycle (2-week development + 4-week testing), defeating the purpose of agile.' },
                { id: 'b', text: 'Distribute testing throughout each sprint', correct: true, feedback: 'Correct! Continuous testing within sprints enables fast feedback and prevents bottlenecks.' },
                { id: 'c', text: 'Reduce testing since development is now agile', correct: false, feedback: 'Agile does not reduce testing needs. It changes when testing happens.' }
              ]}
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Component (Unit) Testing',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 2.2.1 - Component Testing', type: 'book' },
          { title: 'Unit Testing Principles', description: 'Vladimir Khorikov - Best practices for unit tests', type: 'book' },
          { title: 'Test Driven Development', description: 'Kent Beck - The TDD approach', type: 'book' },
          { title: 'Working Effectively with Legacy Code', description: 'Michael Feathers - Unit testing legacy systems', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Understanding Component Testing',
              paragraphs: [
                'Component testing (also called unit testing) verifies individual software components in isolation. A component is the smallest testable unit - typically a function, method, or class. Component testing is the foundation of the test pyramid.'
              ]
            },
            {
              heading: 'Who Performs Component Testing?',
              paragraphs: [
                'Component testing is typically performed by developers, not independent testers. This makes sense: developers have the deepest understanding of the code, and component testing requires code-level knowledge. Test-driven development (TDD) integrates component testing into the coding process itself.'
              ],
              highlight: {
                text: 'Component testing by developers is not "testing done." It is testing at the lowest level. Higher-level testing (integration, system) remains essential. Component testing is necessary but not sufficient.',
                type: 'definition'
              }
            },
            {
              heading: 'Test Stubs and Drivers',
              paragraphs: [
                'When components depend on other components that aren\'t available, test doubles simulate them. Stubs and drivers are the two main types:'
              ],
              bulletPoints: [
                'Driver: Simulates a calling component. It calls the component under test, passing inputs. Like a mock "boss" that invokes the worker.',
                'Stub: Simulates a called component. It replaces a dependency that the component under test calls. Like a mock "worker" that responds to the boss.',
                'Mock: A type of stub that also verifies that calls were made correctly. Used in mock frameworks like Mockito, Moq, and Jest mocks.',
                'Fake: A working implementation that is simpler than the real thing. Like an in-memory database instead of a real SQL server.'
              ]
            },
            {
              heading: 'Component Testing Best Practices',
              bulletPoints: [
                'Test behavior, not implementation: Tests should check what the code does, not how it does it',
                'Keep tests independent: One test should not depend on another. Tests can run in any order.',
                'Test should be fast: Slow unit tests discourage running them frequently',
                'One assertion concept: Each test should verify one specific behavior',
                'Name tests descriptively: testWithdrawFailsWhenBalanceInsufficient is better than testWithdraw2'
              ]
            },
            {
              heading: 'Test Driven Development (TDD)',
              highlight: {
                text: 'TDD: Write a failing test, write minimal code to pass, refactor. This cycle (Red-Green-Refactor) integrates testing into development, not as an afterthought.',
                type: 'tip'
              },
              paragraphs: [
                'TDD is not a testing technique - it is a development technique that uses testing. By writing tests first, developers think about requirements and interfaces before implementation. Tests become executable specifications.',
                'Research on TDD shows mixed results on defect reduction, but consistent results on developer confidence. Code written with TDD tends to be more modular and better designed because testability is a requirement from the start.'
              ]
            }
          ],
          realWorldExample: {
            title: 'Knight Capital - The $440M Unit Test Gap',
            scenario: 'August 1, 2013 - Algorithmic Trading Disaster',
            story: [
              'Knight Capital, a major market maker, lost $440 million in 45 minutes. A software deployment error activated dormant code that should have been removed. That code used a deprecated flag - an "unused" path that had no unit tests.',
              'The component-level issue: A trading flag called "Power Peg" was supposed to be disabled. But a deployment script copied old settings that activated it. No unit test existed to check "what happens when Power Peg flag is set to old value?"',
              'The execution: Power Peg code bought high and sold low at extreme speed - exactly backwards. $10 million lost per minute. The algorithm was designed for an old purpose, but no one knew it could still activate.',
              'The testing gap: Statement coverage for the module was high. But the "Power Peg" conditional branch had been "dead code" - or so they thought. Branch coverage would have revealed the untested branch.',
              'One unit test - a single unit test - checking the behavior when flags were set incorrectly would have cost 10 minutes to write. It would have saved $440 million, Knight Capital\'s reputation, and 1,400 jobs.'
            ],
            lessons: [
              'Dead code is not tested code. Every branch needs testing, even "unused" ones.',
              'Configuration flags change behavior. Test what happens with unexpected configurations.',
              'Branch coverage matters more than statement coverage for critical systems.',
              'The cost of one missing unit test can exceed the companys annual revenue.'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Integration Testing',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 2.2.2 - Integration Testing', type: 'book' },
          { title: 'Continuous Integration', description: 'Paul Duvall - CI/CD integration testing practices', type: 'book' },
          { title: 'Microservices Patterns', description: 'Chris Richardson - Testing distributed systems', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Understanding Integration Testing',
              paragraphs: [
                'Integration testing verifies that components or systems work together correctly. While unit testing checks individual pieces work in isolation, integration testing checks the pieces fit together. The vast majority of bugs occur at integration points.'
              ]
            },
            {
              heading: 'Why Integration Testing Matters',
              paragraphs: [
                'Components pass unit tests individually but fail together for many reasons: interface mismatches, timing issues, data format differences, protocol misunderstandings, error handling inconsistencies, and resource conflicts.'
              ],
              highlight: {
                text: 'Integration bugs are the most common class of defects because components are typically developed by different people or teams, each with slightly different assumptions about interfaces.',
                type: 'warning'
              }
            },
            {
              heading: 'Integration Strategies',
              paragraphs: [
                'How do you integrate and test components? Several strategies exist:'
              ],
              bulletPoints: [
                'Big Bang: Integrate everything at once and test. Simple but makes it impossible to isolate problems to specific interfaces.',
                'Top-Down: Integrate from the top of the call hierarchy downward. Uses stubs to simulate lower components. Good for validating main flow early.',
                'Bottom-Up: Integrate from the bottom of the call hierarchy upward. Uses drivers to call components. Good for validating foundations.',
                'Sandwich (Hybrid): Combine top-down and bottom-up. Both stubs and drivers. Parallelizes work but requires more test doubles.'
              ]
            },
            {
              heading: 'What Integration Testing Verifies',
              bulletPoints: [
                'Interface contracts: Does component A call component B with correct parameters?',
                'Data flow: Does data pass correctly across boundaries?',
                'Error handling: Are errors propagated and handled consistently?',
                'Performance: Do integrated components meet timing requirements?',
                'Resource sharing: Do components coordinate resources properly (database connections, file locks)?'
              ]
            }
          ],
          realWorldExample: {
            title: 'Mars Climate Orbiter - The Interface Disaster',
            scenario: 'September 23, 1999 - NASA Jet Propulsion Laboratory',
            story: [
              'The Mars Climate Orbiter was supposed to study the Martian atmosphere. Instead, it crashed into Mars because of an integration failure between two subsystems.',
              'NASA\'s navigation team at JPL calculated thrust data in metric units (newton-seconds). Lockheed Martin\'s spacecraft team provided data in imperial units (pound-force seconds).',
              'Both systems worked correctly individually. JPL\'s navigation software: correct. Lockheeds thrust model: correct. Every unit test passed. Every component test passed.',
              'The integration point failed. No one tested the interface between the two systems. The unit conversion was assumed but not verified. Integration testing would have caught the mismatch immediately.',
              'Result: Navigation software thought thrust was 4.45x stronger than it actually was (conversion factor). The orbiter flew too low, hit the atmosphere, and disintegrated. $327 million lost.',
              'Post-mortem: "The problem was the lack of an end-to-end verification of the interface between the two teams." - Exactly what integration testing would have provided.'
            ],
            lessons: [
              'Interface contracts must be explicitly tested, not assumed',
              'Both sides of an integration can be correct while the integration fails',
              'Unit tests pass; integration failures show what unit tests miss',
              'Every interface is an integration testing opportunity and risk'
            ],
            simulation: [
              { type: 'info', text: 'You are testing an autonomous vehicle system. One team built the path planning module (outputs in meters). Another team built the motor controller (takes inputs in centimeters).' },
              { type: 'choice', text: 'Which type of testing catches this bug?', choices: [
                { id: 'a', text: 'More unit tests on each component', correct: false, feedback: 'Each component is correct individually. The bug is at the interface.' },
                { id: 'b', text: 'Integration testing with real data flow between modules', correct: true, feedback: 'Correct! Integration testing specifically targets interface mismatches between components.' },
                { id: 'c', text: 'Code review of each component', correct: false, feedback: 'Each components code is correct. The mismatch is in the implicit contract between them.' }
              ]}
            ]
          }
        }
      },
      {
        id: 4,
        title: 'System Testing',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 2.2.3 - System Testing', type: 'book' },
          { title: 'System Integration Testing Guide', description: 'Practical SIT approaches', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'System Testing: The Whole Picture',
              paragraphs: [
                'System testing verifies the complete, integrated system against requirements. It is the first testing level where the system is tested as a whole, rather than as components or subsystems.'
              ]
            },
            {
              heading: 'Characteristics of System Testing',
              bulletPoints: [
                'Tests the complete system: All components integrated, working together',
                'Independent perspective: Typically performed by a separate test team, not developers',
                'Requirements-based: Verifies behavior against documented requirements',
                'Production-like environment: Testing in an environment matching production',
                'End-to-end scenarios: Tests complete user workflows, not just individual features'
              ]
            },
            {
              heading: 'Types of System Testing',
              paragraphs: [
                'System testing encompasses multiple test types:'
              ],
              bulletPoints: [
                'Functional testing: Does the system do what requirements specify?',
                'Non-functional testing: Performance, security, usability, reliability',
                'End-to-end testing: Complete user journeys through the system',
                'Regression testing: Ensuring changes did not break existing functionality',
                'Usability testing: Can real users accomplish their goals?',
                'Compliance testing: Does the system meet regulations or standards?'
              ],
              highlight: {
                text: 'System testing is the last line of defense before user acceptance testing. Defects found here are still cheaper to fix than defects found by users.',
                type: 'definition'
              }
            }
          ],
          realWorldExample: {
            title: 'Apple Maps Launch Failure',
            scenario: 'September 2012 - Apple iOS 6 Release',
            story: [
              'Apple replaced Google Maps with their own Apple Maps in iOS 6. The launch was a disaster: bridges looked twisted, cities were misplaced, entire landmarks disappeared. Tim Cook issued a rare public apology.',
              'What went wrong? Apple had component and integration testing in place. Individual map features worked in isolation. But system testing with real-world data exposed flaws.',
              'The system testing environment used sanitized, test data that worked perfectly. Real-world geographic data contained edge cases: new roads, renamed towns, unusual terrain. The rendering algorithms, correct per test data, failed on real data.',
              'System testing gap: Testing was done on perfect data in controlled environments. Real users with real-world locations hit edge cases instantly. The environment did not match production.',
              'Outcome: Public embarrassment, executive firing, and months of engineering to fix. System testing with realistic, messy, real-world data would have caught these issues before 100 million users saw them.'
            ],
            lessons: [
              'Realistic test data is as important as test execution',
              'Perfect data in testing enables bugs in production',
              'Edge cases in real world exceed sanitized test scenarios',
              'System environment must mirror production'
            ]
          }
        }
      },
      {
        id: 5,
        title: 'Acceptance Testing',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 2.2.4 - Acceptance Testing', type: 'book' },
          { title: 'User Acceptance Testing Best Practices', description: 'Templates and approaches for UAT', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Acceptance Testing: The Final Gate',
              paragraphs: [
                'Acceptance testing determines whether the system satisfies acceptance criteria, enabling stakeholders to decide if the system should be accepted. It validates that the system meets business needs, not just technical requirements.'
              ]
            },
            {
              heading: 'Types of Acceptance Testing',
              highlight: {
                text: 'User Acceptance Testing (UAT): Performed by actual users or user representatives. Validates that the system enables users to perform their business tasks.',
                type: 'tip'
              }
            },
            {
              highlight: {
                text: 'Alpha Testing: Conducted at developer site by internal users in controlled environment. Early feedback before external release.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Beta Testing: Conducted at user sites by real users in their real environment. Reveals issues under real-world conditions.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Contract Acceptance Testing: Verifies that the system meets contractual requirements between vendor and customer.',
                type: 'info'
              }
            },
            {
              heading: 'Acceptance Criteria',
              paragraphs: [
                'Clear, measurable acceptance criteria should be defined before development begins. These criteria form the contractual basis for acceptance and provide unambiguous pass/fail definitions.'
              ],
              bulletPoints: [
                'Specific and testable: "Response time under 2 seconds for 95% of requests" not "performs well"',
                'Measurable: Include numbers, not subjective terms',
                'Stakeholder agreed: All parties understand and commit to the criteria',
                'Traceable: Each criterion links to a user requirement or story'
              ]
            }
          ],
          realWorldExample: {
            title: 'Healthcare.gov Launch',
            scenario: 'October 1, 2013 - US Federal Healthcare Exchange',
            story: [
              'Healthcare.gov launched for millions of Americans to sign up for health insurance. Within hours, the site crashed. Users could not create accounts. Error messages were cryptic. Politics aside, the testing failure was instructive.',
              'What was not done: Real user acceptance testing with realistic load. Beta testing was skipped. Alpha testing used synthetic data. Stakeholder acceptance testing was done by CMS officials, not real users.',
              'What was missing: Load testing simulating the expected 50,000+ concurrent users (actual traffic was 250,000). UAT with non-technical users like those who would actually use the system.',
              'The root cause: Acceptance testing was rushed due to hard deadlines. The political pressure to launch on a specific date overrode quality concerns. Critical acceptance criteria (handles X concurrent users) were not tested.',
              'Six weeks of emergency fixes (including proper testing) resolved the issues. But the public trust damage was done. The lesson: skipping acceptance testing is a gamble with consequences measured in public trust and political capital.'
            ],
            lessons: [
              'True UAT involves real users, not just project stakeholders',
              'Load testing is part of acceptance for high-volume systems',
              'Beta testing reveals real-world issues unavailable to internal testing',
              'Deadlines that skip acceptance testing create failures'
            ],
            simulation: [
              { type: 'info', text: 'You are leading UAT for a banking app. The sponsor wants to launch tomorrow. "We\'ve tested internally - sign it off."' },
              { type: 'choice', text: 'What do you say?', choices: [
                { id: 'a', text: '"I\'ll sign off so we don\'t miss the deadline."', correct: false, feedback: 'Signing off on incomplete testing falsifies acceptance results and puts users at risk.' },
                { id: 'b', text: '"UAT is incomplete. We need real users to validate before launch."', correct: true, feedback: 'Correct! Honest communication about risk is essential for ethical acceptance testing.' },
                { id: 'c', text: '"We\'ll launch and fix issues as users report them."', correct: false, feedback: 'Banking users cannot tolerate failures with their money. This is not appropriate for high-risk systems.' }
              ]}
            ]
          }
        }
      },
      {
        id: 6,
        title: 'Quiz: Test Levels',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Which test level is focused on verifying interfaces between components?',
              options: [
                'Component testing',
                'Integration testing',
                'System testing',
                'Acceptance testing'
              ],
              correctAnswer: 'Integration testing',
              explanation: 'Integration testing specifically targets interfaces between components or subsystems, verifying they work together correctly.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'What test double simulates a component that CALLS the component being tested?',
              options: [
                'Stub',
                'Driver',
                'Mock',
                'Fake'
              ],
              correctAnswer: 'Driver',
              explanation: 'A driver is a test double that simulates the calling component - it drives the execution of the component under test.'
            },
            {
              id: 3,
              type: 'dropdown',
              question: 'Acceptance testing performed by real users at their own locations is called:',
              dropdownOptions: [
                { id: 'alpha', label: 'Alpha Testing' },
                { id: 'beta', label: 'Beta Testing' },
                { id: 'uat', label: 'User Acceptance Testing' }
              ],
              correctAnswer: 'Beta Testing',
              explanation: 'Beta testing involves real users testing in their real environments, finding issues that internal testing cannot.'
            },
            {
              id: 4,
              type: 'multi-select',
              question: 'Which are characteristics of system testing? (Select all that apply)',
              options: [
                'Tests individual components in isolation',
                'Tests the complete integrated system',
                'Performs end-to-end user scenarios',
                'Uses production-like environment',
                'Always performed by developers'
              ],
              correctAnswer: ['Tests the complete integrated system', 'Performs end-to-end user scenarios', 'Uses production-like environment'],
              explanation: 'System testing verifies the whole system, typically by an independent test team, in a production-like environment.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'What integration strategy tests from the top of the call hierarchy downward?',
              options: [
                'Big Bang',
                'Bottom-Up',
                'Top-Down',
                'Sandwich'
              ],
              correctAnswer: 'Top-Down',
              explanation: 'Top-down integration starts with high-level components and integrates downward, using stubs to simulate lower components.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'What development approach uses the Red-Green-Refactor cycle?',
              correctAnswer: 'TDD',
              explanation: 'Test-Driven Development (TDD) uses the cycle: write a failing test (Red), make it pass (Green), then improve the code (Refactor).',
              hint: 'Tests drive the development process.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Static Testing',
    description: 'Learn about reviews, static analysis, and their benefits in finding defects early.',
    icon: 'Search',
    lessons: [
      {
        id: 1,
        title: 'Static Testing Fundamentals',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 3 - Static Testing', type: 'book' },
          { title: 'Fagan Inspection', description: 'Michael Fagan\'s formal inspection methodology', type: 'article' },
          { title: 'Code Complete', description: 'Steve McConnell - Chapter on reviews and inspections', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Static vs Dynamic: Two Complementary Approaches',
              paragraphs: [
                'Static testing examines work products without executing them. It includes reviews (manual examination) and static analysis (automated tool checks). Dynamic testing executes code and observes behavior. Both are necessary; neither alone is sufficient.',
                'The key advantage of static testing: it finds defects earlier. A code review can catch a bug before the code ever runs. Static analysis can identify potential issues before they cause failures. Static testing is often cheaper than finding the same bugs through dynamic testing.'
              ]
            },
            {
              heading: 'What Static Testing Can Find',
              bulletPoints: [
                'Requirements defects: Ambiguity, incompleteness, contradictions',
                'Design defects: Architecture flaws, interface problems',
                'Code defects: Syntax errors, unreachable code, unsafe constructs',
                'Documentation defects: Inaccuracy, incompleteness',
                'Standards violations: Coding conventions missing, style noncompliance'
              ],
              highlight: {
                text: 'Static testing can find defects that dynamic testing might never find - because the defective code path might never be executed. An uncalled function, an unused variable, an infinite loop in dead code. Static analysis finds these regardless of execution.',
                type: 'tip'
              }
            },
            {
              heading: 'The Cost Advantage',
              paragraphs: [
                'Finding a bug through code review costs minutes of reviewer time. Finding the same bug through dynamic testing costs: writing test cases, executing tests, debugging to locate the cause, and fixing. For many bug types, static testing is 10-100x cheaper.',
                'IBM found that code reviews find 82% of defects in an average of 3.5 hours per 1000 lines of code. Compare to the hundreds of hours that might be spent hunting those same bugs through dynamic testing.'
              ]
            }
          ],
          realWorldExample: {
            title: 'Heartbleed - The Static Analysis Failure',
            scenario: 'April 2014 - OpenSSL Critical Vulnerability',
            story: [
              'Heartbleed was one of the most devastating security vulnerabilities ever discovered. A missing bounds check in OpenSSL allowed attackers to read arbitrary memory from servers - passwords, private keys, session tokens. It affected millions of servers.',
              'The bug was a classic buffer over-read. The code failed to validate that a length field matched actual data length. An attacker could request more data than provided, and OpenSSL would dutifully return extra memory.',
              'The code had passed dynamic tests for years. It functioned correctly - it returned data. The defect was in the security property, not the functional behavior. Static analysis tools had existed for a decade that could detect exactly this pattern.',
              'After Heartbleed, OpenSSL integrated Coverity static analysis. It immediately found similar patterns. A single static analysis run - a few minutes - would have found a bug that caused estimated $500M+ in damages.',
              'The failure was not technical - the tools existed. The failure was organizational: static analysis was not part of the process. Once adopted, bugs that had hid for years were found immediately.'
            ],
            lessons: [
              'Static analysis catches patterns that functional testing misses',
              'Security bugs often do not cause visible behavior changes',
              'Tools are only helpful if they are actually used',
              'Static + Dynamic together are more powerful than either alone'
            ],
            simulation: [
              { type: 'info', text: 'Your team has excellent unit tests and integration tests. Someone suggests adding static analysis. "We\'re testing thoroughly - why bother?"' },
              { type: 'choice', text: 'What does static analysis add?', choices: [
                { id: 'a', text: 'Nothing - if tests pass, code is correct', correct: false, feedback: 'Tests pass if code produces expected outputs. They do not check unreachable code, security patterns, or coding standard issues.' },
                { id: 'b', text: 'Finds defects that testing cannot - unreachable code, security patterns, complexity', correct: true, feedback: 'Correct! Static analysis examines code without execution, finding classes of bugs invisible to dynamic tests.' },
                { id: 'c', text: 'Finds the same bugs faster than testing', correct: false, feedback: 'Static analysis finds DIFFERENT bug types, not just the same bugs faster.' }
              ]}
            ]
          }
        }
      },
      {
        id: 2,
        title: 'The Review Process',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 3.2 - Review Process', type: 'book' },
          { title: 'Fagan Inspection Standard', description: 'Formal inspection checklist', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Reviews: Human-Powered Static Testing',
              paragraphs: [
                'Reviews are manual examinations of work products to find defects. They range from informal (pair programming) to formal (Fagan inspections). All reviews share common process elements.'
              ]
            },
            {
              heading: 'The Review Process',
              highlight: {
                text: 'Planning: Define scope, select participants, schedule meeting, distribute materials.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Kick-off: Explain objectives, process, and materials. Ensure reviewers understand context.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Individual Review: Each reviewer examines the artifact alone, noting defects.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Review Meeting: Gather to discuss findings. Reach consensus on defects. Avoid solving problems - just identify them.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Rework: Author fixes identified defects.',
                type: 'definition'
              }
            },
            {
              highlight: {
                text: 'Follow-up: Verify fixes. Ensure no new defects introduced.', type: 'definition'
              }
            },
            {
              heading: 'Review Roles',
              bulletPoints: [
                'Author: Creates the artifact being reviewed. Should not be defensive; feedback helps improve the work.',
                'Moderator: Leads the review meeting. Keeps discussion on track. Resolves conflicts. Should be independent.',
                'Scribe: Records findings, decisions, and action items. Enables moderator to focus on discussion.',
                'Reviewer: Examines the artifact. May specialize (technical, user, tester perspective). Multiple reviewers catch different issues.',
                'Manager: May participate but should not dominate. Reviews are about quality, not performance evaluation.'
              ]
            }
          ],
          realWorldExample: {
            title: 'NASA Space Shuttle Inspections',
            scenario: 'Flight Software Formal Inspections',
            story: [
              'NASA\'s Space Shuttle primary flight software achieved one of the lowest defect rates in software history: 0.1 defects per thousand lines of code (typical software is 10-50). How? Formal inspections of every change.',
              'Process: Every code change - no matter how small - underwent formal inspection. Entry criteria: code compiles, unit tests pass. Inspection: four trained reviewers, each role defined. Rate: max 150 lines per hour to preserve quality.',
              'Metrics obsession: NASA tracked defect density, inspection rate, defect detection rate. If metrics degraded, process adjustment followed. The continuous improvement loop was tight.',
              'Results: In the final three years of the program, the primary flight software had zero flight-critical defects escape to production. That is zero failures due to software in 135 missions over 30 years.',
              'The time "cost": Formal inspections took time. But NASA calculated they saved time overall - catching bugs early prevented debugging nightmares later. The net effect of inspections was positive productivity.'
            ],
            lessons: [
              'Formal inspections can achieve near-zero defect rates',
              'Training and metrics are essential for inspection effectiveness',
              'Slow, careful reviews beat fast, sloppy ones',
              'For critical systems, inspections are the most cost-effective quality measure'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Types of Reviews',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 3.2.1 - Types of Reviews', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Review Formality Spectrum',
              paragraphs: [
                'Reviews range from highly informal to rigorously formal. Informal reviews are quick and flexible but may miss defects. Formal reviews are thorough but require preparation. Choose formality based on risk and context.'
              ]
            },
            {
              highlight: {
                text: 'Informal Review: No formal process, minimal documentation. Example: pair programming, asking a colleague to look at code. Fast but inconsistent.',
                type: 'definition'
              },
              bulletPoints: [
                'May be ad-hoc and unstructured',
                'Common in agile environments',
                'Catches obvious defects quickly',
                'Not suitable for critical artifacts without additional review'
              ]
            },
            {
              highlight: {
                text: 'Walkthrough: Author presents the artifact to reviewers. Meeting is primarily educational. Author-led, scenario-based.',
                type: 'definition'
              },
              bulletPoints: [
                'Good for design documents and architecture',
                'Educates reviewers about approach',
                'May use scenarios or dry runs',
                'Less formal than technical review'
              ]
            },
            {
              highlight: {
                text: 'Technical Review: Peer reviewers examine the artifact for technical correctness. Documented, may use checklists. Led by trained moderator.',
                type: 'definition'
              },
              bulletPoints: [
                'Focus on technical accuracy',
                'Multiple reviewers with different perspectives',
                'Produces written record of issues',
                'More rigorous than walkthrough'
              ]
            },
            {
              highlight: {
                text: 'Inspection: Most formal review type. Trained moderator, defined roles, entry/exit criteria, metrics collected. Goal: maximum defect detection.',
                type: 'warning'
              },
              bulletPoints: [
                'Highly structured process',
                'Entry criteria: artifact ready for review',
                'Exit criteria: defined quality threshold reached',
                'Statistical quality control through metrics',
                'Highest defect detection rate but highest effort'
              ]
            }
          ],
          realWorldExample: {
            title: 'Fagan Inspections at IBM',
            scenario: 'Origin of Formal Inspections',
            story: [
              'In 1976, Michael Fagan at IBM developed a formal inspection process that revolutionized software quality. His approach: structured, metric-driven inspections with defined roles and phases.',
              'The process: Planning (prepare materials) -> Overview (explain to reviewers) -> Preparation (individual review) -> Inspection meeting (collect defects) -> Rework (fix defects) -> Follow-up (verify fixes).',
              'Critical rules: No management present (avoid politics), author does not defend (just note defects), solve problems later (inspection finds defects, does not fix them).',
              'Results: 95% defect removal efficiency, compared to 30-60% for typical reviews. Net effect: 15% project time saved because fixing bugs early was faster than debugging later.',
              'Fagan\'s insight was that the review meeting was for finding defects, not fixing them. Fixing should happen after, during rework. This separation made meetings faster and more focused.',
              'This methodology became the foundation for modern inspection practices and contributed directly to the Space Shuttle software quality achievements.'
            ],
            lessons: [
              'Structured process outperforms ad-hoc review',
              'Metrics enable continuous improvement',
              'Separate finding from fixing for efficiency',
              'Trained moderators make the difference'
            ]
          }
        }
      },
      {
        id: 4,
        title: 'Static Analysis Tools',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'SonarQube Documentation', description: 'Comprehensive static analysis platform', type: 'article' },
          { title: 'ESLint Rules Guide', description: 'JavaScript/TypeScript analysis rules', type: 'article' },
          { title: 'Coverity Security Guide', description: 'Security-focused static analysis', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Automated Static Analysis',
              paragraphs: [
                'Static analysis tools examine code automatically, finding issues that human reviewers might miss. They are tireless, consistent, and can check every line of code against hundreds of rules.'
              ]
            },
            {
              heading: 'What Static Analysis Detects',
              bulletPoints: [
                'Syntax and structure: Missing semicolons, unreachable code, unused variables',
                'Potential bugs: Null pointer dereferences, buffer overflows, resource leaks',
                'Security vulnerabilities: SQL injection patterns, XSS potential, hardcoded passwords',
                'Coding standards: Naming conventions, code formatting, complexity metrics',
                'Performance issues: Inefficient algorithms, unnecessary object creation',
                'Dead code: Uncalled functions, unused parameters, redundant logic'
              ]
            },
            {
              heading: 'Popular Static Analysis Tools',
              bulletPoints: [
                'SonarQube: Multi-language quality platform with dashboards',
                'ESLint: JavaScript/TypeScript linting and auto-fix',
                'Pylint: Python code quality and style checking',
                'Checkstyle: Java coding conventions enforcement',
                'Coverity: Security and defect detection (enterprise)',
                'CodeQL: Semantic code analysis for security'
              ],
              highlight: {
                text: 'Static analysis in CI/CD: The most effective practice is integrating static analysis into your build pipeline. Every code change gets analyzed. Issues are caught immediately, not weeks later in review.',
                type: 'tip'
              }
            },
            {
              heading: 'Limitations',
              paragraphs: [
                'Static analysis has limits: it cannot find logic errors in correct code, it cannot understand business requirements, and it may produce false positives. It is a tool to help, not replace, human judgment.'
              ],
              bulletPoints: [
                'Cannot find logic errors where code works but does the wrong thing',
                'May generate false positives that waste developer time',
                'Does not understand business context or requirements',
                'Best used as a quality gate, not sole quality mechanism'
              ]
            }
          ],
          realWorldExample: {
            title: 'OpenSSL After Heartbleed',
            scenario: 'Applying Lessons with Static Analysis',
            story: [
              'After Heartbleed, OpenSSL became a case study in applying static analysis. The codebase had been developed without modern analysis tools. Integrating Coverity revealed the extent of hidden risks.',
              'Immediate findings: The first scan found 41 potential defects. Multiple were similar to Heartbleed - buffer handling issues that could leak memory. Others were null pointer risks, resource leaks, and unreachable code.',
              'Over the next year: 100+ additional issues were identified and fixed. None became public security disasters because they were caught before release.',
              'The process change: Static analysis became mandatory. Every pull request ran through Coverity. Issues had to be resolved or explicitly waived with justification.',
              'Result: OpenSSL became measurably more secure. Defect density dropped. Security researchers found fewer vulnerabilities in subsequent years.',
              'The lesson was not that static analysis is magic. The lesson was that combining static analysis with dynamic testing and human review achieves what any single approach cannot.'
            ],
            lessons: [
              'Static analysis catches what years of dynamic testing missed',
              'Consistent application matters more than tool choice',
              'Integrate into CI/CD for continuous protection',
              'Combine with other quality measures for best results'
            ]
          }
        }
      },
      {
        id: 5,
        title: 'Quiz: Static Testing',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What is the primary difference between static and dynamic testing?',
              options: [
                'Static testing is for code, dynamic for requirements',
                'Static testing does not execute code, dynamic testing does',
                'Static testing finds more defects',
                'Dynamic testing is automated, static is manual'
              ],
              correctAnswer: 'Static testing does not execute code, dynamic testing does',
              explanation: 'The defining difference is execution. Static testing examines artifacts; dynamic testing runs them.'
            },
            {
              id: 2,
              type: 'dropdown',
              question: 'Which review type is most formal with trained moderators and metrics?',
              dropdownOptions: [
                { id: 'walkthrough', label: 'Walkthrough' },
                { id: 'technical', label: 'Technical Review' },
                { id: 'inspection', label: 'Inspection' }
              ],
              correctAnswer: 'Inspection',
              explanation: 'Inspections are the most formal review type, with defined roles, entry/exit criteria, and metrics collection.'
            },
            {
              id: 3,
              type: 'multiple-choice',
              question: 'Why might a developer fail to find their own bug?',
              options: [
                'They do not care about quality',
                'Confirmation bias leads them to test confirming scenarios',
                'They lack tools',
                'Static testing is always insufficient'
              ],
              correctAnswer: 'Confirmation bias leads them to test confirming scenarios',
              explanation: 'Developers naturally test to confirm their code works. This bias leads to missing edge cases and unexpected inputs.'
            },
            {
              id: 4,
              type: 'multi-select',
              question: 'Which of the following can static analysis detect? (Select all that apply)',
              options: [
                'Logic errors where code does the wrong thing',
                'Buffer overflow vulnerabilities',
                'Unreachable code',
                'Coding standard violations',
                'User experience problems'
              ],
              correctAnswer: ['Buffer overflow vulnerabilities', 'Unreachable code', 'Coding standard violations'],
              explanation: 'Static analysis can detect code patterns and violations but cannot understand requirements or user experience.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'What tool is commonly used for JavaScript static analysis?',
              options: [
                'SonarQube',
                'ESLint',
                'JMeter',
                'Selenium'
              ],
              correctAnswer: 'ESLint',
              explanation: 'ESLint is the standard linting tool for JavaScript and TypeScript code quality analysis.'
            },
            {
              id: 6,
              type: 'dropdown',
              question: 'In a formal review, who records findings and decisions?',
              dropdownOptions: [
                { id: 'author', label: 'Author' },
                { id: 'moderator', label: 'Moderator' },
                { id: 'scribe', label: 'Scribe' }
              ],
              correctAnswer: 'Scribe',
              explanation: 'The scribe is specifically responsible for recording all findings, decisions, and action items during the review.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Test Design Techniques',
    description: 'Master the key techniques for designing effective test cases.',
    icon: 'PenTool',
    lessons: [
      {
        id: 1,
        title: 'Equivalence Partitioning',
        type: 'theory',
        xpReward: 65,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 4.2.1 - Equivalence Partitioning', type: 'book' },
          { title: 'The Art of Software Testing', description: 'Glenford Myers - Examples of EP', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'The Philosophy of Equivalence',
              paragraphs: [
                'Equivalence partitioning rests on a philosophical insight: not all test inputs are equally valuable. Within certain groups, any input should produce equivalent behavior - so testing one is representative of testing all.',
                'This enables dramatic test reduction without sacrificing coverage effectiveness. If a system accepts ages 18-65, you do not need to test 18, 19, 20... 64, 65. You test boundaries and representatives of each equivalence class.',
                'The intellectual leap: recognizing that infinite inputs can be reduced to finite partitions. Each partition represents a "class" of behavior. Test one, understand the class.'
              ]
            },
            {
              heading: 'Identifying Partitions',
              paragraphs: [
                'To partition inputs, identify how the system responds differently to different inputs. Each distinct response pattern defines a partition.'
              ],
              bulletPoints: [
                'Valid partitions: ranges where inputs are accepted and produce "normal" behavior',
                'Invalid partitions: ranges where inputs should be rejected or produce error behavior',
                'Boundaries: edges between partitions deserve special attention (BVA)',
                'Output partitions: equivalence can apply to outputs as well as inputs'
              ],
              highlight: {
                text: 'Example: A field accepting ages 18-65 has three partitions: valid (18-65), below minimum (<18), above maximum (>65). Test one from each, not all possible values.',
                type: 'tip'
              }
            },
            {
              heading: 'Applying Equivalence Partitioning',
              paragraphs: [
                'Step 1: Identify all input conditions',
                'Step 2: Identify equivalence partitions for each condition',
                'Step 3: Select one representative from each partition',
                'Step 4: Create test cases for these representatives'
              ],
              bulletPoints: [
                'Each partition needs at least one test case',
                'Representative values from each partition are sufficient',
                'Combine partitions where reasonable (but test each partition)',
                'Look for valid and invalid partitions separately'
              ],
              interactiveExample: {
                type: 'dropdown',
                content: {
                  label: 'A field accepts email addresses. What partitions exist?',
                  options: [
                    { value: '1', label: 'Valid emails only', explanation: 'What about invalid formats? The system should reject those.' },
                    { value: '2', label: 'Valid format emails and empty field', explanation: 'Missing invalid format emails.' },
                    { value: '3', label: 'Valid format, invalid format, empty, too long', explanation: 'Correct! Multiple partitions represent different error behaviors.' }
                  ],
                  showExplanation: true
                }
              }
            }
          ],
          realWorldExample: {
            title: 'ZIP Code Input Testing',
            scenario: 'Address Form Input Validation',
            story: [
              'Consider testing a ZIP code field. Naively, you might test 00000, 00001... 99999 - 100,000 test cases. Even then, you would miss non-numeric inputs.',
              'Equivalence partitioning reduces this to: Valid US (one 5-digit code) - Empty - Non-numeric - Too short - Too long. Five tests. With confidence that if 12345 works, 54321 works the same way.',
              'Why confidence? The code path is identical for any valid ZIP. The first digit of the ZIP does not change the validation logic. Hence it is equivalence.',
              'The insight: equivalence partitioning is about behavior, not domain. If inputs trigger the same code path, they are equivalent. Test what differs, not what repeats.'
            ],
            lessons: [
              'Equivalence = same code path, not just similar data values',
              'Testing one member of a class is sufficient for the whole class',
              'Partition on behavior differences, not just range boundaries',
              'Combine with boundary value testing for thorough coverage'
            ],
            simulation: [
              { type: 'info', text: 'A password field must have 8-20 characters, at least one uppercase, one lowercase, one digit.' },
              { type: 'choice', text: 'How many equivalence partitions?', choices: [
                { id: 'a', text: '1 partition: valid passwords', correct: false, feedback: 'What about passwords violating each rule individually?' },
                { id: 'b', text: '2 partitions: valid and invalid', correct: false, feedback: 'Invalid can be further partitioned into specific violation types.' },
                { id: 'c', text: '6+ partitions: valid, too short, too long, no uppercase, no lowercase, no digit, empty', correct: true, feedback: 'Correct! Each distinct error path is a separate partition.' }
              ]}
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Boundary Value Analysis',
        type: 'theory',
        xpReward: 65,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 4.2.2 - Boundary Value Analysis', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'The Psychology of Boundaries',
              paragraphs: [
                'Why do bugs cluster at boundaries? Human cognition naturally thinks in categories. We define ranges like "greater than 18" but make errors at the exact boundary. Off-by-one errors are the result of human category thinking.',
                'Historical data confirms: for any range-based logic, defects are found at boundaries far more often than in the middle. The values 1, 2, 99, 100 reveal more bugs than 50.',
                'Boundary value analysis formalizes this insight: test at boundaries (min, max) and adjacent values (just inside, just outside) to find these common errors.'
              ]
            },
            {
              heading: 'Boundary Testing Approaches',
              highlight: {
                text: 'Two-value BVA: Test only at the boundary. For range 1-100: test 1 and 100. Simpler but may miss off-by-one errors.',
                type: 'definition'
              },
              bulletPoints: [
                'Tests only min and max values',
                'Quick and simple',
                'May miss bugs just inside or outside boundaries'
              ]
            },
            {
              highlight: {
                text: 'Three-value BVA: Test at boundary and adjacent. For range 1-100: test 0, 1, 2, 99, 100, 101. More thorough.',
                type: 'tip'
              },
              bulletPoints: [
                'Tests boundary, one below, one above',
                'Finds off-by-one errors (>= vs >)',
                'More test cases but better coverage'
              ]
            },
            {
              heading: 'Types of Boundaries',
              bulletPoints: [
                'Numeric: age 18-65 -> test 17, 18, 19, 64, 65, 66',
                'String length: 1-50 chars -> test empty, 1 char, 50 chars, 51 chars',
                'Date: 2020-01-01 to 2020-12-31 -> test 2019-12-31, 2020-01-01, 2020-12-31, 2021-01-01',
                'Collections: array size 0, 1, max -> test empty, single element, full capacity, overflow'
              ]
            }
          ],
          realWorldExample: {
            title: 'Boeing 787 Battery Boundary Bug',
            scenario: 'Power Management System',
            story: [
              'The Boeing 787 battery fires were caused partly by boundary errors. A subtle difference in comparison operators created the failure.',
              'The code was supposed to trigger safety shutdown at a voltage threshold. But the implementation used greater-than (>) instead of greater-than-or-equal (>=). At exactly the threshold, no action was taken.',
              'Testing just below (voltage - 1) and just above (voltage + 1) passed. But AT the exact threshold - a boundary condition - the code did nothing. The battery continued to charge. Overheating and fire resulted.',
              'Boundary value analysis would have tested AT the threshold, not just around it. A single test case at the exact threshold value would have revealed the bug.',
              'The fix was one character: > became >=. The cost of finding it was months of investigation and fleet grounding. Systematic BVA testing would have found it in minutes.'
            ],
            lessons: [
              'Test AT boundaries, not just near them',
              'Operators matter: > differs from >=',
              'Single value tests at boundaries might miss off-by-one bugs',
              'Three-value BVA is worth the extra test cases'
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Decision Table Testing',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 4.2.3 - Decision Table Testing', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Complexity Requires Systematic Approach',
              paragraphs: [
                'When output depends on combinations of multiple conditions, intuition fails. Our brains handle 1-2 conditions well. 3-4 conditions become error-prone. 5+ conditions are often wrong without systematic help.',
                'Decision tables provide that help. They force explicit consideration of every combination. The table format makes gaps visible.'
              ]
            },
            {
              heading: 'Decision Table Structure',
              paragraphs: [
                'Four quadrants define the decision table:'
              ],
              bulletPoints: [
                'Conditions (stubs): List all relevant conditions that affect the outcome',
                'Actions (stubs): List all possible actions the system can take',
                'Condition entries: Fill in T/F for each condition, for each rule (combination)',
                'Action entries: Mark which actions apply for each rule'
              ],
              highlight: {
                text: 'Example: Loan approval. Conditions: income above threshold, employment stable, credit score above 700. Actions: approve, reject, manual review. Many combinations possible, decision table ensures all are considered.',
                type: 'definition'
              }
            },
            {
              heading: 'When to Use Decision Tables',
              bulletPoints: [
                'Business logic with multiple interacting conditions',
                'Complex eligibility rules (loans, insurance, permissions)',
                'Regulatory requirements where all cases must be covered',
                'Systems where combinations produce different outputs than individual conditions'
              ]
            }
          ],
          realWorldExample: {
            title: 'Insurance Rate Calculation',
            scenario: 'Multi-Factor Risk Assessment',
            story: [
              'Consider an auto insurance rating system: Age (young/adult/senior), Clean record (yes/no), Previous claims (0 / 1-2 / 3+). Multiple conditions combine.',
              'Intuitive testing: test a young driver, an adult driver, a senior driver. Three tests. But combining all factors requires 3 x 2 x 3 = 18 combinations.',
              'The decision table reveals: Did you test young driver with clean record AND 1-2 claims? What about adult with clean record and 3+ claims? Human intuition might miss these combinations.',
              'For insurance specifically, missing combinations could mean incorrect premiums or regulatory violation. Decision tables provide auditability and ensure coverage.',
              'Creating the table is valuable beyond testing: it documents the business rules and enables stakeholder review of completeness.'
            ],
            lessons: [
              'Decision tables expose all combinations visually',
              'Human testers miss unusual combinations',
              'Table creation often reveals gaps in requirements themselves',
              'Documented tables serve as test cases and specification'
            ]
          }
        }
      },
      {
        id: 4,
        title: 'State Transition Testing',
        type: 'theory',
        xpReward: 60,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 4.2.4 - State Transition Testing', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Systems With States',
              paragraphs: [
                'Many systems maintain state that affects behavior. An ATM can be Idle, Authenticating, Selecting, Dispensing. A document workflow can be Draft, Pending Approval, Approved, Published.',
                'In stateful systems, behavior depends not just on input but also on current state. The same input might produce different outputs in different states. This makes testing more complex - and state transition testing is the technique.'
              ]
            },
            {
              heading: 'State Transition Diagrams',
              paragraphs: [
                'State transition diagrams model system behavior:'
              ],
              bulletPoints: [
                'States: Rounded rectangles showing the conditions the system can be in',
                'Transitions: Arrows showing how system moves between states',
                'Events: Triggers that cause transitions (inputs, timers)',
                'Actions: Activities that happen during transitions'
              ],
              highlight: {
                text: 'Example: Login system. States: Logged Out -> Authenticating -> Logged In. Events: Enter credentials, Success, Failure, Logout. Testing requires checking all valid transitions AND invalid ones (e.g., Logout from Logged Out state).',
                type: 'definition'
              }
            },
            {
              heading: 'Testing Valid and Invalid Transitions',
              paragraphs: [
                'Valid transitions: System should move to the correct next state. Expected behavior.',
                'Invalid transitions: System should reject or handle gracefully. These often reveal security issues. Can you "jump" to a state you should not reach?'
              ],
              bulletPoints: [
                'Test every valid transition at least once',
                'Test invalid transitions - these often reveal bugs',
                'Consider timing: What if events happen too fast, too slow, out of order?',
                'Multiple paths to same state may need testing'
              ]
            }
          ],
          realWorldExample: {
            title: 'Document Workflow Vulnerability',
            scenario: 'Approval System Security Issue',
            story: [
              'A document management system had a state-based approval workflow: Draft -> Submitted -> Approved -> Published. Only users with Approver role could transition from Submitted to Approved.',
              'Testing normal transitions: Tester checked each valid path. Draft to Submitted: works. Submitted to Approved (with approver role): works. Approved to Published: works.',
              'Testing invalid transitions: Security tester tried "skipping" steps. Could draft go straight to Published? In this system, yes - the developer had created a "direct publish" feature for emergencies but without proper authorization check.',
              'The state transition testing revealed: The system allowed bypassing approval entirely. Any user could publish documents that had never been approved.',
              'This is a common security pattern: valid transitions are tested, but invalid "jumps" are overlooked. State transition testing should explicitly test forbidden paths.'
            ],
            lessons: [
              'Invalid state transitions often represent security bugs',
              'Test not just what should happen, but what should not happen',
              'State machines reveal unexpected paths through systems',
              'Explicitly test bypassing each step in the flow'
            ]
          }
        }
      },
      {
        id: 5,
        title: 'White-Box Techniques',
        type: 'theory',
        xpReward: 65,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 4.3 - White-Box Techniques', type: 'book' },
          { title: 'Code Coverage Analysis', description: 'Understanding coverage metrics', type: 'article' },
          { title: 'Mutation Testing', description: 'Beyond basic coverage metrics', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'White-Box Testing: Inside the Code',
              paragraphs: [
                'White-box testing (also called structural, glass-box, or clear-box testing) derives tests based on code structure. Unlike black-box testing that focuses on inputs/outputs, white-box testing focuses on paths, statements, and branches.',
                'White-box testing requires access to source code and understanding of implementation. It is typically performed by developers during unit testing but can be applied at any level by skilled testers.'
              ]
            },
            {
              heading: 'Statement Coverage',
              highlight: {
                text: 'Statement coverage measures the percentage of code statements executed by tests. Statement coverage = (statements executed / total statements) x 100%',
                type: 'definition'
              },
              paragraphs: [
                'Statement coverage is the simplest metric. Achieving 100% statement coverage means every line of code was executed at least once.',
                'Limitation: Statement coverage does not ensure all logic paths are tested. A statement may be executed but branches within it may not be.'
              ]
            },
            {
              heading: 'Branch/Decision Coverage',
              highlight: {
                text: 'Branch coverage ensures each decision point is tested for both true AND false outcomes. Branch coverage = (branches executed / total branches) x 100%',
                type: 'tip'
              },
              paragraphs: [
                'Branch coverage is stronger than statement coverage. Every if statement must be tested with condition true AND condition false. Every loop must be tested with entry and skip cases.',
                'Branch coverage implies statement coverage (if you test all branches, you execute all statements), but not vice versa.',
                'This is the most common coverage target for professional development. Many organizations require 80%+ branch coverage.'
              ]
            },
            {
              heading: 'Path Coverage',
              highlight: {
                text: 'Path coverage requires testing every possible path through the code. Path coverage = (paths executed / total feasible paths) x 100%',
                type: 'warning'
              },
              paragraphs: [
                'Path coverage is the strongest criterion but often impractical. Loops create infinite paths. Complex logic creates exponential paths. Path coverage is typically used only for critical code.',
                'Trade-off: Higher coverage = more confidence but higher cost. Choose coverage target based on risk context.'
              ]
            },
            {
              heading: 'Coverage Hierarchy',
              bulletPoints: [
                'Statement coverage: weakest but easiest',
                'Branch coverage: stronger, includes statement',
                'Path coverage: strongest but often impractical',
                'Each stronger criterion subsumes the weaker ones'
              ]
            }
          ],
          realWorldExample: {
            title: 'Ariane 5 - Dead Branch, Live Disaster',
            scenario: 'The Coverage Gap That Destroyed a Rocket',
            story: [
              'The Ariane 5 guidance software had high statement coverage from unit tests. But branch coverage was lower - some branches were never exercised. Unfortunately, one dead branch contained catastrophic consequences.',
              'The specific issue: Exception handling code was disabled for efficiency. The branch that would have caught the overflow was "never needed" in Ariane 4. So the branch remained - but untested.',
              'Statement coverage said: 95% of lines executed. Branch coverage would have revealed: this exception-handling branch is never executed - why? Investigating that question would have prevented the disaster.',
              'The lesson: Statement coverage can create false confidence. A branch exists for a reason - even if it seems unnecessary today. Testing it is essential. Branch coverage is not just a metric - it is a systematic way to find dead or risk-carrying code.',
              'Result: Modern safety-critical development requires not just coverage metrics but investigation of uncovered branches.'
            ],
            lessons: [
              'Statement coverage can give false confidence',
              'Unused branches exist for a reason - test them',
              'Branch > statement coverage for finding risky code',
              'High coverage percentage does not equal freedom from risk'
            ]
          }
        }
      },
      {
        id: 6,
        title: 'Quiz: Test Design Techniques',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What fundamental assumption underlies equivalence partitioning?',
              options: [
                'All inputs are different',
                'Inputs in a partition produce equivalent behavior',
                'Testing exhaustively is possible',
                'Bugs are randomly distributed'
              ],
              correctAnswer: 'Inputs in a partition produce equivalent behavior',
              explanation: 'Equivalence partitioning assumes that within a partition, any input produces equivalent behavior - so testing one represents testing all.'
            },
            {
              id: 2,
              type: 'dropdown',
              question: 'Testing at 0, 1, and 2 for a range starting at 1 is an example of:',
              dropdownOptions: [
                { id: 'ep', label: 'Equivalence Partitioning' },
                { id: 'bva', label: 'Boundary Value Analysis' },
                { id: 'dt', label: 'Decision Table Testing' }
              ],
              correctAnswer: 'Boundary Value Analysis',
              explanation: 'Boundary Value Analysis tests at and around boundaries to catch off-by-one errors.'
            },
            {
              id: 3,
              type: 'multiple-choice',
              question: 'Why do bugs cluster at boundaries?',
              options: [
                'Boundaries execute more often',
                'Human cognition uses categories, leading to off-by-one errors',
                'Boundaries are random',
                'Testers only test boundaries'
              ],
              correctAnswer: 'Human cognition uses categories, leading to off-by-one errors',
              explanation: 'Our category thinking makes errors at edges: "greater than 18" becomes code, but at exactly 18 we make mistakes.'
            },
            {
              id: 4,
              type: 'multiple-choice',
              question: 'What coverage ensures both true and false branches of each decision are tested?',
              options: [
                'Statement coverage',
                'Branch coverage',
                'Path coverage',
                'Function coverage'
              ],
              correctAnswer: 'Branch coverage',
              explanation: 'Branch coverage specifically requires testing each decision point for both outcomes.'
            },
            {
              id: 5,
              type: 'multi-select',
              question: 'Which techniques are black-box? (Select all that apply)',
              options: [
                'Equivalence Partitioning',
                'Statement Testing',
                'Decision Table Testing',
                'Branch Testing',
                'Boundary Value Analysis'
              ],
              correctAnswer: ['Equivalence Partitioning', 'Decision Table Testing', 'Boundary Value Analysis'],
              explanation: 'Black-box techniques work from specifications without code knowledge. Statement and branch testing require code access.'
            },
            {
              id: 6,
              type: 'text-input',
              question: 'What technique would you use for a login system with states like Logged Out, Authenticating, and Logged In?',
              correctAnswer: 'state transition testing',
              explanation: 'State transition testing is designed for systems with distinct states and transitions between them.',
              hint: 'Think about testing movement between states.'
            },
            {
              id: 7,
              type: 'dropdown',
              question: 'How many tests minimum for a system with 3 conditions each having 2 outcomes (using decision table)?',
              dropdownOptions: [
                { id: 'three', label: '3 tests' },
                { id: 'four', label: '4 tests' },
                { id: 'eight', label: '8 tests' }
              ],
              correctAnswer: '8 tests',
              explanation: 'With 3 binary conditions: 2^3 = 8 combinations. A complete decision table requires testing all combinations.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Test Management',
    description: 'Learn about test organization, planning, estimation, and risk management.',
    icon: 'ClipboardList',
    lessons: [
      {
        id: 1,
        title: 'Test Organization and Independence',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 5.1 - Test Organization', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Organizing the Testing Function',
              paragraphs: [
                'How is testing organized in an organization? The structure affects quality outcomes. Testing can be done by developers, by an independent team, or by external organizations. Each approach has tradeoffs.'
              ]
            },
            {
              heading: 'Developer Testing',
              highlight: {
                text: 'Developer testing: Developers test their own code. Fast feedback, deep code understanding, but subject to confirmation bias.',
                type: 'tip'
              },
              bulletPoints: [
                'Immediate feedback loop',
                'Deep implementation knowledge',
                'Efficient for unit testing',
                'Weakest for system-level objectivity'
              ]
            },
            {
              heading: 'Independent Testing',
              highlight: {
                text: 'Independent testing: Separate testers or test team. Brings fresh perspective, objectivity, and different assumptions. May lack domain knowledge.',
                type: 'definition'
              },
              bulletPoints: [
                'Fresh perspective on requirements',
                'Freedom from developer assumptions',
                'Can challenge design decisions',
                'May need ramp-up time for domain knowledge'
              ]
            },
            {
              heading: 'Levels of Independence',
              bulletPoints: [
                'None: Developer tests own code',
                'Partial: Developers test each other\'s code',
                'Full: Dedicated test team within organization',
                'External: Outside organization performs testing'
              ],
              highlight: {
                text: 'More independence is not always better. The optimal level depends on risk, team skills, and organizational culture. The goal is effective testing, not maximum separation.',
                type: 'info'
              }
            }
          ],
          realWorldExample: {
            title: 'Microsoft SDET Model',
            scenario: 'Software Development Engineer in Test',
            story: [
              'In the 1990s, Microsoft struggled with quality. Developer testing was insufficient. Traditional independent testers lacked technical skills to debug or investigate deeply.',
              'The solution: The SDET (Software Development Engineer in Test) role. SDETs are developers who focus on testing. They read and write code, build automation frameworks, and apply testing expertise.',
              'SDETs are embedded in product teams but have testing as their primary mission. They work alongside developers, reviewing code, writing test infrastructure, and applying testing mindsets during development.',
              'Results: Bug escape rates dropped. Developers and SDETs collaborated rather than transferred blame. SDETs could contribute fixes, not just reports. The model spread to Google, Amazon, and became industry standard.'
            ],
            lessons: [
              'Independent testers need technical skill, not just separation',
              'Embedded testing enables continuous feedback',
              'Developer skills + tester mindset = powerful combination',
              'Organizational structure affects quality outcomes'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Risk-Based Testing',
        type: 'theory',
        xpReward: 65,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 5.6 - Risk-Based Testing', type: 'book' },
          { title: 'Risk Management in Software Testing', description: 'Prioritization methods', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'Risk: The Foundation of Priority',
              paragraphs: [
                'Risk is the possibility of an event causing harm. In software, we face two risk categories: product risk (software fails) and project risk (project fails). Understanding both is essential for risk-based testing.'
              ]
            },
            {
              heading: 'Product Risk',
              highlight: {
                text: 'Product risk: The possibility that the software fails to meet its intended purpose. Examples: Incorrect calculations, security vulnerabilities, poor performance, unusable interface.',
                type: 'definition'
              },
              bulletPoints: [
                'Functional risk: Features do not work correctly',
                'Non-functional risk: Performance, security, usability issues',
                'Data risk: Data corruption, loss, or breach',
                'Integration risk: Third-party components fail'
              ]
            },
            {
              heading: 'Project Risk',
              highlight: {
                text: 'Project risk: The possibility that project objectives are not met. Examples: Schedule overrun, budget exceeded, resources unavailable, changing requirements.',
                type: 'warning'
              },
              bulletPoints: [
                'Resource risk: Insufficient testers, wrong skills',
                'Schedule risk: Deadlines unrealistic, dependencies late',
                'Technical risk: Environment unstable, tools inadequate',
                'Organizational risk: Priorities shift, scope creeps'
              ]
            },
            {
              heading: 'Risk Analysis Process',
              bulletPoints: [
                'Identify risks: Brainstorm what could go wrong (both product and project)',
                'Assess likelihood: How probable is each risk? (Low/Medium/High)',
                'Assess impact: How severe are consequences? (Low/Medium/High)',
                'Prioritize: High likelihood + High impact = highest priority',
                'Mitigate: Apply more testing effort to higher-risk areas',
                'Monitor: Track risk status throughout project'
              ],
              highlight: {
                text: 'Risk prioritization formula: Risk Level = Likelihood x Impact. A risk with Medium likelihood and High impact may deserve more attention than High likelihood with Low impact.',
                type: 'tip'
              }
            }
          ],
          realWorldExample: {
            title: 'Healthcare.gov - Known Risk, Ignored',
            scenario: 'Risk Assessment Failure',
            story: [
              'The Healthcare.gov launch failure was predictable through risk analysis. The risk was known but the response was inadequate.',
              'Product risk: The system must handle millions of concurrent users on day one. Likelihood: High (publicized launch). Impact: High (people cannot get insurance, political damage). This is a critical risk.',
              'Project risk: Hard deadline (legislated launch date). No flexibility. Risk that testing would be compressed to meet date. Likelihood: Medium-High. Impact: High.',
              'Response: Load testing was deferred. Beta testing was skipped. Risk mitigation (scaling infrastructure, staged rollout) was underutilized.',
              'What risk-based testing would have recommended: Prioritize performance and load testing as the highest risk. Accept that other features might receive less testing. Mitigate with staged rollout and prepared capacity.',
              'Outcome: The known risk occurred exactly as predicted. Millions of users arrived. The system crashed. Emergency fixes took weeks. The risk was identified but not addressed.'
            ],
            lessons: [
              'Identifying risk is not enough - mitigation must follow',
              'High risks must be tested, deferred, or explicitly accepted',
              'Risk-based testing prioritizes scarce testing time',
              'Schedule pressure does not change risk - only response to it'
            ],
            simulation: [
              { type: 'info', text: 'An e-commerce site launches in 2 weeks. Security testing incomplete. Load testing incomplete. Time for only one more major test effort.' },
              { type: 'choice', text: 'Which should you prioritize via risk-based testing?', choices: [
                { id: 'a', text: 'Security testing - breaches cost reputation', correct: false, feedback: 'Both risks are valid. Consider likelihood: attacks take time; load spike will occur on launch day.' },
                { id: 'b', text: 'Load testing - launch will bring guaranteed traffic', correct: true, feedback: 'Correct: Load failure is certain to occur on launch. Security risk is real but less immediately likely.' },
                { id: 'c', text: 'Neither - ship and fix later', correct: false, feedback: 'This is not risk-based testing. This is risk surrender.' }
              ]}
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: Test Management',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What is the main advantage of independent testing?',
              options: [
                'Lower cost',
                'Fresh perspective free from developer assumptions',
                'Faster execution',
                'Eliminates need for developer testing'
              ],
              correctAnswer: 'Fresh perspective free from developer assumptions',
              explanation: 'Independent testers bring objectivity and freedom from the mental models developers have about their own code.'
            },
            {
              id: 2,
              type: 'dropdown',
              question: 'Criteria that indicate when testing is complete are called:',
              dropdownOptions: [
                { id: 'entry', label: 'Entry Criteria' },
                { id: 'exit', label: 'Exit Criteria' },
                { id: 'suspension', label: 'Suspension Criteria' }
              ],
              correctAnswer: 'Exit Criteria',
              explanation: 'Exit criteria define when testing can end and the product is ready for release.'
            },
            {
              id: 3,
              type: 'multi-select',
              question: 'Which are examples of product risks? (Select all that apply)',
              options: [
                'Software crashes under load',
                'Test team understaffed',
                'Security vulnerability',
                'Requirements incomplete',
                'Poor usability'
              ],
              correctAnswer: ['Software crashes under load', 'Security vulnerability', 'Poor usability'],
              explanation: 'Product risks are risks that the software fails. Staff issues and incomplete requirements are project risks.'
            },
            {
              id: 4,
              type: 'text-input',
              question: 'What type of risk threatens project schedule or budget rather than software quality?',
              correctAnswer: 'project risk',
              explanation: 'Project risks are about project success metrics (time, budget, scope), not product quality.',
              hint: 'Think about factors that threaten the project itself, not the product.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'How is risk level typically calculated?',
              options: [
                'Risk = Cost x Time',
                'Risk = Likelihood x Impact',
                'Risk = Severity / Mitigation',
                'Risk is qualitative only'
              ],
              correctAnswer: 'Risk = Likelihood x Impact',
              explanation: 'Risk level considers how likely an event is and how bad it would be if it occurred.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: 'Tool Support for Testing',
    description: 'Understand different testing tools and their effective use.',
    icon: 'Wrench',
    lessons: [
      {
        id: 1,
        title: 'Types of Testing Tools',
        type: 'theory',
        xpReward: 50,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 6.1 - Types of Tools', type: 'book' },
          { title: 'Selenium WebDriver Guide', description: 'Automated functional testing', type: 'article' },
          { title: 'JMeter Documentation', description: 'Performance testing', type: 'article' }
        ],
        content: {
          sections: [
            {
              heading: 'The Tool Landscape',
              paragraphs: [
                'Testing tools support every phase of testing. From test management to execution, from performance to security. Selecting the right tool for your context is crucial for effective testing.'
              ]
            },
            {
              heading: 'Test Management Tools',
              highlight: {
                text: 'Test Management Tools: Organize test cases, track execution, measure coverage. Examples: TestRail, Zephyr, Jira Test Management. Essential for large projects and audit compliance.',
                type: 'tip'
              },
              bulletPoints: [
                'Organize test libraries and cycles',
                'Track execution and results',
                'Generate coverage reports',
                'Support traceability from requirements'
              ]
            },
            {
              heading: 'Test Execution/Automation Tools',
              highlight: {
                text: 'Test Execution Tools: Automate functional tests. Examples: Selenium, Cypress, Playwright, Appium. Enable regression testing at speed.',
                type: 'definition'
              },
              bulletPoints: [
                'Automate UI and API interactions',
                'Cross-browser and cross-device testing',
                'Integrate with CI/CD pipelines',
                'Require maintenance of test scripts'
              ]
            },
            {
              heading: 'Performance Testing Tools',
              highlight: {
                text: 'Performance Tools: Simulate load, measure response. Examples: JMeter, Gatling, LoadRunner. Identify bottlenecks before production.',
                type: 'info'
              },
              bulletPoints: [
                'Simulate concurrent users',
                'Measure throughput and latency',
                'Find breaking points',
                'Profile system behavior under stress'
              ]
            },
            {
              heading: 'Security Testing Tools',
              bulletPoints: [
                'Static Application Security Testing (SAST): Analyze code for security flaws',
                'Dynamic Application Security Testing (DAST): Probe running applications for vulnerabilities',
                'Interactive Application Security Testing (IAST): Combine SAST and DAST approaches',
                'Software Composition Analysis (SCA): Check dependencies for known vulnerabilities'
              ]
            }
          ],
          realWorldExample: {
            title: 'Netflix Continuous Testing',
            scenario: 'How Netflix Tests at Scale',
            story: [
              'Netflix runs on 1000+ device types. Millions of users. Continuous deployment. How do they test at this scale?',
              'Tool stack: Jenkins for CI/CD, custom chaos tools (Chaos Monkey) for resilience testing, Selenium-webdriver for UI automation, device farms for compatibility.',
              'Automation approach: Every code change triggers thousands of automated tests. Unit tests run first (minutes), then integration tests (hours distributed), then UI tests on device labs (parallel execution).',
              'Test parallelization: Instead of serial tests taking days, Netflix runs 1000+ tests in parallel on cloud infrastructure. Complete regression suite in hours, not weeks.',
              'Result: Confidence to deploy hundreds of times per day. When failures occur, automated rollback happens in seconds. The combination of tools enables human-scale teams to maintain planet-scale quality.'
            ],
            lessons: [
              'Automation enables scale impossible manually',
              'Parallel execution transforms days to hours',
              'Multiple tool types work together: execution + management + performance',
              'CI/CD integration is essential for continuous quality'
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Tool Selection and Implementation',
        type: 'theory',
        xpReward: 55,
        furtherReading: [
          { title: 'ISTQB Foundation Level Syllabus', description: 'Section 6.3 - Tool Selection', type: 'book' }
        ],
        content: {
          sections: [
            {
              heading: 'Selecting Tools Wisely',
              paragraphs: [
                'The wrong tool wastes money and demoralizes teams. The right tool multiplies effectiveness. Selection matters.'
              ]
            },
            {
              heading: 'Selection Criteria',
              bulletPoints: [
                'Functionality: Does it do what you need?',
                'Integration: Does it work with your existing tools?',
                'Support: Is there vendor support and community?',
                'Cost: What is total cost of ownership (licensing, training, maintenance)?',
                'Skills: Can your team use it effectively?',
                'Scalability: Will it grow with your needs?'
              ]
            },
            {
              heading: 'Implementation Success Factors',
              highlight: {
                text: 'Pilot before deployment: Try the tool on a small project first. Learn what works before committing organization-wide.',
                type: 'warning'
              },
              bulletPoints: [
                'Management support: Leaders must champion adoption',
                'Training: Users need sufficient skill development',
                'Phased rollout: Gradual adoption beats big-bang',
                'Metrics: Define success measures before starting',
                'Champion: Identify an internal advocate for the tool'
              ]
            },
            {
              heading: 'Common Pitfalls',
              bulletPoints: [
                'Buying on price or hype alone',
                'Attempting too many tools at once',
                'Insufficient training investment',
                'Forcing adoption without demonstrating value',
                'Neglecting tool maintenance'
              ]
            }
          ],
          realWorldExample: {
            title: '$2M Test Tool Failure',
            scenario: 'Tool Selection Gone Wrong',
            story: [
              'A Fortune 500 company purchased a $2M enterprise test management tool. 18 months later: unused. Why?',
              'Selection: Executives bought the most expensive tool, assuming cost = quality. No one consulted testers about requirements. The tool was overwhelming for the simple testing needs.',
              'Implementation: Consultants configured it without training testers. No one understood how to use it effectively. When questions arose, no internal expert existed.',
              'Adoption: Testers reverted to spreadsheets (tools they knew). The enterprise tool became shelf-ware. License renewal was denied. $2M wasted.',
              'What would have worked: A 30-day trial of a simpler tool, with testers evaluating based on their workflow, trained during pilot, with an internal champion leading adoption.',
              'Cost is not capability. Complexity does not equal power. The best tool is the one your team will actually use.'
            ],
            lessons: [
              'Expensive tools are not automatically better',
              'User needs must drive selection',
              'Training is not optional',
              'Internal champions drive adoption'
            ],
            simulation: [
              { type: 'info', text: 'Your 5-person test team needs a test management tool. Options: $100K enterprise tool, $5K team tool, or free open-source. Budget exists for any option.' },
              { type: 'choice', text: 'How should you decide?', choices: [
                { id: 'a', text: 'Buy the enterprise tool - more features is better', correct: false, feedback: 'Features you do not need add complexity without benefit.' },
                { id: 'b', text: 'Pilot tools with the team and evaluate based on your workflow', correct: true, feedback: 'Correct! Actual usage and fit-to-need matters more than price or features.' },
                { id: 'c', text: 'Choose the free option to save budget', correct: false, feedback: 'Free is good if it meets needs. But cost alone should not drive selection.' }
              ]}
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Quiz: Testing Tools',
        type: 'quiz',
        xpReward: 100,
        content: {
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Which tool type automates functional test execution?',
              options: [
                'Static Analysis Tool',
                'Test Management Tool',
                'Test Execution Tool',
                'Performance Testing Tool'
              ],
              correctAnswer: 'Test Execution Tool',
              explanation: 'Test execution tools (Selenium, Cypress) automate running functional tests and comparing results.'
            },
            {
              id: 2,
              type: 'dropdown',
              question: 'SonarQube is an example of which tool type?',
              dropdownOptions: [
                { id: 'exec', label: 'Test Execution Tool' },
                { id: 'static', label: 'Static Analysis Tool' },
                { id: 'perf', label: 'Performance Testing Tool' },
                { id: 'sec', label: 'Security Testing Tool' }
              ],
              correctAnswer: 'Static Analysis Tool',
              explanation: 'SonarQube analyzes code statically, finding issues without executing it.'
            },
            {
              id: 3,
              type: 'multiple-choice',
              question: 'What should you do before deploying a testing tool organization-wide?',
              options: [
                'Immediately require all teams to use it',
                'Run a pilot project to evaluate effectiveness',
                'Skip training to save budget',
                'Buy the most expensive version available'
              ],
              correctAnswer: 'Run a pilot project to evaluate effectiveness',
              explanation: 'A pilot validates the tool with your context before major investment.'
            },
            {
              id: 4,
              type: 'multi-select',
              question: 'What factors matter in tool selection? (Select all that apply)',
              options: [
                'Cost (licensing, training, maintenance)',
                'Integration with existing tools',
                'Brand recognition',
                'Team skills and ability to use the tool',
                'Vendor marketing materials'
              ],
              correctAnswer: ['Cost (licensing, training, maintenance)', 'Integration with existing tools', 'Team skills and ability to use the tool'],
              explanation: 'Practical factors like cost, integration, and team capability matter more than brand or marketing claims.'
            },
            {
              id: 5,
              type: 'multiple-choice',
              question: 'Which tool simulates load and measures system performance?',
              options: [
                'Selenium',
                'JMeter',
                'SonarQube',
                'TestRail'
              ],
              correctAnswer: 'JMeter',
              explanation: 'JMeter is a load testing tool that simulates concurrent users and measures system response.'
            }
          ]
        }
      }
    ]
  }
];

export const totalLessons = istqbCourse.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
export const totalXp = istqbCourse.reduce((acc, chapter) =>
  acc + chapter.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.xpReward, 0), 0);
