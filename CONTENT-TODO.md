# What was removed before publishing, and how to put it back

The site went live with **only figures whose provenance can be stated**. Everything below
was cut rather than published with a vague source. Each one is a real achievement — it
just needs a measurement you can defend in an interview before it goes on a page that
ranks for your name.

A metric tile is the strongest form of a claim, because it promises evidence. Only add one
back once the `source` line is true.

---

## 1. Startup time: 13s → 150ms

**Was:** a metric tile on `developer-hub-platform` with a −98.8% delta.
**Why removed:** no stated measurement method.
**To restore** — add to `src/content/projects.ts`, project `developer-hub-platform`:

```ts
{
  label: 'App startup',
  value: '150ms',
  delta: '-98.8%',
  higherIsBetter: false,
  source: '<which build, which page, cold or warm, measured with what>',
}
```

Answer these first: cold start or warm? Which surface — the host shell, or a specific
app? Measured in DevTools, Lighthouse, or RUM? Which build did the 13s come from?

## 2. Daily users: 100K+

**Was:** a metric tile on `developer-hub-platform`.
**Why removed:** no stated source system, and DAU vs MAU unconfirmed.
**To restore:**

```ts
{ label: 'Daily users', value: '100K+', source: '<analytics system>, DAU across <surfaces>, <period>' }
```

This is the single most checkable number you could put on the site. Confirm whether it is
daily or monthly, and across which surfaces, before it goes back.

## 3. API proxy: 10K+ calls/day

**Was:** a metric tile on `api-proxy`.
**Why removed:** no stated log source or averaging window.
**To restore:**

```ts
{ label: 'API calls/day', value: '10K+', source: '<log source>, daily average over <window>' }
```

## 4. Marketplace apps: 20+

**Was:** "20+ apps shipped". **Now:** "6 named", listing only the apps with merged PRs in
the public record.
**To restore the larger number:** count the real list, and distinguish apps you *led* from
apps you shipped a fix to. The second framing is weaker and interviewers ask.

## 5. Post-mortem — the ack timeout

**Was:** an incident block on `app-sdk-setdata`, all TODO.
**Why removed:** I will not invent an incident.
**Why it is worth writing:** PR #173 (`Fix/mkt 15361 ack timeout`) is the most interesting
failure in your public record, and a case study that shows something going wrong reads as
more senior than one that does not. Restore via the `incident` field:

```ts
incident: {
  symptom: '<what users saw>',
  cause: '<the actual mechanism, not the trigger>',
  fix: '<what changed — and separately, what makes the class impossible now>',
}
```

## 6. Repos by access — public / private / archived

**Was:** a sidebar meter at 40 / 45 / 15. Those numbers were invented, so they came out.
**Why it matters:** you asked for this breakdown specifically, and it supports the 288+
figure by showing where the scope actually sits.
**To restore** — `src/content/telemetry.ts`, percentages summing to 100:

```ts
repoSplit: [
  { name: 'Public', percent: 00 },
  { name: 'Private', percent: 00 },
  { name: 'Archived', percent: 00 },
],
```

The meter renders automatically once this is non-empty, and hides itself while it is
empty. Counts from your remediation tracker; "Archived" = repos that were public before
being archived.

## 7. Award years

`src/content/career.ts` — both awards have an empty `year`. Fill in the hackathon year and
the Above & Beyond years.

## 8. Exact repo count

288+ reads as rounded. 291 reads as counted. Your tracker has the number.

---

## Still true and still on the site

These stayed because they are reproducible — anyone can re-run the query:

| Figure | Source |
|---|---|
| 785 PRs involved | `org:contentstack involves:Amitkanswal` |
| 284 reviews given | `org:contentstack reviewed-by:Amitkanswal` |
| 25 merged PRs in app-sdk | `repo:contentstack/app-sdk author:Amitkanswal is:merged` |
| 10 framework starters | merged PRs under your handle in each starter repo |
| 6 named marketplace apps | merged PRs in the public record |
| 288+ repos in scope | audit scope, labelled as such in the UI |

The language split is an estimate and says so in the sidebar.
