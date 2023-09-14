const express = require("express");
const app = express();
const { verifyRequest, signRequest } = require("@contentful/node-apps-toolkit");
const port = 3000;
app.use(express.json());

// Regenerated this secret for testing purposes, it is not being used in production
const SECRET =
  "HC6VzsJataBC9d99t0f9zCsvocIJf2imamlxpWW46ehAHvsjsObgYagXeheKI_ye";

/**
 * Below are the headers and signature produced via `cma.appSignedRequest.create`
 * We should be able to produce the same exact signature defined in the header below
 *
 * 
    X-Contentful-Crn:
    crn:contentful:::extensibility:spaces/b2v8js0z0fpd/environments/solutionssandbox/signed_requests/1qK5NzGO9JpEZY4lC07dZ2
    X-Contentful-Environment-Id:
    solutionssandbox
    X-Contentful-Signature:
    51d48727942de1a565478fdc3e09b06176dab5a6b9432dad141b6d89c79a92fc
    X-Contentful-Signed-Headers:
    x-contentful-crn,x-contentful-environment-id,x-contentful-signed-headers,x-contentful-space-id,x-contentful-timestamp,x-contentful-user-id
    X-Contentful-Space-Id:
    b2v8js0z0fpd
    X-Contentful-Timestamp:
    1694714727945
    X-Contentful-User-Id:
    66odUZ2RRkrqvuiL7B6Uz0
 *
 */

const headers = {
  "X-Contentful-Crn":
    "crn:contentful:::extensibility:spaces/b2v8js0z0fpd/environments/solutionssandbox/signed_requests/1qK5NzGO9JpEZY4lC07dZ2",
  "X-Contentful-Environment-Id": "solutionssandbox",
  "X-Contentful-Signed-Headers":
    "x-contentful-crn,x-contentful-environment-id,x-contentful-signed-headers,x-contentful-space-id,x-contentful-timestamp,x-contentful-user-id",
  "X-Contentful-Space-Id": "b2v8js0z0fpd",
  "X-Contentful-Timestamp": "1694714727945",
  "X-Contentful-User-Id": "66odUZ2RRkrqvuiL7B6Uz0",
};

// Using the above harcdcoded headers to ensure verification
app.get("/verify", (req, res) => {
  const rawCanonicalRequest = {
    path: "/stores",
    headers: {
      ...headers,
      // This is the signature we should produce, and is identical to the one produced by `cma.appSignedRequest.create`
      "X-Contentful-Signature": "51d48727942de1a565478fdc3e09b06176dab5a6b9432dad141b6d89c79a92fc",
    },
    method: "GET",
    body: JSON.stringify(req.body),
  };

  try {
    // Setting raw TTL to 0 to avoid timestamp validation
    const isVerified = verifyRequest(SECRET, rawCanonicalRequest, 0);

    // Request should be verified, but is not
    const response = isVerified ? "Verified" : "Not Verified";
    res.send(response);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

app.get("/sign", (req, res) => {
  const rawCanonicalRequest = {
    path: "/stores",
    headers: headers,
    method: "GET",
    body: JSON.stringify(req.body),
  };
  
  // Using timestamp from headers to ensure signature is the same
  const signature = signRequest(SECRET, rawCanonicalRequest, 1694714727945);
  // We should produce signature `51d48727942de1a565478fdc3e09b06176dab5a6b9432dad141b6d89c79a92fc`, but we fail to do so
  res.send(signature);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
