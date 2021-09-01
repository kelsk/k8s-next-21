# Container structure tests
Skaffold has support for running [container structure tests](https://skaffold.dev/docs/pipeline-stages/testers/structure/) to validate built container images before deploying them to a cluster.

To add container structure tests to the Nextbook app:

1. Download the latest container-structure-test [binary](https://github.com/GoogleContainerTools/container-structure-test/releases).


2. Run Nextbook using the `prod` skaffold profile to run the container structure tests.

    ```
    test:
      - image: nextbook-frontend
        structureTests:
          - ./structure-test/frontend-test.yaml
      - image: nextbook-backend
        structureTests:
          - ./structure-test/backend-test.yaml
    ```

🚨 **Expected failure:** The [frontend](./frontend-test.yaml) structure test contains a `fileContentTest` which looks for `xxx` or `XXX` statements in `app.js`. This test should fail since a comment with `XXX` exists, and consequently the container won't be deployed.
