# Test output

    PASS  tests/unit/components.spec.ts (18.745s)
      Shortnr.vue
        ✓ renders form with input and button (118ms)
        when there are some previously created links
          ✓ lists the links (103ms)
        when data is loaded
          when empty url is passed
            ✓ shows Error (44ms)
          when some URL is passed
            ✓ posts and waits for result from the backend (54ms)
        creating a new link
          when URL stored sucessfully
            ✓ adds new item to the list (46ms)
        errors while trying to create URLs
          server is busy
            ✓ shows error (20ms)
          server crashed
            ✓ shows error (14ms)
          Validation error
            ✓ shows error from the response body (46ms)
          network error
            ✓ shows error (15ms)
        error when trying to fetch the list
          ✓ shows error (6ms)

    Test Suites: 2 passed, 2 total
    Tests:       11 passed, 11 total
    Snapshots:   0 total
    Time:        26.666s
    Ran all test suites.
    docker-compose run --rm urlstore "npm test -- --verbose"

    > urlstore@1.0.0 test /mnt/urlstore
    > jest --env=node "--verbose"

    PASS  src/validate.test.ts
      isValidUrl
        ✓ checks max length (10ms)
        ✓ checks pattern (3ms)

    PASS  src/actions.test.ts (7.439s)
      actions
        handle URL list action
          ✓ responds with what comes from database (12ms)
        Handle create URL action
          success
            ✓ saves passed URL with generated hash (3ms)
            ✓ responds with created URL details (1ms)
          database errors when creating a new post
            ✓ handles generic database errors (2ms)
            ✓ handles unique key violation (3ms)
          validation errors when creating a new post
            ✓ handles invalid URL (2ms)

    Test Suites: 2 passed, 2 total
    Tests:       8 passed, 8 total
    Snapshots:   0 total
    Time:        8.367s
    Ran all test suites.
    docker-compose run --rm xlink "npm test -- --verbose"

    > xlink@1.0.0 test /mnt/xlink
    > jest --env=node "--verbose"

    PASS  src/actions.test.ts (8.309s)
      handle redirect
        ✓ fetches URL using code from request (382ms)
        ✓ redirects to the url from database (11ms)

      console.log src/actions.ts:10
        code10xx

      console.log src/actions.ts:10
        code10xx

    Test Suites: 1 passed, 1 total
    Tests:       2 passed, 2 total
    Snapshots:   0 total
    Time:        9.176s