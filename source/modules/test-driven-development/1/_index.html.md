## Chef development phases

In the context of this discussion there are three phases of development: pre-convergence, convergence, and post-convergence.

### Pre-convergence

Pre-convergence is the phase before a node is converged by Chef, and is the phase when testing that doesn’t require a node to run Chef happens. Syntax checking, lint checking, or unit tests are performed during pre-convergence. Automated testing in a continuous integration (CI) pipeline usually does pre-convergence tests, such as GitHub repositories configured with Travis CI.

### Convergence

Convergence is the phase when Chef runs and makes changes to the system to _converge_ it to be in the desired state. This is where resources are tested for current state, and repaired (action taken by providers) if they’re not correct.

### Post-convergence

Post-convergence is the phase after a node finishes running Chef. Testing in this phase verifies that the node is in the desired state. This can include checks that a particular port is listening, that a configuration file contains the correct content, or that a service is running with the proper configuration.
