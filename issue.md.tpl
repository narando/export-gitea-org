#### {{repo.full_name}}#{{number}}

# {{title}}

- **Type**: {{#pull_request}}Pull Request{{/pull_request}}{{^pull_request}}Issue{{/pull_request}}
- **State**: {{state}}
- **Opened By**: {{user.full_name}} (@{{user.username}})
- **Created At**: `{{created_at}}`
- **Closed At**: `{{closed_at}}`
- **Updated At**: `{{updated_at}}`
- **Assignees**: {{#assignees}}{{full_name}} (@{{username}}), {{/assignees}}

{{#pull_request}}
---

- **Merged**: {{merged}}
- **Merged At**: {{#merged}}`{{merged_at}}`{{/merged}}{{^merged}}_Not merged yet_{{/merged}}
- **Merged By**: {{#merged}}{{merged_by.full_name}} (@{{merged_by.username}}){{/merged}}{{^merged}}_Not merged yet_{{/merged}}
- **Merge Base**: `{{merge_base}}`
- **Result Commit**: {{#merged}}`{{merge_commit_sha}}`{{/merged}}{{^merged}}_Not merged yet_{{/merged}}
{{/pull_request}}

## {{#pull_request}}Pull Request{{/pull_request}}{{^pull_request}}Issue{{/pull_request}} Description

{{{body}}}

## Comments

{{#comments}}
_By **{{user.full_name}}** (@{{user.username}}) on {{created_at}}, last updated at {{updated_at}}_

{{{body}}}

---

{{/comments}}
{{^comments}}
_No comments were made on this {{#pull_request}}Pull Request{{/pull_request}}{{^pull_request}}Issue{{/pull_request}}_
{{/comments}}