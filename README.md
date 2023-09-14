# cfl-signature-mismatch
Installation
```bash
pnpm i
```
Running
```bash
pnpm start
```

### Routes
- `/verify`
  - 
  Uses harcdoded `headers` to call `verifyRequest`. Should result in a successful verification but does not
- `/sign`
  - 
  Same header values used as above. Should produce a matching signature via `signRequest` but does not
