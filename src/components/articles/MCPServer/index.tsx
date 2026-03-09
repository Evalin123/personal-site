import '@/assets/styles/components/articles/MCPServer.scss';

import BookIcon from '@/components/shared/icons/BookIcon';

export default function MCPServer() {
  return (
    <article className="mcpserver">
      <header className="mcpserver__header">
        <h1 className="mcpserver__title">
          AI Can Code, But Can It Commit? Building an MCP Server to Find Out
        </h1>
      </header>

      <div className="mcpserver__content">
        <div className="mcpserver__tldr">
          <p>
            In today's AI-first era, we often expect them to handle everything for us — even writing
            code. What about the next steps — committing and pushing? Can AI handle those as well?
          </p>
          <p>
            This is where the <strong>Model Context Protocol (MCP)</strong> comes in. By building an
            MCP server, we can connect AI to real development tools and workflows, enabling it to go
            beyond code generation and actively support the entire software lifecycle.
          </p>
        </div>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">Step 1: Set up the Project</h2>
          <p>Before diving into MCP, let's set up a clean TypeScript project.</p>
          <pre className="mcpserver__code">
            <code>{`pnpm init
pnpm add @modelcontextprotocol/sdk
pnpm add -D typescript ts-node @types/node
pnpm exec tsc --init`}</code>
          </pre>
          <p>
            MCP provides an official SDK for TypeScript, which simplifies creating servers, defining
            tools, and managing communication between client and server.
          </p>

          <h3 className="mcpserver__subheading">
            Here's a good starting <code>tsconfig.json</code>:
          </h3>
          <pre className="mcpserver__code">
            <code>{`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}`}</code>
          </pre>
          <div className="mcpserver__note">
            <p>
              <strong>Key takeaway:</strong> MCP requires TypeScript configuration with NodeNext
              modules, so make sure your setup matches.
            </p>
          </div>
        </section>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">Step 2: Build a Basic MCP Server</h2>
          <p>Let's start small by creating a simple tool that adds two numbers.</p>

          <h3 className="mcpserver__subheading">
            Create the server entry (<code>cli.ts</code>)
          </h3>
          <pre className="mcpserver__code">
            <code>{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});`}</code>
          </pre>
          <p>This initializes our MCP server.</p>

          <h3 className="mcpserver__subheading">
            Create <code>server.ts</code> and register a tool
          </h3>
          <p>
            We'll use{' '}
            <a
              href="https://github.com/colinhacks/zod"
              target="_blank"
              rel="noreferrer"
              className="mcpserver__link"
            >
              zod
            </a>{' '}
            for input validation.
          </p>
          <pre className="mcpserver__code">
            <code>{`// Important: MCP currently uses Zod v3 for schema validation. If you
// install Zod v4, you may encounter compatibility issues because the schema definitions
// in the MCP SDK are built around v3.

pnpm add zod@3`}</code>
          </pre>

          <pre className="mcpserver__code">
            <code>{`// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerTools(server: McpServer) {
  server.registerTool(
    "add",
    {
      title: "Addition Tool",
      description: "Add two numbers",
      inputSchema: { a: z.number(), b: z.number() },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(a + b) }],
    })
  );
}`}</code>
          </pre>
          <div className="mcpserver__note">
            <p>
              <strong>Key takeaway:</strong> Tools in MCP are just functions with validated inputs
              and structured outputs.
            </p>
          </div>

          <p>
            And don't forget to import registerTools into <code>cli.ts</code>.
          </p>
          <pre className="mcpserver__code">
            <code>{`// cli.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./server.js";

async function main() {
    // We put server inside main()
    const server = new McpServer({
        name: "mcp-gitlab-server",
        version: "1.0.2",
    });

    registerTools(server); // use the tool here
}

main().catch(console.error);`}</code>
          </pre>

          <p>
            To make our CLI talk with the MCP server, we need a communication channel. Here we're
            using <b>standard input/output (stdio)</b> as the transport layer:
          </p>
          <pre className="mcpserver__code">
            <code>{`// cli.ts

async function main() {
    // ... previous code

    const transport = new StdioServerTransport(); // sets up the transport layer
    await server.connect(transport); // establishes a connection between our server and it.
}

main().catch(console.error);`}</code>
          </pre>
          <p>The CLI can send requests through stdio, and the server will handle them.</p>
        </section>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">Step 3: Test with a Client</h2>
          <p>
            MCP servers communicate via <b>stdin/stdout</b>. Let's make a simple test client.
          </p>

          <h3 className="mcpserver__subheading">
            Create <code>client-test.ts</code>
          </h3>
          <pre className="mcpserver__code">
            <code>{`// client-test.ts
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "pnpm",
    args: ["tsx", "src/cli.ts"],
  });
  const client = new Client({
    name: "example-client",
    version: "1.0.0",
  });
  await client.connect(transport);
  const result = await client.callTool({
    name: "add",
    arguments: { a: 3, b: 5 },
  });
  console.log("Result:", result);
}

main().catch(console.error);`}</code>
          </pre>

          <p>Run it:</p>
          <pre className="mcpserver__code">
            <code>{`pnpm add -D tsx # run TypeScript files directly without compiling
pnpm tsx src/client-test.ts`}</code>
          </pre>

          <div className="mcpserver__output">
            <p>
              tools: {'{'}
              <br />
              &nbsp;&nbsp;tools: [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'add',
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: 'Addition Tool',
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description: 'Add two numbers',
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inputSchema: [Object]
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
              <br />
              &nbsp;&nbsp;]
              <br />
              {'}'}
            </p>
            <p>
              Result: {'{'} content: [{'{'} type: 'text', text: '8' {'}'}] {'}'}
            </p>
          </div>

          <p>Yeah! Our first tool success~ 🎉</p>
          <p>Now let's do something useful: create GitLab issues directly via MCP.</p>
        </section>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">Step 4: Integrate with GitLab</h2>

          <h3 className="mcpserver__subheading">
            Setup <code>.env</code>
          </h3>
          <pre className="mcpserver__code">
            <code>{`// .env
GITLAB_HOST=https://gitlab.com/api/v4
GITLAB_TOKEN=glpat-YOUR_TOKEN`}</code>
          </pre>
          <p>Remember to install dotenv, so you can use process.env</p>
          <pre className="mcpserver__code">
            <code>{`pnpm add dotenv`}</code>
          </pre>

          <h3 className="mcpserver__subheading">
            Add gitlab_create_issue in <code>server.ts</code>
          </h3>
          <pre className="mcpserver__code">
            <code>{`// server.ts
import "dotenv/config";

export function registerTools(server: McpServer) {
  // ... previous tools

  server.registerTool(
    "gitlab_create_issue",
    {
      title: "Create GitLab Issue",
      description: "Create an issue in a GitLab project",
      inputSchema: {
        project: z.string(),
        title: z.string(),
        description: z.string().optional(),
        labels: z.array(z.string()).optional(),
        assigneeIds: z.array(z.number()).optional(),
        milestoneId: z.number().optional(),
        confidential: z.boolean().optional(),
      },
    },
    async (input: any) => {
      const host = (
                input.host ||
                process.env.GITLAB_HOST ||
                "https://gitlab.com/api/v4"
            ).replace(/\\/$/, "");
      const token = input.token || process.env.GITLAB_TOKEN;
      if (!token) {
        return { content: [{ type: "text", text: "❌ Missing GITLAB_TOKEN" }] };
      }

      const projectId = /^\\d+$/.test(input.project)
        ? input.project
        : encodeURIComponent(input.project);

      const url = \`\${host}/projects/\${projectId}/issues\`;
      // GitLab expected form fields; labels is comma-separated; assignee_ids[] is multi-value
      const body = new URLSearchParams();

      body.set("title", input.title);
      if (input.description) body.set("description", input.description);
      if (Array.isArray(input.labels) && input.labels.length)
          body.set("labels", input.labels.join(","));
      if (Array.isArray(input.assigneeIds))
          input.assigneeIds.forEach((id: number) =>
              body.append("assignee_ids[]", String(id))
          );
      if (typeof input.milestoneId === "number")
          body.set("milestone_id", String(input.milestoneId));
      if (typeof input.confidential === "boolean")
          body.set("confidential", String(input.confidential));

      // Call GitLab API to create a new issue
      const res = await fetch(url, {
          method: "POST",
          headers: {
              "PRIVATE-TOKEN": token,
              "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
      });

      if (!res.ok) {
        return { content: [{ type: "text", text: \`❌ Failed: \${res.status}\` }] };
      }

      const issue = await res.json();
      return {
        content: [
          { type: "text", text: \`✅ Issue #\${issue.iid} created: \${issue.web_url}\` },
        ],
      };
    }
  );
}`}</code>
          </pre>
          <div className="mcpserver__note">
            <p>
              If you want to interact with other GitLab endpoints, or even other external APIs, you
              can follow the same pattern demonstrated here.
            </p>
          </div>

          <h3 className="mcpserver__subheading">Let's Run gitlab_create_issue</h3>
          <p>
            In <code>client-test.ts</code>, call the tool:
          </p>
          <pre className="mcpserver__code">
            <code>{`// client-test.ts
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function main() {
  // ... previous result
  const issueResult = await client.callTool({
      name: "gitlab_create_issue",
      arguments: {
          project: "32", // project ID as string, you can get it from the "More actions" button in GitLab
          title: "MCP test Issue",
          description: "It's using MCP server create an Issue",
          labels: ["mcp", "test"],
          assigneeIds: [], // can fill ID array
          confidential: false,
      },
  });
  console.log("Create Issue Result:", issueResult);
}

main().catch(console.error);`}</code>
          </pre>

          <p>Run it:</p>
          <pre className="mcpserver__code">
            <code>{`pnpm tsx src/client-test.ts`}</code>
          </pre>

          <div className="mcpserver__output">
            <p>
              Create Issue Result: {'{'}
              content: [{'{'}
              type: 'text', text: '✅ Issue #123 created: https://gitlab.com/...'
              {'}'}]{'}'}
            </p>
          </div>

          <p>Well done! We successfully used the MCP server to create an issue automatically.</p>
        </section>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">📦 Step 5: Git Commit & Push</h2>
          <p>Let's push code with a new tool:</p>
          <pre className="mcpserver__code">
            <code>{`// server.ts
// ... previous import package
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function gitCommitPush(
    repoPath: string,
    message: string,
    branch: string
) {
    // checking repo path
    const options = { cwd: repoPath };

    await execAsync("git add .", options);

    await execAsync(
        \`git commit -m "\${message}" || echo "No changes to commit"\`,
        options
    );

    await execAsync(\`git push origin \${branch}\`, options);

    return \`Commit & push Complete(\${branch})\`;
}

export function registerTools(server: McpServer) {
  // ... previous tools

  server.registerTool(
    "git_commit_push",
    {
      title: "Git Commit & Push",
      description: "Commit changes and push to branch",
      inputSchema: {
        repoPath: z.string(),
        message: z.string(),
        branch: z.string(),
      },
    },
    async ({ repoPath, message, branch }) => {
          const result = await gitCommitPush(repoPath, message, branch);
          return { content: [{ type: "text", text: result }] };
    }
  );
}`}</code>
          </pre>

          <h3 className="mcpserver__subheading">Let's run a new tool:</h3>
          <pre className="mcpserver__code">
            <code>{`// client-test.ts
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function main() {
  // ... previous result
  const commitResult = await client.callTool({
        name: "git_commit_push",
        arguments: {
            repoPath: "/path/to/your/repo", // Replace with your local Git repository path
            message: "fix: update login flow",
            branch: "main",
        },
    });
    console.log("Commit Result:", commitResult);
}

main().catch(console.error);`}</code>
          </pre>

          <pre className="mcpserver__code">
            <code>{`pnpm tsx src/client-test.ts`}</code>
          </pre>

          <div className="mcpserver__output">
            <p>
              Commit Result: {'{'} content: [{'{'} type: 'text', text: 'Commit & push
              Complete(main)' {'}'}] {'}'}
            </p>
          </div>

          <p>
            <strong>Congratulations!</strong> You've successfully committed and pushed changes using
            your MCP server.
          </p>
        </section>

        <section className="mcpserver__section">
          <h2 className="mcpserver__heading">Conclusion</h2>
          <p>We just built an MCP server that:</p>
          <ul className="mcpserver__list">
            <li>Registers simple tools (add)</li>
            <li>Integrates with GitLab to create issues</li>
            <li>Automates Git commits and pushes</li>
          </ul>

          <p>From here, you can:</p>
          <ul className="mcpserver__list">
            <li>Extend with more GitLab endpoints (merge requests, pipelines)</li>
            <li>Package & publish to npm</li>
            <li>Connect with other services like GitHub or Jira</li>
          </ul>

          <hr className="mcpserver__divider" />

          <p>
            <strong>MCP is powerful</strong> because it bridges AI assistants with real developer
            workflows. With just a few tools, you can automate tasks that normally take several
            manual steps.
          </p>
        </section>

        <section className="mcpserver__section">
          <hr className="mcpserver__divider" />
          <div className="mcpserver__external-link">
            <p>
              <BookIcon size={16} />
              <strong>Read the original article on Medium:</strong>
            </p>
            <a
              href="https://ai.plainenglish.io/ai-can-code-but-can-it-commit-building-an-mcp-server-to-find-out-39f2209c5f5c"
              target="_blank"
              rel="noreferrer"
              className="mcpserver__link"
            >
              AI Can Code, But Can It Commit? Building an MCP Server to Find Out →
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
