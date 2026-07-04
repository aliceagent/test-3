---
name: doc-cleanup
description: Turn raw meeting notes, voice-note transcripts, or rough question lists into a polished, structured document. Replaces the manual "Claude Instruction —---" preamble Jonathan writes in Google Docs.
---

# Doc Cleanup (Raw Notes → Structured Document)

The established pattern: a doc containing a hand-written instruction preamble, then
"Document Starts Here", then raw material (notes, screenshots with questions,
transcript fragments). This skill standardizes that job.

## Process
1. **Open with a goals section.** State what the document is for and what decisions it should enable. If goals are only implied, write them as *presumed goals* and explicitly note they need confirmation from stakeholders (this framing is house style).
2. **Preserve every substantive item** from the raw notes — questions, numbers, names, links, image references. Cleanup means organizing and expanding, never dropping. Keep all images in place if working in a doc that has them.
3. **Structure**: numbered sections by theme, with raw scattered questions grouped under the workflow step they belong to (e.g., landing page → signup → activation).
4. **Expand telegraphic notes** into full sentences a reader without context can follow — the audience is usually someone at another company (a data analyst, management, a partner).
5. **Flag issues found in the material** distinctly: "Potential UI Issue:", "Potential Bug:", "Type-o:" prefixes are the established convention — keep them.
6. **End with open questions / asks**, addressed to the specific people who must answer them.

## Output
- A new document (don't overwrite the raw original), in the same platform as the source (Google Doc stays a Google Doc).
- Title format: `<Subject> — <Month Year>` unless told otherwise.
